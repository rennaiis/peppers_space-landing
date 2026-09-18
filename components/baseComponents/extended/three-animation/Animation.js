import React, {useEffect, useRef} from "react";
import {v4 as uuidv4} from "uuid";
import {combineRefs} from "../../utils/element/applyRef";
import {baseThreeImports} from "../../utils/scene/utils/import/import-three";

/**
 *              <Animation
 *                 instanceID={0}
 *                 onInit={animationControls.init}
 *                 settings={{
 *                 size:{ width: 100, height: 100},
 *                 children: [
 *                    {
 *                      type: "model",
 *                      modelName: "cat",
 *                      modelType: "gltf",
 *                    }
 *                 ]}},
 *                 preload:[
 *                  "subtype": "threejs",
 *                  "type": "gltf",
 *                  "name": "cat",
 *                  "path": "assets/cat/",
 *                  "fileName": "cat.gltf"
 *                 ]
 *               />
 */

const Animation = React.forwardRef(function Animation({instanceID, settings, data, onInit, style}, ref) {
  const containerRef = useRef();
  let instance;

  let isUnmounted = false;

  useEffect(() => {
    const uuid = uuidv4();
    (async function () {
      const {default: AnimationController} = await import("./src/AnimationController");
      instance = AnimationController.getInstance(instanceID);

      if (settings.preload) {
        await baseThreeImports();
        const {default: loader} = await import("./src/ComponentsLoader");
        await loader.load(settings.preload);
      }

      if (!isUnmounted) instance.updateData({settings, container: containerRef.current, data, onInit, uuid});
    })();

    return () => {
      isUnmounted = true;
      instance?.unload(uuid);
    };
  }, []);

  return <div className={"animation"} ref={combineRefs([ref, containerRef])} style={style}></div>;
});
export default Animation;
Animation.propTypes = {};
