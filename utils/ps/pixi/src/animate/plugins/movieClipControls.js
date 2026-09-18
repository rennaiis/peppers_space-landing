function movieClipControls({clip}) {
  if (typeof clip.fromTo === "function") throw new Error("plugin has been declarated");

  ["gotoAndPlay", "gotoAndStop", "stop", "play"].forEach(method => {
    const prevMethod = clip[method].bind(clip);

    clip[method] = function () {
      if (!arguments?.[arguments?.length - 1]?.isMovieClipControls) {
        const prevCurrentFrame = this.currentFrame;
        delete this.currentFrame;
        delete this._currentFrame;
        this.currentFrame = prevCurrentFrame;

        delete this.isStarted;

        if (this.callbacksFrames) {
          for (const key in this.callbacksFrames) {
            const id = this.callbacksFrames[key];
            typeof id === "number" && cancelAnimationFrame(id);
          }
          delete this.callbacksFrames;
        }
      }

      prevMethod(...arguments);
    };
  });

  clip.fromTo = function (from, to = "next", {loop = false, repeat = 0, onUpdate, onStart, onComplete, onRepeat} = {}) {
    const {labelsMap, labels} = this;

    const [min, max] = [Math.min(...labels.map(({position}) => position)), clip.totalFrames - 1];

    if (!["string", "number"].includes(typeof from)) throw new Error("invalid from type choose from = string | number");

    if (!["string", "number"].includes(typeof to)) throw new Error("invalid to type choose to = string | number");

    if (
      (typeof from === "string" && !labelsMap.hasOwnProperty(from)) ||
      (typeof from === "number" && (from < min || from > max))
    )
      throw new Error(`from: ${from} is not defined`);

    if (
      (typeof to === "string" && !["next", "end"].includes(to) && !labelsMap.hasOwnProperty(to)) ||
      (typeof to === "number" && (to < min || to > max))
    )
      throw new Error(`to: ${to} is not defined`);

    if (typeof repeat !== "number" || isNaN(repeat)) throw new Error("repeat in not a number");

    if (!loop && !repeat && typeof onRepeat === "function")
      throw new Error("if you can use onRepeat choose loop = true");

    const [start, end] = [
      {
        string: labelsMap[from],
        number: from,
      }[typeof from],

      {
        next: {
          string: labels[labels.findIndex(({label}) => label === from) + 1]?.position ?? clip.totalFrames - 1,
          number: labels?.find(({position}) => position > from)?.position ?? clip.totalFrames - 1,
        }[typeof from],
        end: clip.totalFrames - 1,
      }[to] ??
        {
          string: labels?.find(({label}) => label === to)?.position,
          number: to,
        }[typeof to],
    ];

    if (start > end) throw new Error("start is not be more than end");

    clip._currentFrame = clip.currentFrame;

    clip.isStarted = false;

    clip.callbacksFrames = {
      onUpdate: null,
      onStart: null,
      onComplete: null,
      onRepeat: null,
    };

    Object.defineProperty(clip, "currentFrame", {
      get() {
        return this._currentFrame;
      },
      set(newFrame) {
        this._currentFrame = newFrame;

        if (!clip.isStarted) {
          clip.isStarted = true;
          clip.callbacksFrames.onStart = requestAnimationFrame(() => onStart?.({clip}));
        }

        onUpdate?.({
          currentFrame: newFrame,
          currentLabel: labels.find(({position}, index, arr) => {
            return newFrame >= position && (arr[index + 1]?.position ?? Number.MAX_VALUE) > newFrame;
          })?.label,
          progress: !(end - newFrame) ? 1 : 1 - (end - newFrame) / (end - start),
          clip,
        });

        if (newFrame >= end) {
          if (loop) {
            clip.gotoAndPlay(start, {isMovieClipControls: true});
            clip.callbacksFrames.onRepeat = requestAnimationFrame(() => onRepeat?.({remainder: repeat, clip}));
            return;
          }

          if (repeat) {
            repeat--;
            clip.gotoAndPlay(start, {isMovieClipControls: true});
            clip.callbacksFrames.onRepeat = requestAnimationFrame(() => onRepeat?.({remainder: repeat, clip}));
            return;
          }

          clip.callbacksFrames.onComplete = requestAnimationFrame(() => onComplete?.({clip}));

          clip.stop({isMovieClipControls: true});
        }
      },
      configurable: true,
    });

    clip.gotoAndPlay(start, {isMovieClipControls: true});
  };
}

export {movieClipControls};
