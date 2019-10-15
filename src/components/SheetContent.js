import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
	Text,
	Button,
	Grid,
	Col,
	Container
} from "native-base";

export default class SheetContent extends React.Component {
	// todo change close button into icon
	render() {
		return (
			<Container style={ styles.sheetContainer }>
				<Grid>
					<Col>
						<Text style={ styles.sheetTitle }>{ this.props.title }</Text>
						<Text style={ styles.sheetHost }>{ this.props.host }</Text>
						{/*<Text style={styles.sheet}>{ this.props.host }</Text>*/ }
					</Col>
					<Col>
						<Button style={ styles.closeButton } onPress={ () => {
							// todo close modal onPress
						} }>
							<Text>x</Text>
						</Button>
					</Col>
				</Grid>
				<ScrollView>
					<Text>{ this.props.description }</Text>
				</ScrollView>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	sheetContainer: {
		backgroundColor: "#333",
		height: "100%",
		width: "100%",
	},
	sheetTitle: {
		fontWeight: "700",
		fontSize: 36,
		color: "#fff",
		marginTop: 15,
		marginLeft: 20
	},
	closeButton: {
		backgroundColor: "red",
		maxWidth: 40,
		maxHeight: 40,
		textAlign: "center",
		borderRadius: 12,
		right: 5,
		top: 5,
		position: "absolute",
		padding: 0
	},
	sheetHost: {
		color: "#ccc",
		fontSize: 24,
		fontWeight: "600",
		marginLeft: 20
	},
	sheetDescription: {
		color: "#FFF",

	}
});
