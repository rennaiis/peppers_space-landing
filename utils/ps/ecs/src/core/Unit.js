import {v4 as uuidv4} from "uuid";
import {Entity} from "./Entity";

class Unit {
  /**
   * Общий для всех элементов одного движка хаб событий
   * @type  {EventDispatcher}
   */
  eventBus;

  /**
   * Ссылка на движок юнита
   * @type {Engine}
   * @private
   */
  _engine;

  constructor({eventBus, storage}) {
    this.eventBus = eventBus;
    this.storage = storage;
    this.uuid = uuidv4();
  }

  /**
   * Установка движка при добавлении юнита в движок
   * @param engine
   */
  set engine(engine) {
    this._engine = engine;
  }

  get engine() {
    return this._engine;
  }

  /**
   * Инициализация юнита
   */
  init() {}

  onRemove() {}

  /**
   * Получение списка сущностей по типу
   * @param type
   * @returns {Array<Entity>}
   */
  getEntitiesByType(type) {
    return this._engine.getEntitiesByType(type);
  }

  getFirstEntityByType(type) {
    return this._engine.getEntitiesByType(type)?.list?.[0];
  }

  getFirstEntityOrCreate(type) {
    const {eventBus} = this;
    const entity = this.getFirstEntityByType(type);
    return entity ?? new Entity({eventBus, type}).init();
  }

  getEntityByUUID(type, uuid) {
    if (arguments.length === 1) {
      uuid = type;

      const {entities} = this._engine;

      for (const type in entities) {
        const collection = entities[type];
        const entity = collection.get(uuid);
        if (entity) return entity;
      }
    } else {
      const collection = this.getEntitiesByType(type);
      return collection?.map?.[uuid];
    }
  }

  getComponentByUUID(Class, uuid) {
    return this._engine.getComponentByUUID(Class, uuid);
  }

  getEntitiesByComponent(component) {
    return this._engine.getEntitiesByComponent(component);
  }

  getComponentsByClasses(...classes) {
    const {allComponents} = this;

    return allComponents.filter(component => classes.some(Cls => component instanceof Cls));
  }

  filterEntitiesByClass(...classes) {
    return this._engine.filterEntities(classes);
  }

  /**
   * Получение всех компонентов
   * @returns {T|Collection<Component>}
   */
  get allComponents() {
    return this._engine.allComponents;
  }

  /**
   * Сброс юнита
   */
  reset() {}

  /**
   * Функция конфигурирования юнита
   * @param settings
   */
  configure(settings) {}
}

export {Unit};
