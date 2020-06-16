import React, { Component } from "react";
import {View,StyleSheet, Switch,} from 'react-native';
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
} from "native-base";
import {lightStyle, darkStyle} from "./Style"
import { ToggleTheme, isDarkTheme as dt } from "./Theme";
class SettingsScreen extends Component {
  constructor(){
    this.state = {
      isDarkTheme: dt,
    };
  }
  render() {
    const styles = this.state.isDarkTheme ? darkStyle : lightStyle
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
          <Text>Dark Mode</Text>
          <ToggleTheme />
        </Content>
      </Container>
    );
  }
}


export default SettingsScreen;
