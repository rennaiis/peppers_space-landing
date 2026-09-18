import Matter from "./src/matter-global";

console.log("Matter>>", Matter);

// ecs
export {BodyComponent} from "./src/ecs/components/body/BodyComponent";
export {BodyHelperComponent} from "./src/ecs/components/body/BodyHelperComponent";
export {CircleComponent} from "./src/ecs/components/circle/CircleComponent";
export {CircleHelperComponent} from "./src/ecs/components/circle/CircleHelperComponent";
export {RectangleComponent} from "./src/ecs/components/rectangle/RectangleComponent";
export {RectangleHelperComponent} from "./src/ecs/components/rectangle/RectangleHelperComponent";
export {SvgComponent} from "./src/ecs/components/svg/SvgComponent";
export {SvgHelperComponent} from "./src/ecs/components/svg/SvgHelperComponent";
export {PhysicsSystem} from "./src/ecs/systems/PhysicsSystem";
