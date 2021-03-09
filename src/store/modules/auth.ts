interface AuthState {
    isLoggedIn: boolean;
}

export default {
    namespaced: true,
    state(): AuthState {
        return {
            isLoggedIn: false,
        }
    },
    mutations: {
        setAuth(state: AuthState, payload: { isAuth: any; }) {
            state.isLoggedIn = payload.isAuth;
        },
    },
    actions: {
        login(context: { commit: (arg0: string, arg1: { isAuth: boolean; }) => void; }) {
            context.commit('setAuth', {
                isAuth: true
            });
        },
        logout(context: { commit: (arg0: string, arg1: { isAuth: boolean; }) => void; }) {
            context.commit('setAuth', {
                isAuth: false
            });
        },
    },
    getters: {
        userIsAuthenticated(state: AuthState) {
            return state.isLoggedIn;
        },
    },
}