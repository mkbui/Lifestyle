import React, { Component, useCallback } from "react";
import {StyleSheet, Image, Modal} from 'react-native';
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
import {connect} from "react-redux";
import {createNewDaily} from "../actions";

/* Image importing section */
const default_image = require("../../assets/default_image.png");
const default_background = require("../../assets/defaultBackground.jpg")
const splashLogo = require('../../assets/bootLogo.png');
const heart = require("../../assets/heart.png");
const finance = require("../../assets/finance.png");

import {backgrounds} from "../data/image";

/* Other services */
import {LocalNotification, ScheduledNotification} from "../components/PushController"
import {getDateString} from "../utils";
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
    id = Math.floor(Math.random()*10);
    this.state = {
      fActive: false,
      background: backgrounds[id],
      viewAbout: false,
    }
    let lastRecordDate = this.props.userInfo.DailyRecord.date;
    if (today !== lastRecordDate) {
      console.log('Initiating new daily record...');
      this.props.createNewDaily();
    }
  }

  componentDidMount = () => {
    id = Math.floor(Math.random()*10);
    this.setState({
      background: backgrounds[id]
    });

  }
  

  render() {
    const {userInfo, budgetList, mealList} = this.props;
    const {DailyRecord, Info, Currency} = this.props.userInfo;
    var money = Info.money
    /* calculate total expense and income today */
    var incomeTotal = DailyRecord.Finance.earned.sum, expenseTotal = DailyRecord.Finance.spent.sum, 
    /*
    budgetList.map(budget => {
      if (budget.date === today) {
        if (budget.type === 'Income') incomeTotal += Number(budget.amount);
        else expenseTotal += Number(budget.amount);
      }
    });
    */

    /* calculate total energy consumed today */
    totalConsumed = 0;
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
              onPress={() => this.props.createNewDaily()/*this.setState({viewAbout: true})*/ }>
              <Icon name = "paper-plane" />
            </Button>
          </Right>
        </Header>

        <Content padder>
          <Modal
            visible={this.state.viewAbout}
            transparent={true}
            //onBackdropPress = {() => this.setState({viewAbout: false,})}
          >
            <View style = {styles.formView}>
              <Text style = {styles.formTitleText}>About Our Project</Text>
              <Text style = {styles.aboutScript}>Lifestyle Monitoring Software</Text>
              <Text style = {styles.aboutScript}>Release Date: 29/07/2020</Text>
              <Text style = {styles.aboutScript}>This portable mobile app aims to improve user lifestyle via daily tracking, 
                advisory and recommendation</Text>
              <Button style = {styles.button} onPress = {() => this.setState({viewAbout: false,})}>
                <Text>OK</Text>
              </Button>
            </View>
          </Modal>

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
                  source={this.state.background}
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
                <Text style = {styles.cardText}> {DailyRecord.Fitness.energyConsumed} Kcal</Text>
              </Left>
            </CardItem>

            <CardItem bordered>
              <Left>
                <Icon type = "MaterialCommunityIcons" name = "fire"/>
                <Text style = {styles.cardText}>{DailyRecord.Fitness.energyBurned} Kcal</Text>
              </Left>
            </CardItem>
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
                <Text style = {styles.cardText}>{DailyRecord.Finance.spent.sum} {Currency}</Text>
              </Left>
            </CardItem>

            <CardItem bordered>
              <Left>
                <Icon type = "MaterialCommunityIcons" name = "credit-card-plus"/>
                <Text style = {styles.cardText}>{DailyRecord.Finance.earned.sum} {Currency}</Text>
              </Left>
            </CardItem>

            <CardItem bordered>
              <Left>
                <Icon type = "MaterialCommunityIcons" name = "account-cash"/>
                <Text style = {styles.cardText}>{money + incomeTotal - expenseTotal} {Currency}</Text>
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
  },
  formTitleText:{
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 18,
    marginBottom: 20,
  },
  formView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 90,

    margin: 20,
    backgroundColor: "#00fa9a",
    borderRadius: 20,
    borderWidth: 2,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  aboutScript: {
    marginTop: 10,
    marginBottom: 10,
    alignContent: 'flex-start',
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    borderWidth: 1,
    alignSelf: 'center'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
