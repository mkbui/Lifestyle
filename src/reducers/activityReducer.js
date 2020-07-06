import {
  ADD_ACTIVITY,
  REMOVE_ACTIVITY,
  ACTIVATE_ACTIVITY,
  MODIFY_ACTIVITY_NAME,
  MODIFY_ACTIVITY_TIME,
  // MODIFY_ACTIVITY_REPEAT
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
    case MODIFY_ACTIVITY_NAME:
      return state.map(item =>
          item.id === action.id ? {...item, name: action.name} : item
        )
    case MODIFY_ACTIVITY_TIME:
      return state.map(item =>
          item.id === action.id ? {...item, hour: action.hour, min: action.min} : item
        )
    //   case MODIFY_ACTIVITY_REPEAT:
    //     return state.map(item =>
    //         item.id === action.id ? {...item, repeat: action.repeat} : item
    //       )
    default: 
      return state
  }
}
