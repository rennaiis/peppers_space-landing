import P2 from "./src/p2-global";

console.log("P2>>", P2);

// src
export {parsePath} from "./src/parse-path";
export {svg2bodies} from "./src/svg2bodies";

// ecs
export {BodyComponent} from "./src/ecs/components/body/BodyComponent";
export {BodyHelperComponent} from "./src/ecs/components/body/BodyHelperComponent";
export {CircleComponent} from "./src/ecs/components/circle/CircleComponent";
export {CircleHelperComponent} from "./src/ecs/components/circle/CircleHelperComponent";
export {CapsuleComponent} from "./src/ecs/components/capsule/CapsuleComponent";
export {CapsuleHelperComponent} from "./src/ecs/components/capsule/CapsuleHelperComponent";
export {CollisionSystem} from "./src/ecs/systems/CollisionSystem";
export {PhysicsSystem} from "./src/ecs/systems/PhysicsSystem";

// utils
export {rotateBody} from "./src/utils/rotate";
