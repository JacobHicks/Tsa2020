import React, { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
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
// todo create maximums for each element
const CreatePartyScreen = function(props) {
	const [partyTitle, setPartyTitle] = useState("Untitled Party");
	// const [shortLocation, setShortLocation] = useState("General Location")
	// const [partyDesc, setPartyDesc] = useState("Party description");

	const [dbg, setDbg] = useState("default state");
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
	// todo make post button colored when they're good to post
	return (
		<Container style={ styles.body }>
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
					<Button transparent disabled={ true }>
						<Text style={ styles.headerButtonText }>Post</Text>
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
						<Label>General Location</Label>
						<Input placeholder="Main Street" style={ styles.formInput } selectionColor={ "#ee5253" } />
					</Item>
					<Item stackedLabel style={ styles.formItem }>
						<Label>Location</Label>
						<Input placeholder="123 Main Street" style={ styles.formInput } selectionColor={ "#ee5253" } />
					</Item>
					<Grid>
						<Col style={ { maxWidth: 100 } }>
							<Item regular style={ styles.formItem }>
								<Button style={ { backgroundColor: "transparent" } }>
									<Text style={ { color: "#ee5253", fontSize: 18, fontWeight: "600" } }>Time</Text>
								</Button>
							</Item>
						</Col>
						<Col>
							<Item regular style={ styles.formItem }>
								<Button style={ { backgroundColor: "transparent" } }>
									<Text style={ { color: "#ee5253", fontSize: 18, fontWeight: "600" } }>Date</Text>
								</Button>
							</Item>
						</Col>

					</Grid>
					<Item stackedLabel style={ styles.formItem }>
						<Label>Description</Label>
						<Textarea bordered={ false } underline={ false } rowSpan={ 7 } style={ styles.formInput }
						          placeholder={ "description" } selectionColor={ "#ee5253" } />
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
		color: "#FFFFFF",
		fontWeight: "600",
		marginHorizontal: 15,
		fontSize: 15
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
		fontSize: 20
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
	testing: {
		color: "#FFF"
	}
});

export default CreatePartyScreen;
