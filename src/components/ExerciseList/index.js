import React, {Component} from "react";

import {StyleSheet} from "react-native";
import {
  Button,
  List,
  ListItem,
  Text,
  Thumbnail,
  Left,
  Body,
  Right,
} from "native-base";
import {connect} from "react-redux";
import {ViewFilter} from "../../actions";

/*
const showVisibleList = (food, filter) => {
  switch (filter) {
    case ViewFilter.SHOW_ALL: return food
  }
}
*/

const mapStateToProps = (state) => ({
  exerciseList: state.exerciseList
})

class ExerciseList extends Component {
  render(){
    const {exerciseList} = this.props;
    /*
    return(
      <List 
        dataArray = {exerciseList}
        renderRow = { data =>
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
                <Text>Add</Text>
              </Button>
            </Right>
          </ListItem>
        }
        keyExtractor = {item => item.id}
      />
    )*/
    return(
      exerciseList.map( data =>
        <ListItem thumbnail key = {data.id}>
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
        </ListItem>
      )
    )
  }
}

export default connect(mapStateToProps)(ExerciseList);