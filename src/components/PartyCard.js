import React from "react";
import { View, StyleSheet, Share } from "react-native";
import {
	Card,
	CardItem,
	Text,
	Left,
	Right,
	Button,
	Grid,
	Col
} from "native-base";

const userIsGoing = false; // todo get from props
// todo fill in share info
// todo implement Dynamic Link from firebase
// todo implement join button
export default class PartyCard extends React.Component {
	onShare = async () => {
		try {
			const result = await Share.share({
				message:
					"Share [name] party with friends",
				url: "https://google.com"
			});
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error) {
			alert(error.message);
		}
	};

	formatDate(time) {
		const formattedTime = new Date(time);
		const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "NOV", "DEC"];
		return `${ months[formattedTime.getMonth() + 1] } ${ formattedTime.getDate() } @ ${ formattedTime.getHours() }:${ formattedTime.getMinutes() }`
	}

	render() {
		// this.setState({dbg: this.props.userIsGoing})
		return (
			<Card transparent style={ [styles.partyCard, userIsGoing ? styles.userIsGoing : styles.defaultStyle] }>
				<CardItem cardBody style={ [styles.cardBody, userIsGoing ? styles.userIsGoing : styles.defaultStyle] }>
					<Text style={ styles.title } ellipsizeMode='tail' numberOfLines={ 2 }>{ this.props.title }</Text>
					<Text style={ styles.dateTime }>{ this.formatDate(this.props.time) }</Text>
				</CardItem>
				<Text style={ styles.shortLocation } ellipsizeMode='tail' numberOfLines={ 1 }>
					{ this.props.shortLocation }
				</Text>
				<Grid style={ styles.buttonGrid }>
					<Col>
						<Button style={ styles.shareButton } onPress={ this.onShare }>
							<Text style={ styles.shareButtonText }></Text>
						</Button>
					</Col>
					<Col>
						<Button style={ styles.joinButton } onPress={ this.props.joinParty }>
							<Text style={ styles.joinButtonText }></Text>
						</Button>
					</Col>
				</Grid>
			</Card>
		);
	}
}

const styles = StyleSheet.create({
	partyCard: {
		padding: 0,
		backgroundColor: "#000",
		paddingBottom: 30,
		maxWidth: 375
	},
	cardBody: {
		backgroundColor: "#000",
		borderRadius: 0,
		flexDirection: "row"
	},
	userIsGoing: {
		backgroundColor: "#222"
	},
	defaultStyle: {},
	dateTime: {
		color: "#ee5253",
		position: "absolute",
		top: 7,
		left: 14,
		fontSize: 14,
		fontWeight: "700"
	},
	title: {
		color: "#fff",
		fontWeight: "700",
		fontSize: 24,
		left: 14,
		top: 24
	},
	shortLocation: {
		color: "#999",
		fontWeight: "600",
		marginTop: 37,
		marginLeft: 14,
		fontSize: 16,
		maxWidth: 230
	},
	host: {
		fontSize: 14,
		color: "#999",
		position: "absolute",
		left: 14,
		top: 22,
		fontWeight: "600"
	},
	buttonGrid: {
		marginTop: -25,
		maxWidth: 75,
		marginLeft: 270

	},
	joinButton: {
		height: 30,
		width: 75,
		backgroundColor: "#ee5253"
	},
	joinButtonText: {
		textAlign: "center",
		fontWeight: "700",
		fontSize: 12
	},
	shareButton: {
		height: 30,
		width: 30,
		backgroundColor: "#ee5253"
	},
	shareButtonText: {
		textAlign: "center",
		fontWeight: "700",
		fontSize: 12
	}
});
