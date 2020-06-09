import React, {Component} from "react";
import {SafeAreaView, StyleSheet} from "react-native";
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
import {foodOperate} from "../../reducers";
import {ViewFilter} from "../../actions";
import data from "../../data/data.json";

/*
const showVisibleList = (food, filter) => {
  switch (filter) {
    case ViewFilter.SHOW_ALL: return food
  }
}
*/

/*
const mapStateToProps = (state) => ({
  foodList: state.foodList

})*/

function mapStateToProps(state) {
  return {foodList: state.foodList}
}

class FoodList extends Component {
  render(){
    const {foodList} = this.props;
    return(
        foodList.map(data =>
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
            </ListItem>
        )
    )
  }
}

export default connect(mapStateToProps)(FoodList);