import {getIsDebug} from "@/utils/ps/core/src/versions/getIsDebug";
import {exportGLTF} from "./utils/exportGLTF";
import {ThreeScene} from "./ThreeScene";
import {Loader} from "@/utils/ps/scene/src/loader/Loader";
import {SceneController} from "@/utils/ps/scene/src/controllers/SceneController";
import {ThreeParser} from "./loader/ThreeParser";
import {threeManager} from "./loader/ThreeManager";

Loader.registerManager(threeManager, "threejs");

class ThreeController extends SceneController {
  debug = getIsDebug();

  clock = new THREE.Clock();

  lazyClock = new THREE.Clock();

  sceneSettings;

  rendererSettings;

  scenes = {};

  cameras = {};

  currentScene = null;

  currentCamera = null;

  constructor(data) {
    super(data);
    this.sceneSettings = data.scene;
    this.rendererSettings = data.renderer;

    this.lazyUpdate = this.lazyUpdate.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  loadingSelect() {
    if (this.storage.createBefore)
      ThreeParser.createObjectsFromParams(this.storage.createBefore, {
        scene: this.currentScene,
      });

    return Loader.load(this.storage.preload, {
      onProgress: ({itemsLoaded, itemsTotal}) =>
        this.eventBus.dispatchEvent({
          type: "controller:loading-progress",
          data: {itemsLoaded, itemsTotal},
        }),
      onLoad: this.onLoad,
      externalData: {
        scene: this.currentScene,
      },
    });
  }

  async init(isDispatch = true) {
    await this.initRenderer();
    this.initScenes();
    this.initCameras();

    if (this.container) this.appendContainer(this.container);
  }

  initItems() {}

  create() {
    this.initItems();

    if (getIsDebug()) this.initDebug();

    if (this.storage.sceneOverrides)
      ThreeParser.overrideObjects(this.currentScene, this.storage.sceneOverrides, {
        scene: this.currentScene,
      });

    requestAnimationFrame(this.update);
  }

  initDebug() {}

  initCameras() {
    const {
      storage: {mainSceneSettings: {camera: cameraSettings} = {}},
    } = this;
    this.currentCamera = this.cameras.main = this.initCamera(cameraSettings);
  }

  initCamera(cameraSettings = {}) {
    return new THREE.PerspectiveCamera(
      cameraSettings.fov ?? 30,
      cameraSettings.aspect || window.innerWidth / window.innerHeight,
      0.1,
      cameraSettings.far || 10000,
    );
  }

  initScenes() {
    this.currentScene = this.scenes.main = this.initScene("main");

    if (typeof window.__THREE_DEVTOOLS__ !== "undefined") {
      window.__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {detail: this.currentScene}));
      window.__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {detail: this.renderer}));
    }
  }

  initScene() {
    const {
      storage,
      eventBus,
      storage: {mainSceneSettings: {fog} = {}},
      sceneSettings: {Cls = ThreeScene, options = {}} = {},
    } = this;

    return new Cls({eventBus, storage, fog, ...options});
  }

  async initRenderer() {
    const {
      storage: {mainSceneSettings: {shadow, backgroundColor: sBackgroundColor} = {}},
      rendererSettings: {
        shadowSettings = shadow,
        backgroundColor = sBackgroundColor ?? "#cccccc",
        backgroundTransparent = false,
        backgroundOpacity = 1,
        toneMapping = THREE.NoToneMapping,
        devicePixelRatio = window.devicePixelRatio,
        options = {antialias: true, logarithmicDepthBuffer: true},
      } = {},
    } = this;

    const renderer = (this.renderer = new THREE.WebGPURenderer(options));

    //Выводить ошибки в шейдерах, для выигрыша по производительности на production версии отключаем
    renderer.debug.checkShaderErrors = this.debug;

    if (backgroundTransparent) renderer.setClearColor(backgroundColor, backgroundOpacity);
    else renderer.setClearColor(backgroundColor);

    renderer.setPixelRatio(devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = toneMapping;

    if (shadowSettings) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = shadowSettings?.type ?? THREE.PCFShadowMap;
    }
    await renderer.init();
  }

  appendContainer(container) {
    if (this.renderer) {
      container.innerHTML = "";
      container.appendChild(this.renderer.domElement);
    }

    super.appendContainer(container);
  }

  get canvas() {
    return this.renderer?.domElement;
  }

  onResize({width, height} = this._size) {
    if (!this.renderer.domElement.parentElement) return;
    const {renderer} = this;

    this._size = {width, height};

    Object.values(this.cameras).forEach(camera => {
      camera.aspect = width / height;

      camera.updateProjectionMatrix();
    });

    Object.values(this.scenes).forEach(scene => scene.resize(width, height));

    renderer.setSize(width, height);
  }

  exportGLTF(params) {
    return exportGLTF(this.currentScene, params);
  }

  render() {
    const {currentScene, currentCamera, renderer} = this;
    renderer.render(currentScene, currentCamera);
  }

  lazyUpdate() {
    const {lazyClock} = this;
    return lazyClock.getDelta();
  }

  update() {
    const {clock, currentScene} = this;
    const delta = clock.getDelta();

    currentScene.update(delta);

    this.render();

    return delta;
  }
}

export {ThreeController};
