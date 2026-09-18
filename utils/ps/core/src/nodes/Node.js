import {v4 as uuidv4} from "uuid";
import {camelCase, get} from "lodash";

class Node {
  uuid = uuidv4();

  reuseCounter = 0;

  children = [];

  parent = null;

  resolver = null;

  rejecter = null;

  promise = null;

  name = null;

  _state = null;

  _controller = null;

  constructor({producer, controller, name, data = {isReusable: false}}) {
    const self = this;

    this.name = name;
    this.producer = producer;
    this.consumer = this.producer.getConsumer();
    this._controller = controller;

    this.resolveHandler = this.resolveHandler.bind(this);
    if (!controller) debugger;
    //console.log("controller", controller)

    this.data = new Proxy(data, {
      set(obj, prop, value) {
        const result = Reflect.get(...arguments);
        self.onChangeData();
        return result;
      },
    });

    this.init();
  }

  get context() {
    return this._controller?.context;
  }

  collectContext(target, paths = {}) {
    const result = {};
    Object.entries(paths).forEach(([key, path]) => (result[key] = get(target, path)));
    return result;
  }

  run() {
    this.state = NodeStates.launched;
  }

  set state(state) {
    if (this.state === state) return;
    this._state = state;
    this.initActionResolveListeners("off");
    this[camelCase(`on-${state}`)]?.();
  }

  onCreated() {}

  onLaunched() {
    console.log("name", this.name);
    this.initActionResolveListeners("on");
  }

  initActionResolveListeners(action) {
    const {data: {resolveListeners} = {}} = this;
    if (!resolveListeners || !resolveListeners.length) return;
    resolveListeners.forEach((data = {}) => this.createResolveSubscribe({...data, action}));
  }

  createResolveSubscribe({topic, type, action = "on"} = {}) {
    this.consumer[action]?.(`${topic}:${type}:created`, this.resolveHandler);
  }

  get state() {
    return this._state;
  }

  init() {
    this.setBaseState();
    this.setPromise();
  }

  activate(data = {}) {
    if (!this.data.activatable || [NodeStates.resolved, NodeStates.rejected].includes(this.state)) return;

    Object.entries(data).forEach(([key, value]) => data[key] !== value && (this.data[key] = value));

    this.setPromise();
    this.state = NodeStates.pending;
  }

  deactivate() {
    if (!this.data.activatable || [NodeStates.resolved, NodeStates.rejected].includes(this.state)) return;
    this.state = NodeStates.waiting;
  }

  reset() {
    this.setBaseState();
    this.setPromise();
  }

  setBaseState() {
    this.state = this.data.activatable ? NodeStates.waiting : NodeStates.pending;
  }

  setPromise() {
    this.promise = new Promise((resolve, reject) => {
      this.resolver = resolve;
      this.rejecter = reject;
    });
  }

  get childrenPromise() {
    return Promise.all(this.children.map(child => child.promise));
  }

  addToResolvePull(data) {
    this.send("add-pull", {action: "resolve", data});
  }

  reject(error) {
    this.state = NodeStates.rejected;
    this.rejecter?.(error);
    this.send("reject");
  }

  resolveHandler({topic, type, data}) {
    const {data: {resolveListeners} = {}} = this;
    const event = resolveListeners.find(({topic: eTopic, type: eType}) => `${eTopic}:${eType}` === `${topic}:${type}`);
    if (!event.data) this.solve(...arguments);

    const isValidData = !Object.entries(event.data).some(([key, value]) => data[key] !== value);
    if (!isValidData) return;
    this.solve(...arguments);
  }

  solve(data) {
    if (this._controller.withPull) this.addToResolvePull(data);
    else this.resolve(data);
  }

  resolve(data) {
    this.state = NodeStates.resolved;

    this.resolver?.(data);

    if (this.data.isReusable) {
      this.reuseCounter++;
      this.setBaseState();
      this.setPromise();
    }

    this.send("resolve");
  }

  send(type, data) {
    return this.producer.send({type, data: {node: this, ...data}, topic: "node"});
  }

  onChangeData() {
    this.send("change-data");
  }

  add(node) {
    if (this.children.includes(node)) return;
    node.parent = this;
    this.children.push(node);
  }

  remove(node) {
    if (!this.children.includes(node)) return;
    node.parent = null;
    this.children.splice(this.children.indexOf(node), 1);
  }

  onChange() {
    this.reuseCounter++;
    return this.send("change");
  }
}

export {Node};

export const NodeStates = {
  waiting: "waiting",
  pending: "pending",

  launched: "launched",

  resolved: "resolved",
  rejected: "rejected",
};
