import {isArray} from "lodash";

const ON_OFF_MODE = {
  postfix: "",
  actionAdd: "on",
  actionRemove: "off",
};

function eventSubscription({
  target = global,
  callbacksBus = [],
  postfix = "EventListener",
  actionAdd = "add",
  actionRemove = "remove",
}) {
  const listenerLogic = action => {
    callbacksBus.forEach(({event, callback, options, target: localTarget}) => {
      if (!event) return;

      const totalTarget = localTarget ?? target;
      const eventsArray = isArray(event) ? event : [event];
      const targetsArray = isArray(totalTarget) ? totalTarget : [totalTarget];

      eventsArray.forEach(event => {
        targetsArray.forEach(target => {
          target?.[`${action}${postfix}`]?.(event, callback, options);
        });
      });
    });
  };

  listenerLogic(actionAdd);

  return () => listenerLogic(actionRemove);
}

const preventEvent = (e, callback) => {
  e.preventDefault();
  e.stopPropagation();
  callback(e);
};

export {ON_OFF_MODE, eventSubscription, preventEvent};
