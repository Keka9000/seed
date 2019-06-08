import test_tasks from '@/assets/data/tasks.js'

// sessionStorage.removeItem('tasks')
const sessionTasks = JSON.parse(sessionStorage.getItem('tasks'))

export default {

  state: ( sessionTasks ) ? sessionTasks : [],

  mutations: {

    LOAD_TASKS (state, data) {

        data.forEach(task => {state.push(task)})

    },

    ADD_TASK (state, data) {

        state.push(data)

    },

    CHANGE_TASK (state, {data, index}) {

        state.splice(index, 1, data)

    },

    REMOVE_TASK (state, index) {

        state.splice(index, 1)

    },

  },

  actions: {

    async loadTasks ({ commit, state }) {

      if(state.length == 0) {
        try {

          const testTasks = await test_tasks
          commit('LOAD_TASKS', testTasks)
          sessionStorage.setItem('tasks', JSON.stringify(testTasks))

          return testTasks

        }
        catch (error) {

          throw error

        }
      }
    },

    addTask ({ commit, getters }, data) {

        commit('ADD_TASK', data)

        sessionStorage.setItem('tasks', JSON.stringify(getters.getTasks))

    },

    changeTask ({ commit, state, getters }, data) {

      state.forEach((task, index) => {

        if(task.id == data.id) {

          commit('CHANGE_TASK', {data, index})

          sessionStorage.setItem('tasks', JSON.stringify(getters.getTasks))

        }

      })

    },

    removeTask ({ commit, state, getters }, data) {

      state.forEach((task, index) => {

        if(task.id == data.id) {
          console.log('REMOVE TASK ID: ', task.id)
          commit('REMOVE_TASK', index)

          sessionStorage.setItem('tasks', JSON.stringify(getters.getTasks))

        }

      })

    },

  },

  getters: {

    getTasks (state) {

        return state

    },

  }

}
