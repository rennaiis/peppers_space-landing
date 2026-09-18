function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function pluralize(count, one, two, five) {
  const n = Math.floor(Math.abs(count)) % 100;

  if (n >= 11 && n <= 19) return five;

  const n1 = n % 10;
  if (n1 === 1) return one;
  if (n1 >= 2 && n1 <= 4) return two;
  return five;
}

function interpolateString(template, data) {
  const placeholderRegex = /\{\{([^}]+)}}/g;
  return template?.replace(placeholderRegex, (match, key) => {
    const trimmedKey = key.trim();
    const value = trimmedKey.split(".").reduce((res, key) => res?.[key], data);
    if (value === null) return "";

    if (Array.isArray(value) && value.length) {
      return JSON.stringify(value);
    }
    return String(value);
  });
}

function timeToString(time) {
  const secondsTotal = Math.floor(time / 1000);
  const minutes = Math.floor(secondsTotal / 60);
  const seconds = secondsTotal % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function msToTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");
}

function msToHHMMSS(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

const M = {
  nom: [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ],
  gen: [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ],
};

function fix(val, len = 2) {
  return val.toString().padStart(len, "0");
}

/**
 * @param {number} ms - метка времени
 * @param {string} format - формат, как в php (https://www.php.net/manual/ru/datetime.format.php#refsect1-datetime.format-parameters)
 * @return {string}
 */
function time(ms, format) {
  const d = new Date(ms);
  const f = {
    DD: () => fix(d.getDate()),
    d: () => d.getDate(),
    MM: () => fix(d.getMonth() + 1),
    M: () => M.gen[d.getMonth()],
    m: () => d.getMonth() + 1,
    YYYY: () => d.getFullYear(),
    yy: () => d.getFullYear().toString().substr(-2),
    HH: () => fix(d.getHours()),
    ii: () => fix(d.getMinutes()),
    i: () => d.getMinutes(),
    ss: () => fix(d.getSeconds()),
    s: () => d.getSeconds(),
    vv: () => fix(d.getMilliseconds(), 3),
    v: () => d.getMilliseconds(),
  };
  return format.replace(/(DD|d|MM|M|m|YYYY|yy|HH|ii|i|ss|s|vv|v)/g, ($0, $1) => f[$1]());
}

export {capitalize, pluralize, interpolateString, timeToString, msToTime, msToHHMMSS, time};
