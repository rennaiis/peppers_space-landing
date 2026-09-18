import {Node, NodeStates} from "@/utils/ps/core/src/nodes/Node";
import {storage} from "@/utils/ps/core/src/structures/storage";

class TutorialNode extends Node {
  isTutorial = true;

  init() {
    this.setTutorialNode = this.setTutorialNode.bind(this);

    super.init();
    this.consumer.on("node:enabled:created", this.setTutorialNode);
  }

  setTutorialNode() {
    this.reset();

    this.consumer.off("node:enabled:created", this.setTutorialNode);

    if (!this.nodeStorage && !this.children?.length) this.addNodeToStorage();

    if (this.nodeStorage?.isCompleted) this.resolve();
  }

  onLaunched() {
    const {data: {onLaunched} = {}} = this;
    if (this.nodeStorage?.isComplete) {
      this.resolve();
      return;
    }
    super.onLaunched();
    onLaunched?.();
  }

  resolve(data) {
    super.resolve(data);
    this.checkCompleteNodes();
  }

  checkCompleteNodes() {
    const {parent} = this;
    if (parent) {
      if (!parent.children.every(node => node.currentNodeData.isCompleted)) return;
      parent.children.forEach(node => node.addNodeToStorage());
    } else if (!this.children?.length) this.addNodeToStorage();
  }

  addNodeToStorage() {
    const storageData = this.tutorialNodesStorage.load() || [];

    const existingIndex = storageData.findIndex(existingItem => existingItem.id === this.currentNodeData.id);

    existingIndex !== -1 ? (storageData[existingIndex] = this.currentNodeData) : storageData.push(this.currentNodeData);

    this.tutorialNodesStorage.save(storageData);
  }

  get nodeStorage() {
    const storageData = this.tutorialNodesStorage.load() || [];
    return storageData.find(existingItem => existingItem?.id === this.currentNodeData.id);
  }

  get currentNodeData() {
    return {id: this.name, isCompleted: this.state === NodeStates.resolved};
  }

  get tutorialNodesStorage() {
    return storage("tutorial_nodes");
  }
}

export {TutorialNode};
