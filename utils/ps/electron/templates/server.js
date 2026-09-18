/* eslint-disable no-console */
const path = require("path");
const express = require("express");
const next = require("next");
const {project_id: projectId} = require("../../../../package");

const devProxy = {
  "/content/**/*": {
    target: `https://${projectId}.dev.peppers-studio.ru/`,
    // pathRewrite: { "^/api": "/" },
    changeOrigin: true,
  },
  "/{api,uploads}/**/*": {
    target: `https://node-${projectId}.dev.peppers-studio.ru/`,
    // pathRewrite: { "^/api": "/" },
    changeOrigin: true,
  },
};

const port = parseInt(process.env.PORT, 10) || 3000;
const env = process.env.NODE_ENV;
const dev = env !== "production";
const app = next({
  dir: ".", // base directory where everything is, could move to src later
  dev,
});

const handle = app.getRequestHandler();

let server;
app
  .prepare()
  .then(() => {
    server = express();

    // Set up the proxy.
    if (dev && devProxy) {
      const {createProxyMiddleware} = require("http-proxy-middleware");
      Object.keys(devProxy).forEach(function (context) {
        server.use(createProxyMiddleware(context, devProxy[context]));
      });
    }

    // Default catch-all handler to allow Next.js to handle all other routes
    server.all("*", (req, res) => {
      if (process.env.ENABLE_CACHE) {
        res.setHeader("Cache-Control", "public, max-age=3600");
      }
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on port ${port} [${env}]`);
    });
  })
  .catch(err => {
    console.log("An error occurred, unable to start the server");
    console.log(err);
  });
