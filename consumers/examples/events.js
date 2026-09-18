const events = [
  {
    topic: "redux",
    type: "action",
    data: {
      name: "requestState",
      payload: "tasks",
    },
  },
  {
    topic: "redux",
    type: "thunk",
    data: {
      name: "profile",
    },
  },
  {
    topic: "modal",
    type: "open",
    data: {
      type: "infoModal",
      // props: {
      //   ...infoModalContent,
      //   onClose(id){
      //     baseProducer.send({topic: "modal", type: "close", data: {id}})
      //   }
      // }
    },
  },
  {
    topic: "callbacks",
    type: "call",
    data: {
      name: "goToPrizes",
    },
  },
  {
    topic: "analytics",
    type: "send",
    data: {
      name: "buttonClick",
      payload: {
        name: "clicked",
      },
    },
  },
  {
    topic: "modal",
    type: "close",
    data: {id: "current"}, //или id модального окна
  },
  {
    topic: "tutorial",
    type: "next",
  },
];
