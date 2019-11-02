import React from "react";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Container, Spinner, Text} from 'native-base';

const db = firestore();
export default class EntryScreen extends React.Component {
    constructor(props) {
        super(props);
        const {navigation} = this.props;

        const user = auth().currentUser;
        if(user) {
            db.collection('users').doc(user.uid).get().then(documentSnapshot => {
                const userInfo = documentSnapshot.data();
                navigation.navigate('Home', {
                    name: userInfo.name,
                    institution: userInfo.institution.id
                });
            });
        }
        else {
            navigation.navigate('InitialSignup')
        }
    }

    render() {
        return (
            <Container style={styles.body}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Spinner isVisible={true} size={Dimensions.get('window').width * .25} type={'ThreeBounce'}
                             color={'#ee5253'}/>
                    <Text style={[styles.titleText, {marginLeft: 0, marginTop: 0}]}>Good times await</Text>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#000',
        height: '100%',
        width: '100%'
    },

    titleText: {
        fontSize: 25,
        color: '#FFFFFF',
        marginLeft: 15,
        fontWeight: '700',
        marginTop: 20,
        // marginBottom: -7
    }
});