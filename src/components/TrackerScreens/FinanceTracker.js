import React, { Component } from "react";
import {StyleSheet, Image, ToastAndroid, Modal, ScrollView} from 'react-native';
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
  Segment,
  Input,
  Picker,
  Label,
  Form,
  Item,
  List,
  ListItem,
} from "native-base";
import {FAB, Portal, Provider} from "react-native-paper";
import {getDateString} from "../../utils";

import {connect} from "react-redux";
import {createNewDaily, addIncomeRecord, addExpenseRecord} from '../../actions';
import FormButton from '../FormButton';
import {userAccess} from "../../reducers/userReducer"

/* Image importing section */
const default_image = require('../../../assets/default_image.png');
const heart = require('../../../assets/heart.png');
const finance = require('../../../assets/finance.png');

const today = getDateString();

/* Store data used: user record */
function mapStateToProps(state) {
  return{
    userInfo: state.user,
  }
}

/* Dispatching function used: adding (and potentially removing) records*/
const mapDispatchToProps = (dispatch) => {
  return {
    //createNewDaily: () => dispatch(createNewDaily()),
    addIncomeRecord: (iRecord) => dispatch(addIncomeRecord(iRecord)),
    addExpenseRecord: (eRecord) => dispatch(addExpenseRecord(eRecord))
  }
}

/* Income submission form */
class IncomeForm extends Component {
  _isMounted = false;

  constructor(props){
    super(props);
    this.state = {
      amount: 0,
      note: '',
      category: 'General',
      
    }
  };

  /* attempts to prevent mounting warning */
  componentDidMount(){
    this._isMounted = true;
  }

  onCatChange = (value) => {
    this.setState({
      category: value,
    })
  };

  /* submitting info to parent screen and reset state */
  handlePress = () => {
    //const {amount, note, category} = this.state.;
    const records = {
      amount: parseInt(this.state.amount,10),
      note: this.state.note,
      category: this.state.category,
    }
    this.setState({
      amount: 0,
      note: '',
      category: 'General',
    },)
    this.props.submit(records);
  }

  /* submitting cancel command to parent screen */
  handleCancel = () => {
    this.props.cancel();
  }

  render(){
    return (
      <View style = {styles.formView} >
        <Text style = {styles.formTitleText}>Expense Record</Text>

        <Form>
          <Item stackedLabel>
            <Label>Amount</Label>
            <Input 
              placeholder = "Income amount in your currency"
              onChangeText = { (value) => this.setState({amount: value} )}
            />
          </Item>
          <Item stackedLabel>
            <Label>Note</Label>
            <Input 
              placeholder = "Description"
              onChangeText = { (text) => this.setState( {note: text} )}
              value = {this.state.note}
            />
          </Item>
          <Item picker >
            <Picker
              mode="dropdown" 
              iosIcon={<Icon name="ios-arrow-down" />}
              style={{ paddingTop: 70, height: 60, }}
              placeholder="Choose your type of income"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.category}
              onValueChange={this.onCatChange.bind(this)}
            >
              <Item style={{ color: "#bfc6ea" }} label="Category" value = "General"/>
              <Item label="Account deposit" value="Deposit" />
              <Item label="Salary reception" value="Salary" />
              <Item label="Interest" value="Interest" />
              <Item label="Lottery win" value="Lottery" />
              <Item label="Others" value = "Others" />
            </Picker>
            </Item>
        </Form>
        <Button 
          block  
          style={{ margin: 15, marginTop: 50 }}
          onPress = {this.handlePress.bind(this)}  
        >
          <Text>SUBMIT RECORD</Text>
        </Button>
        <Button 
          block  
          style={{ margin: 15, marginTop: 15 }}
          backgroundColor='red'
          onPress = {this.handleCancel.bind(this)}  
        >
          <Text>CANCEL</Text>
        </Button>

      </View>
    )
  }
}

/* Expense submission form */
class ExpenseForm extends Component {
  _isMounted = false;

  constructor(props){
    super(props);
    this.state = {
      amount: 0,
      note: '',
      category: 'General',
    }
  };  

  componentDidMount(){
    this._isMounted = true;
  }

  onCatChange = (value) => {
    this.setState({
      category: value,
    })
  };

  /* submitting info to parent screen and reset state */
  handlePress = () => {
    const records = {
      amount: parseInt(this.state.amount, 10),
      note: this.state.note,
      category: this.state.category,
    }
    this.setState({
      amount: 0,
      note: '',
      category: 'General',
    })
    console.log(records);
    this.props.submit(records);
  }

  /* submit cancel command to parent screen */
  cancel = () => {
    this.props.cancel();
  }

  render(){
    return (
      <View style = {styles.formView}>
        <Text style = {styles.formTitleText}>Expense Record</Text>
        <Form>
          <Item stackedLabel>
            <Label>Amount</Label>
            <Input 
              placeholder = "Spending amount in your currency"
              onChangeText = { (text) => this.setState({amount: text} )}
            />
          </Item>
          <Item stackedLabel>
            <Label>Note</Label>
            <Input 
              placeholder = "Description"
              onChangeText = { (text) => this.setState( {note: text} )}
            />
          </Item>
          <Item picker >
            <Picker
              mode="dropdown" 
              iosIcon={<Icon name="ios-arrow-down" />}
              style={{ paddingTop: 70, height: 60, }}
              placeholder="Choose your type of income"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.category}
              onValueChange={this.onCatChange.bind(this)}
            >
              <Item style={{ color: "#bfc6ea" }} label="Category" value = "General"/>
              <Item label="Food" value="Food" />
              <Item label="Transport" value="Transport" />
              <Item label="Shopping" value="Shopping" />
              <Item label="Utilities" value="Utilities" />
              <Item label="Tax" value="Tax" />
              <Item label="Education" value="Education" />
              <Item label="Others" value = "Others" />
            </Picker>
            </Item>
        </Form>
        <Button 
          block  
          style={{ margin: 15, marginTop: 50 }}
          onPress = {this.handlePress.bind(this)}  
        >
          <Text>SUBMIT RECORD</Text>
        </Button>
        <Button 
          block  
          backgroundColor='red'
          style={{ margin: 15, marginTop: 15 }}
          onPress = {this.cancel.bind(this)}  
        >
          <Text>CANCEL</Text>
        </Button>
      </View>
    )
  }
}

/* Presentation view for financial status on a given day */
class FinanceDetail extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    const {userInfo, day} = this.props;
    const {earned, spent} = userInfo.DailyRecord.Finance;
    const today = getDateString();  
    if (today === day) { const renderRecord = userInfo.DailyRecord.Finance; }
    
    return(
        <ScrollView>
            
          {<List style = {{marginTop: 20}}
            dataArray={userInfo.DailyRecord.Finance.earned.detail}
            renderRow={data =>

              <CardItem bordered button style = {{height: 60, backgroundColor: 'palegreen'}}>
              <Left>
                <Icon type = "MaterialCommunityIcons" name = "credit-card-plus"/>
                <Text style = {styles.listText}>{data.category}</Text>
              </Left>
              <Body>
                <Text style = {styles.listAmount}>+{data.amount} VND</Text>
              </Body>
              <Right> 
                {/*<Icon type = "FontAwesome5" name = "trash"/>*/}
              </Right>
              </CardItem>
                
            }
            keyExtractor = {(data, index) => index.toString()}
          />
          }

          <List style = {{marginTop: 20}}
            dataArray={userInfo.DailyRecord.Finance.spent.detail}
            renderRow={data =>

            <CardItem bordered button style = {{height: 60, backgroundColor: 'aliceblue'}}>
            <Left>
              <Icon type = "MaterialCommunityIcons" name = "cash-refund"/>
              <Text style = {styles.listText}>{data.category}</Text>
            </Left>
            <Body>
              <Text style = {styles.listAmount}>-{data.amount} VND</Text>
            </Body>
            <Right> 
              {/*<Icon type = "FontAwesome5" name = "trash"/>*/}
            </Right>
            </CardItem> 
            }
            keyExtractor = {(data, index) => index.toString()}
            />
        </ScrollView> 

    )
  }
}

class FinanceTracker extends Component {

  constructor(props){
    super(props);
    this.state = {
      seg: 1,
      expandedIncome: false,
      expandedExpense: false,
      showChoice: false,
    }
    
    console.log(this.props.userInfo.DailyRecord)
  }
  
  switchChoice(){
    this.setState({
      showChoice: !this.state.showChoice
    })
  }

  collapseIncomeForm(){
    
    this.setState({
      showChoice: false,
    }, this.setState({
      expandedIncome: !this.state.expandedIncome,
      })
    );
    
  }

  collapseExpenseForm(){
    this.setState({
      expandedExpense: !this.state.expandedExpense,
      showChoice: false,
    });
  }

  submitIncome(record){
    this.props.addIncomeRecord(record);
    ToastAndroid.show(
      "Record added successfully!",
      ToastAndroid.SHORT
    )
    this.collapseIncomeForm();
  }

  submitExpense(record){
    this.props.addExpenseRecord(record);
    ToastAndroid.show(
      "Record added successfully!",
      ToastAndroid.SHORT
    )
    this.collapseExpenseForm();
  }

  openUp(){
    this.setState({
      showChoice: !this.state.showChoice
    })
  }

  render() {
    const {userInfo} = this.props;
    const {earned, spent} = userInfo.DailyRecord.Finance;
    const {seg, expandedIncome, expandedExpense, showChoice} = this.state;
    return (
      
      <Provider>
        <Container style={styles.container}>
          <Header>
            <Left style = {{flex: 0.5}}>
              <Button transparent >
              </Button>
            </Left>
            <Body style = {{flex: 1}}>
              <Title style={styles.headerText}>Finance Tracker</Title>
            </Body>
            <Right style = {{flex: 0.5}}>
              <Button 
                transparent 
                onPress={() => this.props.navigation.goBack()}>
                <Icon name = "arrow-back" />
              </Button>
            </Right>
          </Header>


          
          {/*<Segment>
            <Button
              first
              style = {styles.segButton}
              active={this.state.seg === 1 ? true : false}
              onPress={() => this.setState({ seg: 1 })}
            >
              <Text>Income</Text>
            </Button>
            <Button
            style = {styles.segButton}
              active={this.state.seg === 2 ? true : false}
              onPress={() => this.setState({ seg: 2 })}
            >
              <Text>Expense</Text>
            </Button>
          </Segment>*/}

          
          <Text style = {styles.formTitleText}>PERSONAL FINANCE MANAGEMENT</Text>

          {/*seg === 1 &&         
            <FormButton
            title = {expandedIncome?'Cancel':"Add new earning record"}
            handlePress = {this.collapseIncomeForm.bind(this)}
            color = {expandedIncome?'red':'green'}
          />
          */}

          <Modal 
            transparent={true}  
            visible={expandedIncome}
            animationType="slide"
          >
            <IncomeForm 
              cancel = {this.collapseIncomeForm.bind(this)} 
              submit = {this.submitIncome.bind(this)}
            />
          </Modal>
          <Modal 
            transparent={true}  
            visible={expandedExpense}
            animationType="slide"
          >
            <ExpenseForm 
              cancel = {this.collapseExpenseForm.bind(this)} 
              submit = {this.submitExpense.bind(this)}
            />
          </Modal>

          {/*seg === 1 && expandedIncome && <IncomeForm submit= {this.submitIncome.bind(this)}/>*/}
          {/*seg === 2 && expandedExpense && <ExpenseForm submit = {this.submitExpense.bind(this)}/>*/}

          <Card style = {styles.mt}>
            <CardItem bordered button style = {{height: 80, backgroundColor: 'khaki'}}>
              <Left>
                <Icon type = "MaterialCommunityIcons" name = "calendar"/>
                <Text style = {styles.dateText}>{getDateString()}</Text>
              </Left>
              <Right> 
                <Text style = {styles.moneyText}>{earned.sum - spent.sum} VND</Text>
              </Right>
            </CardItem>
          </Card>
          <FinanceDetail userInfo = {userInfo} day = {getDateString()} segment = {seg} />

          
          <Portal>
            <FAB.Group
              open={showChoice}
              icon={'plus'}
              color={'green'}
              actions={[
                { icon: 'credit-card-plus', label: 'New Income', onPress: () => 
                  {this.setState({expandedIncome: true})} },
                { icon: 'cash-refund', label: 'New Expense', onPress: () => 
                  {this.setState({expandedExpense: true})} },
              ]}
              onStateChange={this.openUp.bind(this)}
              onPress={() => {
                if (showChoice) {
                  
                }
              }}
            />
          </Portal>
        
        </Container>
      </Provider>
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
  formTitleText:{
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  formView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,

    margin: 20,
    backgroundColor: "ivory",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  
  },
  addButton: {
    justifyContent: 'flex-end',
    marginLeft: 350,  
    borderRadius: 50, 
    marginBottom: 15,
    marginRight: 15,
    backgroundColor: 'blue',
  },
  choiceButton: {
    justifyContent: 'flex-end',
    marginLeft: 270,  
    borderRadius: 30, 
    marginBottom: 40,
    marginRight: 15,
    backgroundColor: 'lavender',
  },

  mb: {
    color: 'peachpuff',
    marginBottom: 20,
  },
  mt: {
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  listText: {
    marginLeft: 25,
    fontWeight: 'bold',
    fontSize: 20,
  },
  listAmount: {
    marginTop: 6,
    marginLeft: 20,
    fontWeight: '800',
    fontSize: 18,
  },
  dateText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'maroon'
  },
  moneyText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'orangered',
  },
  
  

});

export default connect(mapStateToProps, mapDispatchToProps)(FinanceTracker);
