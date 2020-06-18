import React, { Component } from "react";
import {StyleSheet, Image, ToastAndroid} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
  Fab,
  IconNB,
  View,
  Card,
  CardItem,
  Thumbnail,
  Segment,
  Input,
  Picker,
  Label,
  Form,
  Item,
} from "native-base";
import {getDateString} from "../../utils";

import {connect} from "react-redux";
import {createNewDaily, addIncomeRecord, addExpenseRecord} from '../../actions';
import FormButton from '../FormButton';

import {userAccess} from "../../reducers/userReducer"

/* Image importing section */
const default_image = require('../../../assets/default_image.png');
const heart = require('../../../assets/heart.png');
const finance = require('../../../assets/finance.png');

const today = getDateString();

function mapStateToProps(state) {
  return{
    userInfo: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createNewDaily: () => dispatch(createNewDaily()),
    addIncomeRecord: (iRecord) => dispatch(addIncomeRecord(iRecord)),
    addExpenseRecord: (eRecord) => dispatch(addExpenseRecord(eRecord))
  }
}

class IncomeForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      amount: 0,
      note: '',
      category: 'general',
      
    }
    console.log(this.state)
  };

  onCatChange = (value) => {
    this.setState({
      category: value,
    })
  };

  handlePress = () => {
    //const {amount, note, category} = this.state.;
    const records = {
      amount: this.state.amount,
      note: this.state.note,
      category: this.state.category,
    }
    this.setState({
      amount: 0,
      note: '',
      category: 'general',
    },)
    console.log(records);
    this.props.submit(records);
  }

  render(){
    return (
      <Content padder>
        

        <Form>
          <Item stackedLabel>
            <Label>Amount</Label>
            <Input 
              placeholder = "Income amount in your currency"
              onChangeText = { (value) => this.setState({amount: value} )}
            />
          </Item>
          <Item stackedLabel>
            <Label>Note</Label>
            <Input 
              placeholder = "Description"
              onChangeText = { (text) => this.setState( {note: text} )}
              value = {this.state.note}
            />
          </Item>
          <Item picker >
            <Picker
              mode="dropdown" 
              iosIcon={<Icon name="ios-arrow-down" />}
              style={{ paddingTop: 70, height: 60, }}
              placeholder="Choose your type of income"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.category}
              onValueChange={this.onCatChange.bind(this)}
            >
              <Item style={{ color: "#bfc6ea" }} label="Category" value = "general"/>
              <Item label="Account deposit" value="deposit" />
              <Item label="Salary reception" value="salary" />
              <Item label="Interest" value="interest" />
              <Item label="Lottery win" value="lottery" />
              <Item label="Others" value = "others" />
            </Picker>
            </Item>
        </Form>
        <Button 
          block  
          style={{ margin: 15, marginTop: 50 }}
          onPress = {this.handlePress.bind(this)}  
        >
          <Text>SUBMIT RECORD</Text>
        </Button>
      </Content>
    )
  }
}

class ExpenseForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      amount: 0,
      note: '',
      category: 'general',
    }
  };  

  onCatChange = (value) => {
    this.setState({
      category: value,
    })
  };

  handlePress = () => {
    const records = {
      amount: this.state.amount,
      note: this.state.note,
      category: this.state.category,
    }
    this.setState({
      amount: 0,
      note: '',
      category: 'general',
    })
    console.log(records);
    this.props.submit(records);
  }

  render(){
    return (
      <Content padder>
  
        <Form>
          <Item stackedLabel>
            <Label>Amount</Label>
            <Input 
              placeholder = "Spending amount in your currency"
              onChangeText = { (text) => this.setState({amount: text} )}
            />
          </Item>
          <Item stackedLabel>
            <Label>Note</Label>
            <Input 
              placeholder = "Description"
              onChangeText = { (text) => this.setState( {note: text} )}
            />
          </Item>
          <Item picker >
            <Picker
              mode="dropdown" 
              iosIcon={<Icon name="ios-arrow-down" />}
              style={{ paddingTop: 70, height: 60, }}
              placeholder="Choose your type of income"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.category}
              onValueChange={this.onCatChange.bind(this)}
            >
              <Item style={{ color: "#bfc6ea" }} label="Category" value = "general"/>
              <Item label="Food" value="food" />
              <Item label="Transport" value="transport" />
              <Item label="Shopping" value="shopping" />
              <Item label="Utilities" value="utilities" />
              <Item label="Tax" value="tax" />
              <Item label="Education" value="education" />
              <Item label="Others" value = "others" />
            </Picker>
            </Item>
        </Form>
        <Button 
          block  
          style={{ margin: 15, marginTop: 50 }}
          onPress = {this.handlePress.bind(this)}  
        >
          <Text>SUBMIT RECORD</Text>
        </Button>
      </Content>
    )
  }
}

class FinanceTracker extends Component {

  constructor(props){
    super(props);
    this.state = {
      seg: 1,
      expandedIncome: false,
      expandedExpense: false,
    }
    
    console.log(this.props.userInfo.DailyRecord)
    //console.log(this.props.userInfo);
  }
  
  collapseIncomeForm(){
    this.setState({
      expandedIncome: !this.state.expandedIncome
    });
  }

  collapseExpenseForm(){
    this.setState({
      expandedExpense: !this.state.expandedExpense
    });
  }

  submitIncome(record){
    console.log(record);
    this.props.addIncomeRecord(record);
    ToastAndroid.show(
      "Record added successfully!",
      ToastAndroid.SHORT
    )
    this.collapseIncomeForm();
    //console.log(this.props.userInfo.DailyRecord);
  }

  submitExpense(record){
    this.props.addExpenseRecord(record);
    ToastAndroid.show(
      "Record added successfully!",
      ToastAndroid.SHORT
    )
    this.collapseExpenseForm();
    //console.log(this.props.userInfo.DailyRecord);
  }

  render() {
    const {userInfo} = this.props;
    const {seg, expandedIncome, expandedExpense} = this.state;
    return (
      <Container style={styles.container}>
        <Header>
          <Left style = {{flex: 0.5}}>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body style = {{flex: 1}}>
            <Title style={styles.headerText}>Finance Tracker</Title>
          </Body>
          <Right style = {{flex: 0.5}}>
            <Button 
              transparent 
              onPress={() => this.props.navigation.goBack()}>
              <Icon name = "arrow-back" />
            </Button>
          </Right>
        </Header>

        <Segment>
          <Button
            first
            style = {styles.segButton}
            active={this.state.seg === 1 ? true : false}
            onPress={() => this.setState({ seg: 1 })}
          >
            <Text>Income</Text>
          </Button>
          <Button
          style = {styles.segButton}
            active={this.state.seg === 2 ? true : false}
            onPress={() => this.setState({ seg: 2 })}
          >
            <Text>Expense</Text>
          </Button>
        </Segment>

        
        <Text style = {styles.formTitleText}>PERSONAL {seg === 1 ? 'INCOME' : 'EXPENSE'} MANAGEMENT</Text>

        {seg === 1 &&         
          <FormButton
            title = {expandedIncome?'Cancel':"Add new earning record"}
            handlePress = {this.collapseIncomeForm.bind(this)}
            color = {expandedIncome?'red':'green'}
          />
        }

        {seg === 2 &&      
          <FormButton
            title = {expandedExpense?'Cancel':"Add new spending record"}
            handlePress = {this.collapseExpenseForm.bind(this)}
            color = {expandedExpense?'red':'green'}
          />
        }

        {seg === 1 && expandedIncome && <IncomeForm submit= {this.submitIncome.bind(this)}/>}
        {seg === 2 && expandedExpense && <ExpenseForm submit = {this.submitExpense.bind(this)}/>}

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  headerText: {
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  formTitleText:{
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  mb: {
    color: 'peachpuff',
    marginBottom: 20,
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardText: {
    fontWeight: '800',
    fontSize: 16,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FinanceTracker);
