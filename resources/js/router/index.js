import Vue from 'vue';
import VueRouter, {
    RouteConfig
} from 'vue-router';
import Main from '../views/index.vue';


Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        name: 'login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: require('../views/auth/login.vue').default,
    },
    {
        path: '/register',
        name: 'register',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: require('../views/auth/register.vue').default,
    },
    {
        path: '/',
        name: 'home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: require('../views/home/index.vue').default,
    },
    {
        path: '/setting',
        name: 'setting',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: require('../views/profile/detail.vue').default,
    },
    {
        path: '/password',
        name: 'password',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: require('../views/profile/changepassword.vue').default,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    linkActiveClass: "active",
});

export default router;
