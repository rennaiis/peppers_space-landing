import {copy} from "@PS/frontend";

export default function buildSendData(eventsData, data) {
  // 1. data в приоритете
  if (data !== undefined) {
    // 2. оба объекта → мержим
    if (isPlainObject(data) && isPlainObject(eventsData)) {
      const payload = copy(data.payload ?? eventsData.payload ?? eventsData);
      return {...eventsData, ...data, payload};
    }

    // 3. data есть, но не объект → отправляем как есть
    return data;
  }

  // 4. data нет, но есть eventsData
  return eventsData;
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
