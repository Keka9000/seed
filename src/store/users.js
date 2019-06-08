import test_users from '@/assets/data/users.js'

// sessionStorage.removeItem('user')
const sessionAutorized = JSON.parse(sessionStorage.getItem('user'))

export default {

  state: {

    autorized: ( sessionAutorized ) ? sessionAutorized.autorized : false,
    user_name: ( sessionAutorized ) ? sessionAutorized.name : null,
    user_id: ( sessionAutorized ) ? sessionAutorized.id : null

  },

  mutations: {

    SET_USER (state, data) {

      state.autorized = data.autorized
      state.user_name = data.name
      state.user_id = data.id

    },

    CLEAR_USER (state) {

      state.autorized = false
      state.user_name = null
      state.user_id = null

    },

  },

  actions: {

    async setUser ({ commit }, data) {

        try {

          const testUsers = await test_users

          var valid = false

          testUsers.forEach(user => {

              if(user.login == data.login && user.password == data.password) {

                var checkedUser = {

                  autorized: true,
                  name: user.name,
                  id: user.id

                }

                commit('SET_USER', checkedUser)

                sessionStorage.setItem('user', JSON.stringify(checkedUser))

                valid = true

                }

            })

          return valid

        }

        catch (error) {

          throw error

        }

    },

    clearUser ({ commit }) {

        commit('CLEAR_USER')

    },

  },

  getters: {

    autorized (state) {

        return state.autorized

    },

    user_name (state) {

        return state.user_name

    },

    user_id (state) {

        return state.user_id

    }

  }

}
