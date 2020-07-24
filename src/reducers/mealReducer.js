import * as ActionType from "../actions/ActionType";


let initialState = {
    mealList: [],
    mealEdit: null,
    waterList:[],
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

      case ActionType.SUBMIT_W:
        let i = state.waterList.findIndex(water => {
          return water.date === action.meal.date;
        });
        if (i !== -1) {
          //UPDATE EDIT
         
          if (i !== -1) {
            let waterListUpdate = [...state.waterList];
            waterListUpdate[index] = action.water;
            state.waterList = waterListUpdate;
          }
        }else{
            //ADD
          state.mealList = [...state.waterList, action.water];

          }
        return { ...state };
      default:
        return state;//{ ...state };
    }
  };

  export default mealReducer;
    