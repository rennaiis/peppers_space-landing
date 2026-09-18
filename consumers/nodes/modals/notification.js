import {ModalNode} from "@PS/core";

export default {
  cls: ModalNode,
  name: "notification",
  data: {
    getModalContext() {
      return {
        type: "infoModal",
        props: {text: "Зайди в рейтинг, чтобы узнать свой приз"},
      };
    },
    isEnable(context) {
      const {state} = this.collectContext(context, {
        state: "application.state",
      });
      return state === "main";
    },
  },
};
