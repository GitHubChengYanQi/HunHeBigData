import {defineConfig} from "umi";

export default defineConfig({

    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    history: {type: "hash"},
    routes: [
        {path: "/", component: "stock/index"},
        {path: "/docs", component: "docs"},
        {path: "/stock", component: "stock/index"},
    ],
    npmClient: 'npm',
});
