const {UDPPort} = require("osc");

module.exports = initTUIO;

if (require.main === module) {
  initTUIO("0.0.0.0:3333");
}

function initTUIO(address = "", listener) {
  const [host, port] = address.split(":");

  const udpPort = new UDPPort({
    localAddress: host || "0.0.0.0",
    localPort: +port || 3333,
    metadata: true,
  });

  const activePoints = {};

  udpPort.on("bundle", function ({packets}, timeTag, info) {
    packets.forEach(({address, args}) => {
      const [, version, action] = address.split("/");
      const result = parsers[version]?.[action]?.(args);
      if (result && listener) listener(result);
    });
  });

  udpPort.open();
}

const parsers = {
  tuio: {
    "2Dcur": v1ParseTouchEvent,
    "2Dobj": v1ParseObjectEvent,
  },
  /*"tuio2": {
    "ptr": (args) => {
      const [id, typeID, componentID, x, y, angle, shear, radius, pressure] = args.map(v => v.value);

      if (id.toString().substr(0,1) === "1" ) {
        return {
          type: "touch",
          id, x, y
        };
      } else {
        return {
          type: "object",
          sessionID: id, id, x, y, angle, radius
        }
      }
    }
  }*/
};

function v1ParseTouchEvent(args) {
  const [action, sessionID, x, y] = args.map(v => v.value);
  if (action !== "set") return;
  return {
    type: "touch",
    x,
    y,
    sessionID,
    objectId: sessionID,
  };
}

function v1ParseObjectEvent(args) {
  const getId = val => (typeof val === "number" && val > 200 ? `000000${val}`.substr(val >= 1000 ? -7 : -4, 4) : val);
  switch (args[0].value) {
    case "set":
      const [, sessionID, objectId, x, y, angle] = args.map(v => v.value);
      return {
        type: "object",
        sessionID,
        objectId: getId(objectId),
        x,
        y,
        angle,
      };
    case "alive":
      return {
        type: "alive",
        list: args.slice(1).map(v => v.value),
      };
  }
}
