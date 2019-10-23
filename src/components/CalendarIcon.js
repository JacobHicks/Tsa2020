import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default class CalendarIcon extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// todo parse date into number and 3 letter month code
	}

	render(props) {
		return (
			<View style={ styles.calendarIcon }>
				<Text style={ styles.calendarNumber }>
					8
				</Text>
				<View style={ styles.calendarMonthContainer }>
					<Text style={ styles.calendarMonth }>
						OCT
					</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	calendarIcon: {
		backgroundColor: "#fff",
		borderRadius: 6.67,
		height: 60,
		width: 60,
		marginTop: 25,
		marginLeft: 25
	},
	calendarNumber: {
		textAlign: "center",
		marginTop: 5,
		fontWeight: "700",
		fontSize: 20,
		color: "red"
	},
	calendarMonthContainer: {
		backgroundColor: "red",
		bottom: 0,

	},
	calendarMonth: {
		textAlign: "center",
		fontWeight: "700",
		fontSize: 14,
		color: "#fff",
	}
});
