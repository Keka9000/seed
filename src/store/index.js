import Vue from 'vue'
import Vuex from 'vuex'
import users from './users'
import tasks from './tasks'

Vue.use(Vuex)

const store = new Vuex.Store({

    modules: {
      users,
      tasks
    }

})

export default store
