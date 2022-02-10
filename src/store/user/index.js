export default {
  state: {
    user: {
      email: '',
      avatar: '',
      fullName: '',
      id: '',
      username: '',
      extras: { eCommerceCartItemsCount: 5 },
      ability: [{ action: 'manage', subject: 'all' }],
      role: 'admin',
      isLoggedIn: false,
    },
  },
  getters: {
    isUserLoggedIn: state => state.user.isLoggedIn,
    getUser: state => {
      if (state.user.isLoggedIn) {
        return state.user
      }
      return JSON.parse(localStorage.getItem('userData'))
    },
  },
  mutations: {
    UPDATE_USER(state, val) {
      state.user = val
    },
  },
  actions: {},
}
