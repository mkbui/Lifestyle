import React, {Component} from 'react';

/*
const Realm = require('realm');

const FoodSchema = {
  name: 'Food',
  properties: {
    id: 'int',
    title: 'string',
    amount: 'int',
    category: 'string',
    record: 'date[]',
  }
};

const UserSchema = {
  name: 'User',
  properties: {
    username: 'string',
    height: 'int',
    currentWeight: 'int',
    age: 'int',
  }
}

export const getListFood = () => {
  const listFood = realm.object('Food');
  return Promise.resolve(listFood);
}

export const addFood = (props) => {
  if (!props){
    return Promise.reject('Information is empty');
  }
  const newFood = {
    created: new Date(),
    name: props.name,
    amount: props.amount,
    category: props.category,
  }

  Realm.open({schema: [FoodSchema]})
    .then(realm => {
      realm.write(() => {
        const newFood = realm.create('Food', {
          id: realm.objects('Food').length + 1,
          title: props.name,
          amount: props.amount,
          category: props.category,
          record: [new Date()],
        });
      });
      realm.close();
    })
    .catch(error => {
      console.log(error);
    });

  }

  */