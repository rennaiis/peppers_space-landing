class CustomTickerListener extends PIXI.TickerListener {
  emit(ticker) {
    const {_context: context} = this;

    if (window.SPINE.Spine && context && context instanceof SPINE.Spine && !this.isInStage(context)) {
      return this.next; //не вызывает update spine
    }
    return super.emit(ticker);
  }

  isInStage(displayObject) {
    while (displayObject && displayObject.label !== "STAGE") {
      displayObject = displayObject.parent;
    }
    return !!displayObject;
  }
}

export {CustomTickerListener};
