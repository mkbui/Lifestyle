import {CREATE_USER} from "../actions";

const User = {
  Info: {
    name: 'A',
    age: 1,
    height: 100,
    weight: 100,
    registered: false,
  },
  FitnessRecord: [

  ],
  FinanceRecord: [

  ],
}

export function userAccess(state = User, action){
  switch (action.type){
    case CREATE_USER:
      return {
        ...state,
        Info: {
          name: action.name,
          age: action.age,
          height: action.height,
          weight: 150,
          registered: true,
        }
      }
    default:
      return state;
  }
}