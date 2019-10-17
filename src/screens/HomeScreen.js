import React from "react";
import DoubleTap from "../components/MultiTap";
import PartyCard from "../components/PartyCard";
import FeaturedPartyCard from "../components/FeaturedPartyCard";
import SheetContent from "../components/SheetContent";
import Footer from "../components/UIFooter";
import Header from "../components/Header";
import { Spinner } from "native-base";
import { Text, View, StyleSheet, FlatList, SafeAreaView, RefreshControl } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
// todo import Toasts from native base

// import '@react-native-firebase/functions';
// import '@react-native-firebase/auth';


export default class HomeScreen extends React.Component {
	static navigationOptions = {
		title: "Home"
	};


	constructor(props) {
		super(props);
		this.state = {
			showSpinner: false,
			isRefreshingList: false,
			refreshing: false,
			dbg: "tst",
			sheetTitle: "Sheet Title",
			sheetHost: "Sheet Host",
			sheetDescription: "Sheet Description",
			parties: [
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
					title: "Testing Party",
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
				},
				{
					key: "4",
					title: "Testing 4",
					host: "Ethan",
					description: "Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah ",
					date: new Date(),
					imageURL: "https://marvel-live.freetls.fastly.net/canvas/2019/10/399f689db39646b990a80bb3ce21cd54?quality=95&fake=.png"
				},
				{
					key: "5",
					title: "Testing 5",
					host: "Jacob",
					description: "Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah ",
					date: new Date(),
					imageURL: "https://marvel-live.freetls.fastly.net/canvas/2019/10/399f689db39646b990a80bb3ce21cd54?quality=95&fake=.png"
				}
			],
			featuredParties: [
				{
					key: "1",
					title: "Testing Party ",
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

	getNewPartyList() {
		// todo make call to database
		let parties = this.state.parties;
		parties.push({
			key: Math.random(),
			title: "PUSHED PARTY",
			host: "NEW",
			description: "Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah ",
			date: new Date()
		});
		this.setState({
			parties: parties
		});
	}

	getFeaturedPartyList() {
		// todo make call to database here
		let featuredParties = [];
		this.setState({
			featuredParties: featuredParties
		})
	}

	componentDidMount() {
		this.getNewPartyList();
		// this.getFeaturedPartyList();
	}

	reachedEndOfList() {
		this.setState({ dbg: "endOfList" });
		this.setState({ showSpinner: true, isRefreshingList: true });
		setTimeout(() => {
			this.getNewPartyList();
			this.setState({ showSpinner: false, isRefreshingList: false });
		}, 2500)
	}

	showPartySheet(party) {
		this.setState({
			sheetTitle: party.title,
			sheetHost: party.host,
			sheetDescription: party.description
		});
		this.RBSheet.open();
	}

	enrollInParty(key) {
		this.setState({ dbg: key })
	}

	onRefresh() {
		this.setState({ refreshing: false });
		return (
			<Text>test</Text>
		)
	}


	// todo change text color of statusbar

	// todo https://facebook.github.io/react-native/docs/refreshcontrol

	// todo make scrolling of featured paginated(?), when user scrolls it'll auto scroll to be in view
	// todo loading icon before images are loaded
	render() {
		const { navigate } = this.props;
		// navigation.navigate("TextConfirm");
		return (
			<SafeAreaView style={ styles.body }>
				<Header collegeName="UCLA" />
				<View style={ styles.container }>
					<FlatList
						onEndReachedThreshold={ 0 }
						onEndReached={ () => { this.reachedEndOfList()} }
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
								<FlatList
									showsHorizontalScrollIndicator={ false }
									horizontal={ true }
									style={ styles.trendingContainer }
									data={ this.state.featuredParties }
									renderItem={ ({ item }) =>
										<DoubleTap onDoublePress={ () => this.enrollInParty(item.key) }
										           onPress={ () => this.showPartySheet(item.key) }>
											<View>
												<FeaturedPartyCard title={ item.title } date={ item.date }
												                   time={ item.time }
												                   host={ item.host } imageURL={ item.imageURL } />
											</View>
										</DoubleTap> }
								/>
								<Text style={ styles.titleText }>All Parties</Text>
							</View> }
						ListFooterComponent={ this.state.showSpinner ? <Spinner color={ "white" } /> : <View></View> }
						data={ this.state.parties }
						renderItem={ ({ item }) =>
							<DoubleTap onDoublePress={ () => this.enrollInParty(item.key) }
							           onPress={ () => this.showPartySheet(item) }>
								<View>
									<PartyCard title={ item.title } date={ item.date } time={ item.time }
									           host={ item.host } imageURL={ item.imageURL } />
								</View>
							</DoubleTap> }
					/>
				</View>
				<RBSheet
					ref={ ref => {
						this.RBSheet = ref;
					} }
					height={ 650 }
					duration={ 250 }
					closeOnDragDown={ true }
					customStyles={ {
						container: {
							borderRadius: 6.67
						},
						draggableIcon: {
							borderColor: "#333"
						}
					} }
				>
					<SheetContent title={ this.state.sheetTitle } host={ this.state.sheetHost }
					              description={ this.state.sheetDescription } />
				</RBSheet>
				<Footer homeIsActive={ true } />
				<Text style={ { color: "#FFF" } }>{ this.state.dbg }</Text>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	body: {
		backgroundColor: "#000"
	},
	container: {
		maxHeight: 720 // todo get device height - height of bottom navigation
	},
	trendingContainer: {
		maxHeight: 175,
		marginBottom: 25
	},
	titleText: {
		fontSize: 25,
		color: "#FFFFFF",
		marginLeft: 15,
		fontWeight: "700"
	},


	// debug
	testing: {
		minHeight: 100
	}
});
