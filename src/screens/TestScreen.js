import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import DefalutTextInput from '../TextInput/DefalutTextInput'

export default class TestScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalmoney: '0',
      preMoney: '0',
      installmentDay: '0',
      period: '0',
      rate: '0',
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.indexStartcontainer}>
          <Text>할부기간</Text>
          <Text>거치기간</Text>
          <Text>할부금리</Text>
          <Text>할부원금</Text>
          <Text>선수금</Text>
        </View>
        <View style={styles.indexCentercontainer}>
        <TextInput
          style={styles.maintextInput}
          onChangeText={(installmentDay) => this.setState({ installmentDay })}
          value={this.state.installmentDay}
          />
          <TextInput
          style={styles.maintextInput}
          onChangeText={(period) => this.setState({ period })}
          value={this.state.inputmoney}      
        />
          <TextInput
          style={styles.maintextInput}
          onChangeText={(rate) => this.setState({ rate })}
          value={this.state.inputmoney}
          />
          <TextInput
          style={styles.maintextInput}
          onChangeText={(totalmoney) => this.setState({ totalmoney })}
          value={this.state.inputmoney}
        />
          <TextInput
          style={styles.maintextInput}
          onChangeText={(preMoney) => this.setState({ preMoney })}
          value={this.state.preMoney}
        />
        </View>
        <View style={styles.indexEndcontainer}>
        <Text>%/년</Text>
        <Text>만원</Text>
        <Text>만원</Text>
        </View>
        <View style={styles.insertBtn}>
        <Button
          title="입력"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Test', {
              totalmoney: this.state.totalmoney,
              preMoney: this.state.preMoney,
              installmentDay: this.state.installmentDay,
              period: this.state.period,
              rate: this.state.rate,
              itemId: this.state.inputmoney,
            });
          }}
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
  },
  indexStartcontainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 1,
    padding: 10
    
  },
  indexEndcontainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    height: 110,
    padding: 10
  },
  indexCentercontainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,

  },
  supportText: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  activeTitle: {
    color: 'red',
  },
  maintextInput:{
    width: '40%',
    height: 20, 
    borderWidth: 1,
    padding: 1,
  },
  insertBtn:{
    alignItems: 'center',
    justifyContent: 'space-around'
  },
});
