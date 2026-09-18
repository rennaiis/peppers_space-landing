function traverse(container, callback) {
  callback(container); // Выполняем действие с текущим контейнером

  if (container.children?.length)
    for (const child of container.children) {
      traverse(child, callback); // Рекурсивный обход всех детей
    }
}

export {traverse};
