import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import {Content, Button, Text, Form, Item, Label, Input} from 'native-base';


import DatePicker from 'react-native-datepicker';
import * as actions from "../../../../../actions"
import {connect} from 'react-redux';
import moment from 'moment';



var icon_close = '../../../../../../assets/close_icon.png';

const DATA = [
  {
    id: 9,
    src: require('../../../../../../assets/salary_icon.png'),
    title: 'Salary',
  },
  {
    id: 10,
    src: require('../../../../../../assets/award_icon.png'),
    title: 'Awards',
  },
  {
    id: 11,
    src: require('../../../../../../assets/investment_icon.png'),
    title: 'Investment',
  },
  {
    id: 12,
    src: require('../../../../../../assets/grant-icon.png'),
    title: 'Grants',
  },
  {
    id: 13,
    src: require('../../../../../../assets/rental_icon.png'),
    title: 'Rental',
  },
  {
    id: 14,
    src: require('../../../../../../assets/other_icon.png'),
    title: 'Others',
  },
];

class Income extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //defauilt value of the date time
      id: '',
      date: moment().format('DD-MM-YYYY'),
      note: '',
      amount: '',
      type: 'Income',
      category: '',
      categoryImage: '',
      checkedIndex: '',
    };
  }
    // disable back button when navigate edit
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {return true});
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
    }else if (isNaN(Number(this.state.amount))) {
      alert('Amount must be a number !!!');
    } else {
      var currentDate = moment().format('DD-MM-YYYY');
      this.props.onSubmit(this.state);
      if(this.state.date === currentDate){
        this.props.submitIncomeRecord(this.state);
        
      }
     
      this.setState({
        id: '',
        date: currentDate,
        note: '',
        amount: 0,
        type: 'Income',
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
            <View style={{alignItems: 'center',  marginTop:30}}>
              <Text style={styles.editTitle}>EDIT INCOME</Text>
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
                // ... You can check the source to find the other keys.
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
                style={styles.textInput}
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
              
                style={styles.textInput}
                placeholder="Enter the income here..."
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
    {DATA.map(item =>{ if(item.id <= 11) return(this.category(item))  })}
    </View>
    <View style={{flexDirection:"row" ,marginLeft:-10}}>
    {DATA.map(item =>{ if(item.id  > 11) return(this.category(item))  })}
    </View>
    
        {/* BUTTON FOR EDIT FORM */}
        {this.props.budgetEdit ? (
          <View style={styles.viewbtnEdit}>
             <Button
              block
              style={styles.btnEdit}
              onPress={() => {
                this.props.navigation.goBack(), this.props.deleteBudgetEdit()
              }}>
              <Text>CLOSE</Text>
            </Button>
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
      dispatch(actions.editRecord(null));
    },
    submitIncomeRecord: (iRecord) => {
      dispatch(actions.addIncomeRecord(iRecord));
    },
  };
};

const mapStateToProps = state => {
  return {
    budgetEdit: state.budgetReducer.budgetEdit,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Income);

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
 
  textInput: {
    height: 45,
    width: 360,
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
    color: '#3C4FBB',
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
