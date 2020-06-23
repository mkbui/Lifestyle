import React, { Component } from "react";
import {StyleSheet} from 'react-native';
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
} from "native-base";

class TrackerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <Container style={styles.container}>
          <Header>
            <Left style = {{flex: 1}}>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon name="menu" />
              </Button>
            </Left>
            <Body style = {{flex: 1}}>
              <Title style = {styles.headerText}>Settings</Title>
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
          <Text>Tracker screen</Text>
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
  },
  text: {
    alignSelf: "center",
    marginBottom: 7
  },
  mb: {
    marginBottom: 15
  }
});

export default TrackerScreen;


