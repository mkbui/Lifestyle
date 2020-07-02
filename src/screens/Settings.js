import React, { Component } from "react";
import {View, StyleSheet, Platform} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  ListItem,
  Text,
  Badge,
  Left,
  Right,
  Body,
  Switch,
  Radio,
  Picker,
  Separator,
  Item,
} from "native-base";

//const Item = Picker.Item;

/* TO BE ADDED: a mapDispatchToProps and mapStateToProps to save settings to store */

/* Presentational component for managing redirection to setting changes */
class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false,
      reminder: false,
      stage: 'main',  // main, setpin, editUser
      currency: "$",
    };
  }
  
  /* toggle dark mode option switch */
  toggleMode(){
    this.setState({
      darkMode: !this.state.darkMode
    })
  }

  /* toggle reminder option switch */
  toggleReminder(){
    this.setState({
      reminder: !this.state.reminder
    })
  }

  /* managing input state for currency */
  onCurrencyChoose(value){
    this.setState({
      currency: value,
    })
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

        <Content>

          <Separator bordered noTopBorder style = {styles.separator} />

          <ListItem style = {styles.row} icon >
            <Left>
              <Button style={{ backgroundColor: "purple" }}>
                <Icon active name="moon" />
              </Button>
            </Left>
            <Body>
              <Text>Dark Mode</Text>
            </Body>
            <Right>
              <Switch 
                value={this.state.darkMode} 
                trackColor="#50B948" 
                onValueChange = {this.toggleMode.bind(this)}
              /> 
            </Right>
          </ListItem>

          <ListItem style = {styles.row} icon>
            <Left>
              <Button style={{ backgroundColor: "orange" }}>
                <Icon active name="notifications" />
              </Button>
            </Left>
            <Body>
              <Text>Daily reminder notification</Text>
            </Body>
            <Right>
              <Radio
                selected = {this.state.reminder}
                onPress = {this.toggleReminder.bind(this)}
              />
            </Right>
          </ListItem>
          
          <ListItem style = {styles.row} icon last>
            <Left>
              <Button style={{ backgroundColor: "#4CDA64" }}>
                <Icon name="arrow-dropdown" />
              </Button>
            </Left>
            <Body>
              <Text>Currency</Text>
            </Body>
            <Right>
              <Picker
                note
                mode="dropdown"
                style={{ width: 100 }}
                selectedValue={this.state.currency}
                onValueChange={this.onCurrencyChoose.bind(this)}
              >
                <Item label="$" value="$" />
                <Item label="VND" value="VND" />
              </Picker>
            </Right>
          </ListItem>


          <Separator bordered style = {styles.separator}/>


          <ListItem style = {styles.row} icon onPress = {() => this.setState({stage: 'pin'})}>
            <Left>
              <Button style={{ backgroundColor: "#FD3C2D" }}>
                <Icon active name="lock" />
              </Button>
            </Left>
            <Body>
              <Text>Set PIN code</Text>
            </Body>
            <Right>
              {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
            </Right>
          </ListItem>

          <ListItem style = {styles.row} icon onPress = {() => this.setState({stage: 'editUser'})}>
            <Left>
              <Button style={{ backgroundColor: "blue" }}>
                <Icon active name="person" />
              </Button>
            </Left>
            <Body>
              <Text>Edit personal data</Text>
            </Body>
          </ListItem>

          <Separator bordered style = {styles.separator}/>
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
  },
  separator: {
    //backgroundColor: '#FFF',
  },
 
  row: {
  
  },
});

export default SettingsScreen;


