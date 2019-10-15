import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import InitialSignup from './screens/InitialSignup';
import TextConfirm from './screens/TextConfirm';
import CreatePartyScreen from "./screens/CreatePartyScreen";

const MainNavigator = createStackNavigator({
        InitialSignup: {screen: HomeScreen},
        TextConfirm: {screen: TextConfirm},
        Home: {screen: HomeScreen},
        Profile: {screen: ProfileScreen},
        CreateParty: {screen: CreatePartyScreen}
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        },
    });

export default createAppContainer(MainNavigator);
