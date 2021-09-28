export const actions = {
  async findOne({ commit }, { id }) {
    try {
      return await this.$axios.$get(`collector/${id}`, {});
    } catch (err) {
      commit('setError', err, { root: true });
      return false;
    }
  },

  async findAll({ commit }) {
    try {
      return await this.$axios.$get('collector', {});
    } catch (err) {
      commit('setError', err, { root: true });
      return false;
    }
  },

  async createOne({ commit }, data) {
    try {
      return await this.$axios.$post('collector', { ...data });
    } catch (err) {
      commit('setError', err, { root: true });
      return false;
    }
  },

  async updateOne({ commit }, { id, data }) {
    try {
      return await this.$axios.$put(`collector/${id}`, { ...data });
    } catch (err) {
      commit('setError', err, { root: true });
      return false;
    }
  },

  async removeOne({ commit }, { id }) {
    try {
      return await this.$axios.delete(`collector/${id}`, {});
    } catch (err) {
      commit('setError', err, { root: true });
      return false;
    }
  }
};
