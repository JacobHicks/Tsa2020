import React from 'react';
import {View, StyleSheet, ScrollView, Dimensions, Image} from 'react-native';
import {
    Text,
    Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
// fix icons on ios
export default class SheetContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			registered: false
		}
	}

	componentDidMount() {
		if(this.props.registered) {
			this.setState({
				registered: true
			})
		}
	}

	render() {
        return (
            <ScrollView style={styles.sheetContainer}>
                <Text style={styles.sheetTitle}>{this.props.name}</Text>

                <View style={styles.sheetView}>
                    {/*<Icon name='calendar-check' size={Dimensions.get('window').width * .06} color='#8b8b8b'*/}
                    {/*      style={{marginRight: 16, marginTop: Dimensions.get('window').height * .005}}/>*/}
                    <View style={styles.detailContainer}>
                        <Text style={styles.sheetDetail}>
                            Sat, May 25, 2019
                        </Text>
                        <Text style={styles.sheetSubDetail}>
                            8:00 PM - 1:00 AM
                        </Text>
                    </View>
                </View>

                <View style={styles.sheetView}>
                    {/*<Icon name='compass' size={Dimensions.get('window').width * .06} color='#8b8b8b'*/}
                    {/*      style={{marginRight: 15, marginTop: Dimensions.get('window').height * .005}}/>*/}
                    <View style={styles.detailContainer}>
                        <Text style={styles.sheetDetail}>
                            Sat, May 25, 2019
                        </Text>
                        <Text style={styles.sheetSubDetail}>
                            8:00 PM - 1:00 AM
                        </Text>
                    </View>
                </View>

                <View style={styles.sheetView}>
                    {/*<Icon name='credit-card' size={Dimensions.get('window').width * .06} color='#8b8b8b'*/}
                    {/*      style={{marginRight: 12, marginTop: Dimensions.get('window').height * .005}}/>*/}
                    <View style={styles.detailContainer}>
                        <Text style={styles.sheetDetail}>
                            Sat, May 25, 2019
                        </Text>
                        <Text style={styles.sheetSubDetail}>
                            8:00 PM - 1:00 AM
                        </Text>
                    </View>
                </View>

                <View style={styles.sheetView}>
                    <View style={styles.detailContainer}>
                        <Text style={styles.sheetDetail}>
                            About
                        </Text>
                        <Text style={styles.sheetSubDetail}>
                            {this.props.description}
                        </Text>
                    </View>
                </View>

                <View style={{alignItems: 'center'}}>
                    {
                        this.state.registered ?
                            <Button style={styles.leaveButton}>
                                <Text style={styles.leaveButtonText}>I'm out</Text>
                            </Button>
                            :
                            <Button style={styles.joinButton}>
                                <Text style={styles.joinButtonText}>I'm in</Text>
                            </Button>
                    }
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    sheetContainer: {
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        flex: 1,
    },

    sheetTitle: {
        fontWeight: '700',
        fontSize: Dimensions.get('window').width * .06,
        color: '#000',
        marginTop: 15,
        marginRight: 57,
        marginLeft: 37,
    },

    sheetView: {
        marginTop: 23,
        marginRight: 57,
        marginLeft: 37,
        flexDirection: 'row',
    },

    sheetDetail: {
        color: '#000',
        fontSize: Dimensions.get('window').width * .04,
        fontWeight: '700',
        flexWrap: 'wrap',
    },

    sheetSubDetail: {
        fontSize: Dimensions.get('window').width * .03,
        fontWeight: '400',
        color: '#8b8b8b',
    },

    joinButton: {
        backgroundColor: 'white',
        borderRadius: 32,
        borderWidth: 3,
        borderColor: '#2DE981',
        marginTop: 48,
        width: Dimensions.get('window').width * .51,
        height: Dimensions.get('window').height * .07,
    },

    joinButtonText: {
        width: '100%',
        fontWeight: '700',
        color: '#2DE981',
        fontSize: Dimensions.get('window').width * .05,
        textAlign: 'center',
    },

    leaveButton: {
        backgroundColor: 'white',
        borderRadius: 32,
        borderWidth: 3,
        borderColor: '#e94655',
        marginTop: 48,
        width: Dimensions.get('window').width * .51,
        height: Dimensions.get('window').height * .07,
    },

    leaveButtonText: {
        width: '100%',
        fontWeight: '700',
        color: '#e94655',
        fontSize: Dimensions.get('window').width * .05,
        textAlign: 'center',
    },

    detailContainer: {
        flexDirection: 'column',
    },
});
