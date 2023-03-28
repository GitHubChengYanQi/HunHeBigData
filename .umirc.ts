import {defineConfig} from "umi";

export default defineConfig({

    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    history: {type: "hash"},
    hash: true,
    routes: [
        {path: "/", component: "GetData/index"},
    ],
    npmClient: 'npm',
});
