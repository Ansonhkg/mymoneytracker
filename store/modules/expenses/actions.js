import { fetchExpenses } from '@/api';

const getExpenses = (context) => {
    // context.commit('EXPENSES_UPDATED', RESPONSE_EXPENSES)

    fetchExpenses
        .then((res) => {
            context.commit('EXPENSES_UPDATED', res)
        })
        .catch((e) => {
            console.log(e)
        })
}

export default{
    getExpenses,
};