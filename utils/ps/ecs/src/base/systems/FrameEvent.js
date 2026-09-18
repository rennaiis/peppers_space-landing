import {System} from "../../core/System";
import {Entity} from "../../core/Entity";
import {FrameEvents} from "../components/events/FrameEvents";

/**
 * Система для обработки накопленных событий
 * Пример входных данных:
 * {
 *         eventBus, storage,
 *         rules: [
 *           {type: "bonusInv", remove: ["death"]},
 *           {type: "death", remove: ["bonusCoin"]},
 *         ]
 * }
 */
class FrameEvent extends System {
  constructor(data) {
    super(...arguments);

    this.rules = data.rules;
  }

  init() {
    super.init();
    this.eventBus.addEventListener("frame-event:add", this.onAdd.bind(this));
  }

  onAdd({data}) {
    const eFrameEvents = this.checkEvent();
    const cFrameEvents = eFrameEvents.get(FrameEvents);
    cFrameEvents.add(data);
  }

  checkEvent() {
    let eFrameEvents = this.getFirstEntityByType("frame-events");
    if (eFrameEvents) return eFrameEvents;

    eFrameEvents = new Entity({eventBus: this.eventBus, type: "frame-events"}).init();
    const cFrameEvents = new FrameEvents({eventBus: this.eventBus}).init();
    eFrameEvents.add(cFrameEvents);

    return eFrameEvents;
  }

  runEvents() {
    const eFrameEvents = this.getFirstEntityByType("frame-events");
    const cFrameEvents = eFrameEvents.get(FrameEvents);
    const event = cFrameEvents.get();
    if (!event) return;
    event.completed = true;
    this.dispatchEvent(event.type, event.data);
    this.runEvents();
  }

  afterUpdate() {
    const eFrameEvents = this.getFirstEntityByType("frame-events");
    if (!eFrameEvents) return;
    const cFrameEvents = eFrameEvents.get(FrameEvents);
    let {list} = cFrameEvents;
    this.rules.forEach(({type, remove}) => {
      const hasType = list.some(({type: cType}) => cType === type);
      if (hasType) cFrameEvents.list = list = list.filter(({type}) => !remove.includes(type));
    });

    this.runEvents();
    eFrameEvents.destroy();
  }
}

export {FrameEvent};
