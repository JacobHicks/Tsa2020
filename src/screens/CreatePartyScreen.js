import React, { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
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
	DatePicker
} from "native-base";


const CreatePartyScreen = function(props) {
	// todo change the title of the party when they enter text
	const [partyTitle, setPartyTitle] = useState("Untitled Party");
	// setPartyTitle(() => {
	//
	// });
	return (
		<Container style={ styles.body }>
			<Header style={ styles.header }>
				<Left>
					<Button transparent>
						<Text style={ styles.headerButtonText }>Cancel</Text>
					</Button>
				</Left>
				<Body>
					<Text style={ styles.headerText }>{ partyTitle }</Text>
				</Body>
				<Right>
					<Button transparent>
						<Text style={ styles.headerButtonText }>Next</Text>
					</Button>
				</Right>
			</Header>
			<Content>
				<Form style={ styles.form }>
					<Item regular style={ styles.formItem }>
						<Input placeholder="what's the plan?" style={ styles.titleInput }
						       onChangeText={ setPartyTitle } />
					</Item>
					<Grid>
						<Col>
							<Item regular style={ styles.formItem }>
								<Input placeholder="Where" style={ styles.formInput } />
							</Item>
						</Col>
						<Col>
							<Item regular style={ styles.formItem }>
								<DatePicker
									defaultDate={ new Date(2018, 4, 4) }
									minimumDate={ new Date(2018, 1, 1) }
									maximumDate={ new Date(2018, 12, 31) }
									locale={ "en" }
									timeZoneOffsetInMinutes={ undefined }
									modalTransparent={ false }
									animationType={ "slide" }
									androidMode={ "default" }
									placeHolderText="When"
									textStyle={ { color: "#FFF" } }
									placeHolderTextStyle={ { color: "#FFF" } }
									onDateChange={ this.setDate }
									disabled={ false }
									style={ styles.datePicker }
								/>
							</Item>
						</Col>
					</Grid>
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
		marginTop: 30
	},
	formItem: {
		borderColor: "#000",
		marginLeft: 15
	},
	formInput: {
		color: "#fff"
	},
	titleInput: {
		height: 80,
		fontSize: 35,
		color: "#FFF",
		fontWeight: "700"
	},
	datePicker: {
		color: "#fff"
	},
	testing: {
		color: "#FFF"
	}
});

export default CreatePartyScreen;
