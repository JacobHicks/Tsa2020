import React from "react";
import {
	View,
	StyleSheet,
	Dimensions,
	FlatList,
	TouchableHighlight
} from "react-native";
import Header from "../components/Header";
import UIFooter from "../components/UIFooter";
import { Spinner, Text } from "native-base";
// import Icon from "react-native-vector-icons/MaterialIcons";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import PartyWalletCard from "../components/PartyWalletCard";
import { Container } from "native-base";
import UserHostedPartySheet from "../components/UserHostedPartySheet";
import RBSheet from "react-native-raw-bottom-sheet";

const db = firestore();

export default class MVPProfileScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dbg: "default",
			isLoading: true,
			user: null,
			parties: []
		};
		this.openSheet = this.openSheet.bind(this);
	}

	getParties() { // todo create schema for partiesList
		let parties = [
			{
				name: "Beta Chad Kappa",
				date: "Oct 8th",
				details: "Whom is Joe",
				location: "123 main street"
			},
			{
				name: "Party at Scoob House",
				date: "Oct 26th",
				details: "Whom is Joe",
				location: "8904 bruh zone"
			}
		];

		return parties;
	}
	getPartyList() {
		db.collection("schoolData/ucla/users").doc("user") // todo use relations in firestore, "user" is user
			.get()
			.then(QuerySnapshot => {
				let partyCards = [];
				QuerySnapshot.docs
					.forEach(doc => {
						const rawParty = doc.data();
						const formattedParty = {
							key: Math.random().toString(), // todo fix
							title: rawParty.title,
							description: rawParty.description,
							time: rawParty.time,
							shortLocation: rawParty.shortLocation,
							attendees: rawParty.attendees
						};
						partyCards.push(formattedParty);
					});
				this.setState({
					parties: partyCards
				});
			});
	}

	componentDidMount() {
		//const user = auth().currentUser;
		/*
		const phoneNumber = user.phoneNumber;
		db.collection("users-schools")
			.doc(phoneNumber)
			.get()
			.then(DocumentSnapshot => {
				this.setState({
					user: DocumentSnapshot.data()
				});
			});
		 */
		this.setState({
			isLoading: false,
			parties: this.getParties()
		});
	}

	render() {
		if (this.state.isLoading) {
			return null;
			//TODO: load screen
		} else {
			const { navigation } = this.props;
			return (
				<Container style={ { backgroundColor: "#000" } }>
					<Header collegeName={ this.state.dbg } />
					<FlatList
						showsVerticalScrollIndicator={ false }
						data={ this.state.parties }
						style={ {
							marginLeft: "10%",
							marginRight: "10%"
						} }
						ListHeaderComponent={
							<View>
								<View style={ {
									flexDirection: "column",
									alignItems: "center"
								} }>
									<Text style={ styles.nameText }>
										Joe Mama
									</Text>

									<Text style={ styles.schoolText }>
										UCLA
									</Text>
								</View>

								<Text style={ styles.walletText }>
									Party Wallet
								</Text>
							</View>
						}
						renderItem={ ({ item }) =>
							<TouchableHighlight onPress={ () => {
								this.setState({
									sheetTitle: item.name,
									sheetDescription: item.details
								}, this.openSheet);
							} }>
								<PartyWalletCard title={ item.name } date={ item.date } />
							</TouchableHighlight>
						}
					/>

					<RBSheet
						ref={ ref => {
							this.RBSheet = ref;
						} }
						height={ Dimensions.get("window").height * .70 }
						duration={ 250 }
						animationType={ "fade" }
						closeOnDragDown={ true }
						customStyles={ {
							container: {
								borderTopLeftRadius: 16,
								borderTopRightRadius: 16,
								backgroundColor: "#111"
							},
							draggableIcon: {
								backgroundColor: "#ee5253",
								width: 75,
								top: 5
							}
						} }
					>
						<UserHostedPartySheet name={ this.state.sheetTitle } description={ this.state.sheetDescription }
						              registered={ true } userIsGoing={ true } location={ this.state.location } />
					</RBSheet>
					<UIFooter navigation={ navigation } />
				</Container>
			);
		}
	}

	openSheet = (() => {
		this.RBSheet.open();
	});
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: "#000"
	},

	walletText: {
		color: "#FFF",
		fontSize: Dimensions.get("window").width * .07,
		fontWeight: "700",
		marginBottom: 16
	},

	nameText: {
		color: "#FFF",
		fontSize: Dimensions.get("window").width * .07,
		fontWeight: "700",
		marginBottom: 5
	},

	schoolText: {
		color: "#FFF",
		fontSize: Dimensions.get("window").width * .04,
		fontWeight: "700",
		marginBottom: 44
	}

});
