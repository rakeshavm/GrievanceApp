/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import axios from 'axios';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  ToastAndroid,
  Dimensions,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';

export default class register extends Component {
  state = {
    password: '',
    phone_number: '',
  };
  onChangeText = (key, val) => {
    this.setState({[key]: val});
  };

  login = async () => {
    const {phone_number, password} = this.state;
    console.log('log det', this.state);
    let res = await axios.get('http://192.168.43.218:2000/login', {
      params: {
        pno: phone_number,
        pass: password,
      },
    });
    console.log('login res', res.data['name']);
    if (res.data.type) {
      this.props.navigation.navigate('home', {
        name: res.data['name'],
        points: res.data['points'],
        complaints: res.data['complaint'],
        pno: phone_number,
      });
    } else {
      ToastAndroid.show(res.data, ToastAndroid.SHORT);
    }
  };

  handleRoute = val => {};

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.head}>Sign in</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={val => this.onChangeText('phone_number', val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={val => this.onChangeText('password', val)}
        />
        <View style={styles.login}>
          <TouchableOpacity onPress={this.login} style={styles.addbutton1}>
            <Text
              style={{
                color: '#0066b8',
                fontFamily: 'Roboto',
                fontWeight: 'bold',
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#0066b8',
              marginBottom: 25,
              marginTop: 10,
            }}>
            Or
          </Text>
          <TouchableOpacity
            onPress={() => this.handleRoute('Register')}
            style={styles.addbutton1}>
            <Text
              style={{
                color: '#0066b8',
                fontFamily: 'Roboto',
                fontWeight: 'bold',
              }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#0066b8',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  head: {
    color: '#0066b8',
    fontSize: 30,
    textAlign: 'center',
    width: 200,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  login: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '5%',
  },
  addbutton1: {
    width: Dimensions.get('window').width * 0.3,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 3,
  },
});
