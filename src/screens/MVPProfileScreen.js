import React from "react";
import {
	View,
	StyleSheet,
	Dimensions,
	FlatList,
	TouchableHighlight
} from "react-native";
import Footer from "native-base";
import Header from "../components/Header";
import UIFooter from "../components/UIFooter";
import { Spinner, Text } from "native-base";
// import Icon from "react-native-vector-icons/MaterialIcons";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import StreamWalletCard from "../components/StreamWalletCard";
import { Container } from "native-base";
import RBSheet from "react-native-raw-bottom-sheet";
import SheetContent from "../components/SheetContent";

const db = firestore();

export default class MVPProfileScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			user: null,
			parties: []
		};
		this.showStreamSheet = this.showStreamSheet.bind(this);
		this.leaveStream = this.leaveStream.bind(this);
		this.cancelStream = this.cancelStream.bind(this);
	}

	async checkEnrollment(stream) {
		await stream.collection("attendees").where("uid", "==", auth().currentUser.uid).get()
			.then(QuerySnapshot => {
				return QuerySnapshot.docs.length > 0;
			});
	}

	getParties(callback) {
		let parties = [];
		db.collection("users").doc(auth().currentUser.uid).collection("enrolledParties").get().then(QuerySnapshot => {
			let promises = [];
			QuerySnapshot.docs.forEach(doc => promises.push(doc.data().stream.get().then(StreamDocument => {
				parties.push(StreamDocument.data());
				parties[parties.length - 1].streamReference = StreamDocument.ref;
				parties[parties.length - 1].enrolled = this.checkEnrollment(StreamDocument.ref);
			}))); // WatchMojo top 10 react native firebase moments;
			Promise.all(promises).then(() => {
				for (let i = 0; i < parties.length; i++) {
					parties[i].key = i.toString();
				}
				callback(parties);
			})
		});
	}

	getHostedParties(callback) {
		let parties = [];
		db.collection("users").doc(auth().currentUser.uid).collection("hostedParties").get().then(QuerySnapshot => {
			let promises = [];
			QuerySnapshot.docs.forEach(doc => promises.push(doc.data().stream.get().then(StreamDocument => {
				parties.push(StreamDocument.data());
				parties[parties.length - 1].streamReference = StreamDocument.ref;
				parties[parties.length - 1].enrolled = this.checkEnrollment(StreamDocument.ref);
			}))); // WatchMojo top 10 react native firebase moments;
			Promise.all(promises).then(() => {
				for (let i = 0; i < parties.length; i++) {
					parties[i].key = i.toString();
				}

				callback(parties);
			})
		});
	}

	leaveStream(stream, streamInfo) {
		db.collection("users").doc(auth().currentUser.uid).collection("enrolledParties")
			.where("stream", "==", stream).get().then(QuerySnapshot => {
			QuerySnapshot.docs.forEach(doc => doc.ref.delete());
		});

		stream.collection("attendees").where("uid", "==", auth().currentUser.uid).get()
			.then(QuerySnapshot => {
				QuerySnapshot.docs.forEach(doc => doc.ref.delete());
			});

		streamInfo.enrolled = false;

		let newParties = this.state.parties;
		newParties.splice(streamInfo.key, 1);
		this.setState({ parties: newParties });
		this.RBSheet.close();
	}

	cancelStream(stream, streamInfo) {

		db.collection("users").doc(auth().currentUser.uid).collection("hostedParties")
			.where("stream", "==", stream).get().then(QuerySnapshot => {
			QuerySnapshot.docs.forEach(doc => doc.ref.delete());
		});

		stream.collection("attendees").get().then(QuerySnapshot => {
			const attendees = QuerySnapshot.docs;
			attendees.forEach(attendeeSnapshot => {
				const uid = attendeeSnapshot.uid;
				db.collection("users").doc(uid).collection("enrolledParties").where("stream", "==", stream).get().then(QuerySnapshot => {
					QuerySnapshot.docs.forEach(rsvpSnapshot => {
						rsvpSnapshot.ref.delete();
					});
				});
				attendeeSnapshot.ref.delete();
			});
			stream.delete();
			let newParties = this.state.hostedParties;
			newParties.splice(streamInfo.key, 1);
			this.setState({ parties: newParties });
			this.RBSheet.close();
		});
	}

	componentDidMount() {
		this.getParties(parties =>
				this.setState({
					parties: parties
				}),
			this.getHostedParties(parties =>
				this.setState({
					hostedParties: parties,
					isLoading: false
				})
			)
		);
	}

	render() {
		if (this.state.isLoading) {
			return (
				<Container style={ styles.body }>
					<View style={ { flex: 1, alignItems: "center", justifyContent: "center" } }>
						<Spinner isVisible={ true } size={ Dimensions.get("window").width * .25 } type={ "ThreeBounce" }
						         color={ "#DE3C4B" } />
						<Text style={ [styles.titleText, { marginLeft: 0, marginTop: 16 }] }>Good times await</Text>
					</View>
				</Container>
			);
		} else {
			const { navigation } = this.props;
			return (
				<Container style={ { backgroundColor: "#000" } }>
					<Header collegeName={ navigation.getParam("institution") } />
					<FlatList
						showsVerticalScrollIndicator={ false }
						data={ this.state.parties }
						style={ {
							marginRight: "6%",
							paddingTop: 25
						} }
						ListHeaderComponent={
							<View>
								{ this.state.hostedParties.length > 0 &&
								<View>
									<Text style={ styles.walletText }>
										My Parties
									</Text>

									<FlatList
										showsVerticalScrollIndicator={ false }
										data={ this.state.hostedParties }
										renderItem={ ({ item }) =>
											<TouchableHighlight onPress={ () => {
												this.showStreamSheet(item, true);
											} }>
												<StreamWalletCard streamInfo={ item } />
											</TouchableHighlight>
										}
									/>
								</View>
								}

								{ this.state.parties.length > 0 ?
									<Text style={ styles.walletText }>
										RSVPs
									</Text> :
									<Text style={ styles.walletText }>Ongoing Parties</Text>
								}
							</View>
						}
						renderItem={ ({ item }) =>
							<TouchableHighlight onPress={ () => {
								this.showStreamSheet(item);
							} }>
								<StreamWalletCard streamInfo={ item } />
							</TouchableHighlight>
						}
					/>
					<RBSheet
						ref={ ref => {
							this.RBSheet = ref;
						} }
						height={ Dimensions.get("window").height * .70 }
						duration={ 250 }
						animationType={ "slide" }
						closeOnDragDown={ true }
						customStyles={ {
							container: {
								borderTopLeftRadius: 16,
								borderTopRightRadius: 16,
								backgroundColor: "#111"
							},
							draggableIcon: {
								backgroundColor: "#DE3C4B",
								width: 75,
								top: 5
							},
							wrapper: {
								backgroundColor: "transparent"
							}
						} }
					>
						<SheetContent leaveStream={ this.leaveStream }
						              cancelStream={ this.cancelStream }
						              streamInfo={ this.state.selectedStreamInfo } />
					</RBSheet>
					<UIFooter name={ this.props.name } institution={ this.props.institution }
					          navigation={ navigation } profileIsActive={ true } />
				</Container>
			);
		}
	}

	showStreamSheet = ((stream) => {
		this.setState({
			selectedStreamInfo: {
				name: stream.name,
				host: stream.host,
				description: stream.description,
				time: stream.time,
				endTime: stream.endTime,
				location: stream.location,
				generalLocation: stream.generalLocation,
				streamReference: stream.streamReference,
				enrolled: stream.enrolled,
				streamInfo: stream
			}
		});
		this.RBSheet.open();
	});
}

const styles = StyleSheet.create({
	body: {
		backgroundColor: "#000",
		height: "100%",
		width: "100%"
	},

	titleText: {
		fontSize: 25,
		color: "#FFFFFF",
		fontWeight: "700"
	},

	header: {
		backgroundColor: "#000"
	},

	walletText: {
		color: "#FFF",
		fontSize: Dimensions.get("window").width * .07,
		fontWeight: "700",
		marginBottom: 16,
		marginLeft: "5%"
	},

	nameText: {
		color: "#FFF",
		fontSize: Dimensions.get("window").width * .07,
		fontWeight: "700"
	},

	bodyFooter: {
		position: "relative",
		bottom: 0,
		top: "auto"
	}

});
