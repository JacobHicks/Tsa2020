import React from "react";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Container, Text} from 'native-base';
import Spinner from "react-native-spinkit";

const db = firestore();
export default class EntryScreen extends React.Component {
    constructor(props) {
        super(props);
        const {navigation} = this.props;

        const user = auth().currentUser;
        if(user) {
            // db.collection('users').doc(user.uid).get().then(documentSnapshot => {
            //     const userInfo = documentSnapshot.data();
                navigation.navigate('Home', {
                    name: "JACOB", //userInfo.name,
                    institution: "Khan Academy"//userInfo.institution.id
                });
            // });
        }
        else {
            navigation.navigate('InitialSignup')
        }
    }

    render() {
        return (
            <Container style={styles.body}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Spinner isVisible={true} size={Dimensions.get("window").width * .25} type={'ThreeBounce'}
                             color={"#DE3C4B"}/>
                    <Text style={[styles.titleText, {marginLeft: 0, marginTop: 16}]}>Good times await</Text>
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
