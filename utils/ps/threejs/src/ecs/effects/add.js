function add(parent, ...children) {
  parent.add(...children);

  return () => {
    children.forEach(child => child.parent?.remove(child));
  };
}

export {add};
