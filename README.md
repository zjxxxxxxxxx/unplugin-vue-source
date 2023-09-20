# unplugin-vue-source

[![CI](https://github.com/zjxxxxxxxxx/unplugin-vue-source/actions/workflows/ci.yml/badge.svg)](https://github.com/zjxxxxxxxxx/unplugin-vue-source/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/unplugin-vue-source?color=)](https://www.npmjs.com/package/unplugin-vue-source)
[![MIT](https://img.shields.io/github/license/zjxxxxxxxxx/unplugin-vue-source)](https://opensource.org/licenses/MIT)

Add a \_\_source prop to all Elements.

- 🌈 Supports `Vue2` and `Vue3`.
- 🪐 Support add to `<Component/>`.
- ✨ JSX support in `.vue`, `.jsx`, `.tsx`.
- 😃 Supports `Vite`, `Webpack`, `Rspack`, `Vue CLI`, `Rollup`, `esbuild`.

> For development only

---

sfc without

```html
<!-- src/App.vue -->
<template>
  <div>hello word</div>
</template>
```

with

```html
<!-- src/App.vue -->
<template>
  <div __source="/src/App.vue:3:3">hello word</div>
</template>
```

---

jsx without

```tsx
// src/App.tsx
export default function App() {
  return <div>hello word</div>
}
```

with

```tsx
// src/App.tsx
export default function App() {
  return <div __source="/src/App.tsx:3:9">hello word</div>
}
```

## Install

```bash
npm i -D unplugin-vue-source
```

## Vue2

```ts
// main.ts
import Vue from 'vue';
import VueSource from "unplugin-vue-source/vue";
import App from "./App.vue";

Vue.use(VueSource);

new Vue({
  el: "#app",
  render: (h) => h(App),
});
```

## Vue3

```ts
// main.ts
import { createApp } from 'vue';
import VueSource from "unplugin-vue-source/vue";
import App from "./App.vue";

const app = createApp(App);
app.use(VueSource);
app.mount("#app");
```

## Plugins

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import VueSource from "unplugin-vue-source/vite";

export default defineConfig({
  plugins: [
    VueSource({ /* options */ }),
    // other plugins
  ],
});
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import VueSource from "unplugin-vue-source/rollup";

export default {
  plugins: [
    VueSource({ /* options */ }),
    // other plugins
  ],
};
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  plugins: [
    require("unplugin-vue-source/webpack")({ /* options */ }),
    // other plugins
  ],
};
```

<br></details>

<details>
<summary>Rspack</summary><br>

```ts
// rspack.config.js
module.exports = {
  plugins: [
    require("unplugin-vue-source/rspack")({ /* options */ }),
    // other plugins
  ],
};
```

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require("unplugin-vue-source/webpack")({ /* options */ }),
      // other plugins
    ],
  },
};
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from "esbuild";
import VueSource from "unplugin-vue-source/esbuild";

build({ 
  plugins: [
    VueSource({ /* options */ }),
    // other plugins
  ],
});
```

<br></details>
 
 ## Configuration

The following show the default values of the configuration

```ts
VueSource({
  // source root path
  root: process.cwd(),
  
  // generate sourceMap
  sourceMap: false,
})
```