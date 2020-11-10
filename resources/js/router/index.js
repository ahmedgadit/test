import Vue from 'vue';
import VueRouter, {
    RouteConfig
} from 'vue-router';
import Main from '../views/index.vue';


Vue.use(VueRouter);

const routes = [{
        path: '/',
        name: 'mainpage',
        component: Main,
    },
    {
        path: '/login',
        name: 'login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: require('../views/login/login.vue').default,
    },
    {
        path: '/home',
        name: 'home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: require('../views/home/index.vue').default,
    },
    // {
    //     path: '/news/:news',
    //     name: 'Newsdetail',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: require('./../views/newsdetail/index.vue').default,
    // },
    // {
    //     path: '/:category',
    //     name: 'Category',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: require('./../views/category/index.vue').default,
    // },
    // {
    //     path: '/:category/:subcategory',
    //     name: 'Subcategory',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: require('./../views/subcategory/index.vue').default,
    // },
    // {
    //     path: '/contact',
    //     name: 'Contact',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: require('./../views/contact/index.vue').default,
    // },
    // {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: require('./../views/About.vue').default,
    // },
    // {
    //     path: '/contact-us',
    //     name: 'contact',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: require('./../views/Contact.vue').default,
    // },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    linkActiveClass: "active",
});

export default router;
