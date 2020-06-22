import React, { Component } from "react";
import {StyleSheet} from "react-native";
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
} from "native-base";
import {connect} from "react-redux";
import {foodOperate} from "../reducers";
import FoodList from "../components/FoodList";
import ExerciseList from "../components/ExerciseList";
import AddFoodForm from "../components/AddForm/AddFoodForm";
import AddExerciseForm from "../components/AddForm/AddExerciseForm"
import FormButton from "../components/FormButton";

const default_image = require("../../assets/default_image.png");



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

class ListScreen extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      seg: 1,
      expandedFood: false,
      expandedExercise: false,
    }
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
            onPress={() => this.setState({ seg: 1 })}
          >
            <Text>Food</Text>
          </Button>
          <Button
          style = {styles.segButton}
            active={this.state.seg === 2 ? true : false}
            onPress={() => this.setState({ seg: 2 })}
          >
            <Text>Exercise</Text>
          </Button>
        </Segment>

        <Content padder>
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

          {seg === 1 && <FoodList/>}
          {seg === 2 && <ExerciseList/>}
        </Content>
      </Container>
    );
  }
}

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
  }
});


export default ListScreen;


/* ListScreen with tabs (omitted)
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
