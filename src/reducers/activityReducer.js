import {
  ADD_ACTIVITY,
  REMOVE_ACTIVITY,
  ACTIVATE_ACTIVITY,
} from '../actions';


const initialState = {
  activity: []
}

/* state is an array, for activity list only */
export function activityOperate(state = initialState.activity, action){
  switch (action.type){
    case ADD_ACTIVITY:
      return [
          ...state,
          action.activity
        ]
      
    case REMOVE_ACTIVITY:
      return state.filter((item) =>
          item.id !== action.id
        )
    case ACTIVATE_ACTIVITY:
      return state.map(item =>
          item.id === action.id ? {...item, activate: !item.activate} : item
        )
    default: 
      return state
  }
}




