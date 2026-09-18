import {OBB} from "three/examples/jsm/math/OBB.js";

const _mat3 = new THREE.Matrix3();
const _size = new THREE.Vector3();
const _pos = new THREE.Vector3();

function updateOBBFromMesh(mesh, obb) {
  // размер коллайдера берём из геометрии
  mesh.geometry.computeBoundingBox();
  const bb = mesh.geometry.boundingBox;

  bb.getSize(_size);
  obb.halfSize.copy(_size).multiplyScalar(0.5);

  // world transform
  mesh.updateWorldMatrix(true, false);

  _pos.setFromMatrixPosition(mesh.matrixWorld);
  obb.center.copy(_pos);

  _mat3.setFromMatrix4(mesh.matrixWorld);
  obb.rotation.copy(_mat3);

  return obb;
}

export function obbIntersects(obj1, obj2) {
  obj1._obb ??= new OBB();
  obj2._obb ??= new OBB();

  updateOBBFromMesh(obj1, obj1._obb);
  updateOBBFromMesh(obj2, obj2._obb);

  return obj1._obb.intersectsOBB(obj2._obb);
}
