import React, { Component } from "react";
import {StyleSheet, Image, ActivityIndicator, Alert} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Left,
  Right,
  Body,
  ListItem,
  CheckBox,
  Card,
  CardItem,

} from "native-base";

import * as Progress from 'react-native-progress';

import {connect} from 'react-redux';


const analysisBackground = require('../../../assets/analysis.png');
const default_image = require('../../../assets/default_image.png')

function mapStateToProps(state){
  return {
    userInfo: state.user,
    foodList: state.foodList, 
    exerciseList: state.exerciseList,
  }
}

class PreForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkFinance: false,
      checkFitness: false,
      checkGeneral: false,
    }
  }

  toggleFinance(){
    this.setState({checkFinance: !this.state.checkFinance})
  }

  toggleFitness(){
    this.setState({checkFitness: !this.state.checkFitness})
  }
  
  toggleGeneral(){
    this.setState({checkGeneral: !this.state.checkGeneral})
  }
  
  proceed(){
    const {DailyRecord} = this.props.userInfo;
    const {checkFinance, checkFitness} = this.state;
    console.log("proceeding")
    if (checkFitness && !DailyRecord.Fitness.updated){
      Alert.alert(
        "Warning",
        "You have not updated your fitness record",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Update Now", onPress: () => this.props.navigation.navigate("HealthTracker") }
        ],
        { cancelable: false }
      );   
    }
    else {this.props.navigation.navigate("AdviceAnalysis");}
    //proceed("AdviceAnalysis");
  }

  render() {
    const {DailyRecord} = this.props.userInfo;
    return (
      <Container style={styles.container}>
      <Header>
        <Left style = {{flex: 1}}>
          <Button transparent onPress={() => this.props.navigation.openDrawer()}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body style = {{flex: 1}}>
          <Title style = {styles.headerText}>Today's Advice</Title>
        </Body>
        <Right style = {{flex: 1}}>
          <Button 
            transparent 
            onPress={() => this.props.navigation.goBack()}>
            <Icon name = "arrow-back" />
          </Button>
        </Right>
      </Header>
        <Content padder>
          <Card style = {styles.mb}>
            <CardItem>
              <Left>
                <Body>
                  <Text style = {styles.secondaryText}>Rapid Lifestyle Advice Service</Text>
                </Body>
              </Left>
            </CardItem>

            <CardItem cardBody>
              <Image
                  style={{
                    resizeMode: "cover",
                    width: null,
                    height: 200,
                    flex: 1
                  }}
                  source={analysisBackground}
                />
            </CardItem>

          </Card>

          <Text style = {styles.choosingText}>Choose sections you want to receive advice:</Text>
          <ListItem style = {styles.choosingList} button onPress={() => this.toggleFitness()}>
            <CheckBox
              checked={this.state.checkFitness}
              onPress={() => this.toggleFitness()}
            />
            <Body>  
              <Text>Health and Fitness</Text>
            </Body>
          </ListItem>
          <ListItem button onPress={() => this.toggleFinance()}>
            <CheckBox
              color="red"
              checked={this.state.checkFinance}
              onPress={() => this.toggleFinance()}
            />
            <Body>
              <Text>Finance and Budget</Text>
            </Body>
          </ListItem>
          <ListItem button onPress={() => this.toggleGeneral()}>
            <CheckBox
              color="green"
              checked={this.state.checkGeneral}
              onPress={() => this.toggleGeneral()}
            />
            <Body>
              <Text>General advice for the day</Text>
            </Body>
          </ListItem>
          <Button 
            style = {styles.proceedButton} 
            onPress = {() => this.proceed() }
          >
            <Text>PROCEED</Text>
          </Button>

        </Content>
      </Container>
        
    );
  }
}

export default connect(mapStateToProps)(PreForm)
  
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  headerText: {
    fontWeight: 'bold',
  },
  text: {
    alignSelf: "center",
    marginBottom: 7
  },
  mb: {
    marginBottom: 15
  },
  secondaryText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'indigo',
    fontFamily: 'Roboto',
  },
  choosingText: {
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 15,
  },
  proceedButton: {
    alignSelf: 'center',
    color: 'blue',
    marginTop: 20,
  },
  reviewBox: {
    backgroundColor: 'orange',
    marginBottom: 25,
  },
  script: {
    fontSize: 18,
  }, 
  progressBar: {
    paddingLeft: 15,
  }
});