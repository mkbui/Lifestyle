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
import {getDateString} from "../../utils";

import {connect} from "react-redux";
import {createNewDaily} from '../../actions';

import {userAccess} from "../../reducers/userReducer"

/* Image importing section */
const default_image = require('../../../assets/default_image.png');
const heart = require('../../../assets/heart.png');
const finance = require('../../../assets/finance.png');

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

class HealthTracker extends Component {

  constructor(props){
    super(props);
    this.state = {
      fActive: false,
    }
    //console.log(this.props.userInfo);
    let lastRecordDate = this.props.userInfo.DailyRecord.date;
    if (today !== lastRecordDate) {
      console.log('Initiating new daily record...');
      this.props.createNewDaily();
    }
  }

  ComponentDidMount(){
    
  }

  render() {
    const {userInfo} = this.props;
    return (
      <Container style={styles.container}>
        <Header>
          <Left style = {{flex: 0.5}}>
            <Button transparent >
            </Button>
          </Left>
          <Body style = {{flex: 1}}>
            <Title style={styles.headerText}>Health Tracker</Title>
          </Body>
          <Right style = {{flex: 0.5}}>
            <Button 
              transparent 
              onPress={() => this.props.navigation.goBack()}>
              <Icon name = "arrow-back" />
            </Button>
          </Right>
        </Header>

        <Content padder>

        

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

export default connect(mapStateToProps, mapDispatchToProps)(HealthTracker);
