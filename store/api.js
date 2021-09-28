export const actions = {
  async getUsers({ commit }) {
    try {
      return await this.$axios.$get('users', {});
    } catch (err) {
      commit('setError', err, { root: true });
      return false;
    }
  },

  async createUsers({ commit }, user) {
    try {
      return await this.$axios.$post('users', { ...user });
    } catch (err) {
      commit('setError', err, { root: true });
      return false;
    }
  },

  async updateUsers({ commit }, user) {
    try {
      return await this.$axios.$put(`users/${user.id}`, { ...user });
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
      return false;
    }
  }
};
