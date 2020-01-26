import Vue from 'vue'
import Vuex from 'vuex'

import Network from './helpers/network';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        currAuthStatus: 0,
        authStatus: [`Logged Out`, `Authenticating`, `Success`, `Error`],
        lang: `en`
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
        language(state) {
            return state.lang;
        }
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
        logout(state) {
            state.currAuthStatus = 0;
            state.user = null;
        },
        setLang(state, lang) {
            state.lang = lang;
        }
    }
});