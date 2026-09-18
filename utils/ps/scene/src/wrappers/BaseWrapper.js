import {State} from "../decorators/state/State";
import {CustomData} from "../data/CustomData";
import {EventDispatcher} from "../../../core/src/events/EventDispatcher";
import {SceneController} from "../controllers/SceneController";
import {performanceAnalysis} from "../../../performance/src/Performance";

class BaseWrapper {
  static performanceAnalysis = performanceAnalysis;

  decorators = [State];

  eventBus = new EventDispatcher();

  storage = new CustomData();

  readyPromise;

  readyResolver;

  loadingPromise;

  loadingResolver;

  constructor() {
    this.onLoad = this.onLoad.bind(this);

    this.readyPromise = new Promise(resolve => (this.readyResolver = resolve));
    this.loadingPromise = new Promise(resolve => (this.loadingResolver = resolve));

    this.eventBus.addEventListener("scene-controller:loaded", this.onLoad);
  }

  async init() {
    if (this.controller) return;

    this.controller = this.initController();

    this.decorators.forEach(Decorator => new Decorator(this));
    this.readyResolver({
      events: this.eventBus,
    });

    await this.controller.init();
  }

  onLoad() {
    this.loadingResolver();
  }

  appendContainer(container) {
    this.controller.appendContainer?.(container);
  }

  initController() {
    const {eventBus, storage} = this;

    return new SceneController({eventBus, storage});
  }
}

export {BaseWrapper};
