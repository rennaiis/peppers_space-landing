import SAT from "./src/sat-global";

console.log("SAT>>", SAT);

// systems
export {SatRenderSystem} from "./src/ecs/systems/SatRenderSystem";
export {SatCollisionSystem} from "./src/ecs/systems/SatCollisionSystem";
export {SatDebugSystem} from "./src/ecs/systems/SatDebugSystem";

//entities
export {COLLISION_CONFIG} from "./src/ecs/entities/collisionConfig";

// components
export {SatCollider} from "./src/ecs/components/SatCollider";
export {CollisionConfig} from "./src/ecs/components/CollisionConfig";

// utils
export {getPointsFromPolygon, getBoundsFromPolygon} from "./src/utils/vertices";
