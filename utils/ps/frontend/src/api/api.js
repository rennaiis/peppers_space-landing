import axios from "axios";
import md5 from "md5";
import {ApiError} from "./ApiError";

const now = 111; // Date.now();

const prefix = initApiPrefix();

function initApiPrefix() {
  let origin = process.env.API_HOST || "";
  return `${origin}/api`;
}

function isAbsolute(str) {
  return /^(\w+:)?\/\//.test(str);
}

/**
 * @param {string} method
 * @param {string} base
 * @return {boolean}
 */
function hasPrefix(method, base) {
  return base && method.startsWith(base);
}

function getURL(method, params) {
  const base = params?.prefix || prefix;
  if (isAbsolute(method) || hasPrefix(method, base)) {
    return method;
  }

  return `${base}${method}`;
}

function initMethod(method) {
  return (apiMethod, data = {}, props) => {
    const headers = {...props?.headers};
    if (props?.generateIdempotencyKey) {
      const idempotencyKey = getIdempotencyKey(data);
      if (idempotencyKey) headers["Idempotency-Key"] = idempotencyKey;
    }
    return send({method, headers, apiMethod, data, ...props});
  };
}

function getIdempotencyKey(data) {
  if (!data) return;

  const prefix = `${now}${navigator.userAgent}`;

  if (data instanceof FormData) {
    let str = "";

    for (let pair of data.entries()) {
      const value = pair[1];

      if (!value) return;

      if (value instanceof File) str += String("" + value.size + value.name);
      else if (typeof value === "object") str += JSON.stringify(value);
      else str += String(value);
    }
    return md5(prefix + str);
  } else if (typeof data === "object") return md5(prefix + JSON.stringify(data));
  else return md5(prefix + String(data));
}

let globalHeaders = {};
function addHeaders(_headers) {
  Object.keys(_headers).forEach(key => {
    if (key === false) {
      delete globalHeaders[key];
    } else {
      globalHeaders[key] = _headers[key];
    }
  });
}

const get = initMethod("get");
const post = initMethod("post");
const put = initMethod("put");

function send({apiMethod, data, json, ...params}) {
  let body;
  let headers = {};
  if (json) {
    body = data;
    headers["Content-Type"] = "application/json";
  } else if (data) {
    body = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      body.append(key, typeof value === "object" ? JSON.stringify(value) : value);
    });
  }
  const key = params.method === "get" ? "params" : "data";
  return axios({
    ...params,
    [key]: body,
    headers: {
      ...globalHeaders,
      ...params?.headers,
      ...headers,
    },
    url: getURL(apiMethod, params),
  }).then(onSuccess, onFail);
}

/**
 *
 * @param {{data, status, statusText, headers, config}} response
 * @return {*}
 */
function onSuccess(response) {
  const {data} = response;
  if (ApiError.isError(data)) {
    throw ApiError.fromApiResponse(data);
  }
  return data;
}

function onFail(error) {
  if (error.response && typeof error.response.data === "object") {
    throw ApiError.fromApiResponse(error.response.data);
  } else if (error.request) {
    throw ApiError.fromHttpError(error.request);
  } else {
    throw new ApiError({});
  }
}

export {addHeaders, get, post, put, send};
