import {v4 as uuidv4} from "uuid";
import {Entity} from "./Entity";
import {Collection} from "../base/components/data/Collection";
import {State} from "../base/components/state/State";
import {EventComponent} from "../base/components/events/EventComponent";
import {Unit} from "./Unit";
import {upperFirst} from "lodash";

class System extends Unit {
  /**
   * Порядковый номер для сортировки обновления систем
   * @type {number}
   */
  updateOrder = 0;

  constructor() {
    super(...arguments);

    this.uuid = uuidv4();

    this.eventBus.addEventListener("state-adapter:state-changed", this.onStateChanged.bind(this));
    this.eventBus.addEventListener("state-adapter:state-change", this.onStateChange.bind(this));
  }

  onStateChanged({data: {state}}) {
    this[`${state}Select`]?.();
  }

  onStateChange({data: {state}}) {
    const game = this.getFirstEntityByType("game");
    if (!game) return;
    const stateComponent = game.get(State);
    stateComponent.state = state;
    this[`before${upperFirst(state)}Select`]?.();
  }

  /**
   * Инициализация системы
   */
  init() {
    super.init();
  }

  onRemove() {
    super.onRemove();
  }

  /**
   * Добавление очищаемого действия в систему
   * @param entity
   * @param effect
   * @param name
   * @param args
   * @param context
   */
  addSideEffect({entity, effect, name = uuidv4(), args = [], context = this}) {
    const collection = entity.getList(Collection)?.find(({group}) => group === "side-effects");
    if (!collection) return console.error("'side-effects' collection not found");
    const prevEffect = collection.list.find(effect => effect.name === name);
    if (prevEffect) {
      prevEffect.cleanFunction?.();
      collection.list.splice(collection.list.indexOf(prevEffect), 1);
    }

    const cleanFunction = effect.apply(context, args);
    collection.list.push({
      name,
      cleanFunction,
      effect,
      args,
    });
  }

  destroyEntitiesByTypes({types}) {
    return types.forEach(type => [...this.getEntitiesByType(type)?.list]?.forEach(entity => entity.destroy()));
  }

  /** Хелпер для добавление компонента в сущность
   *
   * @param entity {Entity}
   * @param ComponentClass {Class<Component>}
   * @param settings {any}- настройки компонента
   * @param condition - условие добавления компонента
   * @returns {Component|null}
   */
  addComponentToEntity(entity, ComponentClass, settings = {}, condition = true) {
    if (!condition) return null;
    const component = new ComponentClass(settings).init();
    entity.add(component);
    return component;
  }

  /** Хелрер для массовое добавление компонентов в сущность
   *
   * @param entity {Entity}
   * @param components {Array<{ComponentClass: Class<Component, settings: any}>} - массив настроек компонентов
   * @param isInit  - инициализация сущности
   * @returns  {Entity}
   */
  addComponentsToEntity(entity, components, isInit = true) {
    components.forEach(({class: ComponentClass, settings, condition = true}) => {
      this.addComponentToEntity(entity, ComponentClass, settings, condition);
    });
    if (isInit) entity.init(); // инициализация сущности

    return entity;
  }

  /**
   * Ленивое обновление системы
   * @param {{deltaTime: number, totalTime: number}} data
   */
  lazyUpdate(data) {}

  /**
   * Обновление системы
   * @param {{deltaTime: number, totalTime: number}} data
   */
  update(data) {}

  /**
   * Сброс системы
   */
  reset() {}

  /**
   * Функция конфигурирования систем
   * @param settings
   */
  configure(settings) {}

  dispatchEvent(type, data) {
    const event = new Entity({eventBus: this.eventBus, type: "ecs-event", data});
    event.add(new EventComponent({eventBus: this.eventBus, type, data}));
    event.init();

    this.eventBus.dispatchEvent({type, data});
    return event;
  }

  clearEvents() {
    return this.getEntitiesByType("ecs-event")?.list.forEach(entity => entity.destroy());
  }

  getEvents(type) {
    return this.getEntitiesByType("ecs-event")
      ?.list.map(v => v.get(EventComponent))
      .filter(v => v.type === type);
  }

  getAsset(entity, name, props = {}, isFactoryCls) {
    return this.getEventResult("get-asset", {name, entity, isFactoryCls, ...props});
  }

  getEventResult(type, props = {}) {
    const {eventBus} = this;

    const event = {type, data: {...props, result: null}};
    eventBus.dispatchEvent(event);
    return event.data.result;
  }

  isEvent(type) {
    return this.getEvents(type)?.length > 0;
  }
}

export {System};
