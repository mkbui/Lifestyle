import React, { Component } from "react";
import {StyleSheet} from 'react-native';
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

class FirstformScreen extends Component {
  state = {
    step: 0,
    name: '',
    initInfo: {
      height: 100,
      weight: 100,
      age: 10,
      gender: '',
    },
  };

  saveUsername = ({userText}) => {
    const {step} = this.state;
    this.setState({step: step + 1, name: userText});
    this.props.navigation.navigate('Home');
  }

  render() {
    const {step} = this.state;
    return (
      <Container style={styles.container}>
        {(step === 0) ?
        <UsernameForm saveUsername = {this.saveUsername} />
        : <Text></Text>}
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

export default FirstformScreen;
