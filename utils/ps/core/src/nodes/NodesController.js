import {NodeStates} from "@/utils/ps/core/src/nodes/Node";
import {debounce} from "lodash/function";
import {EventController} from "@/utils/ps/core/src/events/EventController";
import {getIsDebug} from "../versions/getIsDebug";

class NodesController extends EventController {
  nodes = [];

  names = {};

  context = {};

  pull = [];

  withPull = false;

  _isEnable = false;

  constructor() {
    super();
    this.update = this.update.bind(this);
    this.onNewCurrentNode = this.onNewCurrentNode.bind(this);

    this.debounceOnNodeEvent = debounce(this.onNewCurrentNode);

    const consumer = (this.consumer = this.producer.getConsumer());
    consumer.subscribe({
      topic: "node",
      callback: "onNodeEvent",
      context: this,
    });
    consumer.subscribe({
      topic: "node",
      type: "closeByName",
      callback: "onCloseByName",
      context: this,
    });

    this.subscribe({topic: "node"});
    if (global.requestAnimationFrame) requestAnimationFrame(this.update);
  }

  update() {
    if (this.needsUpdateNode && !this.isUpdate) {
      this.producer.send({topic: "node", type: "change", data: {node: this.currentNode}});
    }
    requestAnimationFrame(this.update);
  }

  onCloseByName({data: {name}}) {
    this.names[name]?.solve();
  }

  getNodeByUUID(uuid) {
    if (!uuid) return;

    function walk(node) {
      if (node.uuid === uuid) return node;

      for (const child of node.children ?? []) {
        const found = walk(child);
        if (found) return found;
      }
    }

    for (const node of this.nodes) {
      const found = walk(node);
      if (found) return found;
    }

    return null;
  }

  nodeActivateEvent({data: {name, ...data}}) {
    this.activateNodeByName({name, ...data});
  }

  run() {}

  updateContext(context) {
    this.context = context;
  }

  activateNodeByName({name, ...data}) {
    const node = this.getNodeByName(name);
    if (!node) return console.error("Node not found", name);
    node.activate(data);
  }

  getNodeByName(name) {
    return this.names[name];
  }

  load(nodes) {
    this.nodes = nodes.map(node => this.addNode(node));
    if (global.window && process.env.NODE_ENV === "development") {
      window.GET_NODES = () => console.log("NODES", this.nodes);
      window.GET_NODES();
    }
  }

  onCreated() {
    this.nodes.forEach(node => node.onCreated());
  }

  addNode({cls: Node, data, name, children = []}) {
    const {producer} = this;
    const node = new Node({
      controller: this,
      name,
      producer,
      data,
    });
    this.names[name] = node;

    children.forEach(nodeData => node.add(this.addNode(nodeData)));

    return node;
  }

  onNewCurrentNode() {
    this.needsUpdateNode = true;
  }

  applyPull() {
    this.pull.forEach(({node, action, data}) => {
      node[action]?.(data);
    });
    this.pull.length = 0;
  }

  updateApplyPullTimeout() {
    clearTimeout(this._updatePullTimeout);
    this._updatePullTimeout = setTimeout(() => this.applyPull(), 700);
  }

  onNodeEvent(event) {
    let isIgnoreUpdate = false;
    if (!event) debugger;
    if (event.type === "add-pull") {
      this.pull.push(event.data);
      this.updateApplyPullTimeout();
    }
    if (event.type === "resolve" || event.type === "reject") {
      isIgnoreUpdate = !!this.checkNode(event.data.node);

      if (!isIgnoreUpdate) {
        this.debounceOnNodeEvent();
      }
    }
  }

  set isEnable(isEnable) {
    if (isEnable === this._isEnable) return;
    this._isEnable = isEnable;
    if (isEnable) this.producer.send({topic: "node", type: "enabled"});
  }

  get isEnable() {
    return this._isEnable;
  }

  checkNode(node) {
    if (!node.parent) return;

    const isComplete = !node.parent.children.some(node => node.state === NodeStates.pending);
    if (!isComplete) return;

    const isChildrenResolved = node.parent.children.every(node => node.state === NodeStates.resolved);
    node.parent[isChildrenResolved ? "resolve" : "reject"]();

    return true;
  }

  get currentNode() {
    this.needsUpdateNode = false;
    const node = this.findPendingNode(this.nodes);
    node?.run?.();
    Object.values(this.names).forEach(cNode => cNode !== node && cNode.state === NodeStates.launched && cNode.reset());
    return node;
  }

  findPendingNode(nodes) {
    let result;
    for (const node of nodes) {
      result = this.checkMayCurrentNode(node);
      if (result) break;
    }
    return result;
  }

  checkMayCurrentNode(node) {
    const isMayCurrent =
      this.checkEnableNode(node) && (node.state === NodeStates.pending || node.state === NodeStates.launched);
    if (!isMayCurrent) return null;
    if (node.children.length) return this.findPendingNode(node.children);
    return node;
  }

  checkEnableNode(node) {
    const hasValidation = this.isEnable && [node.isEnable, node.data.isEnable].some(fn => typeof fn === "function");
    if (!hasValidation) return;
    return (node.isEnable ?? node.data.isEnable)?.call(node, this.context);
  }
}

export {NodesController};
export const nodesController = new NodesController();
