import React from 'react';
import {Button} from 'react-native-elements';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <Button
        title="Go to Chad's profile"
        onPress={() => navigate('Profile', {name: 'Chad'})}
      />
    );
  }
}
