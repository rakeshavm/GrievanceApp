import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';

export default class Vote extends Component {
  state = {
    votes: this.props.navigation.state.params.vote,
  };
  handleRoute = val => {
    this.props.navigation.navigate(val, {
      pno: this.props.navigation.state.params.pno,
      complaints: this.props.navigation.state.params.complaints,
      // localcom: this.props.navigation.state.params.localcom,
      name: this.props.navigation.state.params.name,
      points: this.props.navigation.state.params.points,
    });
  };

  handleVote = async () => {
    var carray = this.props.navigation.state.params.localcom;
    var cid = carray[this.props.navigation.state.params.index];
    var res = await axios.post('http://192.168.43.218:2000/vote', {
      id: cid,
    });
    console.log(res.data);
  };

  // renderVotes = () => {
  //   return
  // };

  render() {
    return (
      <View style={styles.body}>
        <View>
          <Text style={{fontSize: 20}}>
            Complaint already registered!{'\n'}
            Please vote to get help faster!
          </Text>
        </View>
        <View>
          <Image
            style={styles.vote}
            source={require('./like.png')}
            onPress={this.handleVote}
          />
        </View>
        <View>
          <Text>{this.state.votes}</Text>
        </View>
        <View style={{marginTop: 20}}>
          <TouchableOpacity
            onPress={() => this.handleRoute('home')}
            style={styles.addbutton1}>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
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
  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
  vote: {
    marginTop: 45,
    marginBottom: 10,
    height: 45,
    width: 45,
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
