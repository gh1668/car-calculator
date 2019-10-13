import React, { Component } from 'react';
import { View, TextInput } from 'react-native';


export default function DefalutTextInput() {
  const [value, onChangeText] = React.useState('0');

  return (
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText(text)}
      value={value}
    />
  );
}
