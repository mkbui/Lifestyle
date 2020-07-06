import * as ActionType from "../actions/ActionType";


let initialState = {
    exerciseList: [],
    exerciseEdit: null,
  };

  const exerciseReducer = (state = initialState, action) => {
    switch (action.type) {
   
      case ActionType.SUBMIT_E:
        if (action.exercise.id) {
          //UPDATE EDIT
          let index = state.exerciseList.findIndex(exercise => {
            return exercise.id === action.exercise.id;
          });
          if (index !== -1) {
            let exerciseListUpdate = [...state.exerciseList];
            exerciseListUpdate[index] = action.exercise;
            state.exerciseList = exerciseListUpdate;
            
          }
        }else{
            // ADD
          let exerciseAdd = { ...action.exercise , id: Math.random()};
          state.exerciseList = [...state.exerciseList, exerciseAdd];
         }
        return { ...state };
  
      case ActionType.EDIT_E:
          state.exerciseEdit = action.exercise;
          return { ...state };
      
      case ActionType.DELETE_E:
        let index = state.exerciseList.findIndex(exercise => {
        return exercise.id === action.exercise.id;
        });
        if(index !== -1){
          let exerciseListUpdate = [...state.exerciseList];
          exerciseListUpdate.splice(index,1);
          state.exerciseList = exerciseListUpdate;
        }
      return { ...state };
      
      default:
        return state;//{ ...state };
    }
  };
  
  export default exerciseReducer;
  