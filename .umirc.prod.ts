import {defineConfig} from "umi";

export default defineConfig({
    define: {'process.env.API': 'http://10.10.10.17:8082'},
    // define: {'process.env.API': 'http://10.147.20.160:8082'},
});
