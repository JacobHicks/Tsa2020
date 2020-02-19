import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, StatusBar, Alert} from 'react-native';
import {
    Container,
    Header,
    Content,
    Left,
    Right,
    Button,
    Body,
} from 'native-base';
import {PermissionsAndroid} from 'react-native';

import axios from "react-native-axios"
import Icon from "react-native-vector-icons/MaterialIcons";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import StreamForm from '../components/forms/StreamForm';
import {createStore} from 'redux';
import allReducers from '../reducers';
import {Provider} from 'react-redux';
import {NodeCameraView} from "react-native-nodemediaclient";

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

const createNewStream = (values, navigation) => {
    const credentials = {
        username: '6dae45d5-fb79-4240-8d35-30d3163f6609',
        password: '8jVOYbKu9PDq7Jw1T1wAi1e/WgZUg5dLPpmzVctBkIceWfBtpNUZu5Md5C8fSl9ZWxXSAO56f44'
    };

    const param = {
        "reduced_latency": true,
        "playback_policy": "public",
        "new_asset_settings": {"playback_policy": "public"}
    };

    axios.post('https://api.mux.com/video/v1/live-streams', param, {auth: credentials}).then(res => {
            const data = res.data.data;
            let collectionReference = db.collection('streams');
            collectionReference.add({
                name: values.name,
                description: values.description,
                host: auth().currentUser.uid,
                playbackId: data.playback_ids[0].id
            }).then(streamReference => {
                db.collection('users').doc(auth().currentUser.uid).collection('hostedStreams').add({
                    stream: streamReference,
                }).then((hostedReference) => {
                    navigation.navigate('StreamCamera', {id: data.stream_key, hostedReference: hostedReference, streamReference: streamReference});
                });
            });
        });
};

async function requestPermissions() {
    try {
        let granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'TSA2020 Camera Permission',
                message:
                    'TSA2020 needs access to your camera ' +
                    'to start a stream',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        granted &= await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title: 'TSA2020 Audio Permission',
                message:
                    'TSA2020 needs access to your microphone ' +
                    'to start a stream',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        granted &= await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title: 'TSA2020 Audio Permission',
                message:
                    'TSA2020 needs access to your microphone ' +
                    'to start a stream',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        granted &= await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'TSA2020 Write Permission',
                message:
                    'TSA2020 needs to write external storage ' +
                    'to start a stream',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            //TODO #3
        }
    } catch (err) {
        console.warn(err);
    }
}


let formReference = null;
let streamTitleValid, generalLocationValid, locationValid, timeValid, dateValid, descriptionValid = false;

const CreateStream = function (props) {
    const [streamTitle, setStreamTitle] = useState('');
    const [streamGeneralLocation, setStreamGeneralLocation] = useState('');
    const [streamLocation, setStreamLocation] = useState('');
    const [streamTime, setStreamTime] = useState('time*');
    const [streamDate, setStreamDate] = useState('date*');
    const [streamDescription, setStreamDescription] = useState('');
    const [postButtonDisabled, setPostButtonDisabled] = useState(false);
    const [dbg, setDbg] = useState('default state');

    const enabledCallback = (enabled) => setPostButtonDisabled(!enabled);
    const onSubmitPress = () => {
        formReference.submit();
    };

    useEffect(() => {
        requestPermissions();
    });

    const {navigation} = props;

    return (
        <Container style={styles.body}>
            {/*<StatusBar/>*/}

            <Header style={styles.header}>
                <Left>
                    <Button transparent onPress={() => {
                        navigation.goBack();
                    }}>
                        <Icon name='arrow-back' size={30} color='#8ea7a6'/>
                    </Button>
                </Left>
                <Body>
                    <Text style={styles.headerText} numberOfLines={1}>{streamTitle}</Text>
                </Body>
                <Right>
                    <Button transparent disabled={postButtonDisabled} onPress={() => {
                        onSubmitPress()
                    }}>
                        <Text
                            style={[styles.headerButtonText, postButtonDisabled ? styles.postButtonIsDisabled : styles.postButtonIsEnabled]}>Post</Text>
                    </Button>
                </Right>
            </Header>
            <Content>
                <Provider store={store}>
                    <StreamForm style={styles.form} onSubmit={values => createNewStream(values, props.navigation)}
                                ref={form => formReference = form}
                                onTitleChange={setStreamTitle} enabledCallback={enabledCallback}/>
                </Provider>
            </Content>
        </Container>
    );
};


const styles = StyleSheet.create({
    body: {
        backgroundColor: '#425c5a',
        height: '100%',
        width: '100%',
    },
    header: {
        backgroundColor: '#425c5a',
    },
    headerText: {
        color: '#8ea7a6',
        fontWeight: '700',
        fontSize: 20,
    },
    headerButtonText: {
        color: '#8ea7a6',
        fontWeight: '600',
        marginHorizontal: 15,
        fontSize: 15,
    },
    postButtonIsDisabled: {
        color: '#8ea7a6',
    },
    postButtonIsEnabled: {
        color: '#b18466',
    },
    form: {
        marginTop: 20,
    },
    formItem: {
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
    infoButton: {
        color: '#DE3C4B',
    },
    testing: {
        color: '#FFF',
    },
});

export default CreateStream;
