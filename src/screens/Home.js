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
const heart = require("../../assets/heart.png");
const finance = require("../../assets/finance.png");

const today = getDateString();

function mapStateToProps(state) {
  return{
    userInfo: state.user,
  }
}

const  mapDispatchToProps = dispatch => {
  return {
    createNewDaily: () => dispatch(createNewDaily())
  }
}

class HomeScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      fActive: false,
    }
    console.log(this.props.userInfo);
  }

  ComponentDidMount(){
    lastRecordDate = this.props.userInfo.DailyRecord.date;
    if (today !== date) {
      console.log('Initiating new daily record...');
      this.props.createNewDaily();
    }
  }

  render() {
    const {userInfo} = this.props;
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
                <Thumbnail source={default_image} />
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
                  source={default_image}
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
                <Text style = {styles.cardText}>0 litre</Text>
              </Left>
            </CardItem>

            <CardItem bordered>
              <Left>
                <Icon type = "FontAwesome5" name = "utensils"/>
                <Text style = {styles.cardText}> 0 Kcal</Text>
              </Left>
            </CardItem>

            <CardItem bordered>
              <Left>
                <Icon type = "MaterialCommunityIcons" name = "fire"/>
                <Text style = {styles.cardText}>0 Kcal</Text>
              </Left>
            </CardItem>

            <CardItem footer bordered>
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
                <Text style = {styles.cardText}>0 VND</Text>
              </Left>
            </CardItem>

            <CardItem bordered>
              <Left>
                <Icon type = "MaterialCommunityIcons" name = "credit-card-plus"/>
                <Text style = {styles.cardText}>0 VND</Text>
              </Left>
            </CardItem>

            <CardItem footer bordered>
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
