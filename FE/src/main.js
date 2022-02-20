import Vue from "vue";
import App from "./App.vue";
import ViewUI from "view-design";
import locale from "view-design/dist/locale/en-US";
import { router } from "./router";
import "view-design/dist/styles/iview.css";
import common from "./common";
import store from "./store/index";
import "ol/ol.css";

export const eventBus = new Vue();

Vue.use(ViewUI, { locale: locale });

Vue.mixin(common);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
