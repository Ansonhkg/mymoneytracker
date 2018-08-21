const EXPENSES_ADDED  = (state) => {
    var id = state.expenses.length

    state.expenses.push({
        id: id,
        title: '{CLICK ME TO CHANGE TITLE}' + id,
        rows: []
    })
}

const EXPENSES_REMOVED = (state, id) => {
    var index = state.expenses.map((x) => x.id).indexOf(id)

    state.expenses.splice(index, 1)
}

const EXPENSES_UPDATED = (state, expenses) => {
    state.expenses = expenses
}

const INPUTS_UPDATED = (state, inputs) => {
    state.inputs = inputs
}

const ROW_ADDED = (state, id) => {
    var newId = state.expenses[id].rows.length + 1

    state.expenses[id].rows.push({  
        id: newId,
        description: '{CLICK ME TO EDIT}' + newId,
        value: 0,
        isEnabled: true
    })
}

const ROW_REMOVED = (state, data) => {
    var listId = data[0]
    var rowId = data[1]

    var index = state.expenses[listId]['rows'].map((x) => x.id).indexOf(rowId)
        
    state.expenses[listId]['rows'].splice(index, 1)
}

const STATE_LOADED = (state, data) => {
    state.inputs = data.inputs
    state.expenses = data.expenses
}

export default {
    EXPENSES_ADDED,
    EXPENSES_REMOVED,
    EXPENSES_UPDATED,
    INPUTS_UPDATED,
    ROW_ADDED,
    ROW_REMOVED,
    STATE_LOADED,
}