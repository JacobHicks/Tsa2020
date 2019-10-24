import React from "react";
import DoubleTap from "../components/MultiTap";
import PartyCard from "../components/PartyCard";
import FeaturedPartyCard from "../components/FeaturedPartyCard";
import SheetContent from "../components/SheetContent";
import Footer from "../components/UIFooter";
import Header from "../components/Header";
import { Spinner, Container } from "native-base";
import { Text, View, StyleSheet, FlatList, RefreshControl, Dimensions } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
// todo import Toasts from native base
import firestore from "@react-native-firebase/firestore";
import Carousel from "react-native-snap-carousel";

const db = firestore();


export default class HomeScreen extends React.Component {
	static navigationOptions = {
		title: "Home"
	};


	constructor(props) {
		super(props);
		this.enrollInParty = this.enrollInParty.bind(this)
		this.state = {
			showSpinner: false,
			isRefreshingList: false,
			refreshing: false,
			dbg: "tst",
			sheetTitle: "Sheet Title",
			sheetHost: "Sheet Host",
			sheetDescription: "Sheet Description",
			// parties: [
			// 	{
			// 		key: '1',
			// 		title: 'Testing Party',
			// 		host: 'Diego',
			// 		description: 'Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah ',
			// 		date: new Date(),
			// 		imageURL: 'https://marvel-live.freetls.fastly.net/canvas/2019/10/399f689db39646b990a80bb3ce21cd54?quality=95&fake=.png',
			// 	},
			// 	{
			// 		key: '2',
			// 		title: 'Testing Party',
			// 		host: 'Richard',
			// 		description: 'desc',
			// 		date: new Date(),
			// 		imageURL: 'https://marvel-live.freetls.fastly.net/canvas/2019/10/399f689db39646b990a80bb3ce21cd54?quality=95&fake=.png',
			// 	},
			// 	{
			// 		key: '3',
			// 		title: 'Testing 3',
			// 		host: 'Azhan',
			// 		description: 'Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah ',
			// 		date: new Date(),
			// 		imageURL: 'https://marvel-live.freetls.fastly.net/canvas/2019/10/399f689db39646b990a80bb3ce21cd54?quality=95&fake=.png',
			// 	},
			// 	{
			// 		key: '4',
			// 		title: 'Testing 4',
			// 		host: 'Ethan',
			// 		description: 'Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah ',
			// 		date: new Date(),
			// 		imageURL: 'https://marvel-live.freetls.fastly.net/canvas/2019/10/399f689db39646b990a80bb3ce21cd54?quality=95&fake=.png',
			// 	},
			// 	{
			// 		key: '5',
			// 		title: 'Testing 5',
			// 		host: 'Jacob',
			// 		description: 'Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah ',
			// 		date: new Date(),
			// 		imageURL: 'https://marvel-live.freetls.fastly.net/canvas/2019/10/399f689db39646b990a80bb3ce21cd54?quality=95&fake=.png',
			// 	},
			// ],
			featuredParties: [
				{
					key: "1",
					title: "Testing Party",
					host: "Diego",
					description: "Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah ",
					date: new Date(),
					imageURL: "https://marvel-live.freetls.fastly.net/canvas/2019/10/399f689db39646b990a80bb3ce21cd54?quality=95&fake=.png"
				},
				{
					key: "2",
					title: "Testing Party 2",
					host: "Richard",
					description: "desc",
					date: new Date(),
					imageURL: "https://marvel-live.freetls.fastly.net/canvas/2019/10/399f689db39646b990a80bb3ce21cd54?quality=95&fake=.png"
				},
				{
					key: "3",
					title: "Testing 3",
					host: "Azhan",
					description: "Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah ",
					date: new Date(),
					imageURL: "https://marvel-live.freetls.fastly.net/canvas/2019/10/399f689db39646b990a80bb3ce21cd54?quality=95&fake=.png"
				}
			]
		};
	}

	getPartyList() {
		// todo make relative to school user is in
		const timeSettings = {
			month: "short",
			day: "2-digit",
			hour: "numeric",
			minute: "numeric"
		};

		db.collection("schoolData/ucla/parties")
			.get()
			.then(QuerySnapshot => {
				let parties = [];
				QuerySnapshot.docs
					.forEach(doc => {
						const rawParty = doc.data();
						const formattedParty = {
							key: Math.random().toString(), // todo fix
							title: rawParty.title,
							// host: rawParty.host,
							description: rawParty.description,
							// fee: rawParty.fee,
							time: rawParty.time.toDate(),
							shortLocation: rawParty.shortLocation,
							attendees: rawParty.attendees
						};
						parties.push(formattedParty);
					});
				this.setState({
					parties: parties
				});
			});
	}

	getFeaturedPartyList() {
		// todo make call to database here
		let featuredParties = [];
		this.setState({
			featuredParties: featuredParties
		});
	}

	componentDidMount() {
		this.getPartyList();
		// this.getFeaturedPartyList();
	}

	reachedEndOfList() {
		this.setState({ dbg: "endOfList" });
		this.setState({ showSpinner: true, isRefreshingList: true });
		// this.getPartyList(
		// 	// 	() => {
		// 	// 	this.setState({ showSpinner: false, isRefreshingList: false });
		// 	// }
		// );
	}

	showPartySheet(party) {
		this.setState({
			sheetTitle: party.title,
			sheetHost: party.host,
			sheetDescription: party.description
		});
		this.RBSheet.open();
	}

	enrollInParty() {

		this.setState({ dbg: "enrolled" });
		const userRef = db.collection("schoolData").doc("ucla").collection("users").doc("user");
		const partyRef = db.collection("schoolData").doc("ucla").collection("parties").doc("party");
		const newUser = firestore.FieldValue.arrayUnion("user"); // todo create references for other docs
		const newParty = firestore.FieldValue.arrayUnion("party");
		userRef.update({ partiesList: newParty });
		partyRef.update({ userList: newUser });
	}

	onRefresh() {
		this.setState({ refreshing: false });
		return (
			<Text>test</Text>
		);
	}


	// todo https://facebook.github.io/react-native/docs/refreshcontrol

	// todo make scrolling of featured paginated(?), when user scrolls it'll auto scroll to be in view
	// todo loading icon before images are loaded
	render() {
		const { navigate } = this.props;
		// navigation.navigate("TextConfirm");
		return (
			<Container style={ styles.body }>
				<Header collegeName="UCLA" />
				<FlatList
					onEndReachedThreshold={ 10 }
					onEndReached={ () => {
						this.reachedEndOfList();
					} }
					showsVerticalScrollIndicator={ false }
					refreshControl={
						<RefreshControl
							refreshing={ false }
							onRefresh={ this.onRefresh.bind(this) }
						/>
					}

					listEmptyContent={ <Spinner color={ "white" } /> }
					ListHeaderComponent={
						<View>
							<Text style={ styles.titleText }>Trending</Text>
							{/*<FlatList*/ }
							{/*	showsHorizontalScrollIndicator={ false }*/ }
							{/*	horizontal={ true }*/ }
							{/*	style={ styles.trendingContainer }*/ }
							{/*	data={ this.state.featuredParties }*/ }
							{/*	renderItem={ ({ item }) =>*/ }
							{/*		<DoubleTap onDoublePress={ () => this.enrollInParty(item.key) }*/ }
							{/*		           onPress={ () => this.showPartySheet(item.key) }>*/ }
							{/*			<View>*/ }
							{/*				<FeaturedPartyCard title={ item.title } date={ item.date }*/ }
							{/*				                   time={ item.time }*/ }
							{/*				                   host={ item.host } imageURL={ item.imageURL } />*/ }
							{/*			</View>*/ }
							{/*		</DoubleTap> }*/ }
							{/*/>*/ }
							<Carousel
								ref={ (c) => { this._carousel = c; } }
								data={ this.state.featuredParties }
								sliderWidth={ Dimensions.get("window").width + 130 }
								itemWidth={ 220 }
								containerCustomStyle={ { left: -147 } }
								loop={ true }
								enableMomentum={ true }
								enableSnap={ true }
								renderItem={ (item, index) => {
									return (
										<DoubleTap onDoublePress={ () => this.enrollInParty(item.key) }
										           onPress={ () => this.showPartySheet(item.key) }>
											<View>
												<FeaturedPartyCard />
											</View>
										</DoubleTap>
									)
								} }
							/>
							<Text style={ styles.titleText }>All Parties</Text>
						</View> }
					ListFooterComponent={ this.state.showSpinner ? <Spinner color={ "white" } /> : <View></View> }
					data={ this.state.parties }
					renderItem={ ({ item }) =>
						<DoubleTap onDoublePress={ () => this.enrollInParty(item.key) }
						           onPress={ () => this.showPartySheet(item) }>
							<View>
								<PartyCard
									title={ item.title }
									time={ item.time } shortLocation={ item.shortLocation }
									attendees={ item.attendees } joinParty={ this.enrollInParty } />
							</View>
						</DoubleTap> }
				/>
				<RBSheet
					joinParty={ this.enrollInParty }
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
					<SheetContent name={ this.state.sheetTitle } description={ this.state.sheetDescription } />
				</RBSheet>
				<Text style={ { color: "#FFF" } }>{ this.state.dbg }</Text>
				<Footer style={ styles.bodyFooter } />
			</Container>
		);
	}
}

const styles = StyleSheet.create({ // todo fix spacing between titles and content
	body: {
		backgroundColor: "#000",
		height: "100%"
	},
	trendingContainer: {
		maxHeight: 175
	},
	titleText: {
		fontSize: 25,
		color: "#FFFFFF",
		marginLeft: 15,
		fontWeight: "700",
		marginTop: 20,
		// marginBottom: -7
	},
	bodyFooter: {
		position: "relative",
		bottom: 0,
		top: "auto"
	},

	// debug
	testing: {
		minHeight: 100
	}
});
