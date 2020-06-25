import {
  CREATE_USER, 
  CALCULATE_INFO, 
  CREATE_NEW_DAILY,
  UPDATE_DAILY_RECORD,
  ADD_CONSUME_RECORD,
  ADD_EXERCISE_RECORD,
  ADD_EXPENSE_RECORD,
  ADD_INCOME_RECORD,
} from "../actions";
import {getDateString} from "../utils"

const today = getDateString();

/* User initial info, consisting of personal figure and records */
/* Might consider moving records to a new reducer soon */
const User = {
  Info: {
    name: 'A',
    age: 20,
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

  // Records: currently not used, migrating to exerciseReducer, mealReducer and budgetReducer
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
      updated: false,
    },
    Finance: {
      date: today,
      spent: {
        sum: 0,
        detail: [

        ]
      },
      earned: {
        sum: 0,
        detail: [
        ]
      },
      updated: true,
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
        Info: {
          ...state.Info,
          weight: state.DailyRecord.Fitness.weight,
          money: state.Info.money + state.DailyRecord.Finance.earned - state.DailyRecord.Finance.spent.sum,
        },
        FitnessRecord: [
          ...state.FitnessRecord,
          state.DailyRecord.Fitness,
        ],
        FinanceRecord: [
          ...state.FinanceRecord,
          state.DailyRecord.Finance,
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
            spent: {
              sum: 0,
              detail: [],
            },
            earned: {
              sum: 0,
              detail: [],
            }
          },
        }
      })
      
    case UPDATE_DAILY_RECORD: 
      return Object.assign({}, state, {
        ...state,
        DailyRecord: {
          ...state.DailyRecord,
          Fitness: {
            ...state.DailyRecord.Fitness,
            updated: true,
          }
        }
      })

    case ADD_INCOME_RECORD:
      const iRecord = action.iRecord;
      if (iRecord.amount > 0) return Object.assign({}, state, {
        ...state,
        DailyRecord: {
          ...state.DailyRecord,
          Finance: {
            ...state.DailyRecord.Finance,
            earned: {
              sum: state.DailyRecord.Finance.earned.sum + parseInt(iRecord.amount, 10),
              detail: [
                ...state.DailyRecord.Finance.earned.detail,
                {
                  amount: iRecord.amount,
                  note: iRecord.note,
                  category: iRecord.category,
                }
              ]
            }
          },
        }
      })

      
      case ADD_EXPENSE_RECORD:
        const eRecord = action.eRecord;
        if (eRecord.amount > 0) return Object.assign({}, state, {
          ...state,
          DailyRecord: {
            ...state.DailyRecord,
            Finance: {
              ...state.DailyRecord.Finance,
              spent: {
                sum: state.DailyRecord.Finance.spent.sum + parseInt(eRecord.amount, 10),
                detail: [
                  ...state.DailyRecord.Finance.spent.detail,
                  {
                    amount: eRecord.amount,
                    note: eRecord.note,
                    category: eRecord.category,
                  }
                ]
              }
            },
          }
        })

    default:
      return state;
  }
}