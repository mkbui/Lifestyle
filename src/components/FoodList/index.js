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
import {foodOperate} from "../../reducers";
import {ViewFilter} from "../../actions";

/*
const showVisibleList = (food, filter) => {
  switch (filter) {
    case ViewFilter.SHOW_ALL: return food
  }
}
*/

const mapStateToProps = (state) => ({
  foodList: state.foodList
})

class FoodList extends Component {
  render(){
    const {foodList} = this.props;
    return(
      <List
          dataArray={foodList}
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
                  <Text>Add</Text>
                </Button>
              </Right>
            </ListItem>}
        />
    )
  }
}

export default connect(mapStateToProps)(FoodList);