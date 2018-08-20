import { fetchExpenses } from '@/api';
import { fetchInputs } from '@/api';

const getExpenses = (context) => {
    fetchExpenses
        .then((res) => {
            context.commit('EXPENSES_UPDATED', res)
        })
        .catch((e) => {
            console.log(e)
        })
}

const getInputs = (context) => {
    fetchInputs
        .then((res) => {
            context.commit('INPUTS_UPDATED', res)
        })
        .catch((e) => {
            console.log(e)
        })
}

export default {
    getExpenses,
    getInputs
};