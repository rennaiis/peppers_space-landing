import {BodyComponent} from "../body/BodyComponent";

class CircleComponent extends BodyComponent {
  type = "matter-circle";

  constructor({eventBus, x, y, radius, maxSpeed, ...bodySettings}) {
    super({eventBus});

    const body = Matter.Bodies.circle(0, 0, radius, bodySettings);
    body.maxSpeed = maxSpeed;
    this.matterBody = body;

    Matter.Body.setPosition(this.matterBody, {x, y});
  }
}

export {CircleComponent};
