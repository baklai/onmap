export const actions = {
  async findOne({ commit }, { id }) {
    try {
      return await this.$axios.$get(`users/${id}`, {});
    } catch (err) {
      commit('setError', err, { root: true });
      return false;
    }
  },

  async findAll({ commit }) {
    try {
      return await this.$axios.$get('users', {});
    } catch (err) {
      commit('setError', err, { root: true });
      return false;
    }
  },

  async createOne({ commit }, user) {
    try {
      return await this.$axios.$post('users', { ...user });
    } catch (err) {
      commit('setError', err, { root: true });
      return false;
    }
  },

  async updateOne({ commit }, { id, user }) {
    try {
      return await this.$axios.$put(`users/${id}`, { ...user });
    } catch (err) {
      commit('setError', err, { root: true });
      return false;
    }
  },

  async removeOne({ commit }, { id }) {
    try {
      return await this.$axios.delete(`users/${id}`, {});
    } catch (err) {
      commit('setError', err, { root: true });
      return false;
    }
  }
};
