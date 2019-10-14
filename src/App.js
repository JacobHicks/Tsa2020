import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import InitialSignup from './screens/InitialSignup';
import TextConfirm from './screens/TextConfirm';

const MainNavigator = createStackNavigator({
        InitialSignup: {screen: InitialSignup},
        TextConfirm: {screen: TextConfirm},
        Home: {screen: HomeScreen},
        Profile: {screen: ProfileScreen},
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        },
    });

export default createAppContainer(MainNavigator);
