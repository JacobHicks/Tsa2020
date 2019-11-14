import React from "react";
import { StyleSheet } from "react-native";
import { Dimensions, Text, View } from "react-native";


const isUserHostedParty = true;
export default class PartyWalletCard extends React.Component {
	render() {
		const date = new Date(this.props.partyInfo.time);
		const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]; // todo optimize ples
		const now = new Date();
		const renderDate = function(date, months, now) {
			if (now > date) {
				return "NOW";
			} else if ((date.getDate() === now.getDate()) && (date.getMonth() === now.getMonth()) && (date.getFullYear() === now.getFullYear())) { // im sorry it has to be like this
				return "TODAY";
			} else {
				return `${ date.getDate() } ${ months[date.getMonth()] }`;
			}
		};
		return (
			<View style={ styles.featuredPartyCard }>
				<View style={ styles.dateContainer }>
					<Text style={ styles.dateText }>{ renderDate(date, months, now) }</Text>
				</View>
				<View style={ styles.container }>
					<View style={ styles.textContainer }>
						<Text style={ styles.dateTimeText }>11:00 PM - 12:00 PM</Text>
						<Text style={ styles.titleText } numberOfLines={ 2 }>
							{ this.props.partyInfo.name }
						</Text>
						<Text style={ styles.addressText } numberOfLines={ 1 }>{ this.props.partyInfo.location }</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	featuredPartyCard: {
		marginLeft: "9.66%",
		flex: 1,
		flexDirection: "row",
		marginBottom: -65
	},
	dateContainer: {
		backgroundColor: "#111",
		height: "20%",
		borderRadius: 7,
		left: -17.5,
		marginTop: 11
	},
	dateText: {
		color: "#DE3C4B",
		padding: 10,
		fontWeight: "800",
		paddingBottom: "45%" // ?????
	},
	container: {
		backgroundColor: "#DE3C4B",
		borderRadius: 13,
		width: "100%",
		height: Dimensions.get("window").height * .12,
		// marginTop: 10,
		// marginBottom: 10,
		flex: 1,
		flexDirection: "column",
		// marginLeft: 16,
		paddingVertical: 7.5

	},
	textContainer: {
		paddingLeft: 12

	},
	dateTimeText: {
		color: "#2B2D42",
		fontWeight: "800",
		fontSize: 12
	},
	titleText: {
		fontSize: Dimensions.get("window").width * .06,
		fontWeight: "700",
		color: "#fff"
	},
	addressText: {
		color: "#f0f3fa",
		fontSize: 14,
		fontWeight: "600",
		marginTop: 2
	}

});
