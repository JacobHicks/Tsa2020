import React from 'react';
import DoubleTap from '../components/MultiTap';
import PartyCard from '../components/PartyCard';
import FeaturedPartyCard from '../components/FeaturedPartyCard';
import SheetContent from '../components/SheetContent';
import Footer from '../components/UIFooter';
import Header from '../components/Header';
import {Spinner, Container} from 'native-base';
import {Text, View, StyleSheet, FlatList, RefreshControl, Dimensions} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
// todo import Toasts from native base
import firestore from '@react-native-firebase/firestore';

const db = firestore();


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
    };

    constructor(props) {
        super(props);
        this.state = {
            showSpinner: false,
            isRefreshingList: false,
            refreshing: false,
            dbg: 'tst',
            sheetTitle: 'Sheet Title',
            sheetHost: 'Sheet Host',
            sheetDescription: 'Sheet Description',
            // parties: [
            // 	{
            // 		key: '1',
            // 		title: 'Testing Party',
            // 		host: 'Diego',
            // 		description: 'Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah ',
            // 		date: new Date(),
            // 		imageURL: 'https://marvel-live.freetls.fastly.net/canvas/2019/10/399f689db39646b990a80bb3ce21cd54?quality=95&fake=.png',
            // 	},
            // 	{
            // 		key: '2',
            // 		title: 'Testing Party',
            // 		host: 'Richard',
            // 		description: 'desc',
            // 		date: new Date(),
            // 		imageURL: 'https://marvel-live.freetls.fastly.net/canvas/2019/10/399f689db39646b990a80bb3ce21cd54?quality=95&fake=.png',
            // 	},
            // 	{
            // 		key: '3',
            // 		title: 'Testing 3',
            // 		host: 'Azhan',
            // 		description: 'Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah ',
            // 		date: new Date(),
            // 		imageURL: 'https://marvel-live.freetls.fastly.net/canvas/2019/10/399f689db39646b990a80bb3ce21cd54?quality=95&fake=.png',
            // 	},
            // 	{
            // 		key: '4',
            // 		title: 'Testing 4',
            // 		host: 'Ethan',
            // 		description: 'Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah ',
            // 		date: new Date(),
            // 		imageURL: 'https://marvel-live.freetls.fastly.net/canvas/2019/10/399f689db39646b990a80bb3ce21cd54?quality=95&fake=.png',
            // 	},
            // 	{
            // 		key: '5',
            // 		title: 'Testing 5',
            // 		host: 'Jacob',
            // 		description: 'Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah ',
            // 		date: new Date(),
            // 		imageURL: 'https://marvel-live.freetls.fastly.net/canvas/2019/10/399f689db39646b990a80bb3ce21cd54?quality=95&fake=.png',
            // 	},
            // ],
            featuredParties: [
                {
                    key: '1',
                    title: 'Testing Party',
                    host: 'Diego',
                    description: 'Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah ',
                    date: new Date(),
                    imageURL: 'https://marvel-live.freetls.fastly.net/canvas/2019/10/399f689db39646b990a80bb3ce21cd54?quality=95&fake=.png',
                },
                {
                    key: '2',
                    title: 'Testing Party 2',
                    host: 'Richard',
                    description: 'desc',
                    date: new Date(),
                    imageURL: 'https://marvel-live.freetls.fastly.net/canvas/2019/10/399f689db39646b990a80bb3ce21cd54?quality=95&fake=.png',
                },
                {
                    key: '3',
                    title: 'Testing 3',
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
        const timeSettings = {
            month: 'short',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
        };

        db.collection('schoolData/ucla/parties')
            .get()
            .then(QuerySnapshot => {
                let parties = [];
                QuerySnapshot.docs
                    .forEach(doc => {
                        const rawParty = doc.data();
                        const formattedParty = {
                            key: Math.random().toString(), // todo fix
                            title: rawParty.title,
                            host: rawParty.host,
                            description: rawParty.description,
                            fee: rawParty.fee,
                            time: new Date(rawParty.time).toLocaleDateString('en-US', timeSettings),
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
        this.getPartyList();
        // this.getFeaturedPartyList();
    }

    reachedEndOfList() {
        this.setState({dbg: 'endOfList'});
        this.setState({showSpinner: true, isRefreshingList: true});
        this.getPartyList(
            // 	() => {
            // 	this.setState({ showSpinner: false, isRefreshingList: false });
            // }
        );
    }

    showPartySheet(party) {
        this.setState({
            sheetTitle: party.title,
            sheetHost: party.host,
            sheetDescription: party.description,
        });
        this.RBSheet.open();
    }

    enrollInParty(key) {
        this.setState({dbg: key});
        const userRef = db.collection('schoolData').doc('ucla').collection('users').doc('user');
        const partyRef = db.collection('schoolData').doc('ucla').collection('parties').doc('party');
        const newUser = firestore.FieldValue.arrayUnion('user'); // todo create references for other docs
        const newParty = firestore.FieldValue.arrayUnion('party');
        userRef.update({partiesList: newParty});
        partyRef.update({userList: newUser});
    }

    onRefresh() {
        this.setState({refreshing: false});
        return (
            <Text>test</Text>
        );
    }


    // todo https://facebook.github.io/react-native/docs/refreshcontrol

    // todo make scrolling of featured paginated(?), when user scrolls it'll auto scroll to be in view
    // todo loading icon before images are loaded
    // todo indication of party that a user is going to
    render() {
        const {navigate} = this.props;
        // navigation.navigate("TextConfirm");
        return (
            <Container style={styles.body}>
                <Header collegeName="Stanford"/>
                <FlatList
                    onEndReachedThreshold={0}
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
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                style={styles.trendingContainer}
                                data={this.state.featuredParties}
                                renderItem={({item}) =>
                                    <DoubleTap onDoublePress={() => this.enrollInParty(item.key)}
                                               onPress={() => this.showPartySheet(item.key)}>
                                        <View>
                                            <FeaturedPartyCard title={item.title} date={item.date}
                                                               time={item.time}
                                                               host={item.host} imageURL={item.imageURL}/>
                                        </View>
                                    </DoubleTap>}
                            />
                            <Text style={styles.titleText}>All Parties</Text>
                        </View>}
                    ListFooterComponent={this.state.showSpinner ? <Spinner color={'white'}/> : <View></View>}
                    data={this.state.parties}
                    renderItem={({item}) =>
                        <DoubleTap onDoublePress={() => this.enrollInParty(item.key)}
                                   onPress={() => this.showPartySheet(item)}>
                            <View>
                                <PartyCard title={item.title} date={item.date} time={item.time}
                                           host={item.host} imageURL={item.imageURL}/>
                            </View>
                        </DoubleTap>}
                />
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={Dimensions.get('window').height * .70}
                    duration={250}
                    closeOnDragDown={true}
                    customStyles={{
                        container: {
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 12
                        },
                        draggableIcon: {
                            borderColor: '#333',
                        },
                    }}
                >
                    <SheetContent name={this.state.sheetTitle} description={this.state.sheetDescription}/>
                </RBSheet>
                <Text style={{color: '#FFF'}}>{this.state.dbg}</Text>
                <Footer/>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#000',
        height: '100%',
    },
    container: {
        maxHeight: '87%',
    },
    trendingContainer: {
        maxHeight: 175,
    },
    titleText: {
        fontSize: 25,
        color: '#FFFFFF',
        marginLeft: 15,
        fontWeight: '700',
        marginTop: 15,
    },

    // debug
    testing: {
        minHeight: 100,
    },
});
