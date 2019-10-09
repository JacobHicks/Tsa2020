import React from 'react';
import DoubleTap from '../components/DoubleTap';
import {Text, View} from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
    };

    constructor(props) {
        super(props);
        this.state = {
            dbg: 'tst',
        };
    }


    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <DoubleTap onPress={() => this.setState({dbg: 'YEEEEEEEEEEEHAAAAAWWWWW'})}>
                    <View style={{width: '100%', height: '50%', backgroundColor: 'black'}}/>
                </DoubleTap>
                <Text>
                  {this.state.dbg}
                </Text>
            </View>
        );
    }
}
