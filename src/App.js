import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import InitialSignup from './screens/InitialSignup';
import TextConfirm from './screens/TextConfirm';
import CreatePartyScreen from "./screens/CreatePartyScreen";
import TestScreen from "./screens/TestScreen";

const MainNavigator = createStackNavigator({
        Home: {screen: HomeScreen},
        InitialSignup: {screen: InitialSignup},
        TextConfirm: {screen: TextConfirm},
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
