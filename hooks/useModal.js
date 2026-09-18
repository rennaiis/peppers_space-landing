import React, {useCallback, useContext, useMemo, useState} from "react";
import {ModalContext} from "@/components/baseComponents/controllers/modalController/ModalProvider";
import {baseProducer, getId} from "@PS/core";
import {cssTransitionTimeIn, cssTransitionTimeOut} from "@/constants/modals";

export function useModal() {
  return useContext(ModalContext);
}

function useAddModal(setModals, aliases) {
  return useCallback(
    modal => {
      const info = {
        id: getId(),
        nodeName: modal?.nodeName,
        notify: {
          onOpen: modal.notify?.onOpen,
          onClose: modal.notify?.onClose,
        },
        timeout: modal?.timeout || {
          enter: cssTransitionTimeIn,
          exit: cssTransitionTimeOut,
        },
      };

      if (!React.isValidElement(modal)) {
        info.type = typeof modal === "string" ? modal : modal.type;
        if (!aliases[info.type]) return false;

        const {Modal, props} = aliases[info.type];
        modal = React.createElement(Modal, Object.assign({modal: info}, props, modal.props, modal?.timeout));
      }

      const item = {...info, modal};
      info.notify.onOpen?.();
      setModals(v => [...v, item]);
      return {...info};
    },
    [setModals, aliases],
  );
}

export const isType = (id, type) => id === type || id?.type === type || id?.[type] === true;
export const isAll = id => isType(id, "all");

const makeFilter = id => {
  if (!id) return () => false;
  if (["string", "number"].indexOf(typeof id) >= 0) id = {id};
  const entries = Object.entries(id);
  return m => !entries.every(([key, value]) => m[key] === value);
};

const sendCloseEvent = (modals, id) => {
  const list = Number.isInteger(id) ? modals.filter(m => m?.id === id) : modals;

  list.forEach(m => {
    m.notify?.onClose?.();

    const {nodeName, timeout} = m || {};
    if (nodeName)
      setTimeout(
        () =>
          baseProducer.send({
            topic: "modal",
            type: "closed",
            data: {name: nodeName},
          }),
        (timeout?.exit ?? 0) * 500,
      );
  });
};

function useCloseModal(setModals) {
  return useCallback(
    id => {
      if (isAll(id)) {
        setModals(prev => {
          sendCloseEvent(prev);
          return [];
        });
      } else {
        const filterFunction = makeFilter(id);
        setModals(v => {
          const filteredModals = v.filter(filterFunction);
          const closedModals = v.filter(m => !filterFunction(m));
          sendCloseEvent(closedModals, id);
          return filteredModals;
        });
      }
    },
    [setModals],
  );
}

export function useModalValue(aliases) {
  const [modals, setModals] = useState([]);
  const addModal = useAddModal(setModals, aliases);
  const closeModal = useCloseModal(setModals);
  return [modals, useMemo(() => ({addModal, modals, closeModal}), [addModal, modals, closeModal])];
}
