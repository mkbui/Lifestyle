import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
  FlatList,
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

import {ButtonGroup} from 'react-native-elements';
import moment from 'moment';

{
  /*Import component*/
}
import PieChart from './PieChart';
import LineChart from './LineChart';
const DATA = [
  {
    id: '01',
    month: 'January',
  },
  {
    id: '02',
    month: 'February',
  },
  {
    id: '03',
    month: 'March',
  },
  {
    id: '04',
    month: 'April',
  },
  {
    id: '05',
    month: 'May',
  },
  {
    id: '06',
    month: 'June',
  },
  {
    id: '07',
    month: 'July',
  },

  {
    id: '08',
    month: 'August',
  },

  {
    id: '09',
    month: 'September',
  },
  {
    id: '10',
    month: 'October',
  },
  {
    id: '11',
    month: 'November',
  },
  {
    id: '12',
    month: 'December',
  },
];


export default class Chart extends Component {
  constructor() {
    super();
    this.state = {
      selectedMonth: moment().format('YYYY-MM'),
      modalVisible: false,
      checkedMonth: moment().format('MM'),
      checkedYear: moment().format('YYYY'),
      selectedIndex: 0,
      buttons: 'Income',
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
  updateIndex(selectedIndex) {
    this.setState({selectedIndex});
  }
  render() {
    console.log('render');
    const {selectedMonth, modalVisible} = this.state;
    const buttons = ['Expense', 'Income'];
    const {selectedIndex} = this.state;
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
              <View style={[styles.modalView, {height: 430}]}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 10,
                    marginBottom: 30,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        checkedYear: Number(this.state.checkedYear) - 1,
                        selectedMonth:
                          Number(this.state.checkedYear) -
                          1 +
                          '-' +
                          this.state.checkedMonth,
                      });
                    }}>
                    <Image
                      style={{height: 20, width: 20}}
                      source={require('../../../../../../assets/left_arrow.png')}
                    />
                  </TouchableOpacity>
                  <Text style={{marginHorizontal: 50}}>
                    {this.state.checkedYear}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        checkedYear: Number(this.state.checkedYear) + 1,
                        selectedMonth:
                          Number(this.state.checkedYear) +
                          1 +
                          '-' +
                          this.state.checkedMonth,
                      });
                    }}>
                    <Image
                      style={{height: 20, width: 20}}
                      source={require('../../../../../../assets/right_arrow.png')}
                    />
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={DATA}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() =>
                        this.setState({
                          checkedMonth: item.id,
                          selectedMonth: this.state.checkedYear + '-' + item.id,
                        })
                      }
                      style={[
                        styles.item,
                        {
                          backgroundColor:
                            this.state.checkedMonth === item.id
                              ? '#22d6f2'
                              : 'white',
                        },
                      ]}>
                      <Text
                        style={{
                          fontSize: 16,
                          color:
                            this.state.checkedMonth === item.id
                              ? 'white'
                              : 'black',
                        }}>
                        {item.month}
                      </Text>
                    </TouchableOpacity>
                  )}
                  numColumns={3}
                />

                <TouchableOpacity
                  style={styles.openButton}
                  onPress={() => {
                    this.setState({
                      modalVisible: false,
                    });
                  }}>
                  <Text style={styles.textStyle}> OK </Text>
                </TouchableOpacity>
                {console.log('selectedMonth', this.state.selectedMonth)}
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

          <ButtonGroup
          onPress={this.updateIndex.bind(this)}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{height: 35}}
        />

        {this.state.selectedIndex === 0 ? 
        <>
         <PieChart
         selectedMonth={selectedMonth}
         modalVisible={modalVisible}
         typePieChart={'Expense'}
       />
       <LineChart
         selectedMonth={selectedMonth}
         modalVisible={modalVisible}
         typePieChart={'Expense'}
       /> 
        </>
       :
       <>
       <PieChart
       selectedMonth={selectedMonth}
       modalVisible={modalVisible}
       typePieChart={'Income'}
     />
     <LineChart
       selectedMonth={selectedMonth}
       modalVisible={modalVisible}
       typePieChart={'Income'}
      
     />
      </>
      }
          {/* Chart component */}
         
         
        </Content>
      </Container>
    );
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
    height: 300,
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
  item: {
    width: 80,
    height: 35,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 2,
  },
});
