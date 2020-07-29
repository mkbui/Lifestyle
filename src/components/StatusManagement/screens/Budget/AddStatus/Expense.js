import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import {Content, Button, Text, Form, Item, Label, Input} from 'native-base';

import DatePicker from 'react-native-datepicker';
import {connect} from 'react-redux';
import * as actions from '../../../../../actions';
import moment from 'moment';

var icon_close = '../../../../../../assets/close_icon.png';
const DATA = [
  {
    id: 0,
    src: require('../../../../../../assets/food_icon.png'),
    title: 'Food',
  },
  {
    id: 1,
    src: require('../../../../../../assets/health_icon.png'),
    title: 'Health',
  },
  {
    id: 2,
    src: require('../../../../../../assets/shopping_icon.png'),
    title: 'Shopping',
  },
  {
    id: 3,
    src: require('../../../../../../assets/car_icon.png'),
    title: 'Transport',
  },
  {
    id: 4,
    src: require('../../../../../../assets/house_icon.png'),
    title: 'Home',
  },
  {
    id: 5,
    src: require('../../../../../../assets/utilities_icon.png'),
    title: 'Utilities',
  },
  {
    id: 6,
    src: require('../../../../../../assets/book_icon.png'),
    title: 'Education',
  },
  {
    id: 7,
    src: require('../../../../../../assets/entertain_icon.png'),
    title: 'Entertain',
  },
  {
    id: 8,
    src: require('../../../../../../assets/other_icon.png'),
    title: 'Other',
  },
];

class Expense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      date: moment().format('DD-MM-YYYY'),
      note: '',
      amount: '',
      type: 'Expense',
      category: '',
      categoryImage: '',
      checkedIndex: '',
    };
  }

  componentDidMount() {
    const {budgetEdit} = this.props;
    if (budgetEdit) {
      this.setState({
        id: budgetEdit.id,
        date: budgetEdit.date.split('-').reverse().join('-'), //budgetEdit YYYY-MM-DD
        note: budgetEdit.note,
        amount: budgetEdit.amount,
        type: budgetEdit.type,
        category: budgetEdit.category,
        categoryImage: budgetEdit.categoryImage,
        checkedIndex: budgetEdit.checkedIndex,
      });
    } else {
      this.setState({
        date: moment().format('DD-MM-YYYY'),
      });
    }
  }

  handleOnChange = (text, name) => {
    this.setState({
      [name]: text,
    });
  };

  handleOnSubmit = () => {
    if (this.state.amount === '') {
      alert('Amount must not be empty !!!');
    } else if (this.state.checkedIndex === '') {
      alert('Please choose category !!!');
    } else {
      var currentDate = moment().format('DD-MM-YYYY');
      
      this.props.onSubmit(this.state);
      if(this.state.date === currentDate){
        this.props.submitExpenseRecord(this.state);
      }
      //Reset form when submit
      this.setState({
        id: '',
        date: currentDate,
        note: '',
        amount: '',
        type: 'Expense',
        category: '',
        categoryImage: '',
        checkedIndex: '',
      });
      ToastAndroid.show(
        "Record submitted!",
        ToastAndroid.SHORT
      )
    }
  };
  category = (item) => {
    return(
      <TouchableOpacity
      key={item.id}
        onPress={() =>
          this.setState({
            category: item.title,
            categoryImage: item.src,
            checkedIndex: item.id,
          })
        }
        style={[
          styles.item,
          {
            backgroundColor:
              this.state.checkedIndex === item.id ? 'yellow' : 'white',
          },
        ]}>
        <Image source={item.src} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <Content padder>
        {/* SHOW TITLE EDIT */}
        {this.props.budgetEdit ? (
          <View>
            <TouchableOpacity
              style={styles.btnClose}
              onPress={() => {
                this.props.navigation.goBack(), this.props.deleteBudgetEdit();
              }}>
              <Image source={require(icon_close)} style={styles.iconClose} />
            </TouchableOpacity>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.editTitle}>EDIT EXPENSE</Text>
            </View>
          </View>
        ) : null}

        {/* DATE SELECT */}
        <Form>
          <Item stackedLabel style={{borderColor: 'white'}}>
            <Label>Date:</Label>
            <DatePicker
              style={styles.datepicker}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="DD-MM-YYYY"
              minDate="01-1-1000"
              maxDate="01-1-3000"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 300,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: -30,
                },
              }}
              onDateChange={date => {
                this.setState({date: date});
              }}
              androidMode="spinner"
            />
          </Item>
        </Form>

        {/* NOTE INPUT */}
        <Form>
          <Item stackedLabel>
            <Label>Note:</Label>
            <Item regular style={{marginTop: 10}}>
              <Input
                style={{height: 45}}
                placeholder="Description here..."
                onChangeText={text => this.handleOnChange(text, 'note')}
                value={this.state.note}
                name="note"
              />
            </Item>
          </Item>
        </Form>

        {/* AMOUNT INPUT */}
        <Form>
          <Item stackedLabel>
            <Label>Amount:</Label>
            <Item regular style={{marginTop: 10}}>
              <Input
                keyboardType="numeric"
                style={{height: 45}}
                placeholder="Enter the expense here..."
                onChangeText={text => this.handleOnChange(text, 'amount')}
                value={this.state.amount}

              />
            </Item>
          </Item>
        </Form>

        {/* SELECT CATEGORY */}
        <Label style={{color: 'grey', fontSize: 20, margin: 10}}>
          Category:
        </Label>
        <View style={{flexDirection:"row" ,marginLeft:-10}}>
            {DATA.map(item =>{ if(item.id <= 2) return(this.category(item))  })}
        </View>
        <View style={{flexDirection:"row" ,marginLeft:-10}}>
            {DATA.map(item =>{ if( 2 < item.id && item.id <= 5) return(this.category(item))  })}
        </View>
        <View style={{flexDirection:"row" ,marginLeft:-10}}>
           {DATA.map(item =>{ if( 5 <item.id && item.id  <= 8) return(this.category(item))  })}
        </View>

        {/* BUTTON FOR EDIT FORM */}
        {this.props.budgetEdit ? (
          <View style={styles.viewbtnEdit}>
            <Button
              block
              style={styles.btnEdit}
              onPress={() => {
                this.handleOnSubmit();
                this.props.deleteBudgetEdit();
                this.props.navigation.goBack();
              }}>
              <Text>SUBMIT</Text>
            </Button>
            <Button
              block
              style={styles.btnEdit}
              onPress={() => {
                this.props.navigation.goBack(), this.props.deleteBudgetEdit();
              }}>
              <Text>CLOSE</Text>
            </Button>
          </View>
        ) : (
          <Button block style={styles.btnSubmit} onPress={this.handleOnSubmit}>
            <Text>SUBMIT</Text>
          </Button>
        )}
      </Content>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onSubmit: budget => {
      dispatch(actions.actSubmitBudget(budget));
    },
    deleteBudgetEdit: () => {
      dispatch(actions.actEditBudget(null));
    },
    submitExpenseRecord: (iRecord) => {
      dispatch(actions.addExpenseRecord(iRecord));
    },
  };
};


const mapStateToProps = state => {
  return {
    budgetEdit: state.budgetReducer.budgetEdit,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Expense);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  flatlist: {
    marginLeft: -10,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: 100,
    height: 100,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 13,
  },
  image: {
    height: 52,
    width: 52,
  },
  title: {
    fontSize: 10,
    textAlign: 'center',
    margin: 5,
  },
  button: {
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'orange',
    width: 150,
    height: 45,
    marginLeft: 220,
    marginTop: 10,
  },
  textbtn: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

  btnClose: {
    marginLeft: 330,
    marginTop: 20,
  },
  iconClose: {
    height: 30,
    width: 30,
  },
  editTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#ffbf00',
    marginBottom: 20,
  },
  datepicker: {
    width: 300,
    marginTop: 10,
  },
  viewbtnEdit: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnEdit: {
    margin: 15,
    marginTop: 50,
  },
  btnSubmit: {
    margin: 15,
    marginTop: 50,
  },
});

 {/* <SafeAreaView>
      <FlatList
        style={styles.flatlist}
        data={DATA}
        renderItem={({item}) => (
          <TouchableOpacity
          key={item.id}
            onPress={() =>
              this.setState({
                category: item.title,
                categoryImage: item.src,
                checkedIndex: item.id,
              })
            }
            style={[
              styles.item,
              {
                backgroundColor:
                  this.state.checkedIndex === item.id ? 'yellow' : 'white',
              },
            ]}>
            <Image source={item.src} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
        numColumns={3}
      />
    </SafeAreaView> */}