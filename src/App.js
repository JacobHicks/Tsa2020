import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import InitialSignup from './screens/InitialSignup';
import TextConfirm from './screens/TextConfirm';
import CreateStream from './screens/CreateStream';

import {fadeIn, fromLeft, fromRight} from 'react-navigation-transitions';
import InstitutionList from './screens/InstitutionList';
import MVPProfileScreen from './screens/MVPProfileScreen';
import EntryScreen from './screens/EntryScreen';
import StreamCamera from "./screens/StreamCamera";

function handleTransition({scenes}) {
    const navScreens = ['Home', 'CreateStream', 'Profile'];

    const previousScene = scenes[scenes.length - 2];
    const nextScene = scenes[scenes.length - 1];

    if (previousScene && navScreens.indexOf(previousScene.route.routeName) !== -1 && navScreens.indexOf(nextScene.route.routeName) !== -1) {
        if (navScreens.indexOf(previousScene.route.routeName) > navScreens.indexOf(nextScene.route.routeName)) {
            return fromLeft();
        } else {
            return fromRight();
        }
    } else if (previousScene && previousScene.route.routeName === 'EntryScreen') {
        return fadeIn();
    }
}

const MainNavigator = createStackNavigator({
        EntryScreen: {screen: EntryScreen},
        Profile: {screen: MVPProfileScreen},
        InitialSignup: {screen: InitialSignup},
        InstitutionList: {screen: InstitutionList},
        Home: {screen: HomeScreen},
        TextConfirm: {screen: TextConfirm},
        CreateStream: {screen: CreateStream},
        StreamCamera: {screen: StreamCamera}
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        },
        transitionConfig: (nav) => handleTransition(nav),
    });

export default createAppContainer(MainNavigator);
