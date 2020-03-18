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
// import Geolocation from 'react-native-geolocation-service';

import ComplaintC from './ComplaintC';

export default class home extends Component {
  state = {
    name: '',
    points: 0,
    complaints: [],
    com: [],
    lat: 0,
    long: 0,
    flag: 0,
  };
  //   async componentDidMount() {
  //     if (this.props.navigation.state.params.name) {
  //       this.setState({
  //         name: this.props.navigation.state.params.name,
  //         points: this.props.navigation.state.params.points,
  //         complaints: this.props.navigation.state.params.complaints,
  //         pno: this.props.navigation.state.params.pno,
  //       });
  //     }
  // else {
  //   let res = await axios.get('http://192.168.43.218:2000/myComplaint', {
  //     params: {
  //       pno: this.props.navigation.state.params.pno,
  //     },
  //   });
  //   this.setState({
  //     name: res.data.name,
  //     points: res.data.points,
  //     complaints: res.data.complaints,
  //     pno: this.props.navigation.state.params.pno,
  //   });
  // }
  //   }
  //   getLocation = () => {
  //     Geolocation.getCurrentPosition(
  //       position => {
  //         let currentLongitude = JSON.stringify(position.coords.longitude);
  //         let currentLatitude = JSON.stringify(position.coords.latitude);
  //         console.log(currentLatitude, currentLongitude);
  //         this.setState({lat: currentLatitude, long: currentLongitude});
  //       },
  //       error => alert(error.message),
  //       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
  //     );
  //   };
  //   componentWillMount() {
  //     this.getLocation();
  //   }
  handleRoute = val => {
    this.props.navigation.navigate(val, {
      pno: this.props.navigation.state.params.pno,
      complaints: this.props.navigation.state.params.complaints,
      name: this.props.navigation.state.params.name,
      points: this.props.navigation.state.params.points,
    });
  };

  onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  //   getNearC = async () => {
  //     var res = await axios.get('http://192.168.43.218:2000/complaint', {
  //       params: {
  //         lat: this.state.lat,
  //         long: this.state.long,
  //       },
  //     });
  //     console.log('response_loc', res.data);
  //     var arr = res.data.result.filter(this.onlyUnique);
  //     console.log('arr', arr);
  //     var carr = [];
  //     arr.forEach(async (e, i) => {
  //       var res = await axios.get('http://192.168.43.218:2000/status', {
  //         params: {
  //           id: e,
  //         },
  //       });

  //       this.sleep(2000);
  //       carr = this.state.com2;
  //       carr.push(res.data.result);
  //       console.log('carr2', carr);
  //       this.setState({com2: carr, flag2: 1});
  //       if (carr.length === arr.length) this.setState({flag2: 2});
  //     });
  //   };

  getPar = async () => {
    // console.log('comp', this.props.navigation.state.params.complaints);
    var arr = this.props.navigation.state.params.complaints.filter(
      this.onlyUnique,
    );
    console.log('arr', arr);
    var carr = [];
    arr.forEach(async (e, i) => {
      var res = await axios.get('http://192.168.43.218:2000/status', {
        params: {
          id: e,
        },
      });
      this.sleep(2000);
      carr = this.state.com;
      carr.push(res.data.result);
      console.log('carr', carr);
      this.setState({com: carr, flag: 1});
      if (carr.length === arr.length) this.setState({flag: 2});
    });
    // return arr.map(com => {
  };
  renderCom = () => {
    if (this.state.flag === 0) this.getPar();
    else if (this.state.flag === 2) {
      return this.state.com.map(obj => {
        return (
          <ComplaintC
            type={obj.type}
            status={obj.status}
            summary={obj.sum}
            time={obj.time}
            vote={obj.vote}
          />
        );
      });
    }
  };
  //   renderNearCom = () => {
  //     if (this.state.flag2 === 0) this.getNearC();
  //     else if (this.state.flag2 === 2) {
  //       return this.state.com2.map(obj => {
  //         return (
  //           <ComplaintC
  //             type={obj.type}
  //             status={obj.status}
  //             summary={obj.sum}
  //             time={obj.time}
  //             vote={obj.vote}
  //           />
  //         );
  //       });
  //     }
  //   };
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
        <Text style={{color: '#0066b8', fontSize: 25, padding: 10}}>
          Registered Complaints:
        </Text>
        <View>{this.renderCom()}</View>
        {/* <Text style={{color: '#0066b8', fontSize: 25, padding: 10}}>
          Nearby Complaints:
        </Text>
        <View>{this.renderNearCom()}</View> */}
        <View style={{alignItems: 'center', marginTop: 50}}>
          <TouchableOpacity
            onPress={() => this.handleRoute('Local')}
            style={styles.addbutton1}>
            <Text
              style={{
                color: '#0066b8',
                fontFamily: 'Roboto',
                fontWeight: 'bold',
              }}>
              Local complaints
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
