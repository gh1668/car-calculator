import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Picker } from 'react-native';
import MoneyButton from '../Button/MoneyButton'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalmoney: 0,
      preMoney: '0',
      installmentDay: '0',
      period: '0',
      rate: '0',
      way: '0',
    }
  }
  addpreMoney = (money) => {
    this.setState({ preMoney: (parseInt(this.state.preMoney, 10) + parseInt(money, 10)).toString() })
  }
  addTotalMoney = (money) => {
    this.setState({ totalmoney: (parseInt(this.state.totalmoney, 10) + parseInt(money, 10)).toString() })
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={{ fontSize: 20, paddingBottom: 30, paddingLeft: 10, }}>자동차할부계산기</Text>
          <View style={{ width: "100%", borderBottomWidth: 0.5, borderColor: '#444' }} />
        </View>
        <View style={styles.content}>
          <View style={styles.elem}>
            <View style={styles.userInfo}>
              <Text style={styles.name}>할부원금</Text>
            </View>
            <View style={styles.inputComment}>
              <TextInput
                style={styles.inputText}
                onChangeText={(totalmoney) => this.setState({ totalmoney })}
                value={this.state.totalmoney.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              />
            </View>
            <View style={styles.userComment}>
              <Text style={styles.supportText}>원</Text>
            </View>
          </View>
          <View style={styles.moneyBtn}>
            <MoneyButton title={'5000만원'} onPress={() => this.addTotalMoney(50000000)} />
            <MoneyButton title={'1000만원'} onPress={() => this.addTotalMoney(10000000)} />
            <MoneyButton title={'100만원'} onPress={() => this.addTotalMoney(1000000)} />
            <MoneyButton title={'10만원'} onPress={() => this.addTotalMoney(100000)} />
            <MoneyButton title={'1만원'} onPress={() => this.addTotalMoney(10000)} />
            <MoneyButton title={'정정'} onPress={() => this.setState({ totalmoney: 0 })} />
          </View>
          <View style={styles.elem}>
            <View style={styles.userInfo}>
              <Text style={styles.specialText}>선수금</Text>
            </View>
            <View style={styles.inputComment}>
              <TextInput
                style={styles.inputText}
                onChangeText={(preMoney) => this.setState({ preMoney })}
                value={this.state.preMoney.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              />
            </View>
            <View style={styles.userComment}>
              <Text style={styles.supportText}>원</Text>
            </View>
          </View>
          <View style={styles.moneyBtn}>
            <MoneyButton title={'5000만원'} onPress={() => this.addpreMoney(50000000)} />
            <MoneyButton title={'1000만원'} onPress={() => this.addpreMoney(10000000)} />
            <MoneyButton title={'100만원'} onPress={() => this.addpreMoney(1000000)} />
            <MoneyButton title={'10만원'} onPress={() => this.addpreMoney(100000)} />
            <MoneyButton title={'1만원'} onPress={() => this.addpreMoney(10000)} />
            <MoneyButton title={'정정'} onPress={() => this.setState({ preMoney: 0 })} />
          </View>
          <View style={styles.elem}>
            <View style={styles.userInfo}>
              <Text style={styles.name}>할부기간</Text>
            </View>
            <View style={styles.inputComment}>
              <TextInput
                style={styles.inputText}
                onChangeText={(installmentDay) => this.setState({ installmentDay })}
                value={this.state.installmentDay}
              />
            </View>
            <View style={styles.userComment}>
              <Text style={styles.supportText}>개월</Text>
            </View>
          </View>
          <View style={styles.elem}>
            <View style={styles.userInfo}>
              <Text style={styles.name}>거치기간</Text>
            </View>
            <View style={styles.inputComment}>
              <TextInput
                style={styles.inputText}
                onChangeText={(period) => this.setState({ period })}
                value={this.state.period}
              />
            </View>
            <View style={styles.userComment}>
              <Text style={styles.supportText}>개월</Text>
            </View>
          </View>
          <View style={styles.elem}>
            <View style={styles.userInfo}>
              <Text style={styles.name}>할부금리</Text>
            </View>
            <View style={styles.inputComment}>
              <TextInput
                style={styles.inputText}
                onChangeText={(rate) => this.setState({ rate })}
                value={this.state.rate}
              />
            </View>
            <View style={styles.userComment}>
              <Text style={styles.supportText}>%/년</Text>
            </View>
          </View>
          <View style={styles.elem}>
            <View style={styles.userInfo}>
              <Text style={styles.name}>계산방식</Text>
            </View>
            <View style={styles.inputComment}>
              <Picker
                selectedValue={this.state.way}
                style={{ height: 50, width: 200 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ way: itemValue })
                }>
                <Picker.Item label="원리금균등분할상환" value="0" />
                <Picker.Item label="원금균등분할상환" value="1" />
                <Picker.Item label="원금만기일시상환" value="2" />
              </Picker>
            </View>
            <View style={styles.userComment}>

            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            title="입력"
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              this.props.navigation.navigate('Details', {
                totalmoney: this.state.totalmoney.toString(),
                preMoney: this.state.preMoney.toString(),
                installmentDay: this.state.installmentDay,
                period: this.state.period,
                rate: this.state.rate,
                itemId: this.state.inputmoney,
                way: this.state.way,
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
  },
  header: {
    height: 60,
    backgroundColor: 'green',
  },
  footer: {
    height: 60,
    backgroundColor: 'red',
  },
  content: {
    flex: 1,
  },
  title: {
    width: '100%',
    height: '18%',
    justifyContent: 'center',
    //backgroundColor: '#9aa9ff',
  },
  elem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#eee',
    borderBottomWidth: 0.5,
    padding: 5,
  },
  moneyBtn: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    borderColor: '#eee',
    justifyContent: 'center',
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userComment: {
    padding: 8,
    borderRadius: 5,
    height: 50,
    width: 60,
  },
  inputComment: {
    padding: 8,
    borderRadius: 5,
    height: 50,
    width: 100,
  },
  name: {
    paddingLeft: 10,
  },
  specialText: {
    paddingLeft: 23,
  },
  supportText: {
    padding: 7,
  },
  inputText: {
    padding: 4,
  },
  inputBtn: {
    height: 50,
  },
  footer: {
    width: '100%',
    height: '15%',
    //backgroundColor: '#1ad657',
  },
});