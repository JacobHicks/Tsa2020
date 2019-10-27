import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, StatusBar, Alert } from "react-native";
import {
	Container,
	Header,
	Content,
	Form,
	Item,
	Input,
	Left,
	Right,
	Button,
	Icon,
	Body,
	Grid,
	Col,
	DatePicker,
	Textarea,
	Label
} from "native-base";

import firestore from "@react-native-firebase/firestore";

const db = firestore();
// todo create max lengths for each element
const openGeneralLocationAlert = function() {
	return Alert.alert(
		"General Location",
		"General location is shown with party information to show the *general location* of the event without giving away the exact location. " +
		"The full location is revealed once they mark that they are coming to the party.",
		[
			{ text: "OK" }
		],
		{ cancelable: false }
	);
};
const showErrorMessage = function(title, message) {
	return Alert.alert(
		title,
		message,
		[
			{ text: "OK" }
		],
		{ cancelable: false }
	);
};
const createNewParty = (title, location, time, description) => {
	let docRef = db.collection("schoolData").doc(school).collection("parties");
	docRef.add({
		title: title,
		location: location,
		time: time,
		// host: host,
		// fee: fee,
		description: description,
		deleted: false,
		attendees: 1
	}).then((status) => {
		setDbg(status);
		// todo toast here
	}).catch(err => {
		if (err) throw err;
	});
};

let partyTitleValid, generalLocationValid, locationValid, timeValid, dateValid, descriptionValid = false;

const CreatePartyScreen = function(props) {
	const [partyTitle, setPartyTitle] = useState("untitled party");
	const [partyGeneralLocation, setPartyGeneralLocation] = useState("");
	const [partyLocation, setPartyLocation] = useState("");
	const [partyTime, setPartyTime] = useState("time*");
	const [partyDate, setPartyDate] = useState("date*");
	const [partyDescription, setPartyDescription] = useState("");
	const [postButtonIsDisabled, setPostButtonIsDisabled] = useState(false); // todo form validation for checking if they can post it or not
	const [dbg, setDbg] = useState("default state");


	useEffect(() => {
		if (partyTitleValid && generalLocationValid && locationValid && timeValid && dateValid && descriptionValid) {
			setPostButtonIsDisabled(false);
		} else {
			setPostButtonIsDisabled(true);
		}
		partyTitleValid = partyTitle.length > 3 && partyTitle.length < 50;
		generalLocationValid = partyGeneralLocation.length < 50;
		locationValid = (partyLocation.length > 3 && partyLocation.length < 200);
		timeValid = true; // todo check if time is entered, not in the past
		dateValid = true; // todo check if date is entered, not in the past
		descriptionValid = partyDescription.length <= 500;

	});

	// todo make post button colored when they're good to post
	return (
		<Container style={ styles.body }>
			<StatusBar />
			<Header style={ styles.header }>
				<Left>
					<Button transparent>
						<Text style={ styles.headerButtonText }>Cancel</Text>
					</Button>
				</Left>
				<Body>
					<Text style={ styles.headerText } numberOfLines={ 1 }>{ partyTitle }</Text>
				</Body>
				<Right>
					<Button transparent disabled={ postButtonIsDisabled }>
						<Text
							style={ [styles.headerButtonText, postButtonIsDisabled ? styles.postButtonIsDisabled : styles.postButtonIsEnabled] }>Post</Text>
					</Button>
				</Right>
			</Header>
			<Content>
				<Form style={ styles.form }>
					<Item regular style={ { borderColor: "#000", marginLeft: 20 } }>
						<Input placeholder="what's the plan?" style={ styles.titleInput }
						       onChangeText={ setPartyTitle } selectionColor={ "#ee5253" } />
					</Item>
					<Item stackedLabel style={ styles.formItem }>
						<Label style={ { color: "#FFF", fontSize: 18, fontWeight: "600" } }>location*</Label>
						<Input placeholder="123 main street" style={ styles.formInput } selectionColor={ "#ee5253" }
						       onChangeText={ setPartyLocation } />
					</Item>
					<Item stackedLabel success={ false } style={ styles.formItem }>
						<Label style={ { flexDirection: "row" } }>
							<Text style={ { color: "#fff", fontSize: 18, fontWeight: "600" } }>general location</Text>
							<Text transparent style={ styles.infoButton }
							      onPress={ openGeneralLocationAlert }> ?</Text>
						</Label>
						<Input placeholder="main street" style={ styles.formInput } selectionColor={ "#ee5253" }
						       onChangeText={ setPartyGeneralLocation } />
					</Item>
					<Grid>
						<Col style={ { maxWidth: 150 } }>
							<Item regular style={ styles.formItem }>
								<Button transparent>
									<Text style={ { color: "#ee5253", fontSize: 18, fontWeight: "600" } }>{ partyTime }</Text>
								</Button>
							</Item>
						</Col>
						<Col>
							<Item regular style={ { borderColor: "#000" } }>
								<Button style={ { backgroundColor: "transparent" } }>
									<Text style={ { color: "#ee5253", fontSize: 18, fontWeight: "600" } }>{ partyDate }</Text>
								</Button>
							</Item>
						</Col>
					</Grid>
					<Item style={ styles.formItem }>
						<Textarea bordered={ false } underline={ false } rowSpan={ 10 } style={ [styles.formInput, { left: -9, top: 12 }] }
						          placeholder={ "description" } selectionColor={ "#ee5253" }
						          onChangeText={ setPartyDescription } />
					</Item>
				</Form>
			</Content>
		</Container>
	);
};


const styles = StyleSheet.create({
	body: {
		backgroundColor: "#000",
		height: "100%",
		width: "100%"
	},
	header: {
		borderBottomColor: "#555",
		borderBottomWidth: .5,
		backgroundColor: "#000"
	},
	headerText: {
		color: "#FFF",
		fontWeight: "700",
		fontSize: 20
	},
	headerButtonText: {
		color: "#FFF",
		fontWeight: "600",
		marginHorizontal: 15,
		fontSize: 15
	},
	postButtonIsDisabled: {
		color: "#777"
	},
	postButtonIsEnabled: {
		color: "#ee5253"
	},
	form: {
		marginTop: 20
	},
	formItem: {
		borderColor: "#000",
		marginLeft: 42
	},
	formInput: {
		color: "#fff",
		fontSize: 18
	},
	titleInput: {
		height: 80,
		fontSize: 35,
		color: "#FFF",
		fontWeight: "700",
		maxWidth: 387
	},
	datePicker: {
		color: "#fff",
		fontSize: 20,
		backgroundColor: "#fff"
	},
	infoButton: { // todo replace with icon
		color: "#ee5253"
	},
	testing: {
		color: "#FFF"
	}
});

export default CreatePartyScreen;
