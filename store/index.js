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
                            isCompleted: false
                        },
                        // {
                        //     id: 2,
                        //     description: "Car Insurance (PC/SMARTDRIVERINS)",
                        //     value: 54.77,
                        //     isCompleted: false
                        // },
                        // {
                        //     id: 3,
                        //     description: "Road Tax (DVLA-DE55WBD)",
                        //     value: 10.06,
                        //     isCompleted: false
                        // },
                        // {
                        //     id: 4,
                        //     description: "Revolut Premimum Subscription",
                        //     value: 6.99,
                        //     isCompleted: false
                        // }
                    ]
                },
                // {
                //     id: 1,
                //     title: "Variable Expenses",
                //     rows: [
                //         {
                //             id: 1,
                //             description: "Food / Grocery",
                //             value: 150,
                //             isCompleted: false
                //         },
                //         {
                //             id: 2,
                //             description: "Transport",
                //             value: 160,
                //             isCompleted: false
                //         }
                //     ]
                // }
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
                    isCompleted: false
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