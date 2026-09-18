import {Particle} from "../components/Particle";
import {System} from "@/utils/ps/ecs/src/core/System";
import {Component} from "@/utils/ps/ecs/src/core/Component";
import {WebGPUParticleBackend} from "./WebGPUParticleBackend";

class WebGPUParticleSystem extends System {
  init() {
    super.init();
    const {renderer, scene} = this.storage;

    this.backend = new WebGPUParticleBackend(renderer, scene);
    this.eventBus.addEventListener(Component.EVENTS.CHANGE, this.onParticleAdded.bind(this));
  }

  update(data) {
    super.update(data);

    const entities = this.getEntitiesByComponent(Particle);

    for (const entity of entities) {
      const p = entity.get(Particle);

      if (!p.gpuSystem) continue;

      const worldPosition = this.calcEmitterPosition(p.emitter, p.config);
      this.backend.updateEmitterPosition(p.gpuSystem, worldPosition);
    }

    this.backend.update(data.deltaTime);

    const {renderer, scene, cameras} = this.storage;
    renderer.render(scene, cameras.main);
  }

  onParticleAdded({data: {component}}) {
    if (!(component instanceof Particle)) return;
    if (!component.shader || !component.config) return;

    const {emitter, config, shader} = component;
    const worldPosition = this.calcEmitterPosition(emitter, config);

    component.gpuSystem = this.backend.addParticleSystem(shader, config, worldPosition);
  }

  calcEmitterPosition(emitter, config) {
    return emitter.getWorldPosition(new THREE.Vector3()).add(config.emitterPosition);
  }
}

export {WebGPUParticleSystem};
