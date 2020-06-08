import React, { Component } from "react";
import {StyleSheet} from 'react-native';
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
  Text
} from "native-base";

import {connect} from "react-redux";
import {userAccess} from "../reducers/userReducer"
function mapStateToProps(state) {
  console.log(state.user);
  return{
  userInfo: state.user,
  }
}

class HomeScreen extends Component {

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
          <Text>Default screen with header and drawer menu</Text>
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
});

export default connect(mapStateToProps)(HomeScreen);
