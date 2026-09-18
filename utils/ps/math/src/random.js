/* eslint-disable */
/**
 * возвращает случайное число >= min и < max
 * @param {number?} min
 * @param {number} max
 * @return {number}
 */
function rand(min, max) {
  if (arguments.length === 1) {
    max = min;
    min = 0;
  }
  // return min + Math.random() * (max - min);
  return mix(min, max, Math.random());
}

function getRandomFromRange(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

function getRandomFromArray(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function getRandomFromList(list) {
  return list[getRandomIntFromRange(0, list.length - 1)];
}

function getRandomIntFromRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chance(number) {
  return Math.random() <= number;
}

/**
 * возвращает случайное целое число >= min и < max
 * @param {number?} min
 * @param {number} max
 * @return {number}
 */
function randInteger(min, max) {
  return rand.apply(this, arguments) | 0;
}

function randomFromList(list) {
  return list[randInteger(0, list.length - 1)];
}

function randomBoolean() {
  return Math.random() < 0.5;
}

/**
 * Возвращает случайный элемент массива
 * @param {Array} arr
 * @return {*}
 */
function randFromArray(arr) {
  return arr[randInteger(arr.length)];
}

/**
 * Возвращает случайный элемент взвешенного массива, у каждого элемента должен быть параметр `weight`
 * вероятность выпадения конкретного элемента равен его весу разделенному на общий вес всех элементов
 * @param {{weight:number}[]} arr
 * @return {*}
 */
function randFromWeightedArray(arr) {
  const {total, map} = arr.reduce(initWeights, {total: 0, map: []});

  if (total === 0) {
    return randFromArray(arr);
  }

  const r = rand(total);
  let i = 0;
  while (r >= map[i]) {
    i++;
  }
  return arr[i];

  function initWeights(res, {weight}) {
    res.map.push((res.total += weight));
    return res;
  }
}

/**
 * Переставляет элементы массива в случайном порядке
 * @param {Array} arr
 * @return {Array}
 */
function shuffleArray(arr) {
  const src = [...arr];
  const dst = [];
  while (src.length) {
    dst.push(src.splice(randInteger(src.length), 1)[0]);
  }
  return dst;
}

function sign(val) {
  return val < 0 ? -1 : val > 0 ? 1 : 0;
}

function randSign() {
  return -1 + 2 * ((Math.random() * 2) | 0);
}

/**
 * Находит число между `v1` и `v2`
 * @param v1 {number}
 * @param v2 {number}
 * @param val {number}
 * @return {*}
 */
function mix(v1, v2, val) {
  return v1 + (v2 - v1) * val;
}

function mixObject(v1, v2, val, props) {
  (props || Object.keys(v1)).forEach(key => {
    v1[key] = mix(v1[key], v2[key], val);
  });
  return v1;
}

export {
  getRandomFromRange,
  getRandomFromArray,
  getRandomFromList,
  getRandomIntFromRange,
  rand,
  chance,
  randInteger,
  randomFromList,
  randomBoolean,
  randFromArray,
  randFromWeightedArray,
  randSign,
  shuffleArray,
  sign,
  mixObject,
  mix,
};
