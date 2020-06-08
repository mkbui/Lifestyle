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
  Label
} from "native-base";
import PropTypes from 'prop-types';

import {connect} from "react-redux";
import {createUser} from "../actions";

class UsernameForm extends Component {

  state = {
    userText: '' ,
  }

  handlePress = () => {
    const {saveUsername} = this.props;
    const {userText} = this.state;
    saveUsername({userText});
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

class FitnessForm extends Component {

  state = {
    userInfo: {
      age: 1,
      height: 150,
      weight: 50,
    }
  }

  handlePress = () => {
    const {saveUserInfo} = this.props;
    const {userInfo} = this.state;
    saveUserInfo({userInfo});
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
              placeholder = "Enter you age in number"
              onChangeText = { (text) => this.setState({age: text})}
            />
          </Item>
          <Item stackedLabel>
            <Label>Height</Label>
            <Input 
              placeholder = "Your height in cm"
              onChangeText = { (text) => this.setState({height: text})}
            />
          </Item>
          <Item stackedLabel>
            <Label>Weight</Label>
            <Input 
              placeholder = "Your weight in kg"
              onChangeText = { (text) => this.setState({weight: text})}
            />
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

class FirstformScreen extends Component {
  state = {
    step: 0,
    name: '',
    initInfo: {
      height: 100,
      weight: 100,
      age: 10,
    },
  };

  saveUsername = ({userText}) => {
    const {step} = this.state;
    this.setState({step: step + 1, name: userText});
    //this.props.navigation.navigate('Home');
  }

  callSave(){
    const {dispatch} = this.props;
    const {name, initInfo} = this.state;
    dispatch(createUser(name, initInfo.age, initInfo.height));
  }

  saveUserInfo = ({userInfo}) => {
    const {step} = this.state;
    this.setState({step: step + 1, initInfo: userInfo});
    this.callSave();
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

export default connect()(FirstformScreen);
