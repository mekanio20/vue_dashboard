import { createStore } from 'vuex'
export default createStore({
    state: {
        token: null,
        authStatus: false,
    },
    getters: {
        _isAuthenticated: state => state.user != null
    },
    mutations: {
        setToken(state, token) { state.token = token },
        logoutUser(state) { state.token = null }
    }
})