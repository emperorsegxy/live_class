import Register from "@/components/Register";

export default [
    {
        path: '/',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/Login.vue')
    },
    {
        path: '/authorized',
        name: 'Authorized',
        component: () => import('@/components/Authorized')
    }
]