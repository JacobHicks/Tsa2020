import React from 'react';
import {View, StyleSheet} from 'react-native';

export default class ElevatedDisplay extends React.Component {
    render() {
        return (
            <View style={this.props.important ? styles.importantCard : styles.card}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,

        marginHorizontal: 12,
        marginVertical: 6,
        paddingVertical: 8,
        paddingLeft: 20,
        paddingRight: 32,
        backgroundColor: '#fff'
    },

    importantCard: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,

        marginHorizontal: 12,
        marginTop: 8,
        marginBottom: 10,
        paddingVertical: 8,
        paddingLeft: 20,
        paddingRight: 32,
        backgroundColor: '#fff'
    }
});
