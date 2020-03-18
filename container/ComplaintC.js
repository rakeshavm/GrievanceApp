/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

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
  Image,
} from 'react-native';

export default class ComplaintC extends Component {
  render() {
    return (
      <View style={styles.body}>
        <Text style={styles.text}>
          Type: {this.props.type} {'\t'} Status: {this.props.status}
        </Text>
        <Text style={styles.text}>
          Time: {this.props.time} {'\t'} Vote: {this.props.vote}
        </Text>
        <Text style={styles.text}>Summary: {this.props.summary}</Text>
      </View>
    );
  }
}

const styles = {
  body: {
    width: '95%',
    height: 85,
    backgroundColor: '#0066b8',
    margin: 10,
    padding: 8,
    borderRadius: 14,
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
};
