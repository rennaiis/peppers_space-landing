function getCombinedBounds(objects) {
  if (!objects || objects.length === 0) return null;

  // Start with the bounds of the first object
  let bounds = objects[0].getBounds();
  let minX = bounds.x;
  let minY = bounds.y;
  let maxX = bounds.x + bounds.width;
  let maxY = bounds.y + bounds.height;

  // Merge bounds of all other objects
  for (let i = 1; i < objects.length; i++) {
    const b = objects[i].getBounds();
    minX = Math.min(minX, b.x);
    minY = Math.min(minY, b.y);
    maxX = Math.max(maxX, b.x + b.width);
    maxY = Math.max(maxY, b.y + b.height);
  }

  return new PIXI.Rectangle(minX, minY, maxX - minX, maxY - minY);
}

function boundsToContainer(container, bounds) {
  const localBounds = new PIXI.Bounds();
  const tempPoint = new PIXI.Point();

  const right = bounds.x + bounds.width;
  const bottom = bounds.y + bounds.height;

  tempPoint.set(bounds.x, bounds.y);
  container.toLocal(tempPoint, undefined, tempPoint);
  localBounds.addPoint(tempPoint);

  tempPoint.set(right, bounds.y);
  container.toLocal(tempPoint, undefined, tempPoint);
  localBounds.addPoint(tempPoint);

  tempPoint.set(right, bottom);
  container.toLocal(tempPoint, undefined, tempPoint);
  localBounds.addPoint(tempPoint);

  tempPoint.set(bounds.x, bottom);
  container.toLocal(tempPoint, undefined, tempPoint);
  localBounds.addPoint(tempPoint);
  return {
    x: localBounds.minX,
    y: localBounds.minY,
    width: localBounds.maxX - localBounds.minX,
    height: localBounds.maxY - localBounds.minY,
  };
}

function clonePIXIObject(original) {
  if (original instanceof PIXI.Sprite) {
    return clonePIXISprite(original);
  } else if (original instanceof PIXI.Container) {
    return clonePIXIContainer(original);
  } else if (original instanceof PIXI.Graphics) {
    return clonePIXIGraphics(original);
  } else if (original instanceof PIXI.Text) {
    return clonePIXIText(original);
  } else if (original instanceof PIXI.NineSlicePlane) {
    return clonePIXINineSlicePlane(original);
  } /*else if (original instanceof PIXI.Mesh) {
    return clonePIXIMesh(original);
  }*/ else if (original instanceof PIXI.AnimatedSprite) {
    return clonePIXIAnimatedSprite(original);
  }

  console.warn(`Unsupported PIXI object type: ${original.constructor.name}`);
  return original.clone(); // Пытаемся использовать стандартный clone()
}

// Клонирование контейнера
function clonePIXIContainer(original) {
  const clone = new PIXI.Container();
  copyBaseProperties(original, clone);

  // Копируем детей рекурсивно
  original.children.forEach(child => {
    clone.addChild(clonePIXIObject(child));
  });

  return clone;
}

// Клонирование спрайта
function clonePIXISprite(original) {
  const clone = new PIXI.Sprite(original.texture);
  copyBaseProperties(original, clone);

  // Специфичные свойства спрайта
  if (original.anchor) clone.anchor.copyFrom(original.anchor);
  clone.tint = original.tint;
  clone.roundPixels = original.roundPixels;

  return clone;
}

// Клонирование Graphics
function clonePIXIGraphics(original) {
  const clone = new PIXI.Graphics();
  copyBaseProperties(original, clone);

  // Копируем все команды рисования
  clone.copyFrom(original);

  return clone;
}

// Клонирование текста
function clonePIXIText(original) {
  const style = original.style ? new PIXI.TextStyle(original.style) : undefined;
  const clone = new PIXI.Text(original.text, style);
  copyBaseProperties(original, clone);

  return clone;
}

// Клонирование NineSlicePlane
function clonePIXINineSlicePlane(original) {
  const clone = new PIXI.NineSlicePlane(
    original.texture,
    original.leftWidth,
    original.topHeight,
    original.rightWidth,
    original.bottomHeight,
  );
  copyBaseProperties(original, clone);

  return clone;
}

// Клонирование анимированного спрайта
function clonePIXIAnimatedSprite(original) {
  const textures = original.textures.map(t => t.clone());
  const clone = new PIXI.AnimatedSprite(textures);
  copyBaseProperties(original, clone);

  clone.animationSpeed = original.animationSpeed;
  clone.loop = original.loop;
  clone.currentFrame = original.currentFrame;

  return clone;
}

// Копирование базовых свойств
function copyBaseProperties(original, clone) {
  clone.position.copyFrom(original.position);
  clone.scale.copyFrom(original.scale);
  clone.rotation = original.rotation;
  clone.pivot.copyFrom(original.pivot);
  clone.skew.copyFrom(original.skew);
  clone.alpha = original.alpha;
  clone.visible = original.visible;
  clone.name = original.name;
  clone.zIndex = original.zIndex;

  // Дополнительные свойства
  if (original.filters) clone.filters = original.filters.map(f => f.clone());
  if (original.blendMode) clone.blendMode = original.blendMode;
  if (original.interactive) clone.interactive = original.interactive;
  if (original.hitArea) clone.hitArea = original.hitArea;
  if (original.cursor) clone.cursor = original.cursor;
}

export {clonePIXIObject, boundsToContainer, getCombinedBounds};
