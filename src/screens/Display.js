import React, { Component } from "react";
import {StyleSheet} from "react-native";
import {
  Container,
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
} from "native-base";
import {connect} from "react-redux";
import {foodOperate} from "../reducers";

const default_image = require("../../assets/default_image.png");

const mapStateToProps = (state) => ({
  food: foodOperate(state, undefined),
})


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


const exercises = [
  {
    name: 'Sit-up',
    category: 'abs',
    image: default_image,
    id: 1,
  },
  {
    name: 'Sit-down',
    category: 'relax',
    image: default_image,
    id: 2,
  }
]


class FoodTab extends Component {
  handleAdd = () => {

  }
  render(){
    //const {food} = this.props;
    return(
      <Content padder>
        <Button 
          style = {styles.addButton}

          onPress = {() => this.handleAdd}
        >
          <Icon name = "paper"/>
          <Text style = {{fontSize:15, textAlign: 'justify'}}>Add new custom food</Text>
        </Button>
        <List
          dataArray={food}
          renderRow={data =>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={data.image} />
              </Left>
              <Body>
                <Text>
                  {data.name}
                </Text>
                <Text numberOfLines={1} note>
                  {data.category}
                </Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>}
        />
      </Content>
    )
  }
}

connect(mapStateToProps)(FoodTab);

class ExTab extends Component {
  handleAddEx = () => {

  }

  render(){
    return(
      <Content padder>
        <Button 
          style = {styles.addButton}

          onPress = {() => this.handleAdd}
        >
          <Icon name = "paper"/>
          <Text style = {{fontSize:15, textAlign: 'justify'}}>Add new custom exercise</Text>
        </Button>
        <List
          dataArray={exercises}
          renderRow={data =>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={data.image} />
              </Left>
              <Body>
                <Text>
                  {data.name}
                </Text>
                <Text numberOfLines={1} note>
                  {data.category}
                </Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>}
        />
    </Content>
    )
  }
}

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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  }
});


export default ListScreen;
