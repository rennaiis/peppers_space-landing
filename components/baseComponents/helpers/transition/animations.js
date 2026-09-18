const fadeClipCenter = {
  initial: {
    [`--gameTitle-clip-left`]: "50%",
    [`--gameTitle-clip-right`]: "50%",
  },
  animate: {
    [`--gameTitle-clip-left`]: "100%",
    [`--gameTitle-clip-right`]: "0%",
  },
  exit: {
    [`--gameTitle-clip-left`]: "50%",
    [`--gameTitle-clip-right`]: "50%",
  },
};
const fadeToTop = {
  initial: {
    opacity: 0,
    y: "100%",
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: "100%",
  },
};
const fadeOpacity = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};
const fadeToTop4vh = {
  initial: {
    opacity: 0,
    y: "4vh",
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: "4vh",
  },
};
const fadeToTop20 = {
  initial: {
    opacity: 0,
    y: "20%",
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: "20%",
  },
};
const fadeToBottom = {
  initial: {
    opacity: 0,
    y: "-100%",
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: "-100%",
  },
};
const fadeToRight100 = {
  initial: {
    opacity: 0,
    x: "100%",
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: "100%",
  },
};
const fadeToRight50 = {
  initial: {
    opacity: 0,
    x: "50%",
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: "50%",
  },
};
const fadeToRight30 = {
  initial: {
    opacity: 0,
    x: "30%",
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: "30%",
  },
};
const fadeSimple = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: -0.05,
    },
  },
};
const fadeScale0 = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
  },
  exit: {
    scale: 0,
    opacity: 0,
  },
};
const fadeScale05 = {
  initial: {
    scale: 0.5,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
  },
  exit: {
    scale: 0.5,
    opacity: 0,
  },
};
const fadeScaleY0 = {
  initial: {
    scaleY: 0,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
  },
  exit: {
    scaleY: 0,
    opacity: 0,
  },
};
const fadeScale15 = {
  initial: {
    scale: 1.5,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
  },
  exit: {
    scale: 1.5,
    opacity: 0,
  },
};
const iconRotateHalf = {
  hide: {
    rotate: 0,
  },
  show: {
    rotate: 180,
  },
};

export const settingsAnimationBase = {
  initial: "initial",
  animate: "animate",
  exit: "exit",
};
export const settingsAnimationWhileInView = {
  initial: "initial",
  whileInView: "animate",
  exit: "exit",
};

export const settingsAnimationSwitch = {
  initial: "hide",
  animate: "show",
  exit: "hide",
};

export const settingsAnimationCard = {
  initial: "off",
  animate: "on",
  exit: "off",
};

export const animations = {
  stub: {
    initial: {customAnimationProgress: 0},
    animate: {customAnimationProgress: 1},
    exit: {customAnimationProgress: 0},
  },
  preloader: {...fadeOpacity, initial: {opacity: 1}},
  fadeClipCenter: fadeClipCenter,
  fadeSimple: fadeSimple,
  buttonBase: fadeSimple,
  buttonBaseText: fadeToTop,
  buttonBaseImageBg: fadeScale15,
  buttonBaseImageImg: fadeScale0,
  buttonBaseBorder: fadeScale15,

  gameListItem: {
    initial: fadeToTop.initial,
    animate: {
      ...fadeToTop.animate,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
    exit: {
      ...fadeToTop.exit,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  gameListItemPerson: fadeToRight50,
  gameListItemTitle: fadeToRight30,
  gameListItemScore: fadeToRight30,
  gameListItemLevel: fadeToRight30,
  gameListItemButtons: fadeToRight30,

  gameNavCounter: {
    initial: fadeToBottom.initial,
    animate: {
      ...fadeToBottom.animate,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
    exit: fadeToBottom.exit,
  },
  gameNavCounterImg: fadeScale0,
  gameNavCounterText: fadeToRight100,
  gameNavAbout: fadeScale0,
  gameNavButtons: fadeToTop4vh,
  gameNavHero: fadeToRight50,

  gameInventoryBlock: fadeScale0,
  gameInventoryItems: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.5,
      },
    },
  },
  gameInventoryItem: fadeScale0,

  gameScreenItems: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  gameScreenCounter: fadeToBottom,
  gameScreenTime: fadeToBottom,

  gameMenuItemsItemText: fadeScale0,
  gameMenuItemsList: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.5,
      },
    },
    exit: {
      transition: {
        staggerChildren: -0.1,
      },
    },
  },

  boostersAnimationItems: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.5,
      },
    },
    exit: {
      transition: {
        staggerChildren: -0.1,
      },
    },
  },
  boostersAnimationItem: fadeScale0,

  dropdownList: fadeScaleY0,
  dropdownArrow: iconRotateHalf,
  dropdownText: fadeToTop,
  soundToggleModal: {
    show: {
      x: "0",
    },
    hide: {
      x: "100%",
    },
  },

  siteCustomMenu: {
    show: {
      ...fadeOpacity.animate,
      transition: {
        duration: 0.4,
      },
    },
    hide: {
      ...fadeOpacity.initial,
      transition: {
        duration: 0.3,
        delay: 0.4,
      },
    },
  },
  siteCustomMenuList: {
    show: {
      transition: {
        duration: 0.4,
        staggerChildren: -0.1,
        delayChildren: 0.4,
      },
    },
    hide: {
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
      },
    },
  },
  siteCustomMenuItem: {
    hide: fadeToTop.initial,
    show: fadeToTop.animate,
  },

  siteBurgerTop: {
    show: {
      rotate: 45,
      y: "75%",
    },
    hide: {
      rotate: 0,
      y: 0,
    },
  },
  siteBurgerMiddle: {
    hide: fadeOpacity.animate,
    show: fadeOpacity.initial,
  },
  siteBurgerBottom: {
    show: {
      rotate: -45,
      y: "-75%",
    },
    hide: {
      rotate: 0,
      y: 0,
    },
  },

  siteFormItem: fadeSimple,
  siteFormItemTitle: fadeToTop,
  siteFormItemList: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.05,
      },
    },
    exit: {
      transition: {
        staggerChildren: -0.1,
      },
    },
  },
  siteFormItemType: {
    initial: {
      opacity: 0,
      y: "20%",
    },
    animate: {
      opacity: 1,
      y: 0,
      staggerChildren: 0.05,
    },
    exit: {
      opacity: 0,
      y: "20%",
      staggerChildren: -0.05,
    },
  },
  siteFormItemTypeBlock: fadeOpacity,
  siteFormITemTypeImage: fadeScale05,
  siteFormITemTypeText: fadeToTop20,
  siteFormResult: {
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
    hide: {
      opacity: 0,
      y: "20%",
      transition: {
        duration: 0.4,
      },
    },
  },
  siteFormPointImage: {
    show: {
      opacity: 1,
    },
    hide: {
      opacity: 0,
    },
  },

  siteWhatCard: {
    on: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
    off: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  siteWhatCardTitle: {
    off: {
      color: "#203357",
    },
    on: {
      color: "#ffffff",
      transition: {
        duration: 0.4,
      },
    },
  },
  siteWhatCardIndex: {
    off: {
      color: "#203357",
    },
    on: {
      color: "#FF0000FF",
      transition: {
        duration: 0.4,
      },
    },
  },
  siteWhatItem: {
    on: {
      opacity: 1,
      scale: 1,
    },
    off: {
      opacity: 0,
      scale: 0.5,
    },
  },
};
