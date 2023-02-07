import { getToken, setToken, removeToken } from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    token: getToken(),
  },

  mutations: {
    setToekn(state, newToken) {
      state.token = newToken
      setToken(newToken)
    },

    removeToken(state) {
      removeToken()
      state.token = null
    },
  },
}
