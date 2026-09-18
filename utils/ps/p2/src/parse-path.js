import parseSvgPath from "parse-svg-path";

function parsePath(path) {
  const paths = [];
  let currentPath;
  let lastPoint = [0, 0];
  const info = parseSvgPath(path);

  const commands = {
    a([px, py], rx, ry, angle, largeArcFlag, sweepFlag, x, y) {
      //arc (7)
      currentPath.push([px + x, py + y]);
    },
    c([px, py], p0x, p0y, p1x, p1y, x, y) {
      //curve (6)
      currentPath.push([px + x, py + y]);
    },
    h([px, py], x) {
      //horizontal (1)
      currentPath.push([px + x, lastPoint[1]]);
    },
    l([px, py], x, y) {
      //line (2)
      currentPath.push([px + x, py + y]);
    },
    m([px, py], x, y) {
      //move (2)
      currentPath = [];
      paths.push(currentPath);
      currentPath.push([px + x, py + y]);
    },
    q([px, py], x1, y1, x, y) {
      //quadratic curveto (4)
      currentPath.push([px + x, py + y]);
    },
    s([px, py], x1, y1, x, y) {
      //smooth curveto (4)
      currentPath.push([px + x, py + y]);
    },
    t([px, py], x, y) {
      //smooth quadratic curveto (2)
      currentPath.push([px + x, py + y]);
    },
    v([px, py], y) {
      //vertical (1)
      currentPath.push([lastPoint[0], py + y]);
    },
    z([px, py]) {
      //closepath (0)
      lastPoint = [...currentPath[0]];
    },
  };
  for (let i = 0; i < info.length; i++) {
    const [cmd, ...props] = info[i];
    const isAbsolute = /[A-Z]/.test(cmd);
    commands[cmd.toLowerCase()](isAbsolute ? [0, 0] : lastPoint, ...props);
    lastPoint = currentPath[currentPath.length - 1];
  }

  paths.forEach(path => {
    let i = 0;
    while (i < path.length) {
      const j = (i + 1) % path.length;
      if (isNear(path[i], path[j])) {
        path.splice(i, 1);
      } else {
        i += 1;
      }
    }
  });

  return paths;
}

function isNear(p0, p1) {
  return (p1[0] - p0[0]) ** 2 + (p1[1] - p0[1]) ** 2 < 1;
}

export {parsePath};
