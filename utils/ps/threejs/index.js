import {ThreeGLTFLoader} from "@PS/threejs/src/loader/ThreeGLTFLoader";
import THREE from "./src/three-global";

export WebGPU from "three/addons/capabilities/WebGPU.js";
export {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";

console.log("THREE>>", THREE);

// src
export {ThreeController} from "./src/ThreeController";
export {ThreeWrapper} from "./src/ThreeWrapper";
export {ThreeScene} from "./src/ThreeScene";

// loader
export {ThreeManager, threeManager} from "./src/loader/ThreeManager";
export {GLTFLoader as ThreeGLTFLoader} from "./src/loader/GLTFLoader";
export {TextureLoader} from "./src/loader/TextureLoader";
export {ThreeParser} from "./src/loader/ThreeParser";

// decorators
export {ThreeResize} from "./src/decorators/resize/ThreeResize";

// camera
export {ExtraOrthographicCamera} from "./src/camera/orthographic/ExtraOrthographicCamera";
export {OrthographicCameraController} from "./src/camera/orthographic/OrthographicCameraController";
// export {OrthographicCameraControls} from "./src/camera/orthographic/OrthographicCameraControls";

// controllers
export {Animation} from "./src/controllers/animation/Animation";
export {AnimationLabel} from "./src/controllers/animation/AnimationLabel";
export {CurvedMaterialController} from "./src/controllers/material/CurvedMaterialController";

// ecs
export {Body3d} from "./src/ecs/components/Body3d";
export {Collision} from "./src/ecs/components/Collision";
export {Mixer} from "./src/ecs/components/Mixer";
export {ThreeCollisionSystem} from "./src/ecs/systems/ThreeCollisionSystem";
export {ThreeRenderSystem} from "./src/ecs/systems/ThreeRenderSystem";
export {add} from "./src/ecs/effects/add";
export {ThreeParticleSystem} from "./src/ecs/systems/ThreeParticleSystem";
export {Particle} from "./src/ecs/components/Particle";

// factory
export {Base} from "./src/factory/Base";

// effects
// export {BloomController} from "./src/effects/Bloom";
// export {DOF} from "./src/effects/DOF";

// interaction
export {InteractiveRaycaster} from "./src/interaction/InteractiveRaycaster";
export {InteractionManager} from "./src/interaction/three.interactive";

// materials
export {BlendMaterial} from "./src/materials/BlendMaterial";
export {FlagMaterial} from "./src/materials/FlagMaterial";
export {MaskedMatcapMaterial} from "./src/materials/MaskedMatcapMaterial";
export {MeshCurvedMaterial} from "./src/materials/MeshCurvedMaterial";
export {MaskedStandardBasicMaterial} from "./src/materials/MaskedStandardBasicMaterial";
export {MeshScaleMaterial} from "./src/materials/MeshScaleMaterial";
export {MixedMatcap2Material} from "./src/materials/MixedMatcap2Material";
export {MixedMatcapMaterial} from "./src/materials/MixedMatcapMaterial";
export {MovingMaterial} from "./src/materials/MovingMaterial";
export {MultiplyMaterial} from "./src/materials/MultiplyMaterial";
export {MeshHiddenRadiusMaterial} from "./src/materials/MeshHiddenRadiusMaterial";
export {MaterialHelper} from "./src/materials/MaterialHelper";

// objects
export {CameraBackground} from "./src/objects/CameraBackground";
export {SequenceMesh} from "./src/objects/SequenceMesh";
export {ViewBackground} from "./src/objects/ViewBackground";

// performance
export {ThreePlugin} from "./src/performance/ThreePlugin";

// utils
export {connectAttrs} from "./src/utils/connect-attributes";
export {applyObjectProperties, DONT_APPLY_PROPERIES} from "./src/utils/apply-object-properties";
export {deepClone} from "./src/utils/clone";
export {cloneGltf} from "./src/utils/clone-gltf";
export {getObjectByStringPath} from "./src/utils/get-object-by-string-path";
export {exportGLTF} from "./src/utils/exportGLTF";
export {Console} from "./src/utils/console";
export {SeekableValue} from "./src/utils/SeekableValue";
export {WebGL} from "./src/utils/WebGL";

export {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
export * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
export * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils";
export {toTrianglesDrawMode} from "three/examples/jsm/utils/BufferGeometryUtils.js";

export {
  isObject,
  decColorToHex,
  getThreeObjectByString,
  replaceObject,
  getObjectByName,
  checkOverrideParam,
  decomposeMatrixWorld,
  smoothstep,
  recursiveDisableAutoUpdateMatrix,
  linearize,
  saturate,
  copyRotation,
  relativeRotate,
  copyRotationAndRotate,
  toScreenPosition,
  disableMipMaps,
  disableAutoUpdateMatrix,
  getObjectFromString,
  defuseToEmissive,
  setValidNumberValue,
} from "./src/utils/three-utils";
