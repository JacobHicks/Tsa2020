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
            featuredParties: [
                {
                    key: '1',
                    name: 'Testing Party',
                    host: 'Diego',
                    description: 'Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah ',
                    date: new Date(),
                    imageURL: 'https://marvel-live.freetls.fastly.net/canvas/2019/10/399f689db39646b990a80bb3ce21cd54?quality=95&fake=.png',
                },
                {
                    key: '2',
                    name: 'Testing Party 2',
                    host: 'Richard',
                    description: 'desc',
                    date: new Date(),
                    imageURL: 'https://marvel-live.freetls.fastly.net/canvas/2019/10/399f689db39646b990a80bb3ce21cd54?quality=95&fake=.png',
                },
                {
                    key: '3',
                    name: 'Testing 3',
                    host: 'Azhan',
                    description: 'Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah ',
                    date: new Date(),
                    imageURL: 'https://marvel-live.freetls.fastly.net/canvas/2019/10/399f689db39646b990a80bb3ce21cd54?quality=95&fake=.png',
                },
            ],
        };
    }

    getPartyList() {
        // todo make relative to school user is in
        db.collection('schoolData/' + this.state.institution + '/parties')
            .get()
            .then(QuerySnapshot => {
                let parties = [];
                QuerySnapshot.docs
                    .forEach(doc => {
                        const rawParty = doc.data();
                        const formattedParty = {
                            key: Math.random().toString(), // todo fix
                            name: rawParty.name,
                            host: rawParty.host,
                            description: rawParty.description,
                            // fee: rawParty.fee,
                            time: rawParty.time,
                            endTime: rawParty.endTime,
                            generalLocation: rawParty.generalLocation,
                            location: rawParty.location,
                            attendees: rawParty.attendees,
                        };
                        parties.push(formattedParty);
                    });
                this.setState({
                    parties: parties,
                });
            });
    }

    getFeaturedPartyList() {
        // todo make call to database here
        let featuredParties = [];
        this.setState({
            featuredParties: featuredParties,
        });
    }

    componentDidMount() {
        const {navigation} = this.props;
        this.setState({
            institution: navigation.getParam('institution')
        }, () => {
            this.getPartyList();
            this.setState({
                isLoading: false
            })
        });
        // firebase.dynamicLinks().getInitialLink().then(link => this.linkHandler(link));
        // this.unsubscribeLinkListener = firebase.dynamicLinks().onLink(this.linkHandler);
        // this.getFeaturedPartyList();

    }

    componentWillUnmount() {
        this.unsubscribeLinkListener();
    }

    linkHandler(linkPromise) {
        // let link;
        // linkPromise.then(rlink => link = rlink);
        // this.setState({
        // 	dbg: 'test'
        // });
        if (link) {
            // this.setState({
            // 	dbg: 'test2' + link.url
            // });
            //TODO implement actually opening party
            // this.setState({
            // 	dbg: link.url
            // })
        }
    }

    reachedEndOfList() {
        //this.setState({ dbg: "endOfList" });
        this.setState({showSpinner: true, isRefreshingList: true});
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
                generalLocation: party.generalLocation
            }
        });
        this.RBSheet.open();
    }

    enrollInParty() {

        //this.setState({ dbg: "enrolled" });
        //const userRef = db.collection('schoolData').doc('ucla').collection('users').doc('user');
        const partyRef = db.collection('schoolData').doc(this.state.institution).collection('parties').doc('party');
        const newUser = firestore.FieldValue.arrayUnion('user'); // todo create references for other docs
        const newParty = firestore.FieldValue.arrayUnion('party');
        //userRef.update({partiesList: newParty});
        partyRef.update({userList: newUser});
    }

    onRefresh() {
        this.setState({refreshing: false});
        return (
            <Text>test</Text>
        );
    }


    // todo https://facebook.github.io/react-native/docs/refreshcontrol

    // todo loading icon before images are loaded
    render() {
        const {navigate} = this.props;
        // navigation.navigate("TextConfirm");
        if (this.state.isLoading) {
            return (
                <Container style={styles.body}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Spinner isVisible={true} size={Dimensions.get('window').width * .25} type={'ThreeBounce'}
                                 color={'#ee5253'}/>
                        <Text style={[styles.titleText, {marginLeft: 0, marginTop: 0}]}>Good times await</Text>
                    </View>
                    <Footer style={styles.bodyFooter} navigation={this.props.navigation}/>
                </Container>
            );
        } else {
            return (
                <Container style={styles.body}>
                    <Text style={{color: '#FFF'}}>{this.state.dbg}</Text>
                    <Header collegeName={this.state.institution}/>
                    <FlatList
                        onEndReachedThreshold={10}
                        onEndReached={() => {
                            this.reachedEndOfList();
                        }}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={this.onRefresh.bind(this)}
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
                                            <DoubleTap onDoublePress={() => this.enrollInParty(item.key)}
                                                       onPress={() => this.showPartySheet(item.key)}>
                                                <View>
                                                    <FeaturedPartyCard/>
                                                </View>
                                            </DoubleTap>
                                        );
                                    }}
                                />
                                <Text style={styles.titleText}>All Parties</Text>
                            </View>}
                        ListFooterComponent={this.state.showSpinner ? <Spinner color={'white'}/> : <View></View>}
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
                                        joinParty={this.enrollInParty}/>
                                </View>
                            </DoubleTap>}
                    />
                    <RBSheet
                        joinParty={this.enrollInParty}
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
                        <SheetContent partyInfo={this.state.selectedPartyInfo} userIsGoing={false}/>
                    </RBSheet>
                    <Footer name={this.props.name} institution={this.props.institution} style={styles.bodyFooter} navigation={this.props.navigation}/>
                </Container>
            );
        }
    }
}

const styles = StyleSheet.create({ // todo fix spacing between titles and content
    body: {
        backgroundColor: '#000',
        height: '100%',
        width: '100%'
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
