import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import postcss from "rollup-plugin-postcss";
import svg from "rollup-plugin-svg";
import Vue2 from "unplugin-vue2/rollup";
import VueJsx from "unplugin-vue-jsx/rollup";
import VueSource from "unplugin-vue-source/rollup";
import { liveServer } from "rollup-plugin-live-server";

const extensions = [
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".mjs",
  ".cjs",
  ".vue",
  ".json",
];

export default {
  input: "src/main.ts",
  output: {
    file: "dist/main.js",
    format: "esm",
  },
  plugins: [
    VueSource(),
    VueJsx({
      version: 2,
    }),
    Vue2(),
    postcss(),
    
    commonjs(),
    resolve({
      extensions,
    }),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }), 
    babel({
      babelHelpers: "bundled",
      extensions,
      presets: ["@babel/preset-env", "@babel/preset-typescript"],
    }),
    svg({
      base64: true,
    }),
    liveServer({
      port: 3000,
      wait: 1000,
    }),
  ],
};
