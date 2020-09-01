const BASE_URL = process.env.NODE_ENV === "production" ? "./" : "./";
module.exports = {
  publicPath: BASE_URL,
  lintOnSave: true,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require("postcss-px2rem")({
            remUnit: 16, // selectorBlackList: ['ivu-']
          }),
        ],
      },
    },
  },
  devServer: {
    port: 8083,
    proxy: {
      "/UserInfo": {
        target: "http://192.168.22.58:89",
        ws: true,
        changeOrigin: true,
      },
      "/VideoInfo": {
        target: "http://192.168.22.58:89",
        ws: true,
        changeOrigin: true,
      },
      "/OperationInfo": {
        target: "http://192.168.22.58:89",
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
