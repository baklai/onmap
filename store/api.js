export const actions = {
  async getUsers({ commit }) {
    try {
      const { data: users } = await this.$axios.get('users', {});
      return users;
    } catch (err) {
      commit('setError', err, { root: true });
      throw err;
    }
  },

  async createUsers({ commit }, user) {
    try {
      console.log(user);

      user.password = '12345678';

      return await this.$axios.post('users', { ...user });
    } catch (err) {
      commit('setError', err, { root: true });
      return false;
    }
  },

  async removeUsers({ commit }, user) {
    try {
      return await this.$axios.delete(`users/${user.id}`, {});
    } catch (err) {
      commit('setError', err, { root: true });
      throw err;
    }
  }

  // async fetchAdmin({commit}) {
  //   try {
  //     return await this.$axios.$get('/api/post/admin')
  //   } catch (e) {
  //     commit('setError', e, {root: true})
  //     throw e
  //   }
  // },
  // async fetch({commit}) {
  //   try {
  //     return await this.$axios.$get('/api/post')
  //   } catch (e) {
  //     commit('setError', e, {root: true})
  //     throw e
  //   }
  // },
  // async remove({commit}, id) {
  //   try {
  //     return await this.$axios.$delete(`/api/post/admin/${id}`)
  //   } catch (e) {
  //     commit('setError', e, {root: true})
  //     throw e
  //   }
  // },
  // async update({commit}, {id, text}) {
  //   try {
  //     return await this.$axios.$put(`/api/post/admin/${id}`, {text})
  //   } catch (e) {
  //     commit('setError', e, {root: true})
  //     throw e
  //   }
  // },
  // async create({commit}, {title, text, image}) {
  //   try {
  //     const fd = new FormData()

  //     fd.append('title', title)
  //     fd.append('text', text)
  //     fd.append('image', image, image.name)

  //     return await this.$axios.$post('/api/post/admin', fd)
  //   } catch (e) {
  //     commit('setError', e, {root: true})
  //     throw e
  //   }
  // },
  // async fetchAdminById({commit}, id) {
  //   try {
  //     return await this.$axios.$get(`/api/post/admin/${id}`)
  //   } catch (e) {
  //     commit('setError', e, {root: true})
  //     throw e
  //   }
  // },
  // async fetchById({commit}, id) {
  //   try {
  //     return await this.$axios.$get(`/api/post/${id}`)
  //   } catch (e) {
  //     commit('setError', e, {root: true})
  //     throw e
  //   }
  // },
  // async addView({commit}, {views, _id}) {
  //   try {
  //     return await this.$axios.$put(`/api/post/add/view/${_id}`, {views})
  //   } catch (e) {
  //     commit('setError', e, {root: true})
  //     throw e
  //   }
  // },
  // async getAnalytics({commit}) {
  //   try {
  //     return await this.$axios.$get('/api/post/admin/get/analytics')
  //   } catch (e) {
  //     commit('setError', e, {root: true})
  //     throw e
  //   }
  // }
};
