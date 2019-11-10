import React from 'react';
import DoubleTap from '../components/MultiTap';
import PartyCard from '../components/PartyCard';
import FeaturedPartyCard from '../components/FeaturedPartyCard';
import SheetContent from '../components/SheetContent';
import Footer from '../components/UIFooter';
import Header from '../components/Header';
import {Container} from 'native-base';
import {Text, View, StyleSheet, FlatList, RefreshControl, Dimensions} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
// todo import Toasts from native base
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/dynamic-links';
import Carousel from 'react-native-snap-carousel';
import Spinner from 'react-native-spinkit';

const db = firestore();


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
    };


    constructor(props) {
        super(props);
        this.enrollInParty = this.enrollInParty.bind(this);
        this.state = {
            isLoading: true,
            showSpinner: false,
            isRefreshingList: false,
            refreshing: false,
            dbg: 'tst',
        };

        this.onRefresh = this.onRefresh.bind(this);
    }

    async checkEnrollment(party, callback) {
        await party.collection('attendees').where('uid', '==', auth().currentUser.uid).get()
            .then(QuerySnapshot => {
                callback(QuerySnapshot.docs.length > 0);
            });
    }

    getPartyList(callback) {
        // javascript promises be like:
        db.collection('schoolData/' + this.state.institution + '/parties')
            .get()
            .then(QuerySnapshot => {
                let parties = [];
                let docs = [];
                let enrollmentPromises = [];
                let attendeePromises = [];
                let enrollments = [];

                QuerySnapshot.docs
                    .forEach(doc => {
                        docs.push(doc);
                        enrollmentPromises.push(this.checkEnrollment(doc.ref, enrolled => {
                            enrollments.push(enrolled);
                            attendeePromises.push(doc.ref.collection('attendees').get());
                        }));
                    });

                Promise.all(enrollmentPromises).then(() => {
                    for(let i = 0; i < attendeePromises.length; i++) {
                        attendeePromises[i].then(QuerySnapshot => {
                            let attendees = [];
                            QuerySnapshot.docs.forEach(DocumentSnapshot => {
                                attendees.push(DocumentSnapshot.data());
                            });

                            const rawParty = docs[i].data();
                            const formattedParty = {
                                key: i.toString(),
                                name: rawParty.name,
                                host: rawParty.host,
                                description: rawParty.description,
                                // fee: rawParty.fee,
                                time: rawParty.time,
                                endTime: rawParty.endTime,
                                generalLocation: rawParty.generalLocation,
                                location: rawParty.location,
                                attendees: attendees,
                                partyReference: docs[i].ref,
                                enrolled: enrollments[i],
                            };
                            parties.push(formattedParty);
                        });
                    }

                    Promise.all(attendeePromises).then(() => {
                        parties.sort((a, b) => (a.attendees !== undefined && b.attendees !== undefined && (a.attendees.length > b.attendees.length)
                        || b.attendees === undefined ? -1 : 1));

                        this.setState({
                            parties: parties,
                            featuredParties: [parties[0], parties[1], parties[2]],
                        });

                        parties.sort((a, b) => a.time > b.time ? 1 : -1);

                        callback();
                    });
                });
            });
    }

    componentDidMount() {
        const {navigation} = this.props;
        this.setState({
            institution: navigation.getParam('institution'),
        }, () => {
            this.getPartyList(() => {
                this.setState({
                    isLoading: false,
                });
            });
        });
        firebase.dynamicLinks().getInitialLink().then(link => this.linkHandler(link));
        this.unsubscribeLinkListener = firebase.dynamicLinks().onLink(this.linkHandler);
    }

    componentWillUnmount() {
        this.unsubscribeLinkListener();
    }

    linkHandler(link) {
        if (link) {
            this.setState({
                dbg: link.url,
            });
        }
    }

    reachedEndOfList() {
        //this.setState({ dbg: "endOfList" });
        //this.setState({showSpinner: true, isRefreshingList: true});
        // this.getPartyList(
        // 	// 	() => {
        // 	// 	this.setState({ showSpinner: false, isRefreshingList: false });
        // 	// }
        // );
    }

    showPartySheet(party) {
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
    }

    enrollInParty(party, partyInfo) {
        db.collection('users').doc(auth().currentUser.uid).collection('enrolledParties').add({
            party: party,
        });

        party.collection('attendees').add({uid: auth().currentUser.uid});

        partyInfo.enrolled = true;
    }

    leaveParty(party, partyInfo) {
        db.collection('users').doc(auth().currentUser.uid).collection('enrolledParties')
            .where('party', '==', party).get().then(QuerySnapshot => {
            QuerySnapshot.docs.forEach(doc => doc.ref.delete());
        });  //looks cursed, but actually fast

        party.collection('attendees').where('uid', '==', auth().currentUser.uid).get()
            .then(QuerySnapshot => {
                QuerySnapshot.docs.forEach(doc => doc.ref.delete());
            });

        partyInfo.enrolled = false;
    }

    onRefresh() {
        this.setState({refreshing: false});
        return (
            <Text>test</Text>
        );
    }


    // todo https://facebook.github.io/react-native/docs/refreshcontrol

    render() {
        if (this.state.isLoading) {
            return (
                <Container style={styles.body}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Spinner isVisible={true} size={Dimensions.get('window').width * .25} type={'ThreeBounce'}
                                 color={'#ee5253'}/>
                        <Text style={[styles.titleText, {marginLeft: 0, marginTop: 16}]}>Good times await</Text>
                    </View>
                    <Footer style={styles.bodyFooter} navigation={this.props.navigation}/>
                </Container>
            );
        } else {
            return (
                <Container style={styles.body}>
                    <Header collegeName={this.state.institution}/>
                    <FlatList
                        onEndReachedThreshold={10}
                        onEndReached={() => {
                            this.reachedEndOfList();
                        }}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh}
                            />
                        }

                        listEmptyContent={<Spinner color={'white'}/>}
                        ListHeaderComponent={
                            <View>
                                <Text style={styles.titleText}>Trending</Text>
                                <Carousel
                                    ref={(c) => {
                                        this._carousel = c;
                                    }}
                                    data={this.state.featuredParties}
                                    sliderWidth={Dimensions.get('window').width + 130}
                                    itemWidth={220}
                                    containerCustomStyle={{left: -153}}
                                    loop={true}
                                    enableMomentum={true}
                                    enableSnap={true}
                                    renderItem={(item, index) => {
                                        return (
                                            <DoubleTap onDoublePress={() => this.enrollInParty(item.item)}
                                                       onPress={() => this.showPartySheet(item.item)}>
                                                <View>
                                                    <FeaturedPartyCard partyInfo={item.item}/>
                                                </View>
                                            </DoubleTap>
                                        );
                                    }}
                                />
                                <Text style={styles.titleText}>Parties</Text>
                            </View>}
                        data={this.state.parties}
                        renderItem={({item}) =>
                            <DoubleTap onDoublePress={() => this.enrollInParty(item.key)}
                                       onPress={() => this.showPartySheet(item)}>
                                <View>
                                    <PartyCard
                                        title={item.name}
                                        time={item.time} shortLocation={item.shortLocation}
                                        attendees={item.attendees}
                                        school={this.state.institution}
                                        joinParty={() => this.enrollInParty(item.partyReference, item)}
                                        leaveParty={() => this.leaveParty(item.partyReference, item)}
                                    />
                                </View>
                            </DoubleTap>}
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
                                      partyInfo={this.state.selectedPartyInfo} userIsGoing={false}/>
                    </RBSheet>
                    <Footer style={styles.bodyFooter} navigation={this.props.navigation}/>
                </Container>
            );
        }
    }
}

const styles = StyleSheet.create({ // todo fix spacing between titles and content
    body: {
        backgroundColor: '#000',
        height: '100%',
        width: '100%',
    },
    trendingContainer: {
        maxHeight: 175,
    },
    titleText: {
        fontSize: 25,
        color: '#FFFFFF',
        marginLeft: 15,
        fontWeight: '700',
        marginTop: 20,
        // marginBottom: -7
    },
    bodyFooter: {
        position: 'relative',
        bottom: 0,
        top: 'auto',
    },

    // debug
    testing: {
        minHeight: 100,
    },
});
