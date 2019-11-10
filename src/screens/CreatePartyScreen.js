import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, StatusBar, Alert} from 'react-native';
import {
    Container,
    Header,
    Content,
    Form,
    Item,
    Input,
    Left,
    Right,
    Button,
    Icon,
    Body,
    Grid,
    Col,
    DatePicker,
    Textarea,
    Label,
} from 'native-base';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import PartyForm from '../components/forms/PartyForm';
import {createStore} from 'redux';
import allReducers from '../reducers';
import {Provider} from 'react-redux';

const db = firestore();
const store = createStore(allReducers);
const showErrorMessage = function (title, message) {
    return Alert.alert(
        title,
        message,
        [
            {text: 'OK'},
        ],
        {cancelable: false},
    );
};
const createNewParty = (values, navigation) => {
    const institution = navigation.getParam('institution');
    let docRef = db.collection('schoolData').doc(institution).collection('parties');
    docRef.add({
        name: values.name,
        location: values.location,
        time: values.startTime.getTime(),
        endTime: values.endTime.getTime(),
        description: values.description,
        generalLocation: values.generalLocation,
        host: db.collection('users').doc(auth().currentUser.uid)

    }).then((status) => {
        // todo toast here
        navigation.navigate('Home', {
            name: navigation.getParam('name'),
            institution: navigation.getParam('institution')
        });
    });
};

let formReference = null;
let partyTitleValid, generalLocationValid, locationValid, timeValid, dateValid, descriptionValid = false;

const CreatePartyScreen = function (props) {
    const [partyTitle, setPartyTitle] = useState('untitled party');
    const [partyGeneralLocation, setPartyGeneralLocation] = useState('');
    const [partyLocation, setPartyLocation] = useState('');
    const [partyTime, setPartyTime] = useState('time*');
    const [partyDate, setPartyDate] = useState('date*');
    const [partyDescription, setPartyDescription] = useState('');
    const [postButtonDisabled, setPostButtonDisabled] = useState(false);
    const [dbg, setDbg] = useState('default state');

    const enabledCallback = (enabled) => setPostButtonDisabled(!enabled);
    const onSubmitPress = () => formReference.submit();

    return (
        <Container style={styles.body}>
            <StatusBar/>
            <Header style={styles.header}>
                <Left>
                    <Button transparent>
                        <Text style={styles.headerButtonText}>Cancel</Text>
                    </Button>
                </Left>
                <Body>
                    <Text style={styles.headerText} numberOfLines={1}>{partyTitle}</Text>
                </Body>
                <Right>
                    <Button transparent disabled={postButtonDisabled} onPress={onSubmitPress}>
                        <Text
                            style={[styles.headerButtonText, postButtonDisabled ? styles.postButtonIsDisabled : styles.postButtonIsEnabled]}>Post</Text>
                    </Button>
                </Right>
            </Header>
            <Content>
                <Provider store={store}>
                    <PartyForm style={styles.form} onSubmit={values => createNewParty(values, props.navigation)} ref={form => formReference = form}
                               onTitleChange={setPartyTitle} enabledCallback={enabledCallback}/>
                </Provider>
            </Content>
        </Container>
    );
};


const styles = StyleSheet.create({
    body: {
        backgroundColor: '#000',
        height: '100%',
        width: '100%',
    },
    header: {
        borderBottomColor: '#555',
        borderBottomWidth: .5,
        backgroundColor: '#000',
    },
    headerText: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 20,
    },
    headerButtonText: {
        color: '#FFF',
        fontWeight: '600',
        marginHorizontal: 15,
        fontSize: 15,
    },
    postButtonIsDisabled: {
        color: '#777',
    },
    postButtonIsEnabled: {
        color: '#ee5253',
    },
    form: {
        marginTop: 20,
    },
    formItem: {
        borderColor: '#000',
        marginLeft: 42,
    },
    formInput: {
        color: '#fff',
        fontSize: 18,
    },
    titleInput: {
        height: 80,
        fontSize: 35,
        color: '#FFF',
        fontWeight: '700',
        maxWidth: 387,
    },
    datePicker: {
        color: '#fff',
        fontSize: 20,
        backgroundColor: '#fff',
    },
    infoButton: { // todo replace with icon
        color: '#ee5253',
    },
    testing: {
        color: '#FFF',
    },
});

export default CreatePartyScreen;
