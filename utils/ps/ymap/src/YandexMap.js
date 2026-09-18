class YandexMap {
  map = null;
  container = null;
  mapData = null;
  mapInit = false;

  constructor() {
    this.createMapContainer();
  }

  createMapContainer() {
    this.container = document.createElement("div");
    document.body.appendChild(this.container);
    this.container.className = "yandex-map-container__hide";
  }

  create(data) {
    this.mapData = data;
    if (!data?.mapKey) return console.error(`YandexMap: mapKey is not defined`);
    this.YANDEX_MAPS_SCRIPT_URL = `https://api-maps.yandex.ru/v3/?apikey=${data?.mapKey}&lang=ru_RU`;
    const existingScript = document.querySelector(`script[src="${this.YANDEX_MAPS_SCRIPT_URL}"]`);
    existingScript ? this.initMap() : this.loadScript();
  }

  loadScript() {
    const script = document.createElement("script");
    script.src = this.YANDEX_MAPS_SCRIPT_URL;
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => this.initMap();
  }

  async initMap() {
    if (!this.mapData) return console.warn(`YandexMap: mapData is not defined`);
    if (this.map) return console.warn(`YandexMap: map already created`);

    const {settings, customization, featuresLayerProps, limitBounds, onMapInAction} = this.mapData;

    await ymaps3.ready;

    const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapListener} = ymaps3;

    const map = (this.map = new YMap(this.container, {...settings}));
    const customLayer = new YMapDefaultSchemeLayer({customization});
    map.addChild(customLayer);

    featuresLayerProps && map.addChild(new YMapDefaultFeaturesLayer(featuresLayerProps));

    limitBounds && this.setBounds(limitBounds);

    this.onMapInActionCallback = onMapInAction;

    const layerListener = new YMapListener({
      layer: "any",
      onStateChanged: this.onStateChanged.bind(this),
      onUpdate: this.onActionStart.bind(this),
    });

    map.addChild(layerListener);
  }

  setBounds(limitBounds) {
    const bounds = typeof limitBounds === "object" ? limitBounds : this.map.bounds;
    const currentBounds = this.fixBounds(bounds);
    this.map.setRestrictMapArea(currentBounds);
  }

  setZoom({zoom, duration, easing}) {
    const {map} = this;
    map.setLocation({zoom, duration, easing});
  }

  onActionStart({mapInAction}) {
    const {map} = this;
    if (!mapInAction) return;
    this.onMapInActionCallback?.(map, ...arguments);
  }

  onZoom(action) {
    const {map} = this;
    const zoom = action === "up" ? map.zoom + 1 : action === "down" && map.zoom - 1;
    this.setZoom({zoom, duration: 500, easing: "ease"});
  }

  setOnMapInActionCallback(callback) {
    this.onMapInActionCallback = callback;
  }

  onStateChanged(state) {
    const {map} = this;
    const {onMapInit} = this.mapData;
    const states = state.getLayerState(ymaps3.YMapDefaultSchemeLayer.defaultProps.source + ":ground", "tile", "vector");
    if (!states) return;
    // Проверяем, достигло ли количество загруженных тайлов 50% от общего числа
    if (states.tilesLoaded >= 0.5 * states.tilesTotal) {
      if (this.mapInit) return;
      onMapInit?.(map);
      this.mapInit = true;
    }
  }

  fixBounds(bounds) {
    if (bounds[0][1] > bounds[1][1]) {
      return [
        [bounds[0][0], bounds[1][1]],
        [bounds[1][0], bounds[0][1]],
      ];
    }
    return bounds;
  }

  appendContainer(newContainer) {
    this.container.className = "yandex-map-container";
    if (this.container && newContainer) {
      newContainer.appendChild(this.container);
    }
  }

  onUnmount() {
    if (!this.container) return;
    document.body.appendChild(this.container);
    this.container.className = "yandex-map-container__hide";
  }
}

export {YandexMap};
