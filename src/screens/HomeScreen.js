import React from "react";
import StreamCard from "../components/StreamCard";
import FeaturedStreamCard from "../components/FeaturedStreamCard";
import SheetContent from "../components/SheetContent";
import Footer from "../components/UIFooter";
import Header from "../components/Header";
import {Container, Button} from "native-base";
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableOpacity, ScrollView
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
// todo import Toasts from native base
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import {firebase} from "@react-native-firebase/dynamic-links";
import Carousel from "react-native-snap-carousel";
import Spinner from "react-native-spinkit";

const db = firestore();


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: "Home"
    };


    constructor(props) {
        super(props);
        this.purchaseStream = this.purchaseStream.bind(this);
        this.state = {
            isLoading: true,
            showSpinner: false,
            isRefreshingList: false,
            refreshing: false,
            dbg: "tst"
        };

        this.onRefresh = this.onRefresh.bind(this);
        this.renderTrending = this.renderTrending.bind(this);
    }

    async checkOwnership(stream, callback) {
        await stream.collection("attendees").where("uid", "==", auth().currentUser.uid).get()
            .then(QuerySnapshot => {
                callback(QuerySnapshot.docs.length > 0);
            });
    }

    getStreamList(callback) {
        // javascript promises be like:
        db.collection("streams")
            .get()
            .then(QuerySnapshot => {
                let streams = [];
                let docs = [];
                let enrollmentPromises = [];
                let attendeePromises = [];
                let enrollments = [];

                QuerySnapshot.docs
                    .forEach(doc => {
                        docs.push(doc);
                        enrollmentPromises.push(this.checkOwnership(doc.ref, enrolled => {
                            enrollments.push(enrolled);
                            attendeePromises.push(doc.ref.collection("attendees").get());
                        }));
                    });

                Promise.all(enrollmentPromises).then(() => {
                    for (let i = 0; i < attendeePromises.length; i++) {
                        attendeePromises[i].then(QuerySnapshot => {
                            let attendees = [];
                            QuerySnapshot.docs.forEach(DocumentSnapshot => {
                                attendees.push(DocumentSnapshot.data());
                            });

                            const rawStream = docs[i].data();
                            const formattedStream = {
                                key: i.toString(),
                                name: rawStream.name,
                                host: rawStream.host,
                                description: rawStream.description,
                                attendees: attendees,
                                streamReference: docs[i].ref,
                                playbackId: rawStream.playbackId,
                                enrolled: enrollments[i]
                            };

                            if (rawStream.endTime < new Date().getTime()) {
                                this.cancelStream(docs[i].ref, formattedStream);
                            } else {
                                streams.push(formattedStream);
                            }
                        });
                    }

                    Promise.all(attendeePromises).then(() => {
                        streams.sort((a, b) => (a.attendees !== undefined && b.attendees !== undefined && (a.attendees.length > b.attendees.length)
                        || b.attendees === undefined ? -1 : 1));

                        let featuredStreams = [];
                        for (let i = 0; i < streams.length && i < 3; i++) {
                            featuredStreams.push(streams[i]);
                        }
                        this.setState({
                            streams: streams,
                            featuredStreams: featuredStreams
                        });

                        streams.sort((a, b) => a.time > b.time ? 1 : -1);

                        callback();
                    });
                });
            });
    }

    componentDidMount() {
        const {navigation} = this.props;
        this.getStreamList(() => {
            this.setState({
                isLoading: false
            });
        });
        firebase.dynamicLinks().getInitialLink().then(link => this.linkHandler(link));
        this.unsubscribeLinkListener = firebase.dynamicLinks().onLink(this.linkHandler);
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.navigation.getParam("refresh") && this.props.navigation.getParam("refresh")) {
            this.setState({
                loading: true
            });

            this.getStreamList(() => {
                this.setState({
                    isLoading: false
                });
            });
        }
    }

    componentWillUnmount() {
        this.unsubscribeLinkListener();
    }

    linkHandler(link) {
        if (link) {
            this.setState({
                dbg: link.url
            });
        }
    }

    reachedEndOfList() {
        //this.setState({ dbg: "endOfList" });
        //this.setState({showSpinner: true, isRefreshingList: true});
        // this.getStreamList(
        // 	// 	() => {
        // 	// 	this.setState({ showSpinner: false, isRefreshingList: false });
        // 	// }
        // );
    }

    showStreamSheet(stream) {
        this.setState({
            selectedStreamInfo: this.getStreamInfo(stream)
        });
        this.RBSheet.open();
    }

    getStreamInfo(stream) {
        return {
            name: stream.name,
            host: stream.host,
            description: stream.description,
            streamReference: stream.streamReference,
            enrolled: stream.enrolled,
            streamInfo: stream
        }
    }

    purchaseStream(stream, streamInfo) {
        if (!streamInfo.enrolled) {
            db.collection("oldStreams").add(streamInfo).then(DocumentReference => {
                db.collection("users").doc(auth().currentUser.uid).collection("enrolledStreams").add({
                    stream: DocumentReference
                });

                this.props.navigation.navigate('Stream', {playbackId: streamInfo.playbackId})
            });
        }
    }

    onRefresh() {
        this.setState({refreshing: true});
        this.getStreamList(() => {
            this.setState({
                refreshing: false
            });
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <Container style={styles.body}>
                    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                        <Spinner isVisible={true} size={Dimensions.get("window").width * .25} type={"ThreeBounce"}
                                 color={"#b18466"}/>
                        <Text style={[styles.titleText, {marginLeft: 0, marginTop: 16}]}>Loading</Text>
                    </View>
                </Container>
            );
        } else {
            return (
                <Container style={styles.body}>
                    {this.renderTrending()}
                    {this.renderRecent()}
                    <RBSheet
                        ref={ref => {
                            this.RBSheet = ref;
                        }}
                        height={Dimensions.get("window").height * .70}
                        duration={250}
                        animationType={"slide"}
                        closeOnDragDown={true}
                        customStyles={{
                            container: {
                                borderTopLeftRadius: 16,
                                borderTopRightRadius: 16,
                                backgroundColor: "#111"
                            },
                            draggableIcon: {
                                backgroundColor: "#DE3C4B",
                                width: 75,
                                top: 5
                            },
                            wrapper: {
                                backgroundColor: "transparent"
                            }
                        }}
                    >
                        <SheetContent joinStream={this.purchaseStream} leaveStream={this.leaveStream}
                                      cancelStream={this.cancelStream}
                                      streamInfo={this.state.selectedStreamInfo} userIsGoing={false}/>
                    </RBSheet>
                    <Footer navigation={this.props.navigation} homeIsActive={true}/>
                </Container>
            );
        }
    }

    renderRecent() {
        return (
            this.state.streams.length > 0 ?
                <FlatList
                    style={{marginTop: 42}}

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

                    listHeaderComponent={<Text style={styles.titleText}>Recent</Text>}

                    listEmptyContent={<Spinner color={"white"}/>}

                    data={this.state.streams}
                    renderItem={({item}) => {
                        return (
                            <TouchableWithoutFeedback
                                onLongPress={() => this.purchaseStream(item.streamReference, item)}
                                onPress={() => this.showStreamSheet(item)}>
                                <View>
                                    <StreamCard
                                        streamInfo={item}
                                        joinStream={() => this.purchaseStream(item.streamReference, item)}
                                        leaveStream={() => this.leaveStream(item.streamReference, item)}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }}
                /> :
                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 32}}>
                    <Text style={[styles.titleText, {marginTop: 64}]}>No content available :(</Text>
                    <Button onPress={this.onRefresh} transparent style={{backgroundColor: '#425c5a'}}>
                        <Text style={{fontSize: 20, color: "#b18466", fontWeight: '700', paddingLeft: 16, paddingRight: 16}}>
                            Refresh
                        </Text>
                    </Button>
                </View>
        )
    }

    renderTrending() {
        return (
            this.state.featuredStreams.length > 0 ?
                <View style={{marginTop: 32}}>
                    <Text style={styles.titleText}>Trending</Text>
                    <Carousel
                        ref={(c) => {
                            this._carousel = c;
                        }}
                        data={this.state.featuredStreams}
                        sliderWidth={Dimensions.get("window").width + (Dimensions.get("window").width * 0.34)}
                        itemWidth={220}
                        containerCustomStyle={{left: -Dimensions.get("window").width * 0.37, height: 135}}
                        loop={true}
                        enableMomentum={true}
                        enableSnap={true}
                        renderItem={(item) => {
                            return (
                                <TouchableWithoutFeedback
                                    onLongPress={() => this.purchaseStream(item.item.streamReference, item.item)}
                                    onPress={() => this.showStreamSheet(item.item)}>
                                    <View>
                                        <FeaturedStreamCard streamInfo={item.item}/>
                                    </View>
                                </TouchableWithoutFeedback>
                            );
                        }}
                    />
                </View> : null
        )
    }
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: "#425c5a",
        height: "100%",
        width: "100%",
        flex: 1
    },
    trendingContainer: {
        maxHeight: 175
    },
    titleText: {
        fontSize: 25,
        color: "#8ea7a6",
        marginLeft: 15,
        fontWeight: "700",
        marginTop: 20,
        marginBottom: 24
        // marginBottom: -7
    },

    // debug
    testing: {
        minHeight: 100
    },

    bodyFooter: {
        marginTop: 'auto'
    }
});
