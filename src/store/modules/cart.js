const state = {
    items: [],
};
  
const mutations = {
    decrement (state) {
      state.count--;
    },
    remove (state) {
      state.count++;
    },
};
  
const actions = {
    add: ({commit}) => commit('increment'),
    remove: ({commit}) => commit('decrement'),
};

export default {
    state,
    mutations,
    actions,
};