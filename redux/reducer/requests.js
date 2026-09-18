import {RequestsBuilder} from "@PS/redux";

const builder = new RequestsBuilder({
  name: "requests",
  initialState: {},
  reducers: {
    clearError(state, {payload: {field, requestName} = {}}) {
      if (!field) return;
      requestName = builder.getRequestByName(requestName);

      const requestData = state.requests[`requests/${requestName}`];
      if (!requestData?.error?.fields?.[field]) return;

      delete requestData.error.fields[field];

      if (!Object.keys(requestData.error.fields).length) requestData.error = null;
    },
  },
});
// .addRequest({
//   requestName: "user/login",
//   extraName: "login",
//   checkLocal: true,
//   func: login,
// })
builder.create();

const requests = builder.export();

export default requests;

/**
 * Хук для получения статуса запроса.
 * @param requestName [String] `request/${requestName}`
 * @returns requestData [{local:{currentRequestId, error, state}, global:{currentRequestId, error, state}}]
 */
export const {useRequests, useRequestData} = requests.selectors;
