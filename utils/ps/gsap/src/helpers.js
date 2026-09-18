import {getIsDebug} from "@/utils/ps/core/src/versions/getIsDebug";

export function gsapTimer({duration, onUpdate, onComplete, namespace, id, isDestroy = false}) {
  if (!namespace && getIsDebug()) throw new Error("incorrectProps");

  return gsap
    .to(
      {},
      {
        duration,
        onUpdate() {
          const progress = this.progress();
          onUpdate?.(progress);
        },
        onComplete() {
          this.delete(namespace, isDestroy);
          onComplete?.();
        },
      },
    )
    .save(namespace, id);
}
