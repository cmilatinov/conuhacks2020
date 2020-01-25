import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            username: `test`,
            fname: `raf`,
            lname: `lmao`
        },
        currAuthStatus: 0,
        authStatus: [`Idle`, `Authenticating`, `Success`, `Error`],
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
        setUsers(state, users) {
            state.users = users;
        },
    },
    actions: {
        
    }
})