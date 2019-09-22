import React from 'react';
import {View, StyleSheet} from 'react-native';

export default class FloatingButton extends React.Component {
    render() {
        return (
            <View style={[
                styles.button,
                this.props.diameter !== undefined ?
                    {width: this.props.diameter, height: this.props.diameter, borderRadius: this.props.diameter}
                    : null
            ]}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,

        backgroundColor: '#fff',
        marginHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 48,
        width: 70,
        height: 70,
    },

});
