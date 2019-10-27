import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MVPProfileScreen from './screens/MVPProfileScreen';
import HomeScreen from './screens/HomeScreen';
import InitialSignup from './screens/InitialSignup';
import TextConfirm from './screens/TextConfirm';
import CreatePartyScreen from './screens/CreatePartyScreen';

import TestScreen from './screens/TestScreen';
import {fromLeft, fromRight} from 'react-navigation-transitions';

function handleTransition({scenes}) {
    const previousScene = scenes[scenes.length - 2];
    const nextScene = scenes[scenes.length - 1];

    if (previousScene &&
        previousScene.route.routeName === 'Home' && (nextScene.route.routeName === 'CreateParty' || nextScene.route.routeName === 'Profile')) {
            return fromRight();
    }
    return fromLeft();
}

const MainNavigator = createStackNavigator({
        Home: {screen: MVPProfileScreen},
        Profile: {screen: MVPProfileScreen},
        InitialSignup: {screen: InitialSignup},
        TextConfirm: {screen: TextConfirm},
        CreateParty: {screen: CreatePartyScreen},
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        },
        transitionConfig: (nav) => handleTransition(nav),
    });

export default createAppContainer(MainNavigator);
