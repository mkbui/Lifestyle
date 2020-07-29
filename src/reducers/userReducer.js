import {
  CREATE_USER, 
  CALCULATE_INFO, 
  SAVE_CURRENCY,
  CREATE_NEW_DAILY,
  UPDATE_DAILY_RECORD,
  ADD_CONSUME_RECORD,
  ADD_EXERCISE_RECORD,
  ADD_EXPENSE_RECORD,
  ADD_INCOME_RECORD,
  ADD_WATER_RECORD,
  DELETE_INCOME_RECORD,
  DELETE_EXPENSE_RECORD,
  DELETE_EXERCISE_RECORD,
  DELETE_CONSUME_RECORD
 
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

  Currency: '₫',

  Measure: {
    BMI: 20.0,
    BMR: 1600.0,
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
        ...state,
        Info: {
          ...state.Info,
          name: action.name,
          age: action.initInfo.age,
          height: action.initInfo.height,
          weight: action.initInfo.weight,
          gender: action.initInfo.gender,
          money: action.initInfo.money,
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

    case SAVE_CURRENCY:
      return Object.assign({}, state, {
        ...state,
        Currency: action.cur
      })

    case CREATE_NEW_DAILY:
      const todays = getDateString();
      return Object.assign({}, state, {
        Info: {
          ...state.Info,
          money: state.Info.money + state.DailyRecord.Finance.earned.sum - state.DailyRecord.Finance.spent.sum,
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
            updated: false,
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

    case  ADD_WATER_RECORD:
      return Object.assign({}, state, {
        ...state,
        DailyRecord: {
          ...state.DailyRecord,
          Fitness: {
            ...state.DailyRecord.Fitness,
            updated: true,
            waterConsumed: action.water,
          }
        }
      })
    case  ADD_CONSUME_RECORD:   
      return Object.assign({}, state, {
        ...state,
        DailyRecord: {
          ...state.DailyRecord,
          Fitness: {
            ...state.DailyRecord.Fitness,
            updated: true,
            energyConsumed:  state.DailyRecord.Fitness.energyConsumed + Number(action.consume),
          }
          
        }
      })
      case  DELETE_CONSUME_RECORD:   
      return Object.assign({}, state, {
        ...state,
        DailyRecord: {
          ...state.DailyRecord,
          Fitness: {
            ...state.DailyRecord.Fitness,
            updated: true,
            energyConsumed:  state.DailyRecord.Fitness.energyConsumed - Number(action.consume),
          }
          
        }
      })

    case  ADD_EXERCISE_RECORD:   
      return Object.assign({}, state, {
        ...state,
        DailyRecord: {
          ...state.DailyRecord,
          Fitness: {
            ...state.DailyRecord.Fitness,
            updated: true,
            energyBurned:  state.DailyRecord.Fitness.energyBurned + Number(action.burn),
          }
          
        }
      })

    case  DELETE_EXERCISE_RECORD:   
    return Object.assign({}, state, {
      ...state,
      DailyRecord: {
        ...state.DailyRecord,
        Fitness: {
          ...state.DailyRecord.Fitness,
          energyBurned:  state.DailyRecord.Fitness.energyBurned - Number(action.burn),
        }
        
      }
    })
      
    case ADD_INCOME_RECORD:
      const iRecord = action.iRecord;
      prevDetail = []
      if (state.DailyRecord.Finance.earned.detail) prevDetail = state.DailyRecord.Finance.earned.detail
      if (iRecord.amount > 0) return Object.assign({}, state, {
        ...state,
        DailyRecord: {
          ...state.DailyRecord,
          Finance: {
            ...state.DailyRecord.Finance,
            earned: {
              sum: state.DailyRecord.Finance.earned.sum + parseInt(iRecord.amount, 10),
              detail: [
                ...prevDetail,
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

    case DELETE_INCOME_RECORD:
    return Object.assign({}, state, {
      ...state,
      DailyRecord: {
        ...state.DailyRecord,
        Finance: {
          ...state.DailyRecord.Finance,
          earned: {
            sum: state.DailyRecord.Finance.earned.sum - parseInt(action.iRecord.amount, 10),
            
            detail: state.DailyRecord.Finance.earned.detail.filter(iRecord =>{
                iRecord.id !== action.iRecord.id
              })
              
            
          }
        },
      }
    })

    
    case ADD_EXPENSE_RECORD:
      const eRecord = action.eRecord;
      prevDetail = []
      if (state.DailyRecord.Finance.spent.detail) prevDetail = state.DailyRecord.Finance.spent.detail
      if (eRecord.amount > 0) return Object.assign({}, state, {
        ...state,
        DailyRecord: {
          ...state.DailyRecord,
          Finance: {
            ...state.DailyRecord.Finance,
            spent: {
              sum: state.DailyRecord.Finance.spent.sum + parseInt(eRecord.amount, 10),
              detail: [,
                {
                  ...prevDetail,
                  amount: eRecord.amount,
                  note: eRecord.note,
                  category: eRecord.category,
                }
              ]
            }
          },
        }
      })

    case DELETE_EXPENSE_RECORD:
      return Object.assign({}, state, {
        ...state,
        DailyRecord: {
          ...state.DailyRecord,
          Finance: {
            ...state.DailyRecord.Finance,
            spent: {
              sum: state.DailyRecord.Finance.spent.sum - parseInt(action.iRecord.amount, 10),
              
              detail:state.DailyRecord.Finance.spent.detail.filter(iRecord =>{
                  iRecord.id !== action.iRecord.id
                })
            }
          },
        }
      })

    default:
      return state;
  }
}