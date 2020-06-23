import * as ActionType from "../actions/ActionType";


let initialState = {
    mealList: [],
    mealEdit: null,
  };

  const mealReducer = (state = initialState, action) => {
    switch (action.type) {
    
      case ActionType.SUBMIT_M:
        if (action.meal.id) {
          //UPDATE EDIT
          let index = state.mealList.findIndex(meal => {
            return meal.id === action.meal.id;
          });
          if (index !== -1) {
            let mealListUpdate = [...state.mealList];
            mealListUpdate[index] = action.meal;
            state.mealList = mealListUpdate;
          }
        }else{
            //ADD
          let mealAdd = { ...action.meal , id: Math.random()};
          state.mealList = [...state.mealList, mealAdd];

        
          }
        return { ...state };

      case ActionType.EDIT_M:
          state.mealEdit = action.meal;
          return { ...state };
      
      case ActionType.DELETE_M:
      
        let index = state.mealList.findIndex(meal => {
        return meal.id === action.meal.id;
      });
      if(index !== -1){
        let mealListUpdate = [...state.mealList];
        mealListUpdate.splice(index,1);
        state.mealList = mealListUpdate;
      }
      
      return { ...state };
    

      default:
        return state;//{ ...state };
    }
  };

  export default mealReducer;
    