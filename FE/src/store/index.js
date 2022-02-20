import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

// Import modules
import auth from "./modules/auth";
import map from "./modules/map";
import mission from "./modules/mission";
import scheme from "./modules/scheme";

Vue.use(Vuex);

const dataState = createPersistedState({
  key: "auth",
  paths: ["auth"],
});

const storeData = {
  modules: {
    auth,
    map,
    mission,
    scheme,
  },
  plugins: [dataState],
};

const store = new Vuex.Store(storeData);

export default store;
