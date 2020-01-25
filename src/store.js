import Vue from 'vue'
import Vuex from 'vuex'

import Network from './helpers/network';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        currAuthStatus: 0,
        authStatus: [`Logged Out`, `Authenticating`, `Success`, `Error`],
    },
    getters: {
        currentUser(state) {
            if (state.user) {
                return state.user;
            } else {
                return null;
            }
        },
        isAuthenticated(state) {
            return !!state.user;
        },
    },
    mutations: {
        startLogin(state) {
            state.currAuthStatus = 0;
        },
        authSuccess(state, user) {
            state.currAuthStatus = 2;
            state.user = user;
        },
        notConnected(state, user) {
            state.currAuthStatus = 0;
        },
        authError(state) {
            state.currAuthStatus = 3;
        },
        setUser(state, user) {
            state.user = user;
        },
        loggedOut(state) {
            state.currAuthStatus = 0;
            state.user = null;
        },
    }
});

Vue.prototype.$net = new Network();