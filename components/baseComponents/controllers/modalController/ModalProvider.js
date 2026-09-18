import React, {useEffect} from "react";
import * as PropTypes from "prop-types";
import ModalController from "./modalController";
import {useModalValue} from "@/hooks/useModal";
import {baseProducer} from "@PS/core";

export const ModalContext = React.createContext([]);

export default function ModalProvider({children, aliases}) {
  const [modals, value] = useModalValue(aliases);

  useEffect(() => {
    const consumer = baseProducer.getConsumer();

    function create({data: modal}) {
      const eventsData = modal.props?.eventsData ?? modal.eventsData ?? modal.payload;
      value?.addModal?.({...modal, props: {...(modal.props || {}), eventsData}});
    }

    function remove({data}) {
      let closeProps = data;

      //формированые данных для определения удаляемых модальников по "ключ=значение" из closeProps
      if (typeof data === "object") {
        const {id, type, filterProps = {}} = data;
        closeProps = {
          ...filterProps,
          id,
          type,
        };
      }

      for (let key in closeProps) {
        if (closeProps[key] === undefined) delete closeProps[key];
      }

      value?.closeModal?.(closeProps);
    }

    consumer.on("modal:open:created", create);
    consumer.on("modal:close:created", remove);

    return () => {
      consumer.off("modal:open:created", create);
      consumer.off("modal:close:created", remove);
    };
  }, [value]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      <ModalController Context={ModalContext} value={value} modals={modals} />
    </ModalContext.Provider>
  );
}

ModalProvider.propTypes = {
  children: PropTypes.node,
  aliases: PropTypes.objectOf(
    PropTypes.shape({
      Modal: PropTypes.elementType.isRequired,
      props: PropTypes.object,
    }),
  ),
};
