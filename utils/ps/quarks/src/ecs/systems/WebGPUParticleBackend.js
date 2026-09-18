import {Mesh, BoxGeometry, MeshStandardNodeMaterial} from "three/webgpu";
import {instancedArray, instanceIndex, positionLocal, uniform, vec3} from "three/tsl";

class WebGPUParticleBackend {
  constructor(renderer, scene, maxAmount = 10_000) {
    this.renderer = renderer;
    this.scene = scene;

    this.maxAmount = maxAmount;
    this.currentAmount = 0;

    this.particleSystems = [];

    this.initBuffers();
    this.initRenderMesh();
  }

  initBuffers() {
    const n = this.maxAmount;

    this.buffers = {
      spawnPosition: instancedArray(n, "vec3"),
      position: instancedArray(n, "vec3"),
      velocity: instancedArray(n, "vec3"),
      color: instancedArray(n, "vec3"),
      scale: instancedArray(n, "vec3"),
      life: instancedArray(n, "float"),
    };

    this.dt = uniform(0);
  }

  initRenderMesh() {
    const geometry = new BoxGeometry(0.5, 0.5, 0.5);
    const material = new MeshStandardNodeMaterial({transparent: true, depthWrite: false});

    material.positionNode = this.buffers.position
      .toAttribute()
      .add(positionLocal.mul(this.buffers.scale.toAttribute()));

    material.colorNode = this.buffers.color.element(instanceIndex);

    material.opacityNode = this.buffers.life.element(instanceIndex).clamp(0, 1);

    const mesh = (this.mesh = new Mesh(geometry, material));
    mesh.count = this.currentAmount;
    mesh.frustumCulled = false;

    this.scene.add(mesh);
  }

  addParticleSystem(shader, config, emitterWorldPosition) {
    if (this.currentAmount + config.amount > this.maxAmount) {
      console.warn("Particle limit reached");
      return null;
    }

    const uniforms = this.parseUniforms(shader, config);
    const {x, y, z} = emitterWorldPosition;

    const system = {
      shader,
      uniforms,
      offset: this.currentAmount,
      amount: config.amount,
      emitterPosition: uniform(vec3(x, y, z)),
      updateCompute: null,
    };

    this.currentAmount += config.amount;
    this.mesh.count = this.currentAmount;

    this.particleSystems.push(system);

    this.buildInit(system);
    this.buildUpdate(system);

    return system;
  }

  parseUniforms(shader, config) {
    const uniforms = {};

    for (const key in shader.uniforms) {
      uniforms[key] = uniform(shader.uniforms[key]);
    }

    for (const key in config) {
      if (!(key in uniforms)) continue;

      const uniform = uniforms[key];
      const value = config[key];

      if (typeof value === "number") {
        uniform.value = value;
        continue;
      }

      if (value && typeof value === "object" && "x" in value && "y" in value && "z" in value) {
        uniform.value.set(value.x, value.y, value.z);
        continue;
      }

      if (value && typeof value === "object" && "r" in value && "g" in value && "b" in value) {
        uniform.value.set(value.r, value.g, value.b);
        continue;
      }

      if (Array.isArray(value) && value.length === 3) {
        uniform.value.set(value[0], value[1], value[2]);
      }
    }

    return uniforms;
  }

  buildInit(system) {
    const {shader, offset, amount, uniforms, emitterPosition} = system;

    const i = instanceIndex.add(offset);
    const buffers = this.getBufferViews(i);

    const fn = shader.init({i, buffers, uniforms, emitterPosition});
    this.renderer.compute(fn().compute(amount));
  }

  buildUpdate(system) {
    const {dt} = this;
    const {shader, offset, uniforms, emitterPosition, amount} = system;

    const i = instanceIndex.add(offset);
    const buffers = this.getBufferViews(i);

    const fn = shader.update({i, buffers, uniforms, emitterPosition, dt});
    system.updateCompute = fn().compute(amount);
  }

  getBufferViews(i) {
    return {
      spawnPosition: this.buffers.spawnPosition.element(i),
      position: this.buffers.position.element(i),
      velocity: this.buffers.velocity.element(i),
      color: this.buffers.color.element(i),
      scale: this.buffers.scale.element(i),
      life: this.buffers.life.element(i),
    };
  }

  updateEmitterPosition(system, worldPosition) {
    system.emitterPosition.value.copy(worldPosition);
  }

  update(deltaTime) {
    this.dt.value = deltaTime;

    for (const system of this.particleSystems) {
      this.renderer.compute(system.updateCompute);
    }
  }
}

export {WebGPUParticleBackend};
