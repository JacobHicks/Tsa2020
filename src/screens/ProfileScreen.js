import React from 'react';
import { View, StyleSheet, StatusBar } from "react-native";
import ProfileImage from '../components/ProfileImage';
import {Text} from 'native-base';
import ElevatedDisplay from '../components/ElevatedDisplay';
import FloatingButton from '../components/FloatingButton';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ProfileScreen extends React.Component {
    static NavigationOptions = {
        title: 'Profile',
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.image}>
                    <ProfileImage/>
                </View>

                <ElevatedDisplay important>
                    <View style={{flexDirection: 'row', width: '100%'}}>
                        <Text style={styles.reputationLabel}>
                            Reputation
                        </Text>
                        <Text style={styles.reputationValue}>
                            4.8
                        </Text>
                    </View>
                </ElevatedDisplay>

                <ElevatedDisplay>
                    <Text style={styles.descriptionText}>
                        Age: 21{'\n'}Major: Custodial Engineering{'\n'}Relationship status: Single
                    </Text>
                </ElevatedDisplay>

                <ElevatedDisplay>
                    <Text style={styles.descriptionText}>
                        Starting quarterback, I love to party and i'm not afraid to have a good time.
                    </Text>
                </ElevatedDisplay>

                <View style={styles.buttons}>
                    <FloatingButton>
                        <Icon name="envelope" style={{color: '#C67B7B', fontSize: 35}}/>
                    </FloatingButton>

                    <FloatingButton diameter={48}>
                        <Icon name="plus" style={{color: '#76BC6E', fontSize: 24, marginLeft: 1, marginTop: 2}}/>
                    </FloatingButton>

                    <FloatingButton diameter={60}>
                        <Icon name="comment" style={{color: '#76BC6E', fontSize: 30, marginLeft: 1, marginBottom: 2}}/>
                    </FloatingButton>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '40%',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        alignSelf: 'center',
    },

    reputationLabel: {
        textAlignVertical: 'center',
        // fontFamily: 'Segoe UI',
        fontSize: 20,
        color: '#858a91',
    },

    reputationValue: {
        textAlignVertical: 'center',
        // fontFamily: 'Segoe UI',
        fontSize: 33,
        color: '#11FF00',
        marginLeft: 'auto',
    },

    descriptionText: {
        margin: 'auto',
        // fontFamily: 'Segoe UI',
        fontSize: 17,
        lineHeight: 26,
        color: '#C6CBD2',
    },

    buttons: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 6
    }
});
