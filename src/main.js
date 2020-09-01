import Vue from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import iView from "view-design";
import "view-design/dist/styles/iview.css";
import "./assets/css/global.css";
Vue.config.productionTip = false;
Vue.use(iView);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

/**
 *
 * @useRem {boolean}
 * 全局的控制是否使用rem 单位
 */
window.useRem = true;
const baseSize = 16;
(function(doc, win) {
  setRem();
  let resizeEvt =
      "orientationchange" in window ? "orientationchange" : "resize",
    recalc = function() {
      setRem();
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
})(document, window);
function setRem() {
  // 当前页面宽度相对于 1920宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 1920; // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
  document.documentElement.style.fontSize =
    baseSize * Math.max(scale, 0.6) + "px";
}
