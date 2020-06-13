import React, {Component} from 'react';

export function getDateString(){
  const date = new Date();
  const dateString = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
  return dateString;
}