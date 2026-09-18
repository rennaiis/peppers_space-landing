function promiseWithResolvers() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    // Executed synchronously!
    resolve = res;
    reject = rej;
  });
  return {promise, resolve, reject};
}

export {promiseWithResolvers};
