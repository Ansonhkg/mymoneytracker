import Vuex from 'vuex'

const state = () => {
    return new Vuex.Store({
        state: {
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
        },
        mutations: {
            addExpenses(state) {
                var id = state.expenses.length

                state.expenses.push({
                    id: id,
                    title: '{CLICK ME TO CHANGE TITLE}' + id,
                    rows: []
                })
            },
            removeExpenses(state, id){
                state.expenses.splice(id, 1)
            },
            addRow(state, id){
                var newId = state.expenses[id].rows.length + 1

                state.expenses[id].rows.push({
                    id: newId,
                    description: '{CLICK ME TO EDIT}' + newId,
                    value: 0,
                    isEnabled: true
                })
            },
            removeRow(state, data){
                var listId = data[0]
                var rowId = data[1]
                state.expenses[listId]['rows'].splice(rowId - 1, 1)
            },
            loadState(state, data){
                state.inputs = data.inputs
                state.expenses = data.expenses
            }
        }
    })
}

export default state