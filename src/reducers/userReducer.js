import {CREATE_USER, CALCULATE_INFO, CREATE_NEW_DAILY} from "../actions";
import {getDateString} from "../utils"

const today = getDateString();

const User = {
  Info: {
    name: 'A',
    age: 1,
    height: 100,
    weight: 100,
    gender: '',
    registered: false,
    money: 0,
  },

  Measure: {
    BMI: 20,
    BMR: 1600,
  },

  FitnessRecord: [

  ],
  FinanceRecord: [

  ],
  
  DailyRecord: {
    date: today,
    Fitness: {
      date: today,
      waterConsumed: 0,
      energyConsumed: 0,
      energyBurned: 0,
      weight: 100,
    },
    Finance: {
      date: today,
      spent: 0,
      earned: 0,
    }
  }
}

export function userAccess(state = User, action){
  switch (action.type){
    case CREATE_USER:
      /*return {
        ...state,
        Info: {
          name: action.name,
          age: action.age,
          height: action.height,
          weight: 150,
          registered: true,
        }
      }*/
      return Object.assign({}, state, {
        Info: {
          name: action.name,
          age: action.initInfo.age,
          height: action.initInfo.height,
          weight: action.initInfo.weight,
          gender: action.initInfo.gender,
          registered: true,
        }
      })

    case CALCULATE_INFO: 
      const Info = action.info;
      const {height, weight, age, gender} = Info;

      return Object.assign({}, state, {
        Measure: {
          BMI: Info.weight / (height*height/10000.0),
          BMR: (10.0*weight + 6.25*height- 5.0*age + (gender == 'male'?5:-161))*1.4,
        }
      })

    case CREATE_NEW_DAILY:
      const todays = getDateString();
      return Object.assign({}, state, {
        FitnessRecord: [
          ...state.FitnessRecord,
          state.DailyRecord.Fitness,
        ],
        FinanceRecord: [
          ...state.FinanceRecord,
          state.DailyRecord.FinanceRecord,
        ],
        DailyRecord: {
          date: todays,
          Fitness: {
            date: todays,
            waterConsumed: 0,
            energyConsumed: 0,
            energyBurned: 0,
            weight: state.Info.weight,
          },
          Finance: {
            date: todays,
            spent: 0,
            earned: 0,
          },
        }
      })
      

    default:
      return state;
  }
}