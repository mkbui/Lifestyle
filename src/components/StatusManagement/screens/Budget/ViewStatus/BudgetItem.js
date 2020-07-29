// props change does not re-render
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

import {Button, Text} from 'native-base';
import {SwipeRow} from 'react-native-swipe-list-view';
import * as actions from '../../../../../actions';
import {connect} from 'react-redux';
import moment from 'moment';

class BudgetItem extends Component {
  constructor(props) {
    super(props);
  }
  
  ////  Function cal total income expense in day

  calIncome = () => {
    const {budgetList,item} = this.props;
    var incomeTotal = 0;
    {
      budgetList.map(budget => {
        if (
          budget.type === 'Income' &&
          budget.date
            .split('-')
            .reverse()
            .join('-') === item.date
        ) {
          incomeTotal += Number(budget.amount);
        }
      });
    }
    return incomeTotal;
  }
  calExpense = () => {
    const {budgetList,item} = this.props;
    var expenseTotal = 0;
    {
      budgetList.map(budget => {
        if (
          budget.type === 'Expense' &&
          budget.date
            .split('-')
            .reverse()
            .join('-') === item.date
        ) {
          expenseTotal += Number(budget.amount);
        }
      });
    }
    return expenseTotal;
  }
  calTotal = () => {
    var income = this.calIncome();
    var expense =  this.calExpense();
    var total = Number(income) - Number(expense);
    return total;
  }

  
  render() {
    const {item, firstItemInDay} = this.props;

    // Item 
    const Item = () => {
      return (
          <SwipeRow
            key={item.id}
            rightOpenValue={-150}
            style={styles.swipeRow}
            closeOnRowPress={true}
            disableRightSwipe={true}>
              
            <View style={styles.rowBack}>

              {/* Edit button */}
              <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => {
                  this.props.edit(item);
                 {
                    item.date === moment().format('YYYY-MM-DD')
                    ?  this.props.editRecord(item)
                    : null
                 }
                 
                  {
                    item.type === 'Income'
                      ? this.props.navigation.push('Income')
                      : this.props.navigation.push('Expense');
                  }
                }}>
                <Text style={styles.backTextWhite}>Edit</Text>
              </TouchableOpacity>

              {/* Delete button */}
              <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => {
                  this.props.delete(item);
                  {
                    item.date === moment().format('YYYY-MM-DD')
                    ?
                      item.type === "Income"
                      ? this.props.deleteIncomeRecord(item)
                      : this.props.deleteExpenseRecord(item)
                    
                    :null
                  }
                }}>
                <Text style={styles.backTextWhite}>Delete</Text>
              </TouchableOpacity>

            </View>

             {/* Item Row   */}
            <TouchableHighlight style={styles.rowFront}>
              <View style={{flexDirection: 'row'}}>
                <Image source={item.categoryImage} style={styles.image} />

                <View style={styles.itemRow}>
                  <Text>{item.category}</Text>
                  <Text note numberOfLines={1}>
                    {item.note}
                  </Text>
                </View>
                <Button transparent>
                  <Text
                    style={
                      item.type === 'Income'
                        ? styles.incomeText
                        : styles.expenseText
                    }>
                    {item.amount}
                  </Text>
                </Button>
              </View>
            </TouchableHighlight>
          </SwipeRow>

      
      );
    };

    
    if (firstItemInDay) {
      return (
        <>
        {/* Calculate total in day */}
          <View
            style={styles.viewCal}>
            <View
              style={styles.viewTotal}>
              <Text style={styles.text}>Income </Text>
              <Text style={styles.text}>Expense</Text>
              <Text style={styles.text}>Total </Text>
            </View>
            <View
              style={styles.viewTotal}>
              <Text style={styles.incomeText}> {this.calIncome()}</Text>
              <Text style={styles.expenseText}> { this.calExpense()}</Text>
              <Text style={styles.totalText}>{ this.calTotal()}</Text>
            </View>
          </View>

          <Item />
        </>
      );
    } else {
      return (
        <>
          <Item />
        </>
      );
    }
  }
}
const mapDisaptchToProps = dispatch => {
  return {
    //key: value
    edit: budget => {
      dispatch(actions.actEditBudget(budget));
    },

    delete: budget => {
      dispatch(actions.actDeleteBudget(budget));
    },

    deleteIncomeRecord: (iRecord) => {
      dispatch(actions.deleteIncomeRecord(iRecord));
    },
    deleteExpenseRecord: (iRecord) => {
      dispatch(actions.deleteExpenseRecord(iRecord));
    },
    editRecord: (edit) => {
      dispatch(actions.editRecord(edit));
    },
    

    
  };
};

const mapStateToProps = state => {
  return {
    budgetList: state.budgetReducer.budgetList,
  };
};
export default connect(mapStateToProps, mapDisaptchToProps)(BudgetItem);

const styles = StyleSheet.create({

  image: {
    height: 45,
    width: 45,
    marginLeft: 15,
  },

  incomeText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'green',
  },
  expenseText: {
    fontSize: 15,
    fontWeight: 'bold',

    color: 'red',
  },
  totalText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'orange',
  },
  text: {
    fontSize: 15,
    color: 'grey',
  },

  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 0.7,
    justifyContent: 'center',
    height: 60,
    flexDirection: 'row',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#F1F4F5',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: '#FDC02E',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: '#D93649',
    right: 0,
  },
  swipeRow: {
    width: 320,
    margin: 2,
    elevation: 6,
    borderRadius: 28,
    marginBottom: 3,
    backgroundColor: 'rgba(231,76,60,1)',
  },
  viewCal:{
      backgroundColor: '#E4EEE0',
      width: 320,
      margin: 2,
      borderColor: 'grey',
      borderWidth: 1,
      height: 50,
      justifyContent: 'center',
    
  },
  itemRow:{marginLeft: 30, marginTop: 5, flex: 1},
  viewTotal:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});