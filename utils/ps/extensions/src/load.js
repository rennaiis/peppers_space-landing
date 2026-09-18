/**
 * Динамически загружает модуль и сохраняет его в объекте (this).
 *
 * Используется для lazy-loading модулей на стороне клиента, модуль НЕ БУДЕТ в изначальном бандле
 *
 * @template T
 * @param {string} name Имя свойства, под которым модуль будет доступен.
 * @param {() => Promise<T>} promise Функция, возвращающая промис с модулем (обычно import()).
 * @returns {Promise<void>} Модуль будет доступен как this[name](PS[name]) после выполнения.
 *
 * @example
 * import {useEffect} from "react";
 * import PS from "@PS";
 *
 * export default function Test() {
 *   useEffect(() => {
 *     (async () => {
 *       await PS.extensions.load("phaser", () => import("@/utils/ps/phaser"));
 *     })();
 *   }, []);
 * }
 */
async function load(name, promise, retryDelay = 500) {
  if (this[name]) return this[name];

  try {
    this[name] = await promise();
  } catch (e) {
    console.error(`Load failed for ${name}, retrying`, e);
    await new Promise(res => setTimeout(res, retryDelay));
    return load.call(this, name, promise, retryDelay);
  }

  global[name] ??= this[name];

  return this[name];
}

export {load};
