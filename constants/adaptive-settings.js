export const DESK_B = 1366;
export const DESK_M = 1280;
export const NOT_MOB = 1025;
export const TABLET_W = 768;

export const IPHONE_6_SIZE = {
  width: 375,
  height: 668,
};

export const MACBOOK_SIZE = {
  width: 1280,
  height: 720,
};

export const CLASSES = {
  "landscape"({isDesktop, width}) {
    return isDesktop && width > NOT_MOB;
  },
  "landscape-mob"({isMobile, width}) {
    return isMobile && width <= NOT_MOB;
  },
  "portrait"({isDesktop, width}) {
    return !isDesktop && width > NOT_MOB;
  },
  "portrait-mob"({isMobile, width}) {
    return !isMobile && width <= NOT_MOB;
  },
};

export function onResize() {
  const {innerWidth: width, innerHeight: height} = window;

  const {style, classList} = document.getElementById("html-point");
  style.setProperty("--app-width", `${width}px`);
  style.setProperty("--app-height", `${height}px`);

  Object.entries(CLASSES).forEach(([className, check]) =>
    classList.toggle(className, check({width, height, ...getRules({width, height})})),
  );
}

export function getRules({width, height}) {
  const ratio = width / height;

  return {
    isDesktop:  ratio > MACBOOK_SIZE.width / MACBOOK_SIZE.height,
    isMobile: ratio > IPHONE_6_SIZE.width / IPHONE_6_SIZE.height,
    ratio,
  };
}
