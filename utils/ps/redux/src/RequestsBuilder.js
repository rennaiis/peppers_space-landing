import {Builder} from "./Builder";
import {states} from "./constants/constants";

class RequestsBuilder extends Builder {
  _controller;

  constructor({name, initialState, reducers} = {}) {
    initialState = {
      ...initialState,
      requests: {},
      globalStatus: {
        currentRequestId: null,
        state: states.IDLE,
      },
    };

    super({name, initialState, reducers});

    this._controller = {
      middleware: this._middleware,
      fulfilled: this._fulfilled,
      pending: this._pending,
      rejected: this._rejected,
      appendHistory: this._appendHistory,
    };
    this.createSelector("requestData", ({requests: {requests, globalStatus: global}}, name) => ({
      request: requests[`requests/${this.getRequestByName(name)}`],
      global,
    }));
  }

  getRequestByName(name) {
    return name.replace(/^requests\//gi, "");
  }

  /**
   *
   * @param requestName имя запроса
   * @param extraName дополнительное имя для получения в списке thunks
   * @param func асинхронная функция
   * @param onSubmit коллбек при отправке
   * @param saveData коллбек при успешном выполнении
   * @param saveError коллбек при ошибке
   * @param checkGlobal игнорирование отправки при любом выполняющемся запросе
   * @param checkLocal игнорирование отправки при повторной отправке,
   * @param historyPoolSize размер пула истории
   * @returns {RequestsBuilder}
   */
  addRequest({
    requestName,
    extraName = requestName,
    func,
    onSubmit,
    saveData,
    saveError,
    checkGlobal,
    checkLocal,
    historyPoolSize = 0,
  }) {
    const {initialState, name, _controller: controller} = this;
    const fullName = `${name}/${requestName}`;

    initialState.requests[fullName] = this._getRequestBaseState();
    initialState.requests[fullName].historyPoolSize = historyPoolSize;
    initialState.requests[fullName].history = [];

    return this.createExtraReducer({
      thunkName: requestName,
      thunkExtraName: extraName,
      func,
      onSubmit,
      saveData,
      saveError,
      controller,
      checkData: {global: checkGlobal, local: checkLocal, sliceName: name},
    });
  }

  _getRequestBaseState() {
    return {
      currentRequestId: null,
      state: states.IDLE,
      error: null,
    };
  }

  _middleware({
    state,
    sliceName,
    requestId,
    customData: {
      checkData: {global, local},
    },
    thunkName,
  }) {
    const {globalStatus, requests} = state[sliceName];
    const requestData = requests[thunkName];

    if (global && globalStatus.state !== states.IDLE && globalStatus.currentRequestId !== requestId) return true;
    if (local && requestData.state !== states.IDLE && requestData.currentRequestId !== requestId) return true;
  }

  _pending({
    action: {
      meta: {requestId},
    },
    state,
    checkData: {global, local},
    thunkName,
  }) {
    const {globalStatus, requests} = state;
    const requestData = requests[thunkName];

    if (global && globalStatus.state !== states.IDLE) return true;
    if (local && requestData.state !== states.IDLE) return true;
    this.appendHistory(...arguments);

    globalStatus.state = states.PENDING;
    globalStatus.currentRequestId = requestId;
    globalStatus.currentRequestName = thunkName;

    requestData.state = states.PENDING;
    requestData.currentRequestId = requestId;
    globalStatus.currentRequestName = thunkName;

    requestData.error = null;
  }

  _fulfilled({
    action: {
      meta: {requestId},
    },
    state,
    checkData: {global, local},
    thunkName,
    payload,
  }) {
    const {globalStatus, requests} = state;
    const requestData = requests[thunkName];

    if (global && globalStatus.currentRequestId !== requestId) return true;
    if (local && requestData.currentRequestId !== requestId) return true;
    this.appendHistory(...arguments);

    if (globalStatus.currentRequestId === requestId) {
      globalStatus.currentRequestId = null;
      globalStatus.currentRequestName = null;
      globalStatus.state = states.IDLE;
    }

    if (requestData.currentRequestId === requestId) {
      requestData.currentRequestId = null;
      globalStatus.currentRequestName = null;
      requestData.state = states.IDLE;
      requestData.error = null;
    }
  }

  _rejected({
    action: {
      payload,
      error,
      meta: {requestId},
    },
    state,
    checkData: {global, local},
    thunkName,
  }) {
    const {globalStatus, requests} = state;
    const requestData = requests[thunkName];

    if (global && globalStatus.currentRequestId !== requestId) return true;
    if (local && requestData.currentRequestId !== requestId) return true;

    this.appendHistory(...arguments);
    if (globalStatus.currentRequestId === requestId) {
      globalStatus.currentRequestId = null;
      globalStatus.currentRequestName = null;
      globalStatus.state = states.IDLE;
    }

    if (requestData.currentRequestId === requestId) {
      requestData.currentRequestId = null;
      globalStatus.currentRequestName = null;
      requestData.state = states.IDLE;
      requestData.error = payload || error;
    } else return true;
  }

  _appendHistory({action: {payload, error, type, meta: {requestId} = {}} = {}, state, thunkName}) {
    const {requests} = state;
    const requestData = requests[thunkName];

    if (!requestData.historyPoolSize) return; //не нужна история

    if (requestData.history.length >= requestData.historyPoolSize) {
      const targetSpliceCount = 2; //два, потому что можно подписаться на длинну списка
      const spliceCount = Math.max(requestData.historyPoolSize, targetSpliceCount);
      requestData.history.splice(0, spliceCount);
    }

    requestData.history.push({requestId, type, payload, error});
  }
}

export {RequestsBuilder};
