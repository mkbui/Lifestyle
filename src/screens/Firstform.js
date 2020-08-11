import React, { Component } from "react";
import {StyleSheet, Alert} from 'react-native';
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
  Form,
  Item,
  Input,
  Label,
  Picker,
} from "native-base";
import PropTypes from 'prop-types';

import {connect} from "react-redux";
import {createUser, calculateInfo, createNewDaily} from "../actions";
import {initializeReminders} from "../utils";

const  mapDispatchToProps = dispatch => {
  return {
    createUser: (name, initInfo) => dispatch(createUser(name, initInfo)),
    calculateInfo: (info) => dispatch(calculateInfo(info)),
    createNewDaily: () => dispatch(createNewDaily()),
  }
}

/* First user personal info management, will be initialized once only */
/* Currently asking for name, height, weight, gender, may extend more later on */

/* Single user name input form */
class UsernameForm extends Component {

  state = {
    userText: '' ,
  }

  handlePress = () => {
    const {saveUsername} = this.props;
    const {userText} = this.state;
    if (!userText.trim().length/*userText === ''*/){
      Alert.alert(
        "Warning",
        "Your name should not be a blank string",
        [
          { text: "OK"}
        ],
        { cancelable: false }
      );
    }
    else {
      saveUsername({userText});
    }
  }
  
  render(){
    return(
      <Content padder>
        <Text style = {styles.headerText}>FIRST STEP</Text>
        <Text style = {styles.contentText}>
          Let's get to know something about you first
        </Text>
        <Form>
          <Item stackedLabel>
            <Label>What should we call you?</Label>
            <Input 
              placeholder = "Username"
              onChangeText = { (text) => this.setState({userText: text})}
            />
          </Item>
        </Form>
        <Button 
          block  
          style={{ margin: 15, marginTop: 50 }}
          onPress = {this.handlePress}  
        >
          <Text>NEXT</Text>
        </Button>
      </Content>        
    ) 
  }

}

/* Fitness Information Inquiry with height, weight, gender */
class FitnessForm extends Component {

  state = {
    age: '',
    height: '',
    weight: '',
    money: '',
    gender: "",
  }

  handlePress = () => {
    const {saveUserInfo} = this.props;
    const {age, height, weight, gender, money} = this.state;
    ageN = parseFloat(age); heightN = parseFloat(height); weightN = parseFloat(weight);
    moneyN = parseFloat(money);
    if (Number.isInteger(ageN) === false || ageN < 0 || isNaN(ageN)){
      Alert.alert(
        "Warning",
        "Please enter valid age as a positive integer",
        [
          { text: "OK"}
        ],
        { cancelable: false }
      );
    }
    else {if (!Number.isInteger(heightN)|| !Number.isInteger(weightN)
      || parseInt(heightN, 10) < 0 || parseInt(weightN, 10) < 0 || isNaN(heightN) || isNaN(weightN)){
      Alert.alert(
        "Warning",
        "Please enter valid height and weight as positive integer",
        [
          { text: "OK"}
        ],
        { cancelable: false }
      );
    }

    else {if (isNaN(moneyN) === true){
      Alert.alert(
        "Warning",
        "Account must be a number",
        [
          { text: "OK"}
        ],
        { cancelable: false }
      );
    }

    else {if (gender === ''){
      Alert.alert(
        "Warning",
        "Please select your gender",
        [
          { text: "OK"}
        ],
        { cancelable: false }
      );
    }

    else{
      const userInfo = {
        age: parseInt(age, 10),
        height: parseInt(height, 10),
        weight: parseInt(weight, 10),
        gender: gender,
        money: parseFloat(money),
      }
      saveUserInfo(userInfo);
    }}}}
  }
  
  onGenderChoose(value){
    this.setState({gender: value})
  }

  render(){
    return(
      <Content padder>
        <Text style = {styles.headerText}>FIRST STEP</Text>
        <Text style = {styles.contentText}>
          Now you may want to enter some basic health information here
        </Text>
        <Form>
          <Item stackedLabel>
            <Label>Age</Label>
            <Input 
              placeholder = "Enter your age in number"
              onChangeText = { (text) => this.setState({age: text})}
              maxLength = {3}
            />
          </Item>
          <Item stackedLabel>
            <Label>Height</Label>
            <Input 
              placeholder = "Your height in rounded cm"
              onChangeText = { (text) => this.setState({height: text})}
              maxLength = {4}
            />
          </Item>
          <Item stackedLabel>
            <Label>Weight</Label>
            <Input 
              placeholder = "Your weight in rounded kg"
              onChangeText = { (text) => this.setState({weight: text})}
              maxLength = {4}
            />
          </Item>
          <Item stackedLabel>
            <Label>Money</Label>
            <Input 
              placeholder = "Your current account balance in VND"
              onChangeText = { (text) => this.setState({money: text})}
              maxLength = {20}
            />
          </Item>
          <Item picker >
            <Picker
              mode="dropdown" 
              iosIcon={<Icon name="ios-arrow-down" />}
              style={{ paddingTop: 70, height: 60, }}
              placeholder="Choose your gender"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.gender}
              onValueChange={this.onGenderChoose.bind(this)}
            >
              <Item style={{ color: "#bfc6ea" }} label="Choose your gender" value = ""/>
              <Item label="Male" value="male" />
              <Item label="Female" value="female" />
            </Picker>
            </Item>
        </Form>
        <Button 
          block  
          style={{ margin: 15, marginTop: 50 }}
          onPress = {this.handlePress}  
        >
          <Text>COMPLETE</Text>
        </Button>
      </Content>        
    ) 
  }

}

/* Component screen for first form with store interaction */
class FirstformScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      step: 0,
      name: 'Default',
      initInfo: {
        height: 100,
        weight: 100,
        age: 10,
        gender: '',
        money: 0.0,
      },
    };
  
  }

  /* Class function for saving username to from child screen to state temporarily */
  saveUsername = ({userText}) => {
    const {step} = this.state;
    this.setState({...this.state, step: step + 1, name: userText});
    //this.props.navigation.navigate('Home');
  }

  /* Class function for saving fitness info to from child screen to state temporarily */
  saveUserInfo = (userInfo) => {
    const {step, initInfo} = this.state;
    const {height, weight, age, gender, money} = userInfo;
    this.setState( prevState => ({
      step: step + 1, 
      initInfo: {
        ...prevState.initInfo,
        height: height,
        weight: weight,
        age: age,
        gender: gender,
        money: money
      }
    }), this.callSave.bind(this))
  }

  /* Dispatch function for saving state info to store permanently via redux */
  callSave(){
    const {name, initInfo} = this.state;
    this.props.createUser(name, initInfo);    // dispatch function call, refer to mapDispatchToProps
    this.props.calculateInfo(initInfo);
    initializeReminders();
    this.props.navigation.navigate('Home');
  }

 

  render() {
    const {step} = this.state;
    return (
      <Container style={styles.container}>
        {(step === 0) ?
        <UsernameForm saveUsername = {this.saveUsername} />
        : <FitnessForm saveUserInfo = {this.saveUserInfo}/>}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',

  },
  headerText:{
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
  },
  contentText:{
    textAlign: 'center',
    fontSize: 15,
    marginTop: 20,
    marginBottom: 50,
  },
});

export default connect(null, mapDispatchToProps)(FirstformScreen);
