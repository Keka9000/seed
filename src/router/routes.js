const routes = [
    //
    {
        path: '/',
        redirect: 'login',

    },
    // {
    //     path: '/kanban',
    //     name: 'kanban',
    //     component: () => import('@/layouts/baseline'),
    //     children: [
    //
    //         {
    //             path: '',
    //             meta: {requiresAuth: true},
    //             component: () => import('@/components/kanban/kanban')
    //         }
    //     ]
    // },
    {
        path: '/login',
        name: 'login',
        meta: {requiresAuth: false},
        component: () => import('@/pages/auth')

    },
    //
    // {
    //     path: '/table',
    //     name: 'table',
    //     component: () => import('@/layouts/baseline'),
    //     children: [
    //
    //         {
    //             path: '',
    //             meta: {requiresAuth: true},
    //             component: () => import('@/components/table/table')
    //         }
    //     ]
    // },
    // {
    //     path: '/list',
    //     name: 'list',
    //     component: () => import('@/layouts/baseline'),
    //     children: [
    //
    //         {
    //             path: '',
    //             meta: {requiresAuth: true},
    //             component: () => import('@/components/list/list')
    //         }
    //     ]
    // },

]

export default routes
