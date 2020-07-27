import * as ActionType from "../actions/ActionType";


let initialState = {
    budgetList: [],
    budgetEdit: null,
  };

 export const budgetReducer = (state = initialState, action) => {
  
    switch (action.type) { 

      case ActionType.SUBMIT:
        if (action.budget.id) {
          //UPDATE EDIT
          let index = state.budgetList.findIndex(budget => {
            return budget.id === action.budget.id;
          });
          if (index !== -1) {
            let budgetListUpdate = [...state.budgetList];
            budgetListUpdate[index] = action.budget;
            state.budgetList = budgetListUpdate;
          }
        }else{
            //ADD
          return {...state, budgetList: [...state.budgetList, {...action.budget, id: Math.random()}]}
          let budgetAdd = { ...action.budget , id: Math.random()};
          state.budgetList = [...state.budgetList, budgetAdd];
          }
        return state//{ ...state };
  

      case ActionType.EDIT:
          state.budgetEdit = action.budget;
          return { ...state };
      

      case ActionType.DELETE:
      
        let index = state.budgetList.findIndex(budget => {
        return budget.id === action.budget.id;
         });
        if(index !== -1){
          let budgetListUpdate = [...state.budgetList];
          budgetListUpdate.splice(index,1);
          state.budgetList = budgetListUpdate;
        }
      return {...state} ;
      
      default:
        return state;
    }
    
  };
  


