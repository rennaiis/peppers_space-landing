import React, {useEffect, useMemo, useRef} from "react";
import * as PropTypes from "prop-types";
import useErrorHandler from "@/hooks/useErrorHandler";
import {AnimatePresence} from "framer-motion";
import cm from "../../gui/customModal/CustomModal.module.scss";
import ml from "../../../../components/layouts/MainLayout.module.scss";

export default function ModalController({Context, value, modals}) {
  const scrollTop = useRef(null);
  const isModals = modals.length > 0;
  useErrorHandler();
  /**
   * добавление класса scroll-disabler на body
   */
  useEffect(() => {
    const DISABLER = ml.scrollDisabler;
    const {body, scrollingElement, documentElement} = document;
    const _scrollingElement = scrollingElement || documentElement;

    if (!isModals) {
      if (!body.classList.contains(DISABLER)) return;

      body.classList.remove(DISABLER);
      body.style.removeProperty("top");

      _scrollingElement.scrollTop = scrollTop.current;
    } else {
      const scrollTopValue = _scrollingElement.scrollTop;
      scrollTop.current = scrollTopValue;

      body.classList.add(DISABLER);
      body.style.top = `-${scrollTopValue}px`;
    }
  }, [isModals]);

  return (
    <AnimatePresence>
      {modals.map(item => (
        <ModalInstance Context={Context} value={value} info={item} key={`modal-${item.id}`} />
      ))}
    </AnimatePresence>
  );
}

ModalController.propTypes = {
  Context: PropTypes.object,
  value: PropTypes.object,
  modals: PropTypes.array,
};

const ModalInstance = React.memo(function ModalInstance({Context, value, info}) {
  const [modal, contextValue] = useMemo(() => {
    const {modal, ...ext} = info;
    return [modal, {...value, ...ext}];
  }, [value, info]);

  return (
    <div className={cm.customModal}>
      <Context.Provider value={contextValue}>{modal}</Context.Provider>
    </div>
  );
});
