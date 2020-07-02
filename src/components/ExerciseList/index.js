import React, {Component} from "react";

import {StyleSheet, ToastAndroid} from "react-native";
import {
  Button,
  List,
  ListItem,
  Text,
  Thumbnail,
  Left,
  Body,
  Right,
  Icon,
  Toast,
} from "native-base";
import {connect} from "react-redux";
import {viewFilter, removeExercise} from "../../actions";
import {checkFilter} from "../../utils";
/*
const showVisibleList = (food, filter) => {
  switch (filter) {
    case ViewFilter.SHOW_ALL: return food
  }
}
*/

/* store data used: exercise list */
const mapStateToProps = (state) => ({
  exerciseList: state.exerciseList
})

/* store dispatch function used: remove exercise for item removal */
const mapDispatchToProps = dispatch => ({
  removeExercise: (id) => dispatch(removeExercise(id))
})

class ExerciseList extends Component {

  /* dispatch function call along with a toast */
  removeItem(data){
    this.props.removeExercise(data.id);
    ToastAndroid.show(
      "Exercise removed successfully!",
      ToastAndroid.SHORT
    )
  }

  render(){
    const {exerciseList, search, filter} = this.props;
    var isFilter = false;
    filter.map(data => {
      if (data.checked === true) isFilter = true;
    })
    
    let renderList = exerciseList.filter(data => 
      (data.name.indexOf(search) !== -1 && 
        (!isFilter || checkFilter(data.category, filter) === true)
      )
    )
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
      renderList.map( data =>
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
                  <Icon style = {styles.iconView} type = "FontAwesome5" name = "glasses"/>
                  <Icon style = {styles.iconView} name = "trash" onPress = {()=>{this.removeItem(data)} } />
                </Button> 
            </Right>
            </ListItem>
        )
    )
  }
}

const styles = StyleSheet.create({
  iconView: {
    paddingRight: 3,
    color: 'black',
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseList);