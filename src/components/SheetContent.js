import React from "react";
import { View, StyleSheet, ScrollView, Dimensions, Image } from "react-native";
import {
	Text,
	Button
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome5";
// fix icons on ios
// todo if user is going, convert short location to acutal location on sheet page
export default class SheetContent extends React.Component {
	render() {
		return (
			<ScrollView style={ styles.sheetContainer }>
				<Text style={ styles.sheetTitle }>{ this.props.name }</Text>
				<View style={ styles.sheetView }>
					{/*<Icon name='calendar-check' size={Dimensions.get('window').width * .06} color='#8b8b8b'*/ }
					{/*      style={{marginRight: 16, marginTop: Dimensions.get('window').height * .005}}/>*/ }
					<View style={ styles.detailContainer }>
						<Text style={ styles.sheetDetail }>
							Sat, May 25, 2019
						</Text>
						<Text style={ styles.sheetSubDetail }>
							8:00 PM - 1:00 AM
						</Text>
					</View>
				</View>

				<View style={ styles.sheetView }>
					{/*<Icon name='compass' size={Dimensions.get('window').width * .06} color='#8b8b8b'*/ }
					{/*      style={{marginRight: 15, marginTop: Dimensions.get('window').height * .005}}/>*/ }
					<View style={ styles.detailContainer }>
						<Text style={ styles.sheetDetail }>
							Sat, May 25, 2019
						</Text>
						<Text style={ styles.sheetSubDetail }>
							8:00 PM - 1:00 AM
						</Text>
					</View>
				</View>

				<View style={ styles.sheetView }>
					{/*<Icon name='credit-card' size={Dimensions.get('window').width * .06} color='#8b8b8b'*/ }
					{/*      style={{marginRight: 12, marginTop: Dimensions.get('window').height * .005}}/>*/ }
					<View style={ styles.detailContainer }>
						<Text style={ styles.sheetDetail }>
							Sat, May 25, 2019
						</Text>
						<Text style={ styles.sheetSubDetail }>
							8:00 PM - 1:00 AM
						</Text>
					</View>
				</View>

				<View style={ styles.sheetView }>
					<View style={ styles.detailContainer }>
						<Text style={ styles.sheetDetail }>
							About
						</Text>
						<Text style={ styles.sheetSubDetail }>
							{ this.props.description }
						</Text>
					</View>
				</View>
				{ this.props.userIsGoing ?
					<View style={ styles.sheetView }>
						<View style={ styles.detailContainer }>
							<Text style={ styles.sheetDetail }>
								Location
							</Text>
							<Text style={ styles.sheetSubDetail }>
								{ this.props.location }
							</Text>
						</View>
					</View> : <View style={ { alignItems: "center" } }>
						<Button style={ styles.joinButton } onPress={ this.props.joinParty }>
							<Text style={ styles.joinButtonText }>I'm in</Text>
						</Button>
					</View> }

			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	sheetContainer: {
		backgroundColor: "#111",
		height: "100%",
		width: "100%",
		flex: 1
	},

	sheetTitle: {
		fontWeight: "700",
		fontSize: Dimensions.get("window").width * .06,
		color: "#fff",
		marginTop: 15,
		marginRight: 57,
		marginLeft: 37,
		marginBottom: Dimensions.get("window").width * .03
	},

	sheetView: {
		marginTop: 23,
		marginRight: 57,
		marginLeft: 37,
		flexDirection: "row"
	},

	sheetDetail: {
		color: "#fff",
		fontSize: Dimensions.get("window").width * .04,
		fontWeight: "700",
		flexWrap: "wrap"
	},

	sheetSubDetail: {
		fontSize: Dimensions.get("window").width * .03,
		fontWeight: "400",
		color: "#999"
	},

	joinButton: {
		backgroundColor: "#ee5253",
		borderRadius: 32,
		borderColor: "#ee5253",
		marginTop: Dimensions.get("window").width * .35,
		width: Dimensions.get("window").width * .51,
		height: Dimensions.get("window").height * .07
	},

	joinButtonText: {
		width: "100%",
		fontWeight: "700",
		color: "#fff",
		fontSize: Dimensions.get("window").width * .05,
		textAlign: "center"
	},

	detailContainer: {
		flexDirection: "column"
	}
});
