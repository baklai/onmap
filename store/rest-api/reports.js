export const actions = {
  async findOne({ commit }, { id }) {
    try {
      return await this.$axios.$get(`reports/${id}`, {});
    } catch (err) {
      commit('setError', err, { root: true });
      return false;
    }
  },

  async findAll({ commit }) {
    try {
      return await this.$axios.$get('reports', {});
    } catch (err) {
      commit('setError', err, { root: true });
      return false;
    }
  },

  async createOne({ commit }, report) {
    try {
      return await this.$axios.$post('reports', { ...report });
    } catch (err) {
      commit('setError', err, { root: true });
      return false;
    }
  },

  async updateOne({ commit }, { id, report }) {
    try {
      return await this.$axios.$put(`reports/${id}`, { ...report });
    } catch (err) {
      commit('setError', err, { root: true });
      return false;
    }
  },

  async removeOne({ commit }, { id }) {
    try {
      return await this.$axios.delete(`reports/${id}`, {});
    } catch (err) {
      commit('setError', err, { root: true });
      return false;
    }
  }
};
