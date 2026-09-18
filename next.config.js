const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const env = process.env.NODE_ENV;
const dev = env !== "production";

const path = require("path");

const basePath = "";
const assetPrefix = dev ? "/" : `${basePath}/`;

const isProduction = process.env.NODE_ENV === "production";
const isObfuscate = isProduction;

const createNextJsObfuscator = require("nextjs-obfuscator");
const withNextJsObfuscator = createNextJsObfuscator(
  {disableConsoleOutput: false},
  {
    patterns: ["./(components|utils|controllers)/*.(js|jsx|ts|tsx)"],

    log: true,
  },
);

function filterSassSpamWarnings() {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (args.some(arg => typeof arg === "string" && arg.includes("SassWarning"))) return;
    originalWarn(...args);
  };
}

// filterSassSpamWarnings();

module.exports = (isObfuscate ? withNextJsObfuscator : config => config)(
  withBundleAnalyzer({
    logging: {
      browserToTerminal: false,
    },
    output: dev ? undefined : "export",
    env: {
      ASSETS_PREFIX: assetPrefix,
      NEXT_PUBLIC_BUILD_DATE: String(Date.now()),
      BUILD_ID: process.env.BUILD_ID || Date.now().toString(36),
    },
    basePath,
    assetPrefix,
    productionBrowserSourceMaps: !isProduction,
    turbopack: {
      rules: {
        "*.svg": {
          loaders: [
            {
              loader: "@svgr/webpack",
              options: {
                icon: true,
              },
            },
          ],
          as: "*.js",
        },
        "*.html": {
          loaders: ["raw-loader"],
          as: "*.js",
        },
      },
    },
    sassOptions: {
      logger: console,
      includePaths: [path.join(__dirname, "../"), path.join(__dirname, "styles")],
    },
  }),
);
