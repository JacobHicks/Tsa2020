import React from 'react';
import {StyleSheet} from 'react-native';
import {Dimensions, Text, TouchableWithoutFeedback, View} from 'react-native';

export default class PartyWalletCard extends React.Component {
    render() {
        return (
            <View style={Styles.container}>
                <Text style={Styles.titleText}>
                    {this.props.title + ' | ' + this.props.date}
                </Text>
                <View style={Styles.buttons}>
                    <TouchableWithoutFeedback>
                        <View style={Styles.detailButton}>
                            <Text style={Styles.buttonText}>
                                Details
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback>
                        <View style={Styles.signInButton}>
                            <Text style={Styles.buttonText}>
                                Sign in
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderRadius: 13,
        width: '100%',
        height: Dimensions.get('window').height * .19,
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
        flexDirection: 'column',
    },

    titleText: {
        fontFamily: 'Glacial Indifference',
        fontSize: Dimensions.get('window').width * .05,
        fontWeight: '700',
        textAlign: 'center',
        marginLeft: 16,
        marginRight: 16,
        marginTop: 19,
        marginBottom: 19,
        color: '#000',
        flex: 15
    },

    buttons: {
        width: '100%',
        flex: 30,
        flexDirection: 'row'
    },

    buttonText: {
        color: '#FFF',
        fontFamily: 'Glacial Indifference',
        fontSize: Dimensions.get('window').width * .05,
        fontWeight: '700',
        textAlign: 'center'
    },

    detailButton: {
        backgroundColor: '#00A6FF',
        width: '50%',
        height: '100%',
        borderBottomLeftRadius: 13,
        justifyContent: 'center'
    },

    signInButton: {
        backgroundColor: '#FFBA5C',
        width: '50%',
        height: '100%',
        borderBottomRightRadius: 13,
        justifyContent: 'center'
    }
});
