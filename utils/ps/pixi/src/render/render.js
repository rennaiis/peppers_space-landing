export function renderContainerToImage(container, renderer) {
  const bounds = container.getBounds();
  const renderTexture = PIXI.RenderTexture.create({
    width: Math.ceil(bounds.width),
    height: Math.ceil(bounds.height),
  });
  renderer.render(container, {
    renderTexture,
    clear: true, // Очищаем текстуру перед рендерингом
  });
  const canvas = renderer.extract.canvas(renderTexture);
  return canvas.toDataURL("image/png");
}
