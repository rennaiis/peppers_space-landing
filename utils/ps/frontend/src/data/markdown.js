let converted;
export async function convert(text) {
  const showdown = await import("showdown");
  converted ??= new showdown.Converter();
  return converter.makeHtml(text);
}
