import Quarks from "./src/quarks-global";

console.log("Quarks>>", Quarks);

// ecs
export {QuarksParticleSystem} from "./src/ecs/systems/QuarksParticleSystem";
export {WebGPUParticleSystem} from "./src/ecs/systems/WebGPUParticleSystem";
export {Particle} from "./src/ecs/components/Particle";
export {addParticle} from "./src/ecs/effects/addParticle";
