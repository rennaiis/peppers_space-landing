import {useDisplayedErrors} from "../redux/reducer/errorHandlerReducer";
import {useEffect, useState} from "react";
import {useModal} from "./useModal";
import useDeepCompareEffect from "use-deep-compare-effect";
import {useDispatch} from "react-redux";

export default function useErrorHandler() {
  const [currentDisplayed, setCurrentDisplayed] = useState(null);
  const {displayErrors} = useDisplayedErrors();
  const {addModal, closeModal} = useModal();
  const dispatch = useDispatch();

  useDeepCompareEffect(() => {
    if (!displayErrors) return;
    setCurrentDisplayed(displayErrors[0]);
  }, [displayErrors]);

  useEffect(() => {
    if (!currentDisplayed) return;

    const {id} = addModal({
      type: "errorHandlerModal",
      props: {
        error: currentDisplayed,
        onClose: id => {
          location.reload();
          // closeModal(id);
          // dispatch(errorHandler.actions.onShowError(currentDisplayed))
        },
      },
    });
    return () => closeModal(id);
  }, [currentDisplayed]);
}
