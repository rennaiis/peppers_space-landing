import {useCallback, useEffect, useMemo, useState} from "react";

const cache = {};
const loadedCache = {};
const {URL} = global;

async function blobUrlLoader(url) {
  if (!url) return Promise.resolve(null);

  if (!cache[url]) {
    cache[url] = fetch(url)
      .then(r => r.blob())
      .then(blob => URL.createObjectURL(blob))
      .catch(() => url);
  }

  loadedCache[url] = await cache[url];
  return cache[url];
}

const videoLoader = blobUrlLoader;
const imageLoader = blobUrlLoader;

function getLoadedFile(url) {
  if (!url) return null;
  return loadedCache[url] || url;
}

function audioLoader(url) {
  if (!url) return Promise.resolve(null);

  if (!cache[url]) {
    cache[url] = fetch(url, {headers: {Range: "0-"}})
      .then(response => response.blob())
      .then(blob => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = e => resolve(e.target.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      })
      .catch(() => url);
  }

  return cache[url];
}

function loaders(url) {
  if (!url) return Promise.resolve(null);

  const ext = url.split(".").pop().toLowerCase();

  if (["mp4", "webm"].includes(ext)) return videoLoader(url);
  if (["mp3", "wav"].includes(ext)) return audioLoader(url);
  if (["png", "jpg", "jpeg", "webp", "gif"].includes(ext)) return imageLoader(url);

  return Promise.resolve(url);
}

const SEQUENCE = "sequence";
const PARALLEL = "parallel";

async function fileLoaderPreload(list = [], type = SEQUENCE) {
  if (type === PARALLEL) {
    await Promise.all(list.map(item => loaders(typeof item === "string" ? item : item?.src)));
    return;
  }

  for (const item of list) {
    try {
      await loaders(typeof item === "string" ? item : item?.src);
    } catch {}
  }
}

function useFileLoader(urls = [], type = SEQUENCE) {
  const [files, setFiles] = useState([]);

  const addFile = useCallback((i, blob) => {
    setFiles(list => {
      const next = [...list];
      next[i] = blob;
      return next;
    });
  }, []);

  useEffect(() => {
    let active = true;

    async function make() {
      if (type === PARALLEL) {
        const results = await Promise.all(urls.map(loaders));
        if (active) setFiles(results);
        return;
      }

      for (let i = 0; i < urls.length; i++) {
        const result = await loaders(urls[i]);
        if (!active) return;
        addFile(i, result);
      }
    }

    setFiles([]);
    make().catch(() => {});
    return () => {
      active = false;
    };
  }, urls);

  return files;
}

function useFileLoaderMap(urls = {}, type = SEQUENCE) {
  const {keys, values} = useMemo(() => {
    const keys = Object.keys(urls);
    return {
      keys,
      values: keys.map(k => urls[k]),
    };
  }, [urls]);

  const results = useFileLoader(values, type);

  return useMemo(() => {
    return keys.reduce((acc, k, i) => {
      acc[k] = results[i];
      return acc;
    }, {});
  }, [results, keys]);
}

export {imageLoader, videoLoader, audioLoader, fileLoaderPreload, useFileLoader, useFileLoaderMap, getLoadedFile};
