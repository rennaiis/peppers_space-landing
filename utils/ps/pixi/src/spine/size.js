function getSpineSize(spine) {
  const offset = new SPINE.Vector2();
  const size = new SPINE.Vector2();
  spine.update(0);
  spine.skeleton.getBounds(offset, size);

  return {
    x: offset.x,
    y: offset.y,
    width: size.x,
    height: size.y,
  };
}

function getSlotSize(slot) {
  if (!slot) return null;

  const attachment = slot.getAttachment();
  if (!attachment) return null;

  // региональная картинка (стандартный случай)
  if (attachment instanceof SPINE.RegionAttachment) {
    return {
      width: attachment.width * slot.bone.scaleX,
      height: attachment.height * slot.bone.scaleY,
    };
  }

  //todo:?
  // меш — считаем по его UV/вершинам
  // if (attachment instanceof SPINE.MeshAttachment) {
  // }

  // bounding box (полигон)
  if (attachment instanceof SPINE.BoundingBoxAttachment) {
    const {vertices} = attachment;

    let minX = Infinity,
      minY = Infinity;
    let maxX = -Infinity,
      maxY = -Infinity;

    for (let i = 0; i < vertices.length; i += 2) {
      const x = vertices[i];
      const y = vertices[i + 1];
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }

    return {width: maxX - minX, height: maxY - minY};
  }

  return null;
}

export {getSlotSize, getSpineSize};
