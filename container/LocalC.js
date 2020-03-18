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
  Image,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import ComplaintC from './ComplaintC';

export default class LocalC extends Component {
  state = {
    name: '',
    points: 0,
    complaints: [],
    com2: [],
    lat: 0,
    long: 0,
    flag2: 0,
  };

  handleRoute = (val, index = 0) => {
    this.props.navigation.navigate(val, {
      pno: this.props.navigation.state.params.pno,
      complaints: this.props.navigation.state.params.complaints,
      localcom: this.state.arr,
      name: this.props.navigation.state.params.name,
      index,
      points: this.props.navigation.state.params.points,
    });
  };

  onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        let currentLongitude = JSON.stringify(position.coords.longitude);
        let currentLatitude = JSON.stringify(position.coords.latitude);
        console.log(currentLatitude, currentLongitude);
        this.setState({lat: currentLatitude, long: currentLongitude});
      },
      error => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };
  componentWillMount() {
    this.getLocation();
  }

  getNearC = async () => {
    console.log('getnear');
    var res = await axios.get('http://192.168.43.218:2000/complaint/loc', {
      params: {
        lat: this.state.lat,
        long: this.state.long,
      },
    });
    console.log('response_loc', res.data);
    var arr = res.data.result.filter(this.onlyUnique);
    console.log('arr', arr);
    this.setState({complaints: arr});
    var carr = [];
    arr.forEach(async (e, i) => {
      var res = await axios.get('http://192.168.43.218:2000/status', {
        params: {
          id: e,
        },
      });

      this.sleep(2000);
      carr = this.state.com2;
      carr.push(res.data.result);
      console.log('carr2', carr);
      this.setState({com2: carr, flag2: 1});
      if (carr.length === arr.length) this.setState({flag2: 2});
    });
  };

  renderNearCom = () => {
    console.log('flag2', this.state);
    if (this.state.flag2 === 0) this.getNearC();
    else if (this.state.flag2 === 2) {
      return this.state.com2.map((obj, i) => {
        return (
          <ComplaintC
            type={obj.type}
            status={obj.status}
            summary={obj.sum}
            time={obj.time}
            vote={obj.vote}
            onPress={() => {
              this.props.navigation.navigate('Vote', {
                pno: this.props.navigation.state.params.pno,
                complaints: this.props.navigation.state.params.complaints,
                localcom: this.state.arr,
                name: this.props.navigation.state.params.name,
                index: i,
                vote: obj.vote,
                points: this.props.navigation.state.params.points,
              });
            }}
          />
        );
      });
    }
  };

  render() {
    return (
      <View>
        {console.log('state', this.state)}
        <View style={styles.header}>
          <Text style={styles.text}>
            Welcome {this.props.navigation.state.params.name}
          </Text>
        </View>
        {console.log('pno', this.props.navigation.state.params.pno)}
        <Text style={{color: '#0066b8', fontSize: 25, padding: 10}}>
          Points: {this.props.navigation.state.params.points}
        </Text>
        {/* <Text style={{color: '#0066b8', fontSize: 25, padding: 10}}>
          Registered Complaints:
        </Text>
        <View>{this.renderCom()}</View> */}
        <Text style={{color: '#0066b8', fontSize: 25, padding: 10}}>
          Nearby Complaints:
        </Text>
        <View>{this.renderNearCom()}</View>
        <View style={{alignItems: 'center', marginTop: 50}}>
          <TouchableOpacity
            onPress={() => this.handleRoute('Complaint')}
            style={styles.addbutton1}>
            <Text
              style={{
                color: '#0066b8',
                fontFamily: 'Roboto',
                fontWeight: 'bold',
              }}>
              Add complaint
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', marginTop: 50}}>
          <TouchableOpacity
            onPress={() => this.handleRoute('home')}
            style={styles.addbutton1}>
            <Text
              style={{
                color: '#0066b8',
                fontFamily: 'Roboto',
                fontWeight: 'bold',
              }}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = {
  header: {
    width: '100%',
    height: 60,
    // borderWidth:1,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.9,
    elevation: 6,
    backgroundColor: '#0066b8',
    color: 'beige',
  },
  text: {
    color: 'beige',
    fontSize: 25,
    padding: 10,
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
};
