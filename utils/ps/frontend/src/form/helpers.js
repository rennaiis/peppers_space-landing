function objToFormData(obj) {
  const formData = new FormData();

  Object.keys(obj).forEach(key => {
    const data = obj[key];

    if (data instanceof File) {
      formData.append(key, data);
    } else if (Array.isArray(data)) {
      data.forEach((item, index) => {
        formData.append(`${key}[${index}]`, item);
      });
    } else if (data !== null && data !== undefined) {
      formData.append(key, data);
    }
  });

  return formData;
}

export {objToFormData};
