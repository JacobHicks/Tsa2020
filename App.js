import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ProfileScreen from './src/screens/ProfileScreen';
import HomeScreen from './src/screens/HomeScreen';
import InitialSignup from './src/screens/InitialSignup';

const MainNavigator = createStackNavigator({
        InitialSignup: {screen: InitialSignup},
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
