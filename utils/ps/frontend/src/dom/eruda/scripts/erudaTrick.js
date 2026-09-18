export default async function () {
  function logger() {
    return;
    console.log("erudaTrickScript", ...arguments);
  }

  function __erudaToDisplayListenElement(htmlElement) {
    /*
        Это скрипт, который содержит функцию, в нее можно передать htmlElement, на который будут повешены слушатели.

        Нужно будет повторить такой СЦЕНАРИЙ:
        1. сделать первый клик по htmlElement (для включения интерактивности)
        2. зажимать htmlElement в течение 5 секунд, после чего будет вибрация
        3. быстро кликнуть 20 раз по htmlElement, и только тогда будет !!показана eruda!!

        Использование:
          const ref = useRef();
          useEffect(() => window.__erudaToDisplayListenElement?.(ref.current), []);
    */

    htmlElement.style.pointerEvents = "auto";
    htmlElement.style.zIndex = 1000;

    let holdingDone = false,
      holdingStart,
      prevClickTime,
      holdingApplyTime = performance.now(),
      timeoutID;
    let clickCount = 0;

    const requiredHoldTime = 3000; // 5 секунд
    const requiredClickCount = 20;
    const requiredClickDelay = 300;

    logger(`__erudaToDisplayListenElement`, htmlElement);
    logger(`requiredClickCount`, requiredClickCount);
    logger(`requiredHoldTime`, requiredHoldTime);
    logger(`started`, requiredHoldTime);

    // Функция для начала удержания
    function startHold(event) {
      if (holdingDone) return handleClick(event);
      logger(`startHold`, event);
      event.stopPropagation();
      event.preventDefault();

      holdingStart = performance.now();

      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        logger(`holdingApplyTime is out`);
        if ("vibrate" in navigator) navigator.vibrate(1000);
      }, requiredHoldTime);
    }

    // Функция для отмены удержания
    function cancelHold(event) {
      clearTimeout(timeoutID);
      event.stopPropagation();
      event.preventDefault();

      const delta = performance.now() - holdingStart;

      if (delta > requiredHoldTime && !holdingDone) {
        holdingDone = true;
        holdingApplyTime = performance.now();
      }
    }

    function removeListeners() {
      htmlElement.removeEventListener("mousedown", startHold, true);
      htmlElement.removeEventListener("mouseup", cancelHold, true);
      htmlElement.removeEventListener("click", handleClick, true);

      htmlElement.removeEventListener("touchstart", startHold, true);
      htmlElement.removeEventListener("touchend", cancelHold, true);
    }

    // Обработчик кликов
    function handleClick(event) {
      clearTimeout(timeoutID);
      logger(`handleClick`);
      // Останавливаем всплытие
      event.stopPropagation();
      event.preventDefault();

      if (!holdingDone || performance.now() - holdingApplyTime < requiredClickDelay) return;

      if (performance.now() - prevClickTime > requiredClickDelay) {
        logger(`clickCount reset`);
        clickCount = 0;
        holdingDone = false; //сбросить сценарий к началу
        prevClickTime = null;
        return;
      }

      prevClickTime = performance.now();
      clickCount++;

      logger(`clickCount`, `${clickCount} из ${requiredClickCount}`);

      if (clickCount >= requiredClickCount) {
        logger(`success`);

        const erudaBtn = document.querySelector("#eruda");
        erudaBtn.style.display = "block";
        removeListeners();
      }
    }

    // Назначаем обработчики событий для мыши
    htmlElement.addEventListener("mousedown", startHold, true);
    htmlElement.addEventListener("mouseup", cancelHold, true);
    htmlElement.addEventListener("click", handleClick, true);

    // Назначаем обработчики событий для сенсорных устройств
    htmlElement.addEventListener("touchstart", startHold, true);
    htmlElement.addEventListener("touchend", cancelHold, true);

    return removeListeners;
  }

  window.__erudaToDisplayListenElement = __erudaToDisplayListenElement;

  document.addEventListener("DOMContentLoaded", function () {
    eruda.init({
      tool: ["console", "elements", "network", "resources", "sources", "info", "snippets"],
      console: {
        // Console-specific settings
        // Example: change the default level of logs
        level: "log", // 'log', 'info', 'warn', 'error'
      },
    });
    const erudaBtn = document.querySelector("#eruda");
    if (!erudaBtn) return console.warn(`Can't find #eruda button`);
    erudaBtn.style.display = "none";
  });
}
