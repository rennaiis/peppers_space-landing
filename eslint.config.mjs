import {fixupPluginRules} from "@eslint/compat";
import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

const asWarning = ruleConfig => {
  if (ruleConfig === "off" || ruleConfig === 0) return ruleConfig;
  if (Array.isArray(ruleConfig)) return ["warn", ...ruleConfig.slice(1)];
  return "warn";
};

const warnRules = rules =>
  Object.fromEntries(Object.entries(rules).map(([ruleName, ruleConfig]) => [ruleName, asWarning(ruleConfig)]));

const globals = {
  Audio: "readonly",
  Blob: "readonly",
  Buffer: "readonly",
  cancelAnimationFrame: "readonly",
  clearInterval: "readonly",
  clearTimeout: "readonly",
  console: "readonly",
  document: "readonly",
  exports: "writable",
  File: "readonly",
  FormData: "readonly",
  global: "readonly",
  Image: "readonly",
  localStorage: "readonly",
  module: "writable",
  navigator: "readonly",
  process: "readonly",
  requestAnimationFrame: "readonly",
  require: "readonly",
  sessionStorage: "readonly",
  setInterval: "readonly",
  setTimeout: "readonly",
  URL: "readonly",
  URLSearchParams: "readonly",
  window: "readonly",
  __dirname: "readonly",
  __filename: "readonly",
};

export default [
  {
    ignores: [
      "**/*.scss",
      "node_modules/**",
      ".next/**",
      "out/**",
      "public/**",
      "static/**",
      "coverage/**",
      "build/**",
      ".deploy/**",
      ".idea/**",
      ".infra/**",
      "utils/template/component/**",
      "utils/template/page/**",
      "utils/ps/threejs/src/shaders/**",
      "components/baseComponents/extended/webgl-lite/shaders/**",
      "components/baseComponents/extended/webgl-lite/twgl.min.js",
    ],
  },
  {
    files: ["components/**/*.{js,jsx}", "pages/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      import: fixupPluginRules(importPlugin),
      "jsx-a11y": fixupPluginRules(jsxA11y),
      react: fixupPluginRules(react),
      "react-hooks": fixupPluginRules(reactHooks),
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...warnRules(js.configs.recommended.rules),
      ...warnRules(react.configs.recommended.rules),
      ...warnRules(jsxA11y.configs.recommended.rules),
      "import/no-unresolved": "off",
      "import/default": "off",
      "import/export": "off",
      "import/named": "off",
      "import/namespace": "off",
      "import/no-named-as-default": "off",
      "import/no-named-as-default-member": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "jsx-a11y/anchor-is-valid": [
        "warn",
        {
          components: ["Link"],
          specialLink: ["hrefLeft", "hrefRight"],
          aspects: ["invalidHref", "preferButton"],
        },
      ],
      "jsx-a11y/aria-role": [
        "warn",
        {
          ignoreNonDOM: true,
        },
      ],
      "max-len": ["warn", {code: 120, ignoreUrls: true, ignoreStrings: true}],
      "react/jsx-filename-extension": ["warn", {extensions: [".js", ".jsx"]}],
      "react/prop-types": "warn",
      "react/react-in-jsx-scope": "off",
    },
  },
];
