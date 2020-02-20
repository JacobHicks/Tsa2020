import React from 'react';
import {View, StyleSheet, ScrollView, Dimensions, Image} from 'react-native';
import {
    Text,
    Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const db = firestore();

export default class SheetContent extends React.Component {
    getDate(millis) {
        const options = {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'};
        const date = new Date(millis);

        return date.toLocaleDateString(options);
    }

    getTime(millis) {
        const options = {hour: 'numeric', minute: '2-digit', seconds: 'false', hour12: 'true'};
        const date = new Date(millis);
        return date.toLocaleTimeString(options);
    }

    constructor(props) {
        super(props);
        this.state = {
            enrolled: false
        }
    }

    componentDidMount() {
        this.setState({
            enrolled: this.props.streamInfo.enrolled
        })
    }

    render() {
        const uid = auth().currentUser.uid;
        return (
            <View style={styles.sheetContainer}>
                <Text style={styles.sheetTitle}>{this.props.streamInfo.name}</Text>
                <ScrollView style={styles.sheetContainer}>
                    {/*<View style={styles.sheetView}>*/}
                    {/*    <Icon name='calendar-check' size={Dimensions.get('window').width * .06} color='#8b8b8b'*/}
                    {/*          style={{marginRight: 16, marginTop: Dimensions.get('window').height * .005}}/>*/}
                    {/*    <View style={styles.detailContainer}>*/}
                    {/*        <Text style={styles.sheetDetail}>*/}
                    {/*            {this.getDate(this.props.streamInfo.time)}*/}
                    {/*        </Text>*/}
                    {/*        <Text style={styles.sheetSubDetail}>*/}
                    {/*            {this.getTime(this.props.streamInfo.time)} - {this.getTime(this.props.streamInfo.endTime)}*/}
                    {/*        </Text>*/}
                    {/*    </View>*/}
                    {/*</View>*/}

                    {/*<View style={styles.sheetView}>*/}
                    {/*    <Icon name='map-marker-alt' size={Dimensions.get('window').width * .06} color='#8b8b8b'*/}
                    {/*          style={{marginRight: 15, marginTop: Dimensions.get('window').height * .005}}/>*/}
                    {/*    <View style={styles.detailContainer}>*/}
                    {/*        <Text style={styles.sheetDetail}>*/}
                    {/*            {this.props.streamInfo.location}*/}
                    {/*        </Text>*/}
                    {/*        <Text style={styles.sheetSubDetail}>*/}
                    {/*            {this.props.streamInfo.generalLocation}*/}
                    {/*        </Text>*/}
                    {/*    </View>*/}
                    {/*</View>*/}

                    {/*<View style={ styles.sheetView }>*/}
                    {/*	<Icon name='credit-card' size={Dimensions.get('window').width * .06} color='#8b8b8b' */}
                    {/*		  style={{marginRight: 12, marginTop: Dimensions.get('window').height * .005}}/>*/}
                    {/*	<View style={ styles.detailContainer }>*/}
                    {/*		<Text style={ styles.sheetDetail }>*/}
                    {/*			Sat, May 25, 2019*/}
                    {/*		</Text>*/}
                    {/*		<Text style={ styles.sheetSubDetail }>*/}
                    {/*			8:00 PM - 1:00 AM*/}
                    {/*		</Text>*/}
                    {/*	</View>*/}
                    {/*</View>*/}

                    <View style={styles.sheetView}>
                        <View style={styles.detailContainer}>
                            <Text style={styles.sheetDetail}>
                                About
                            </Text>
                            <Text style={styles.sheetSubDetail}>
                                {this.props.streamInfo.description}
                            </Text>
                        </View>
                    </View>
                    {/*{this.props.userIsGoing ?*/}
                    {/*    <View style={styles.sheetView}>*/}
                    {/*        <View style={styles.detailContainer}>*/}
                    {/*            <Text style={styles.sheetDetail}>*/}
                    {/*                Location*/}
                    {/*            </Text>*/}
                    {/*            <Text style={styles.sheetSubDetail}>*/}
                    {/*                {this.props.streamInfo.location}*/}
                    {/*            </Text>*/}
                    {/*        </View>*/}
                    {/*    </View> : <View style={{alignItems: 'center'}}>*/}
                    {/*    </View>}*/}

                </ScrollView>
                <View style={{alignItems: 'center', width: '100%', paddingBottom: '15%'}}>
                    <Button style={styles.joinButton} onPress={() => {
                        this.props.joinStream(this.props.streamInfo.streamReference, this.props.streamInfo.streamInfo)
                    }}>
                        <Text style={styles.joinButtonText}>Watch Now</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sheetContainer: {
        backgroundColor: '#111',
        height: '100%',
        width: '100%',
    },

    sheetTitle: {
        fontWeight: '700',
        fontSize: Dimensions.get('window').width * .06,
        color: '#fff',
        marginTop: 15,
        marginRight: 57,
        marginLeft: 37,
        marginBottom: Dimensions.get('window').width * .03,
    },

    sheetView: {
        marginTop: 23,
        marginRight: 57,
        marginLeft: 37,
        flexDirection: 'row',
    },

    sheetDetail: {
        color: '#fff',
        fontSize: Dimensions.get('window').width * .04,
        fontWeight: '700',
        flexWrap: 'wrap',
    },

    sheetSubDetail: {
        fontSize: Dimensions.get('window').width * .03,
        fontWeight: '400',
        color: '#999',
        maxWidth: Dimensions.get('window').width * .7,
    },

    joinButton: {
        backgroundColor: '#DE3C4B',
        borderRadius: 32,
        borderColor: '#DE3C4B',
        width: Dimensions.get('window').width * .51,
        height: Dimensions.get('window').height * .07,
    },

    joinButtonText: {
        width: '100%',
        fontWeight: '700',
        color: '#fff',
        fontSize: Dimensions.get('window').width * .05,
        textAlign: 'center',
    },

    detailContainer: {
        flexDirection: 'column',
    },
});
