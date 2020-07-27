import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  Header,
  Title,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
  View,
} from 'native-base';

import {ButtonGroup} from 'react-native-elements';

/* Import component */
import Income from './Income.js';
import Expense from './Expense';


class AddStatus extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      buttons: 'Income',
    };
    this.updateIndex = this.updateIndex.bind(this);
  }
 
  updateIndex(selectedIndex) {
    this.setState({selectedIndex});
  }

  render() {
    const buttons = ['Expense', 'Income'];
    const {selectedIndex} = this.state;
    return (
      <View style={styles.container}>
        {/* Header */}
        <Header>
          <Left style={{flex: 1}}>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>

          <Body style={{flex: 1}}>
            <Title style={styles.headerText}>Budget</Title>
          </Body>
          <Right style={{flex: 1}}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('MainTracker')}>
              <Text style={{fontWeight: 'bold'}}>Back</Text>
            </Button>
          </Right>
        </Header>

      <View style={{alignItems:"center", marginTop:10}}>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{height: 35,width:300 }}
          selectedButtonStyle={{backgroundColor:"#6AC9EF"}}
        />
      </View>

        {this.state.selectedIndex === 0 ? <Expense/> : <Income/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  headerText: {
    fontWeight: 'bold',
    justifyContent: 'center',
  },
});
export default AddStatus;
