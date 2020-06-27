import React, {Component} from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';

/* Import images */
const budgetBackground = require('../../../../assets/budget-bg.png');
const healthBackground = require('../../../../assets/health-bg.png');

class MainTracker extends Component {
  render() {
    return (
      <Container style={styles.container}>

        <Header>
          <Left style={{flex: 1}}>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>

          <Body style={{flex: 1}}>
            <Title style={styles.headerText}>Tracker</Title>
          </Body>

          <Right>
          <Button
              transparent
              onPress={() => this.props.navigation.navigate('Home')}>
              <Text style={{fontWeight: 'bold'}}>Back</Text>
            </Button>
          </Right>
        </Header>

        <ImageBackground source={budgetBackground} style={styles.imagebg}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.props.navigation.navigate('Budget')}>
            <Text style={styles.text}>BUDGET</Text>
          </TouchableOpacity>
        </ImageBackground>

        <ImageBackground source={healthBackground} style={styles.imagebg}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.props.navigation.navigate('Health')}>
            <Text style={styles.text}>HEALTH</Text>
          </TouchableOpacity>
        </ImageBackground>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  headerText: {
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  imagebg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'white',
    height: 100,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'orange',
    borderWidth: 5,
  },
  text: {
    color: 'purple',
    fontWeight: 'bold',
    fontSize: 25,
  },
});

export default MainTracker;
