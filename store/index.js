import Vuex from 'vuex'
import expensesModule from './modules/expenses'

const state = () => {
    return new Vuex.Store({
        modules:{
            expenses: expensesModule
        }
    })
}

export default state