const ADD_EXPENSES = (state) => {
    var id = state.expenses.length

    state.expenses.push({
        id: id,
        title: '{CLICK ME TO CHANGE TITLE}' + id,
        rows: []
    })
}

const REMOVE_EXPENSES = (state, id) => {
    state.expenses.splice(id, 1)
}

const ADD_ROW = (state, id) => {
    var newId = state.expenses[id].rows.length + 1

    state.expenses[id].rows.push({  
        id: newId,
        description: '{CLICK ME TO EDIT}' + newId,
        value: 0,
        isEnabled: true
    })
}

const REMOVE_ROW = (state, data) => {
    var listId = data[0]
    var rowId = data[1]
    state.expenses[listId]['rows'].splice(rowId - 1, 1)
}

const LOAD_STATE = (state, data) => {
    state.inputs = data.inputs
    state.expenses = data.expenses
}

export default {
    ADD_EXPENSES,
    REMOVE_EXPENSES,
    ADD_ROW,
    REMOVE_ROW,
    LOAD_STATE
}