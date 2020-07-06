import React, { Component } from "react";
import {StyleSheet, Modal, FlatList} from "react-native";
import {
  Container,
  View,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  CheckBox,
  Text,
  Thumbnail,
  Left,
  Body,
  Right,
  Tabs,
  Tab,
  Item,
  Input,
  Segment,
  Accordion,
  Form,
} from "native-base";
import {connect} from "react-redux";
import {foodOperate} from "../reducers";
import FoodList from "../components/FoodList";
import ExerciseList from "../components/ExerciseList";
import AddFoodForm from "../components/AddForm/AddFoodForm";
import AddExerciseForm from "../components/AddForm/AddExerciseForm"
import FormButton from "../components/FormButton";

const default_image = require("../../assets/default_image.png");


const exerciseCategories = [
  {
    name: 'Abs',
    id: 0,
    checked: false
  },
  {
    name: 'Arms',
    id: 1,
    checked: false
  },
  {
    name: 'Legs',
    id: 2,
    checked: false
  },
  {
    name: 'Back',
    id: 3,
    checked: false
  },
  {
    name: 'Overall',
    id: 4,
    checked: false
  },
  {
    name: 'Relax',
    id: 5,
    checked: false
  },
];

const foodCategories = [
  {
    name: 'Protein',
    id: 0,
    checked: false
  },
  {
    name: 'Vegetable',
    id: 1,
    checked: false
  },
  {
    name: 'Fat',
    id: 2,
    checked: false
  },
  {
    name: 'Grains',
    id: 3,
    checked: false
  },
  {
    name: 'Beverage',
    id: 4,
    checked: false
  },
  {
    name: 'Fruit',
    id: 5,
    checked: false
  },
];

class FilterForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      isFilter: false,
      isCat: [

      ],
    }
  }

  componentDidMount(){
    const catArray = this.props.filterStatus;//(this.props.cat === 'food'? foodCategories: exerciseCategories);
    this.setState({
      isCat: catArray
    })
  }

  handlePress(){
    let didChecked = false;
    this.state.isCat.map(item => {
      if (item.checked === true) didChecked = true;
    })
    const filterStatus = {
      isFilter: didChecked,
      isCat: this.state.isCat,
    };
    this.props.filter(filterStatus);
  }

  cancel(){
    this.props.cancel();
  }

  render(){
    const {cat} = this.props;
    const catArray = (cat === 'food'? foodCategories : exerciseCategories);
    const {isCat} = this.state;
    return (
      <View style = {styles.formView}>
        <Text style = {styles.formTitleText}>Choose your filters:</Text>
 
        <List
          dataArray={isCat}
          keyExtractor={data => data.id}     
          renderRow={ item =>
            <Item  
              key = {item.id}
              style = {{marginLeft: 5, marginBottom: 8, marginTop: 8, width: 200, height: 25}}
            >
              <CheckBox 
                checked = {this.state.isCat[item.id].checked}
                onPress={() => { 
                  let isCat = [...this.state.isCat];
                  let change = {...isCat[item.id]}
                  change.checked = !change.checked;
                  isCat[item.id] = change;
                  this.setState({isCat}, )
                  }
                }
              />
              <Text>         {item.name}</Text>
            </Item>
          } 
        />
        <Button 
          block  
          style={{ margin: 10, marginTop: 30 }}
          onPress = {this.handlePress.bind(this)}  
        >
          <Text>OK</Text>
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

class ListScreen extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      seg: 1,
      expandedFood: false,
      expandedExercise: false,
      filterForm: false,
      string: '',
      filterList: [],
    }
  }

  componentDidMount(){
    const catArray = (this.state.seg === 1? foodCategories: exerciseCategories);
    this.setState({
      filterList: catArray
    })
  }

  toggleSeg(){
    this.setState({ 
      seg: 3 - this.state.seg, 
      string: '', 
      filterList: this.state.seg === 2? foodCategories : exerciseCategories 
    })
  }

  collapseFoodForm(){
    this.setState({
      expandedFood: !this.state.expandedFood,
    })
  }

  collapseExerciseForm(){
    this.setState({
      expandedExercise: !this.state.expandedExercise,
    })
  }


  formHeader(item, expanded){
    const {seg} = this.state;
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 8,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#A3E4D7"
        }}
      >
        <Text style = {{color: '#1C2833', fontWeight: "bold"}}>
          {" "}{item.title}{" "}{seg === 1? 'food' : 'exercise'}
        </Text>
        {expanded
          ? <Icon style = {{color: '#7F8C8D'}}  name="remove" />
          : <Icon style = {{color: '#1C2833'}}  name="add" />}
      </View>
    );
  }


  cancelFilter(){
    this.setState({
      filterForm: false,
    })
  }

  submitFilter(filterStatus){
    this.setState({
      filterForm: false,
      filterList: filterStatus.isCat,
    })
    /*
    if (filterStatus.didChecked === false) this.setState({
      filterList: [],
    })
    else {
      const newList = [];
      filterStatus.isCat.map(item => {
        if (item.checked === true) newList.push(item);
      })
      console.log(newList);
      this.setState({filterList: isCat})
    }*/
  }

  render() {
    const {seg, expandedExercise, expandedFood} = this.state;
    return (
  
      <Container style = {styles.Container}>
        <Header hasSegment>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Suggestions</Title>
          </Body>
          <Right/>
        </Header>
        <Segment>
          <Button
            first
            style = {styles.segButton}
            active={this.state.seg === 1 ? true : false}
            onPress={() =>this.toggleSeg()}
          >
            <Text>Food</Text>
          </Button>
          <Button
          style = {styles.segButton}
            active={this.state.seg === 2 ? true : false}
            onPress={() => this.toggleSeg()}
          >
            <Text>Exercise</Text>
          </Button>
        </Segment>

        <Content padder>

          <View style = {{flexDirection: 'row'}}>
            <Item>
              <Icon type = "FontAwesome5" name = "search" />
            </Item>
            <Input 
              placeholder = "Search"
              value = {this.state.string}
              onChangeText = { (text) => this.setState({string: text})}
            />
            <Button transparent onPress = {() => this.setState({filterForm: true})}>
              <Icon 
                type = "MaterialCommunityIcons" name = "filter" 
                
              />
            </Button>
          </View>

          <Modal 
            transparent={true}  
            visible={this.state.filterForm}
            animationType="slide"
          >
            <FilterForm 
              cat = {this.state.seg === 1?'food':'exercise'}
              filterStatus = {this.state.filterList}
              cancel = {this.cancelFilter.bind(this)} 
              filter = {this.submitFilter.bind(this)}
            />
          </Modal>

          

          {seg === 1 && <FormButton
              title = {expandedFood?'Cancel':'Add new custom food'}
              color = {expandedFood?'red':'green'}
              handlePress = {this.collapseFoodForm.bind(this)}
          />}
          {seg === 2 && <FormButton
              title = {expandedExercise?'Cancel':'Add new custom exercise'}
              color = {expandedExercise?'red':'green'}
              handlePress = {this.collapseExerciseForm.bind(this)}
          />}

          {seg === 1 && expandedFood && 
            <AddFoodForm completeForm = {this.collapseFoodForm.bind(this)}/>
          }
          {seg === 2 && expandedExercise && 
            <AddExerciseForm completeForm = {this.collapseExerciseForm.bind(this)}/>
          }

          {seg === 1 && 
            <FoodList search = {this.state.string} filter = {this.state.filterList}/>}
          {seg === 2 && 
            <ExerciseList search = {this.state.string} filter = {this.state.filterList}/>}
        </Content>
      </Container>
    );
  }
}

/* Omitted accordion due to virtualized lists warning */
/*
    <Accordion
        dataArray={
          [{
          title: 'Add new custom',
          content: 'Enter basic info',
          }]
        }
        animation={true}
        expanded={this.state.expanded}
        icon="add"
        expandedIcon="remove"
        iconStyle={{ color: "green" }}
        expandedIconStyle={{ color: "red" }}
        renderHeader = {this.formHeader.bind(this)}
        renderContent = {this.formContent.bind(this)}
    />
  */

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  segButton: {

  },

  formHeader: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#A9DAD6"
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
});


export default ListScreen;


/* Initial food state, migrated to redux store */
/*
const  food = [
  {
    name: 'Egg',
    category: 'protein',
    image: default_image,
    id: 1,
  },
  {
    name: 'Potato',
    category: 'vegetable',
    image: default_image,
    id: 2,
  }
]
*/


/* Initial Separate screens as tabs, removed due to redundancy */
/*
class ListTab extends Component {

  constructor(props){
    super(props);
    this.state = {
      expanded: false,
    }
  }



  render(){
    //const {food} = this.props;
    const {cat} = this.props;
    return(
      <Content padder>
        
        {cat === 'food' && <FoodList/>}
        {cat === 'exercise' && <ExerciseList/>}
      </Content>
    )
  }
}
*/

/*
class ExTab extends Component {

  formHeader(item, expanded){
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 8,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#A3E4D7"
        }}
      >
        <Text style = {{color: '#1C2833', fontWeight: "bold"}}>
          {" "}{item.title}
        </Text>
        {expanded
          ? <Icon style = {{color: '#7F8C8D'}}  name="remove" />
          : <Icon style = {{color: '#1C2833'}}  name="add" />}
      </View>
    );
  }

  formContent(item) {
    return <AddForm completeForm = {() => {}}/>
  }

  render(){
    return(
      <Content padder>
        <Accordion
            dataArray={
              [{
              title: 'Add new custom exercise',
              content: 'Enter basic info',
              }]
            }
            animation={true}
            expanded={true}
            icon="add"
            expandedIcon="remove"
            iconStyle={{ color: "green" }}
            expandedIconStyle={{ color: "red" }}
            renderHeader = {this.formHeader}
            renderContent = {this.formContent}
        />
        <ExerciseList/>
    </Content>
    )
  }
}*/


/* ListScreen with tabs (omitted) */
/* 
class ListScreen extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header >
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Suggestions</Title>
          </Body>
          <Right />
        </Header>

        <Tabs>
          <Tab heading="Food">
            <FoodTab />
          </Tab>
          <Tab heading="Exercise">
            <ExTab />
          </Tab>
        </Tabs>

      
      </Container>
    );
  }
}
*/
