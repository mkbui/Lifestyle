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
  Text,
  View
} from "native-base";

import {ButtonGroup} from 'react-native-elements';

/* Import component */ 


import Meal from "./Meal"
import Exercise from "./Exercise"


class AddStatus extends Component {
  constructor () {
    super()
    this.state = {
      selectedIndex: 0,
      buttons:'Income'
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  render() {

    const buttons = [ 'Exercise', 'Meal'];
    const { selectedIndex } = this.state;
    return (
      <View style={styles.container}>
 
          <Header>
              <Left style = {{flex: 1}}>
                <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                  <Icon name="menu" />
                </Button>
              </Left>

              <Body style = {{flex: 1}}>
                <Title style={styles.headerText}>Health</Title>
              </Body>
              <Right style = {{flex: 1}}>
            <Button 
              transparent 
              onPress={() => this.props.navigation.navigate('MainTracker')}>
              <Text style={{fontWeight:"bold"}}>Back</Text>
            </Button>

          </Right>
            </Header>

            <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{height: 35}}
              />
            {this.state.selectedIndex === 0 ? <Exercise /> : <Meal/>}
      
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex:1
  },
  headerText: {
    fontWeight: 'bold',
    justifyContent: 'center',
  },
});
export default AddStatus;
