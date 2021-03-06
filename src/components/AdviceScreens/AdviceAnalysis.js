import React, { Component } from "react";
import {StyleSheet, Image, ActivityIndicator, Dimensions} from 'react-native';
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
import {fitnessAnalyzer, financialAnalyzer, financeAnalyzer, rateHealth, rateFinance} from "../../utils";
import {tips} from './../../data/tips'

const default_image = require('../../../assets/default_image.png')
let deviceWidth = Dimensions.get('window').width
/* State used: user info with records, not [food list, exercise list] */
function mapStateToProps(state){
  return {
    userInfo: state.user,
    foodList: state.foodList, 
    exerciseList: state.exerciseList,
  }
}


class AdviceAnalysis extends Component {
  constructor(props){
    super(props);
    this.state = {
      indicating: true,
      tip: 0,
    }
  }

  /* activity indicator for 0.5s */
  componentDidMount(){
    this.assignTips();
    setTimeout(()=>{
      this.stopIndicating();
    }, 500);
  }

  stopIndicating(){
    this.setState({indicating: false})
  }

  /* tips generator */
  assignTips(){
    let chosenId = Math.floor(Math.random()*tips.length);
    this.setState({
      tip: chosenId
    });
  }

  render(){
    const {indicating} = this.state;
    const {userInfo} = this.props;
    const {checkFitness, checkFinance, checkGeneral} = this.props.route.params;
    const {FinanceRecord, FitnessRecord, DailyRecord, Info} = userInfo;
    
    /* There is a whole section for indicating action... */
    if (indicating == true) return (
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
        <Content padder style = {{alignSelf: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" style = {{alignSelf: 'center' }}/>
          <Text style = {styles.headerText}>Analyzing...</Text>
        </Content>
      </Container>
    )

    /* The important presentational view is only here */
    if (indicating == false) return(
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
          <Card style = {styles.reviewBox} >
              <CardItem>
                <Body><Text style = {styles.rateHeaderText}>Your overall rating</Text></Body>
              </CardItem>
              <CardItem transparent >
                <Left>
                  <Icon type = "FontAwesome5" name = "heartbeat" />
                  <Text>  </Text>
                  <Progress.Bar  
                    progress = {rateHealth(userInfo)} 
                    width = {deviceWidth - 100} 
                    height = {8} color = "#000"
                  />
                </Left>
              </CardItem>

              <CardItem transparent>
                <Left>
                  <Icon type = "MaterialCommunityIcons" name = "cup-water"/>
                  <Text>  </Text>
                  <Progress.Bar 
                    progress = {Math.min(DailyRecord.Fitness.waterConsumed/2.0, 1)} 
                    width = {deviceWidth - 100} height = {8} color = "#000" 
                  />
                </Left>
              </CardItem>

              <CardItem transparent>
                <Left>
                  <Icon type = "MaterialCommunityIcons" name = "finance"/>
                  <Text>  </Text>
                  <Progress.Bar 
                    progress = {rateFinance(DailyRecord.Finance, userInfo.Info.money)} 
                    width = {deviceWidth - 100} height = {8} color = "#000"
                  />
                </Left>
              </CardItem>
          </Card>


          {checkFitness && <Card transparent >
              <CardItem style = {[styles.reviewBox, {backgroundColor: 'peachpuff'}]}>
                <Left>
                  <Body>
                    {fitnessAnalyzer(FitnessRecord, DailyRecord.Fitness)}
                  </Body>
                </Left>
              </CardItem>
          </Card>}

          {checkFinance && <Card transparent >
              <CardItem style = {[styles.reviewBox, {backgroundColor: 'aquamarine'}]}>
                <Left>
                  <Body>
                    {financeAnalyzer(userInfo.Info.money, DailyRecord.Finance)}
                  </Body>
                </Left>
              </CardItem>
          </Card>}

          <Card >
              <CardItem style = {styles.tipBox}>
                <Left>
                  <Body>
                    <Text style = {styles.tip}>{tips[this.state.tip].text}</Text>
                  </Body>
                </Left>
              </CardItem>
          </Card>

          <Button 
            style = {styles.proceedButton} 
            onPress = {() => this.props.navigation.navigate("WarningSuggest")}
          >
            <Text>PROCEED</Text>
          </Button>

        </Content>
      </Container>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  headerText: {
    fontWeight: 'bold',
  },
  rateHeaderText: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center'
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
    marginBottom: 25,
    borderRadius: 10,
    borderWidth: 2,
  },
  tipBox: {
    backgroundColor: 'seashell',
  },
  script: {
    fontSize: 18,
  }, 
  tip: {
    fontSize: 16,
    fontStyle: 'italic'
  },
  progressBar: {
    paddingLeft: 15,
    paddingRight: 5,
  }
});

export default connect(mapStateToProps)(AdviceAnalysis)