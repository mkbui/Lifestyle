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
import {userAccess} from "../reducers/userReducer"
const default_image = require("../../assets/default_image.png");
function mapStateToProps(state) {
  return{
    userInfo: state.user,
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

          <Card style = {styles.mb}>
            <CardItem>
              <Left>
                <Icon type = "FontAwesome5" name = "weight"/>
                <Text style = {styles.cardText}>{userInfo.Info.weight} kg</Text>
              </Left>
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
    marginBottom: 20,
  },
  cardText: {
    fontWeight: 'bold',
    fontSize: 20,
  }
});

export default connect(mapStateToProps)(HomeScreen);
