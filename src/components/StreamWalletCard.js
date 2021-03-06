import React from "react";
import { StyleSheet } from "react-native";
import { Dimensions, Text, View } from "react-native";


const isUserHostedStream = true;
export default class StreamWalletCard extends React.Component {

	formatDate(time) {
		const date = new Date(time);
		const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]; // todo optimize ples
		const now = new Date();
		const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
		const daysToDate = Math.round((date - now) / (1000 * 60 * 60 * 24));
		if (daysToDate < 7 && daysToDate !== 0) {
			return days[date.getDay()]
		} else if (now > date) {
			return "NOW";
		} else if ((date.getDate() === now.getDate()) && (date.getMonth() === now.getMonth()) && (date.getFullYear() === now.getFullYear())) { // im sorry it has to be like this
			return "TODAY";
		} else {
			return `${ months[date.getMonth()] } ${ date.getDate() }`;
		}
	}

	render() {

		return (
			<View style={ styles.featuredStreamCard }>
				<View style={ styles.dateContainer }>
					<Text style={ styles.dateText }>Live Stream</Text>
				</View>
				<View style={ styles.container }>
					<View style={ styles.textContainer }>
						<Text style={ styles.titleText } numberOfLines={ 2 }>
							{ this.props.streamInfo.name }
						</Text>
						<Text style={ styles.addressText } numberOfLines={ 1 }>{ this.props.streamInfo.description }</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	featuredStreamCard: {
		marginLeft: "9.66%",
		flex: 1,
		flexDirection: "row",
		marginBottom: -65
	},
	dateContainer: {
		backgroundColor: "#191919",
		height: "20%",
		borderRadius: 7,
		left: -17.5,
		marginTop: 11
	},
	dateText: {
		color: "#999",
		padding: 10,
		fontWeight: "800",
		paddingBottom: "45%"
	},
	container: {
		backgroundColor: "#DE3C4B",
		borderRadius: 13,
		width: "95%",
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
		color: "#7c80bd",
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