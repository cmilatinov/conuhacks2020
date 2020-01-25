import Vue from 'vue';
import Router from 'vue-router';

import store from './store'

import Authentication from './views/authentication';
import Event from './views/event';
import Home from './views/home';
import Profile from './views/profile';

Vue.use(Router);

function ifNotAuthenticated(to, from, next) {
    if (!store.getters.isAuthenticated) {
        next();
        return;
    }
    next(`/`);
}

function ifAuthenticated(to, from, next) {
    if (store.getters.isAuthenticated) {
        next();
    } else {
        next(`/authentication`);
    }
}

export default new Router({
    routes: [
        {
            path: '/',
            redirect: {name : 'home'},
        },
        {
            path: '/authentication',
            name: 'authentication',
            component: Authentication,
            beforeEnter: ifNotAuthenticated
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            props: true,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/event',
            name: 'event',
            component: Event,
            props: true,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile,
            props: true,
            beforeEnter: ifAuthenticated
        },
    ]
});