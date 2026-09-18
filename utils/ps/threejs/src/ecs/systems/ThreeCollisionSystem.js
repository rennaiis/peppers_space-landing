import {System} from "@/utils/ps/ecs/src/core/System";
import {Body3d} from "../components/Body3d";
import {Collision} from "../components/Collision";
import {obbIntersects} from "@PS/threejs/src/utils/obb-intersects";

class ThreeCollisionSystem extends System {
  update(data) {
    super.update(data);
    const entities = this.filterEntitiesByClass(Collision);

    const groups = {};

    entities.forEach(entity => {
      const collisionComponent = entity.get(Collision);
      if (!groups[collisionComponent.group]) groups[collisionComponent.group] = [];
      groups[collisionComponent.group].push(entity);
    });

    this.checkCollisions(groups);
  }

  checkCollisions(groups) {
    const {
      storage: {
        mainSceneSettings: {collisions: collisionPairs},
      },
    } = this;
    const collisions = [];
    collisionPairs.forEach(([group1, group2]) => {
      if (!groups[group1] || !groups[group2]) return;
      groups[group1].forEach(entity1 => {
        groups[group2].forEach(entity2 => {
          const body1 = entity1.get(Body3d);
          const body2 = entity2.get(Body3d);

          let hit;

          if (!body1.body || !body2.body) return;
          const bbox1 = body1.body.customBoundingBox ?? body1.body;
          const bbox2 = body2.body.customBoundingBox ?? body2.body;

          if (!bbox1._updatedMatrixWorld) {
            body1.body.updateMatrixWorld(true);
            bbox1._updatedMatrixWorld = true;
          }

          if (!bbox2._updatedMatrixWorld) {
            if (!body2.body) debugger;
            body2.body.updateMatrixWorld(true);
            bbox2._updatedMatrixWorld = true;
          }

          if (bbox1.isObb && bbox2.isObb) {
            hit = obbIntersects(bbox1, bbox2);
          } else {
            const box1 = new THREE.Box3().setFromObject(bbox1);
            const box2 = new THREE.Box3().setFromObject(bbox2);
            hit = box1.intersectsBox(box2);
          }

          if (hit) collisions.push([entity1, entity2]);
        });
      });
    });

    if (collisions.length) {
      this.dispatchEvent("three-collisions:collisions", collisions);
    }
  }
}

export {ThreeCollisionSystem};
