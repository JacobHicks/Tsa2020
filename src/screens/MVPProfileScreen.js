import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    TouchableHighlight,
} from 'react-native';
import Footer from 'native-base';
import Header from '../components/Header';
import UIFooter from '../components/UIFooter';
import {Spinner, Text} from 'native-base';
// import Icon from "react-native-vector-icons/MaterialIcons";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import PartyWalletCard from '../components/PartyWalletCard';
import {Container} from 'native-base';
import UserHostedPartySheet from '../components/UserHostedPartySheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import SheetContent from '../components/SheetContent';

const db = firestore();

export default class MVPProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            user: null,
            parties: [],
        };
        this.showPartySheet = this.showPartySheet.bind(this);
    }

    async checkEnrollment(party) {
        await party.collection('attendees').where('uid', '==', auth().currentUser.uid).get()
            .then(QuerySnapshot => {
                return QuerySnapshot.docs.length > 0;
            });
    }

    getParties(callback) {
        let parties = [];
        db.collection('users').doc(auth().currentUser.uid).collection('enrolledParties').get().then(QuerySnapshot => {
            let promises = [];
            QuerySnapshot.docs.forEach(doc => promises.push(doc.data().party.get().then(PartyDocument => {
                parties.push(PartyDocument.data());
                parties[parties.length - 1].partyReference = PartyDocument.ref;
                parties[parties.length - 1].enrolled = this.checkEnrollment(PartyDocument.ref);
            }))); // WatchMojo top 10 react native firebase moments;
            Promise.all(promises).then(() => {
                for (let i = 0; i < parties.length; i++) {
                    parties[i].key = 'joinedParty' + i.toString();
                }
                callback(parties);
            })
        });
    }

    componentDidMount() {
        this.getParties(parties =>
            this.setState({
                isLoading: false,
                parties: parties,
            }),
        );
    }

    render() {
        if (this.state.isLoading) {
            return (
                <Container style={styles.body}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Spinner isVisible={true} size={Dimensions.get('window').width * .25} type={'ThreeBounce'}
                                 color={'#ee5253'}/>
                        <Text style={[styles.titleText, {marginLeft: 0, marginTop: 16}]}>Good times await</Text>
                    </View>
                </Container>
            );
        } else {
            const {navigation} = this.props;
            return (
                <Container style={{backgroundColor: '#000'}}>
                    <Header collegeName={navigation.getParam('institution')}/>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.parties}
                        style={{
                            marginLeft: '10%',
                            marginRight: '10%',
                        }}
                        ListHeaderComponent={
                            <View>
                                <View style={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}>
                                    <Text style={styles.nameText}>
                                        {this.props.name}
                                    </Text>

                                    <Text style={styles.schoolText}>
                                        {this.props.institution}
                                    </Text>
                                </View>
                                <Text style={styles.walletText}>
                                    My Parties
                                </Text>
                            </View>
                        }
                        renderItem={({item}) =>
                            <TouchableHighlight onPress={() => {
                                this.showPartySheet(item);
                            }}>
                                <PartyWalletCard partyInfo={item}/>
                            </TouchableHighlight>
                        }
                    />
                    <RBSheet
                        ref={ref => {
                            this.RBSheet = ref;
                        }}
                        height={Dimensions.get('window').height * .70}
                        duration={250}
                        animationType={'fade'}
                        closeOnDragDown={true}
                        customStyles={{
                            container: {
                                borderTopLeftRadius: 16,
                                borderTopRightRadius: 16,
                                backgroundColor: '#111',
                            },
                            draggableIcon: {
                                backgroundColor: '#ee5253',
                                width: 75,
                                top: 5,
                            },
                        }}
                    >
                        <SheetContent joinParty={this.enrollInParty} leaveParty={this.leaveParty}
                                      partyInfo={this.state.selectedPartyInfo}/>
                    </RBSheet>
                    <UIFooter name={this.props.name} institution={this.props.institution} navigation={navigation}/>
                </Container>
            );
        }
    }

    showPartySheet = ((party) => {
        this.setState({
            selectedPartyInfo: {
                name: party.name,
                host: party.host,
                description: party.description,
                time: party.time,
                endTime: party.endTime,
                location: party.location,
                generalLocation: party.generalLocation,
                partyReference: party.partyReference,
                enrolled: party.enrolled,
                partyInfo: party,
            },
        });
        this.RBSheet.open();
    });
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#000',
        height: '100%',
        width: '100%',
    },

    titleText: {
        fontSize: 25,
        color: '#FFFFFF',
        marginLeft: 15,
        fontWeight: '700',
        marginTop: 20,
        // marginBottom: -7
    },

    header: {
        backgroundColor: '#000',
    },

    walletText: {
        color: '#FFF',
        fontSize: Dimensions.get('window').width * .07,
        fontWeight: '700',
        marginBottom: 16,
    },

    nameText: {
        color: '#FFF',
        fontSize: Dimensions.get('window').width * .07,
        fontWeight: '700',
        marginBottom: 5,
    },

    schoolText: {
        color: '#FFF',
        fontSize: Dimensions.get('window').width * .04,
        fontWeight: '700',
        marginBottom: 44,
    },

    bodyFooter: {
        position: 'relative',
        bottom: 0,
        top: 'auto',
    },

});
