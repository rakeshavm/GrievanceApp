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
  Image,
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';

export default class complaint extends Component {
  state = {
    desc: '',
    lat: 0.0,
    long: 0.0,
  };

  handleRoute = val => {
    this.props.navigation.navigate(val, {
      desc: this.state.desc,
      pno: this.props.navigation.state.params.pno,
      complaints: this.props.navigation.state.params.complaints,
      name: this.props.navigation.state.params.name,
      points: this.props.navigation.state.params.points,
    });
  };

  // getLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       let currentLongitude = JSON.stringify(position.coords.longitude);
  //       let currentLatitude = JSON.stringify(position.coords.latitude);
  //       console.log(currentLatitude, currentLongitude);
  //       this.setState({lat: currentLatitude, long: currentLongitude});
  //     },
  //     error => alert(error.message),
  //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
  //   );
  // };

  handleComplaint = async () => {
    console.log('comp', this.state.desc);
    if (this.props.navigation.state.params) {
      if (this.state.desc !== '') {
        var form = new FormData();
        form.append('image', {
          name: 'test.jpg',
          type: 'image/jpg',
          uri: this.props.navigation.state.params.path,
        });
        //   form.append('eid', this.props.navigation.state.params.eid);
        // form.append('timestamp', date);
        var loc = {
          lat: this.props.navigation.state.params.lat,
          long: this.props.navigation.state.params.long,
        };
        console.log('latlong', loc);
        form.append('lat', loc.lat);
        form.append('long', loc.long);
        form.append('sum', this.state.desc);
        form.append('pno', this.props.navigation.state.params.pno);
        let res = await axios.post(
          'http://192.168.43.218:2000/complaint/user',
          form,
        );
        if (res.data.status == 200) {
          // else {
          //   let res = await axios.post('', {});
          // }
          // this.props.navigation.navigate('home', {
          //   pno: this.props.navigation.state.params.pno,
          //   complaints: this.props.navigation.state.params.complaints,
          //   name: this.props.navigation.state.params.name,
          //   points: this.props.navigation.state.params.points,
          // });
          ToastAndroid.show('Complaint registered!', ToastAndroid.SHORT);
        } else ToastAndroid.show('Enter desc!!', ToastAndroid.SHORT);
      }
    }
  };

  renderImg = () => {
    if (this.props.navigation.state.params) {
      console.log('inside img');
      return (
        <Image
          source={{uri: this.props.navigation.state.params.path}}
          style={styles.preview}
        />
      );
    } else {
      return;
    }
  };

  renderDesc = () => {
    console.log('desc in', this.props.navigation.state.params.desc);
    if (this.props.navigation.state.params.desc)
      return this.props.navigation.state.params.desc;
    else return '';
  };

  componentDidMount() {
    // var des = document.querySelector('#des');
    // des.value = this.props.navigation.state.params.desc;
  }

  render() {
    return (
      <View style={styles.body}>
        {console.log('cstate', this.props.navigation.state.params)}
        <View style={{backgroundColor: 'grey', width: '100%', height: 40}}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('home', {
                pno: this.props.navigation.state.params.pno,
                complaints: this.props.navigation.state.params.complaints,
                name: this.props.navigation.state.params.name,
                points: this.props.navigation.state.params.points,
              })
            }>
            <Image
              style={{marginLeft: 5, height: 35, width: 35}}
              source={require('./back.png')}
            />
          </TouchableOpacity>
        </View>
        <View>
          <View>
            <Text style={styles.head}>GRIEVANCE</Text>
            <View style={styles.line} />
            <Text style={styles.head}>REGISTER</Text>
            <View style={styles.line} />
          </View>
        </View>
        <View style={styles.uid}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.searchbox}
            placeholder="Enter description"
            id="des"
            name="des"
            placeholderTextColor="#0066b8"
            onChangeText={text => this.setState({desc: text})}
          />
        </View>
        <View>
          {console.log('Image', this.props.navigation.state)}
          {this.renderImg()}
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={styles.login}>
            <TouchableOpacity
              onPress={() => this.handleRoute('Cam')}
              style={styles.addbutton1}>
              <Text
                style={{
                  color: '#0066b8',
                  fontFamily: 'Roboto',
                  fontWeight: 'bold',
                }}>
                Take Picture
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.login}>
            <TouchableOpacity
              onPress={this.handleComplaint}
              style={styles.addbutton1}>
              <Text
                style={{
                  color: '#0066b8',
                  fontFamily: 'Roboto',
                  fontWeight: 'bold',
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
  head: {
    color: '#0066b8',
    textAlign: 'center',
    fontSize: 30,
    width: 200,
    fontWeight: 'bold',
  },
  uid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '5%',
  },
  login: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '5%',
  },
  searchbox: {
    width: Dimensions.get('window').width * 0.65,
    height: 100,
    backgroundColor: 'white',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    elevation: 1,
    borderRadius: 30,
    color: '#0066b8',
    textAlign: 'center',
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
  line: {
    width: Dimensions.get('window').width * 0.5,
    height: 2,
    borderTopWidth: 1,
    borderColor: '#0066b8',
  },
  preview: {
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.8,
    height: 200,
  },
};

//registration form for user
//card for displaying complaints
//complaints page for user
//complaint (singular) page for worker
//web ui for admin(display all complaints)
//assign worker
