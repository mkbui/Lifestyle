import React, { Component } from "react";
import {StyleSheet, Image} from 'react-native';
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
} from "native-base";
import {getDateString} from "../utils";

import {connect} from "react-redux";
import {createNewDaily} from "../actions";

import {userAccess} from "../reducers/userReducer"

/* Image importing section */
const default_image = require("../../assets/default_image.png");
const default_background = require("../../assets/defaultBackground.jpg")
const splashLogo = require('../../assets/bootLogo.jpg');
const heart = require("../../assets/heart.png");
const finance = require("../../assets/finance.png");

const today = getDateString();

/* Store data used: userInfo */
function mapStateToProps(state) {
  return{
    userInfo: state.user,
    budgetList: state.budgetReducer.budgetList,
    mealList: state.mealReducer.mealList,
  }
}

/* Store dispatcher used: createNewDaily for making a new daily record every day */
const  mapDispatchToProps = dispatch => {
  return {
    createNewDaily: () => dispatch(createNewDaily())
  }
}

/* Presentational screen for default user view */
class HomeScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      fActive: false,
    }
    console.log(this.props.userInfo);
    let lastRecordDate = this.props.userInfo.DailyRecord.date;
    if (today !== lastRecordDate) {
      console.log('Initiating new daily record...');
      this.props.createNewDaily();
    }
  }
  calIncome = () => {
    const {budgetList} = this.props;
    var incomeTotal = 0;
    {
      budgetList.map(budget => {
        if (
          budget.type === 'Income' &&
          budget.date === today
        ) {
          incomeTotal += Number(budget.amount);
        }
      });
    }
    return incomeTotal;
  }

  render() {
    const {userInfo, budgetList, mealList} = this.props;
    const {DailyRecord, Info} = this.props.userInfo;
    var incomeTotal = 0, expenseTotal = 0, totalConsumed = 0;

    /* calculate total expense and income today */
    budgetList.map(budget => {
      if (budget.date === today) {
        if (budget.type === 'Income') incomeTotal += Number(budget.amount);
        else expenseTotal += Number(budget.amount);
      }
    });
    /* calculate total energy consumed today */
    mealList.map(meal => {
      if (meal.date === today) {
        totalConsumed += meal.carb*4 + meal.protein*4 + meal.fat*9;
      }
    });

    return (
      <Container style={styles.container}>
        <Header>
          <Left style = {{flex: 0.5}}>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body style = {{flex: 1}}>
            <Title style={styles.headerText}>Hello, {userInfo.Info.name}</Title>
          </Body>
          <Right style = {{flex: 0.5}}>
            <Button 
              transparent 
              onPress={() => this.props.navigation.goBack()}>
              <Icon name = "paper-plane" />
            </Button>
          </Right>
        </Header>

        <Content padder>

          <Card style = {styles.mb}>
            <CardItem>
              <Left>
                <Thumbnail source={splashLogo} />
                <Body>
                  <Text>Bulletin</Text>
                  <Text note>{getDateString()}</Text>
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
                  source={default_background}
                />
            </CardItem>
          </Card>

          <Card  style = {styles.mb}>
            <CardItem header bordered >
              <Left>
                <Thumbnail source = {heart} />
                <Body>
                  <Text style = {styles.sectionHeader}>Update your health status</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem bordered>
              <Left>
                <Icon type = "FontAwesome5" name = "weight"/>
                <Text style = {styles.cardText}>{userInfo.Info.weight} kg</Text>
              </Left>
            </CardItem>
            <CardItem bordered>
              <Left>
                <Icon type = "MaterialCommunityIcons" name = "cup-water"/>
                <Text style = {styles.cardText}>{DailyRecord.Fitness.waterConsumed} litre</Text>
              </Left>
            </CardItem>

            <CardItem bordered>
              <Left>
                <Icon type = "FontAwesome5" name = "utensils"/>
                <Text style = {styles.cardText}>{totalConsumed} Kcal</Text>
              </Left>
            </CardItem>

            <CardItem bordered>
              <Left>
                <Icon type = "MaterialCommunityIcons" name = "fire"/>
                <Text style = {styles.cardText}>0 Kcal</Text>
              </Left>
            </CardItem>
            {/* this.props.navigation.navigate('Tracker', { screen: 'Health' }) */}
            <CardItem footer bordered button onPress = {() => {this.props.navigation.navigate('Tracker', { screen: 'Health' })}}>
              <Text>Go to Health Tracker</Text>
            </CardItem>
          </Card>

          <Card  style = {styles.mb}>
            <CardItem header bordered >
              <Left>
                <Thumbnail  source = {finance} />
                <Body>
                  <Text style = {styles.sectionHeader}>Update your financial status</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem bordered>
              <Left>
                <Icon type = "MaterialCommunityIcons" name = "cash-refund"/>
                <Text style = {styles.cardText}>{incomeTotal/*DailyRecord.Finance.spent.sum*/} VND</Text>
              </Left>
            </CardItem>

            <CardItem bordered>
              <Left>
                <Icon type = "MaterialCommunityIcons" name = "credit-card-plus"/>
                <Text style = {styles.cardText}>{expenseTotal/*DailyRecord.Finance.earned.sum*/} VND</Text>
              </Left>
            </CardItem>

            <CardItem footer bordered button onPress = {() => {this.props.navigation.navigate('Tracker', { screen: 'Budget' })}}>
              <Text>Go to Financial Diary</Text>
            </CardItem>
          </Card>

        </Content>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
