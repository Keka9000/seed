import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const Router = new VueRouter({

    mode: 'history',
    routes,
    scrollBehavior: () => ({ y: 0 }),
    linkActiveClass: 'is-active'

})

// Router.beforeEach((to, from, next) => {
//
//     const autorized = store.getters.autorized
//
//     if (to.meta.requiresAuth && !autorized) {
//
//         next({
//             path: '/login',
//         })
//
//     } else {
//
//         next()
//
//     }
// })

export default Router
