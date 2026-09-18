export const copy = data => {
  if (data == null) return data;
  return JSON.parse(JSON.stringify(data));
};
