// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

  Vue.use(Vuetify, {

      theme: {

          // primary: '#4989CC',
          primary: '#48c793',
          accent: '#f77e12',
          error: '#FF5252',
          warning: '#FFC107',
          success: '#1a7e2a',
          grey: '#a4a4a4'

      }

  })

import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

  Vue.use(VueMoment, {
      moment,
  })
  Vue.prototype.moment = moment


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
