import React, { Component } from "react";
import {StyleSheet, Image, ActivityIndicator} from 'react-native';
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
import {fitnessAnalyzer, financialAnalyzer} from "../../utils";


const analysisBackground = require('../../../assets/analysis.png');
const default_image = require('../../../assets/default_image.png')

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
    }
  }

  componentDidMount(){
    setTimeout(()=>{
      this.stopIndicating();
    }, 500);
  }

  stopIndicating(){
    this.setState({indicating: false})
  }

  render(){
    const {indicating} = this.state;
    const {userInfo} = this.props;
    const {FinanceRecord, FitnessRecord, DailyRecord} = userInfo;
    console.log(userInfo);
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
          <Card style = {styles.reviewBox} transparent>
              <CardItem transparent>
                <Left>
                  <Icon type = "FontAwesome5" name = "heartbeat" />
                  <Text>  </Text>
                  <Progress.Bar  progress = {0.8} width = {300} height = {8} color = "#000"/>
                </Left>
              </CardItem>

              <CardItem transparent>
                <Left>
                  <Icon type = "MaterialCommunityIcons" name = "cup-water"/>
                  <Text>  </Text>
                  <Progress.Bar 
                    progress = {DailyRecord.Fitness.waterConsumed/2000.0} 
                    width = {300} height = {8} color = "#000" 
                  />
                </Left>
              </CardItem>

              <CardItem transparent>
                <Left>
                  <Icon type = "MaterialCommunityIcons" name = "finance"/>
                  <Text>  </Text>
                  <Progress.Bar progress = {0.1} width = {300} height = {8} color = "#000"/>
                </Left>
              </CardItem>
          </Card>


          <Card style = {styles.reviewBox}>
              <CardItem >
                <Left>
                  <Body>
                    {fitnessAnalyzer(FitnessRecord, DailyRecord.Fitness)}
                  </Body>
                </Left>
              </CardItem>
          </Card>

          <Card style = {styles.reviewBox}>
              <CardItem >
                <Left>
                  <Body>
                    <Text style = {styles.script}>Your financial situation is abysmal! Save some money.</Text>
                  </Body>
                </Left>
              </CardItem>
          </Card>

          <Card style = {styles.tipBox}>
              <CardItem >
                <Left>
                  <Body>
                    <Text style = {styles.script}>Water is good for H2O.</Text>
                  </Body>
                </Left>
              </CardItem>
          </Card>

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

export default connect(mapStateToProps)(AdviceAnalysis)