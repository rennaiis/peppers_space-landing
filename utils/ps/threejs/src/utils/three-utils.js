/* eslint-disable */
import {getObjectByStringPath} from "./get-object-by-string-path";
import {getLogger} from "@/utils/ps/core/src/utils/getLogger";

import {Vector3} from "@/utils/ps/math/src/Vector3";
import {Quaternion} from "@/utils/ps/math/src/Quaternion";
// ----------------

function decomposeMatrixWorld(object) {
  const position = new Vector3();
  const quaternion = new Quaternion();
  const scale = new Vector3();

  object.matrixWorld.decompose(position, quaternion, scale);

  return {
    position,
    quaternion,
    scale,
  };
}

function smoothstep(near, far, depth) {
  const x = saturate((depth - near) / (far - near));
  return x * x * (3 - 2 * x);
}

function recursiveDisableAutoUpdateMatrix(object, disable = true) {
  disableAutoUpdateMatrix(object, disable);
  object.traverse(child => disableAutoUpdateMatrix(child, disable));
}

function linearize(depth, camera) {
  const zfar = camera.far;
  const znear = camera.near;
  return (-zfar * znear) / (depth * (zfar - znear) - zfar);
}

function saturate(x) {
  return Math.max(0, Math.min(1, x));
}

//
function copyRotation(obj, obj_from) {
  obj.rotation.copy(obj_from.rotation);
}

//
function relativeRotate(obj, euler) {
  const q = new Quaternion().setFromEuler(obj.rotation);
  const q2 = new Quaternion().setFromEuler(euler);
  q.multiply(q2);
  obj.rotation.setFromQuaternion(q);
}

//
function copyRotationAndRotate(obj, obj_from, euler) {
  const q = new Quaternion().setFromEuler(obj_from.rotation);
  const q2 = new Quaternion().setFromEuler(euler);
  q.multiply(q2);
  obj.rotation.setFromQuaternion(q);
}

function toScreenPosition(obj, camera, renderer, ignoreUpdate) {
  const vector = new Vector3();

  const widthHalf = 0.5 * renderer.domElement.width;
  const heightHalf = 0.5 * renderer.domElement.height;

  if (ignoreUpdate) obj.updateMatrixWorld();

  vector.setFromMatrixPosition(obj.matrixWorld);
  vector.project(camera);

  const maxDelta = 1;
  const isVisible = vector.z <= 1;
  const resultVisible = isVisible && Math.abs(vector.x) <= maxDelta && Math.abs(vector.y) <= maxDelta;

  vector.x = vector.x * widthHalf + widthHalf + (isVisible ? 0 : widthHalf * 2);
  vector.y = -(vector.y * heightHalf) + heightHalf + (isVisible ? 0 : heightHalf * 2);

  return {
    isVisible: resultVisible,
    x: vector.x / renderer.getPixelRatio(),
    y: vector.y / renderer.getPixelRatio(),
  };
}

//
function disableMipMaps(texture) {
  texture.generateMipmaps = false;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

//
function disableAutoUpdateMatrix(object, disable = true) {
  object.matrixAutoUpdate = !disable;
  object.updateMatrix();
}

//
function getObjectFromString(_str) {
  let str = _str;
  let result;
  if (str) {
    str = str.trim();
    if (str.charAt(0) === "{") {
      // Vector Object
      str = JSON.parse(str);
      if (str) {
        result = new Vector3();
        if (str.x !== undefined) result.x = str.x;
        if (str.y !== undefined) result.y = str.y;
        if (str.z !== undefined) result.z = str.z;
        return result;
      }
    }
  }
  return _str;
}

function defuseToEmissive(obj) {
  obj.traverse(e => {
    if (e.type === "Mesh") {
      if (!e.material.map || e.material.emissiveMap) return;
      e.material.emissiveMap = e.material.map;
      // e.material.emissiveIntensity = 1;
      e.material.emissive.setRGB(1, 1, 1);
      e.material.map = undefined;
    }
  });
}

function setValidNumberValue(v, target, paramName, doAdd = false) {
  if (v === undefined || v === null) return;
  if (!doAdd) {
    target[paramName] = v;
  } else if (target[paramName]) {
    target[paramName] += v;
  }
}

function checkOverrideParam(paramName, val, context, lib) {
  if (typeof val === "string") {
    let refObj;
    const objPath = val.substr(1, val.length).split(".");

    if (val.charAt(0) === "@") {
      if (!context || !context.getObjectByName) {
        getLogger("warn")(`Linked Ref Object (${val}) requires a context.`);
        return null;
      }

      refObj = context.getObjectByName(objPath.shift()) || null;
    } else if (val.charAt(0) === "&") {
      if (!lib) {
        getLogger("warn")(`Linked Ref Object (${val}) requires a lib.`);
        return null;
      }

      refObj = lib[val.substr(1, val.length)];
      refObj = refObj ? refObj.item : null;
      objPath.shift();
    }

    if (refObj === null) return getLogger("warn")(`Linked Ref Object (${val}) is not found.`, val, context, lib);

    if (!objPath.length) return refObj;

    const refParam = getObjectByStringPath(refObj, objPath);
    getLogger("log")("LINK!", objPath, context, refParam);

    switch (paramName) {
      case "scale":
      case "position":
        val = [refParam.x, refParam.y, refParam.z];
        break;

      case "rotation":
        val = [
          THREE.MathUtils.radToDeg(refParam.x),
          THREE.MathUtils.radToDeg(refParam.y),
          THREE.MathUtils.radToDeg(refParam.z),
        ];
        break;
      case "colorSpace":
        break;
      default:
        val = refParam;
        break;
    }
  }
  return val;
}

function getRootParent(obj) {
  return obj.parent ? getRootParent(obj.parent) : obj;
}

function getObjectByName(name, scope, scene) {
  if (typeof name !== "string") return name;
  if (scope === undefined) scope = scene;
  if (typeof scope === "string") {
    if (scene) scope = scene.getObjectByName(scope);
    else return getLogger("warn")(`Can't get Object ${name} in Scope ${scope} without Scene link.`);
  }
  if (scope) return scope.getObjectByName(name);
}

function replaceObject(replaced, replacedScope, newObject, newObjectScope, scene, replaceName = true) {
  const _replaced = getObjectByName(replaced, replacedScope, scene);
  const _newObject = getObjectByName(newObject, newObjectScope, scene);
  if (!_replaced) {
    getLogger("log")("Replacing failed ", replaced, replacedScope, newObject);
    return false;
  }
  _newObject.position.copy(_replaced.position);
  _newObject.rotation.copy(_replaced.rotation);
  _newObject.scale.copy(_replaced.scale);
  _newObject.visibility = _replaced.visibility;
  _replaced.parent.add(_newObject);
  _replaced.parent.remove(_replaced);

  if (replaceName) _newObject.name = _replaced.name;

  return true;
}

function getThreeObjectByString(path, context) {
  path = path.split(".");
  const obj = context.getObjectByName(path.shift());
  if (!obj) return null;
  if (!path.length) return obj;
  return getObjectByStringPath(obj, path);
}

// COLORS
function decToHex(rgb) {
  const hex = Number(rgb).toString(16);
  return hex.length < 2 ? `0${hex}` : hex;
}

function decColorToHex(r, g, b) {
  return decToHex(r) + decToHex(g) + decToHex(b);
}

function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

export {
  isObject,
  decColorToHex,
  getThreeObjectByString,
  replaceObject,
  getObjectByName,
  checkOverrideParam,
  decomposeMatrixWorld,
  smoothstep,
  recursiveDisableAutoUpdateMatrix,
  linearize,
  saturate,
  copyRotation,
  relativeRotate,
  copyRotationAndRotate,
  toScreenPosition,
  disableMipMaps,
  disableAutoUpdateMatrix,
  getObjectFromString,
  defuseToEmissive,
  setValidNumberValue,
};
