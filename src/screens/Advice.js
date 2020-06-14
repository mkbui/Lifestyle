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


const analysisBackground = require('../../assets/analysis.png');
const default_image = require('../../assets/default_image.png')

function mapStateToProps(){
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
  
  render() {
    return (
     

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
          <Button style = {styles.proceedButton} onPress = {()=>this.props.proceed()}>
            <Text>PROCEED</Text>
          </Button>

        </Content>
    );
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
    // Only show the splash screen for maximum 5s
    setTimeout(()=>{
      this.stopIndicating();
    }, 500);
  }

  stopIndicating(){
    this.setState({indicating: false})
  }

  render(){
    const {indicating} = this.state;
    if (indicating == true) return (
      <Content padder style = {{alignSelf: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" style = {{alignSelf: 'center' }}/>
      </Content>
    )
    if (indicating == false) return(
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
                <Progress.Bar progress = {0.5} width = {300} height = {8} color = "#000" />
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
                  <Text style = {styles.script}>You are in good health today</Text>
                  <Text style = {styles.script}>It seems you are not drinking enough water.
                  Try to fill 400ml more today to achieve better hydration!</Text>
                  <Text style = {styles.script}>Your financial situation is abysmal! Save some money.</Text>
                </Body>
              </Left>
            </CardItem>
        </Card>

        <Card style = {styles.tipBox}>
            <CardItem >
              <Left>
                <Body>
                  <Text style = {styles.text}>Water is good for H2O</Text>
                </Body>
              </Left>
            </CardItem>
        </Card>

      </Content>
    )
  }
}

class AdviceScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      stage: 0,
    }
  }

  proceed(){
    this.setState({stage: this.state.stage + 1})
  }

  render(){
    const {stage} = this.state;
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
        {this.state.stage === 0 && <PreForm proceed = {this.proceed.bind(this)} />}
        {this.state.stage === 1 && <AdviceAnalysis proceed = {this.proceed.bind(this)} />}

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
    color: 'blue'
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

export default AdviceScreen;


