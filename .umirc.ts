import { defineConfig } from "umi";

export default defineConfig({
  history: {type:"hash"},
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
    { path: "/stock", component: "stock/index" },
  ],
  npmClient: 'npm',
});
