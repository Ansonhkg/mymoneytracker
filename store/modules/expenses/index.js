import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = () => ({
    inputs: {
        income: 1352.80,
        saving: 30,
    },
    expenses: []
})

export default{
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}