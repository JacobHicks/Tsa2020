import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import InitialSignup from './screens/InitialSignup';
import TextConfirm from './screens/TextConfirm';
import CreatePartyScreen from './screens/CreatePartyScreen';

import TestScreen from './screens/TestScreen';
import {fromBottom, fromLeft} from 'react-navigation-transitions';
import InstitutionList from './screens/InstitutionList';
import MVPProfileScreen from './screens/MVPProfileScreen';

function handleTransition({scenes}) {
    const previousScene = scenes[scenes.length - 2];
    const nextScene = scenes[scenes.length - 1];

    if (previousScene &&
        previousScene.route.routeName === 'Home' && (nextScene.route.routeName === 'CreateParty' || nextScene.route.routeName === 'Profile')) {
            return fromBottom();
    }
    return fromLeft();
}

const MainNavigator = createStackNavigator({
        Profile: {screen: MVPProfileScreen},
        InitialSignup: {screen: InitialSignup},
        InstitutionList: {screen: InstitutionList},
        Home: {screen: HomeScreen},
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
