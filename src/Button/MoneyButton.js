import React, { Component } from 'react';
import { View, Button } from 'react-native';


export default class MoneyButton extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
        <Button
          title={this.props.title}
          onPress={this.props.onPress}
        />
    );
  }
}