import {useEffect, useMemo} from "react";
import {baseProducer} from "@PS/core";

/**
 * example
 *   useRequestsHandlerData([{
 *     request: "requests/application/start",
 *     fulfilled: () => {
 *
 *     },
 *     rejected: () => {
 *
 *     }
 *   }]);
 */

const statuses = ["pending", "fulfilled", "rejected"];

export const useRequestsHandlerData = requestConfigs => {
  const requestHandleLogic = useMemo(
    () => ({
      pending: async ({data}, config) => {
        await config.pending?.(data);
      },
      fulfilled: async ({data}, config) => {
        await config.fulfilled?.(data);
        config.settled?.();
      },
      rejected: async ({data}, config) => {
        await config.rejected?.(data);
        config.settled?.();
      },
    }),
    [],
  );

  useEffect(() => {
    const consumer = baseProducer.getConsumer();
    requestConfigs.forEach(config => {
      statuses.forEach(status => {
        const request = `${config.request}/${status}`;
        consumer.subscribe({
          topic: "redux",
          type: request,
          context: withConfig(requestHandleLogic, config),
          callback: status,
        });
      });
    });
    return () => consumer.destroy();
  }, []);
};

function withConfig(logic, config) {
  return Object.fromEntries(Object.entries(logic).map(([key, fn]) => [key, payload => fn(payload, config)]));
}
