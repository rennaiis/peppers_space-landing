import {BatchedRenderer} from "three.quarks";
import {Particle} from "@PS/threejs";
import {Component, System} from "@PS/ecs";

export class ThreeParticleSystem extends System {
  //:TODO Доработать (тестовая версия)

  update(data) {
    super.update(data);
    this.batchSystem.update(data.deltaTime);
  }

  init() {
    super.init();

    this.eventBus.addEventListener(Component.EVENTS.CHANGE, this.initParticles.bind(this));

    const scene = this.storage.scene;
    const batchSystem = (this.batchSystem = new BatchedRenderer());

    scene.add(batchSystem);
  }

  initParticles(component) {
    const {data} = component;
    if (data.component instanceof Particle) {
      const particle = data.component?.particleConfig;

      if (particle) {
        this.batchSystem.addSystem(particle);
      }
    }
  }
}
