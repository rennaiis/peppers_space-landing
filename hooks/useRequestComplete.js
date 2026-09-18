import {useCallback, useEffect} from "react";
import {useRequestData} from "../redux/reducer/requests";
import React from "react";

///////////////////EXAMPLE/////////////////////

// const {startListen, endListen} = useRequestComplete("user/complete-task", {
//     onFulfilled() {
//       endListen();
//       addModal({type: "resultModal", props: resultModalContent.SUCCESS});
//     },
//     onError(data) {
//       endListen();
//       addModal({type: "resultModal", props: resultModalContent.ERROR});
//     }
//   })

/**
 * Создает специальный перехватчик, который прослушивает определенный запрос
 * и запускает обратные вызовы в зависимости от статуса запроса.
 *
 * @param {string} requestName - Имя запроса, который слушаем
 * @param {Object} options - Объект параметров, содержащий колбэки
 * @param {Function} options.onFulfilled - Callback function to fulfilled request
 * @param {Function} options.onRejected - Callback function to rejected request
 * @param {Function} options.onPending - Callback function to pending request
 * @return {Object} Вернет функции, чтобы начать слушать запрос и закончить слушать его
 */
export default function useRequestComplete(requestName, {onFulfilled, onRejected, onPending}) {
  const [isListening, setListening] = React.useState(false);
  const {request} = useRequestData(requestName);

  const startListen = useCallback(() => setListening(true), []);
  const endListen = useCallback(() => setListening(false), []);

  useEffect(() => {
    if (!isListening) return;
    const item = request.history?.[request.history.length - 1];

    if (item?.type.includes("fulfilled")) {
      onFulfilled?.(item);
    } else if (item?.type.includes("rejected")) onRejected?.(item);
    else if (item?.type.includes("pending")) onPending?.(item);
  }, [request.history?.length]);

  return {
    startListen,
    endListen,
  };
}
