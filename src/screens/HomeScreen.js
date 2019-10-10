import React from 'react';
import DoubleTap from '../components/DoubleTap';
import PartyCard from '../components/PartyCard';
import { Text, View, StyleSheet, FlatList, StatusBar } from 'react-native';

export default class HomeScreen extends React.Component {
	static navigationOptions = {
		title: 'Home',
	};

	constructor(props) {
		super(props);
		this.state = {
			dbg: 'tst',
		};
	}

	// todo make web request to api to join party

	// todo https://facebook.github.io/react-native/docs/refreshcontrol

	// todo make featured tab scroll away, not fixed
	// todo make scrolling of featured paginated(?), when user scrolls it'll auto scroll to be in view
	render() {

		const { navigate } = this.props.navigation;
		return (
			<View style={ styles.body }>
				<View style={ styles.header }>
					<Text>UCLA</Text>
				</View>
				<View style={ styles.container }>
					<Text style={ styles.headerText }>Trending</Text>
					<FlatList
						showsHorizontalScrollIndicator={ false }
						horizontal={ true }
						style={ styles.trendingContainer }
						data={ [
							{ key: 'Stupid' },
							{ key: 'Bitch' },
							{ key: 'Boy' },
						] }
						renderItem={ ({ item }) =>
							<DoubleTap onPress={ () => this.setState({ dbg: item.key }) }>
								<View>
									<PartyCard title={ item.key } date="8" time="5PM" host="bruh" />
								</View>
							</DoubleTap> }
					/>
					<Text style={ styles.headerText }>All Parties</Text>
					<FlatList
						showsVerticalScrollIndicator={ false }
						data={ [
							{ key: 'Ethan' },
							{ key: 'Richard' },
							{ key: 'Diego' },
							{ key: 'Azhan' },
							{ key: 'Jacob' },
						] }
						renderItem={ ({ item }) =>
							<DoubleTap onPress={ () => this.setState({ dbg: item.key }) }>
								<View>
									<PartyCard title={ item.key } date="8" time="5PM" host="bruh" />
								</View>
							</DoubleTap> }
					/>
					<Text>{ this.state.dbg }</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	body: {},
	header: {
		backgroundColor: 'red',
		paddingLeft: 10,
		paddingTop: 50, // todo dynamically get statusbar height
	},
	container: {
		padding: 7,
		maxHeight: 750, // todo get device height - height of bottom navigation
	},
	trendingContainer: {
		maxHeight: 175,
		marginBottom: 25,
	},
	headerText: {
		fontSize: 25,
	},
});
