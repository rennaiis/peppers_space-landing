import {parsePath} from "./parse-path";
import * as pathSeg from "./utils/pathseg";

global.pathSeg = pathSeg; //HACK: нужно использование, иначе three-shaking выкидывает библиотекуSvg

class CSSMatrix {
  constructor() {}
}

const WebKitCSSMatrix = global.DOMMatrix || global.WebKitCSSMatrix || CSSMatrix;

function getAttributes(el, names) {
  return names.map(name => +el.getAttribute(name));
}

function parsePolygon(points) {
  const list = Array.from(points);
  if (list.length === 0) {
    for (let i = 0; i < points.numberOfItems; i++) {
      const {x, y} = points.getItem(i);
      list.push(x, y);
    }
  }
  return list;
}

/**
 * @typedef {
 *   {name, type: 'polygon', points} |
 *   {name, type: 'circle', cx: number, cy: number, r: number}
 * } BodyInfo
 */
/**
 * конвертирование шейпов из svg в тела для p2
 * парсятся polygon, circles, path (не полностью)
 * в path все кривые заменяются на прямые
 * @param {SVGElement} svg
 * @param {number} scale=1
 * @return {BodyInfo[]}
 */
function svg2bodies(svg, scale = 1) {
  const result = [];
  const transform = ([x, y]) => [x * scale, y * scale];
  const addBody = body => {
    result.push(body);
  };
  const addPolygon = (el, points) => {
    const newPoints = points.map(shape => shape.map(transform));
    addBody({type: "polygon", shapes: newPoints, el, name: el.id});
  };

  const shapes = svg.querySelectorAll("polygon, path, circle, rect");
  const functions = {
    polygon(el) {
      const points = parsePolygon(el.points).map(pnt => [pnt.x, pnt.y]);
      addPolygon(el, [points]);
    },
    path(el) {
      const list = parsePath(el.getAttribute("d"));
      addPolygon(el, list);
    },
    circle(el) {
      let [r, cx, cy] = getAttributes(el, ["r", "cx", "cy"]);
      r *= scale;
      [cx, cy] = transform([cx, cy]);
      addBody({type: "circle", cx: cx, cy: cy, r: r, el, name: el.id});
    },
    rect(el) {
      const [x, y, width, height] = getAttributes(el, ["x", "y", "width", "height"]);
      const matrix = el.transform.baseVal[0]?.matrix;
      let points = [
        [x, y],
        [x + width, y],
        [x + width, y + height],
        [x, y + height],
      ];
      if (matrix && matrix !== "none") {
        const cssMatrix = new WebKitCSSMatrix();
        ["a", "b", "c", "d", "e", "f"].forEach(k => {
          cssMatrix[k] = matrix[k];
        });
        points = points.map(([x, y]) => {
          const pnt = cssMatrix.transformPoint({x, y});
          return [pnt.x, pnt.y];
        });
      }
      addPolygon(el, [points]);
    },
  };

  shapes.forEach(shape => {
    functions[shape.nodeName]?.(shape);
  });

  return result;
}

export {svg2bodies};
