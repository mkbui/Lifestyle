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
  Thumbnail,
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";

import * as Progress from 'react-native-progress';

import {connect} from 'react-redux';
import {warningPresent} from "../../utils";


const analysisBackground = require('../../../assets/analysis.png');
const default_image = require('../../../assets/default_image.png')

function mapStateToProps(state){
  return {
    userInfo: state.user,
    foodList: state.foodList, 
    exerciseList: state.exerciseList,
  }
}


class WarningSuggest extends Component {
  constructor(props){
    super(props);
    this.state = {
      chosenFood: {
        name: '',
        category: '',
        image: '',
      },
      foodCur: 0,
      exerCur: 0,
    }
  }

  componentDidMount(){
    this.assignFood();
    this.assignExercise();
  }

  assignFood(){
    const {userInfo, foodList} = this.props;
    let chosenId = Math.floor(Math.random()*foodList.length);
    let item = foodList[chosenId];
    this.setState({
      chosenFood: {
        name: item.name,
        category: item.category,
        image: item.image,
      },
      foodCur: chosenId,
    });
  }

  assignExercise(){
    const {userInfo, exerciseList} = this.props;
    let chosenId = Math.floor(Math.random()*exerciseList.length);
    this.setState({
      exerCur: chosenId,
    });
  }
  render(){
    
   
    const {indicating, chosenFood, foodCur, exerCur} = this.state;
    const {userInfo, foodList, exerciseList} = this.props;
    const {FinanceRecord, FitnessRecord, DailyRecord} = userInfo;
    const food = foodList[foodCur];
    const exercise = exerciseList[exerCur];

    //console.log(chosenFood);
    return(
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
              <Card style = {styles.reviewBox}>
                  <CardItem >
                    <Left>
                      <Body>
                        {warningPresent(userInfo.Info, userInfo.Measure)}
                      </Body>
                    </Left>
                  </CardItem>
              </Card>


          <Grid>
            <Col size={1} style={styles.suggestCard}>
              <Card style = {styles.mb}>
                <CardItem>
                  <Left>
                    <Body>
                      <Text style = {styles.headerText}>Today's food suggestion</Text>
                    </Body>
                  </Left>
                </CardItem>

                <CardItem cardBody>
                  <Image
                      style={{
                        resizeMode: "cover",
                        width: null,
                        height: 100,
                        flex: 1
                      }}
                      source={food.image}
                    />
                </CardItem>

                <CardItem footer>
                  <Text style = {styles.nameCard}>{food.name}</Text>
                </CardItem>
              </Card>
            </Col>

            <Col size={1} style={styles.suggestCard}>
              <Card style = {styles.mb}>
                  <CardItem>
                    <Left>
                      <Body>
                        <Text style = {styles.headerText}>Today's exercise suggestion</Text>
                      </Body>
                    </Left>
                  </CardItem>

                  <CardItem cardBody>
                    <Image
                        style={{
                          resizeMode: "cover",
                          width: null,
                          height: 100,
                          flex: 1
                        }}
                        source={exercise.image}
                      />
                  </CardItem>

                  <CardItem footer>
                    <Text style = {styles.nameCard}>{exercise.name}</Text>
                  </CardItem>
                </Card>
            </Col>
          </Grid>

          <Button 
            style = {styles.proceedButton} 
            onPress = {() => this.props.navigation.navigate('Home')}
          >
            <Text>COMPLETE</Text>
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
    marginTop: 100,
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
  },
  suggestCard: { 
    backgroundColor: "#FFF", 
    paddingRight: 7, 
    paddingLeft: 7,
    height: 150,
  },

});

export default connect(mapStateToProps)(WarningSuggest)