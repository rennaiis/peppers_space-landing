import React from "react";
import {animations} from "@/components/baseComponents/helpers/transition/animations";
import {motion} from "framer-motion";

const componentCache = new Map();
const PE = new Proxy(
  {},
  {
    get: (_target, key) => {
      if (!componentCache.has(key)) {
        componentCache.set(key, createComponent(key));
      }
      return componentCache.get(key);
    },
  },
);

function createComponent(Component) {
  function PElement({animation, settingsAnimationStates = {}, children, ...rest}, ref) {
    const Tag = animation ? motion[Component] : Component;
    const animationProps = {
      variants: animations[animation],
      ...settingsAnimationStates,
    };

    return (
      <Tag ref={ref} {...animationProps} {...rest}>
        {children}
      </Tag>
    );
  }

  return React.forwardRef(PElement);
}

export default PE;
