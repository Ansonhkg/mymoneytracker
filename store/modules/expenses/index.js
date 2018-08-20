import getters from './getters';
import mutations from './mutations';

const state = () => ({
    inputs: {
        income: 1352.80,
        saving: 30,
    },
    expenses: [
        {
            id: 0,
            title: "Fixed Expenses",
            type: 'expenses',
            rows: [
                {
                    id: 1,
                    description: "Rent",
                    value: 600,
                    isEnabled: true
                },
                {
                    id: 2,
                    description: "Car Insurance",
                    value: 54.77,
                    isEnabled: true
                },
                {
                    id: 3,
                    description: "Road Tax (DVLA-DE55WBD)",
                    value: 10.06,
                    isEnabled: true
                },
                {
                    id: 4,
                    description: "Revolut Premimum Subscription",
                    value: 6.99,
                    isEnabled: true
                }
            ]
        },
        {
            id: 1,
            title: "Variable Expenses",
            rows: [
                {
                    id: 1,
                    description: "Food / Grocery",
                    value: 150,
                    isEnabled: true
                },
                {
                    id: 2,
                    description: "Transport",
                    value: 160,
                    isEnabled: true
                }
            ]
        }
    ]
})

export default{
    namespaced: true,
    state,
    getters,
    mutations
}