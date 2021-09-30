import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import qs from 'qs'

import './assets/css/common.css'

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);

Vue.config.productionTip = false

import {
  postRequest,
  putRequest,
  getRequest,
  deleteRequest
} from "../src/utils/api";

// 将请求方式注册在全局上，以插件的形式去使用
Vue.prototype.$post = postRequest;
Vue.prototype.$put = putRequest;
Vue.prototype.$get = getRequest;
Vue.prototype.$delete = deleteRequest;

Vue.prototype.$qs = qs;

import axios from 'axios';

Vue.prototype.axios = axios;
Vue.prototype.qs = function (json) {
  var params = new URLSearchParams();
  for (var x in json) {
    params.append(x, json[x]);
  }
  return params;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')