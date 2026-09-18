import * as pathSeg from "../../utils/pathseg";
import {BodyComponent} from "../body/BodyComponent";
import PolyDecomp from "poly-decomp";

global.pathSeg = pathSeg; //HACK: нужно использование, иначе tree-shaking выкидывает библиотеку

Matter.Common.setDecomp(PolyDecomp);

class SvgComponent extends BodyComponent {
  type = "matter-svg";

  constructor({eventBus, svg, x, y, scaleX, scaleY, maxSpeed, ...bodySettings}) {
    super({eventBus});

    const vertexSets = Array.from(svg.children)
      .filter(child => child.tagName === "path")
      .map(path => Matter.Svg.pathToVertices(path, 30));

    const body = Matter.Bodies.fromVertices(x, y, vertexSets, bodySettings, true);

    if (scaleX || scaleY) Matter.Body.scale(body, scaleX ?? 1, scaleY ?? 1);

    body.maxSpeed = maxSpeed;

    this.matterBody = body;

    Matter.Body.setPosition(this.matterBody, {x, y});
  }
}

export {SvgComponent};
