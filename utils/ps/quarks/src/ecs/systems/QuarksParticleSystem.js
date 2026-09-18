import {Particle} from "../components/Particle";
import {System} from "@/utils/ps/ecs/src/core/System";
import {Component} from "@/utils/ps/ecs/src/core/Component";

class QuarksParticleSystem extends System {
  update(data) {
    super.update(data);
    this.batchSystem.update(data.deltaTime);
  }

  init() {
    super.init();

    this.eventBus.addEventListener(Component.EVENTS.CHANGE, this.initParticles.bind(this));

    const scene = this.storage.scene;
    const batchSystem = (this.batchSystem = new Quarks.BatchedRenderer());

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

export {QuarksParticleSystem};
