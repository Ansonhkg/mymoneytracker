const inputs = state => {
  // if(state.inputs.income <= 0 || state.inputs.income === undefined){
  //   state.inputs.income = 0
  // }
  return state.inputs;
}

const expenses = state => state.expenses;

export default {
  inputs,  
  expenses
};