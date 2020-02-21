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
			streams: []
		};
	}

	async checkEnrollment(stream) {
		await stream.collection("attendees").where("uid", "==", auth().currentUser.uid).get()
			.then(QuerySnapshot => {
				return QuerySnapshot.docs.length > 0;
			});
	}

	getStreams(callback) {
		let streams = [];
		db.collection("users").doc(auth().currentUser.uid).collection("enrolledStreams").get().then(QuerySnapshot => {
			let promises = [];
			QuerySnapshot.docs.forEach(doc => promises.push(doc.data().stream.get().then(StreamDocument => {
				streams.push(StreamDocument.data());
				streams[streams.length - 1].streamReference = StreamDocument.ref;
				streams[streams.length - 1].enrolled = this.checkEnrollment(StreamDocument.ref);
			}))); // WatchMojo top 10 react native firebase moments;
			Promise.all(promises).then(() => {
				for (let i = 0; i < streams.length; i++) {
					streams[i].key = i.toString();
				}
				callback(streams);
			})
		});
	}

	getHostedStreams(callback) {
		let streams = [];
		db.collection("users").doc(auth().currentUser.uid).collection("hostedStreams").get().then(QuerySnapshot => {
			let promises = [];
			QuerySnapshot.docs.forEach(doc => promises.push(doc.data().stream.get().then(StreamDocument => {
				streams.push(StreamDocument.data());
				streams[streams.length - 1].streamReference = StreamDocument.ref;
				streams[streams.length - 1].enrolled = this.checkEnrollment(StreamDocument.ref);
			}))); // WatchMojo top 10 react native firebase moments;
			Promise.all(promises).then(() => {
				for (let i = 0; i < streams.length; i++) {
					streams[i].key = i.toString();
				}

				callback(streams);
			})
		});
	}

	componentDidMount() {
		this.getStreams(streams =>
				this.setState({
					streams: streams
				}),
			this.getHostedStreams(streams =>
				this.setState({
					hostedStreams: streams,
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
						<Text style={ [styles.titleText, { marginLeft: 0, marginTop: 16 }] }>Loading</Text>
					</View>
				</Container>
			);
		} else {
			const { navigation } = this.props;
			return (
				<Container style={ { backgroundColor: "#425c5a" } }>
					<FlatList
						showsVerticalScrollIndicator={ false }
						data={ this.state.streams }
						style={ {
							marginRight: "6%",
							marginTop: 25
						} }
						ListHeaderComponent={
							<View style={{marginTop: 32}}>
								{ this.state.hostedStreams.length > 0 &&
								<View>
									<Text style={ styles.walletText }>
										My Content
									</Text>

									<FlatList
										showsVerticalScrollIndicator={ false }
										data={ this.state.hostedStreams }
										renderItem={ ({ item }) =>

												<StreamWalletCard streamInfo={ item } />
										}
									/>
								</View>
								}

								{ this.state.streams.length > 0 ?
									<Text style={ styles.walletText }>
										Recently Watched
									</Text> :
									<Text style={ [styles.titleText, {textAlign: 'center', width: '100%', marginTop: 64}]}>You have not watched any content</Text>
								}
							</View>
						}
						renderItem={ ({ item }) =>

								<StreamWalletCard streamInfo={ item } />
						}
					/>
					<UIFooter name={ this.props.name } institution={ this.props.institution }
					          navigation={ navigation } profileIsActive={ true } />
				</Container>
			);
		}
	}
}

const styles = StyleSheet.create({
	body: {
		backgroundColor: "#425c5a",
		height: "100%",
		width: "100%"
	},

	titleText: {
		fontSize: 25,
		color: "#8ea7a6",
		marginLeft: 15,
		fontWeight: "700",
		marginTop: 20,
		marginBottom: 24
	},

	header: {
		backgroundColor: "#425c5a"
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
