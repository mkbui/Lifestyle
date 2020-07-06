import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
} from 'react-native';
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

} from 'native-base';

import DatePicker from 'react-native-modern-datepicker';
import moment from 'moment';


{/*Import component*/}
import PieChart from './PieChart';
import LineChart  from "./LineChart"


export default class Chart extends Component {
  constructor() {
    super();
    this.state = {
      selectedMonth: moment().format('YYYY-MM'),
      modalVisible: false,
     
    };
  }

  
  handleSelect(event) {
    let entry = event.nativeEvent;
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null});
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)});
    }
  }
  render() {
    const {selectedMonth, modalVisible} = this.state;
    return (
      <Container>
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
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>
            Back
          </Text>
        </Button>
      </Right>
    </Header>

      {/* Modal select month */}
    <Content padder> 
    <Modal
      animationType="slide"
      transparent={true}
      visible={this.state.modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <DatePicker
            current={this.state.selectedMonth.split('-').join(' ')}
            mode="monthYear"
            selectorStartingYear={2000}
            onMonthYearChange={selectedDate =>
              this.setState({
                selectedMonth: selectedDate.split(' ').join('-'),
              })
            }
            style={styles.datePicker}
          />
          <TouchableOpacity
            style={styles.openButton}
            onPress={() => {
              this.setState({modalVisible: false});
            }}>
            <Text style={styles.textStyle}> OK </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

    {/* Choose month button */}
    <TouchableOpacity
      style={styles.openButton}
      onPress={() => {
        this.setState({modalVisible: true});
      }}>
      <Text style={styles.textStyle}>
        {this.state.selectedMonth
          .split('-')
          .reverse()
          .join('-')}
      </Text>
    </TouchableOpacity>
     
    {/* Chart component */}
    <PieChart selectedMonth={selectedMonth} modalVisible={modalVisible} typePieChart={"Expense"}/>
    <LineChart selectedMonth={selectedMonth} modalVisible={modalVisible} typePieChart={"Expense"}/>
     <PieChart selectedMonth={selectedMonth} modalVisible={modalVisible} typePieChart={"Income"}/>
     <LineChart selectedMonth={selectedMonth} modalVisible={modalVisible} typePieChart={"Income"}/>
    
     </Content>

     </Container>
    )
  }
}

const styles = StyleSheet.create({

  headerText: {
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: 'orange',
    borderWidth: 3,
    borderColor: '#222224',
    borderColor: 5,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    fontSize: 18,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  datePicker: {
    width: 300,
  },
  noteText: {
    fontSize: 15,
  },
  text: {
    fontSize: 20,
    color: 'grey',
  },
  incomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  expenseText: {
    fontSize: 20,
    fontWeight: 'bold',

    color: 'red',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'orange',
  },
});
