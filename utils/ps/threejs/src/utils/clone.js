const defaultSettings = {};

export function deepClone(object, settings = defaultSettings) {
  let clone;

  if (object instanceof THREE.SkinnedMesh) {
    const bones = object.parent.children.filter(child => child instanceof THREE.Bone);
    bones.forEach(bone => object.add(bone));
    clone = PS.three.SkeletonUtils.clone(object);

    return clone;
  }
  clone = object.clone(false);

  object.children.forEach(child => clone.add(deepClone(child, settings)));

  return clone;
}
