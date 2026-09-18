import {System} from "@/utils/ps/ecs/src/core/System";
import {Matrix4Component} from "@/utils/ps/ecs/src/base/components/transform/Matrix4Component";
import {Body3d} from "../components/Body3d";
import {Mixer} from "../components/Mixer";
import {disableAutoUpdateMatrix} from "../../utils/three-utils";

class ThreeRenderSystem extends System {
  update(data) {
    super.update(data);

    this.updateAnimations(data);
    this.updateItems(data);
  }

  updateAnimations(data) {
    const entities = this.filterEntitiesByClass(Mixer);
    entities.forEach(entity => entity.getList(Mixer).forEach(cMixer => cMixer.mixer?.update(data.deltaTime)));
  }

  updateItems() {
    const entities = this.filterEntitiesByClass(Body3d, Matrix4Component);

    entities.forEach(entity => {
      const cBody3d = entity.get(Body3d);
      const {body, onceUpdate} = cBody3d;
      const cMatrix4 = entity.get(Matrix4Component);

      if (!body || !cMatrix4) return;
      if (!body.matrixAutoUpdate && !body.needsDisableAutoUpdate) return;

      const {position, scale, quaternion} = cMatrix4.decompose();

      body.position.copy(position);
      body.quaternion.copy(quaternion);
      body.scale.copy(scale);

      if (body.needsMakeVisible) {
        body.visible = true;
        body.needsMakeVisible = false;
      }

      if (body.needsDisableAutoUpdate) {
        disableAutoUpdateMatrix(body);
        body.needsDisableAutoUpdate = false;
      }

      if (onceUpdate) entity.remove(cMatrix4);
    });
  }
}

export {ThreeRenderSystem};
