import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    RefreshControl,
    FlatList,
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native';
import {Spinner, Text} from 'native-base';
import ElevatedDisplay from '../components/ElevatedDisplay';
import FloatingButton from '../components/FloatingButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import DoubleTap from '../components/MultiTap';
import FeaturedPartyCard from '../components/FeaturedPartyCard';
import PartyCard from '../components/PartyCard';
import PartyWalletCard from '../components/PartyWalletCard';
import Footer from '../components/UIFooter';
import {Container} from 'native-base';
import SheetContent from '../components/SheetContent';
import RBSheet from 'react-native-raw-bottom-sheet';

const db = firestore();

export default class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            user: null,
            parties: [],
        };
        this.openSheet = this.openSheet.bind(this);
    }

    getParties() {
        return [
            {
                key: '1',
                name: 'Beta Chad Kappa',
                date: 'Oct 8th',
                details: 'Whom is Joe',
            },

            {
                key: '2',
                name: 'Party at Scoob House',
                date: 'Oct 26th',
                details: 'Whom is Joe',
            },
        ];
    }

    componentDidMount() {
        //const user = auth().currentUser;
        /*
        const phoneNumber = user.phoneNumber;
        db.collection("users-schools")
            .doc(phoneNumber)
            .get()
            .then(DocumentSnapshot => {
                this.setState({
                    user: DocumentSnapshot.data()
                });
            });

         */
        this.setState({
            isLoading: false,
            parties: this.getParties(),
        });
    }

    render() {
        if (this.state.isLoading) {
            return null;
            //TODO: load screen
        } else {
            const {navigation} = this.props;
            return (
                <Container style={{backgroundColor: '#000'}}>
                    <TouchableWithoutFeedback onPress={() => {
                        navigation.navigate('Home');
                    }}>
                        <Icon name='arrow-back' size={43} color='#FFF' style={{marginLeft: 8, marginTop: 8}}/>
                    </TouchableWithoutFeedback>
                    <ScrollView>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={this.state.parties}
                            style={{
                                marginLeft: '10%',
                                marginRight: '10%',
                            }}
                            ListHeaderComponent={
                                <View>
                                    <View style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}>
                                        <Image source={require('../../assets/images/chad.jpg')} style={Styles.image}/>

                                        <Text style={Styles.nameText}>
                                            Joe Mama
                                        </Text>

                                        <Text style={Styles.schoolText}>
                                            University of Waterloo
                                        </Text>
                                    </View>

                                    <Text style={Styles.walletText}>
                                        Party Wallet
                                    </Text>
                                </View>
                            }
                            renderItem={({item}) =>
                                <View>
                                    <PartyWalletCard title={item.name} date={item.date}
                                                     onDetails={() => {
                                                         this.setState({
                                                             sheetTitle: item.name,
                                                             sheetDescription: item.details,
                                                         }, this.openSheet);
                                                     }}/>
                                </View>
                            }
                        />
                    </ScrollView>

                    <RBSheet
                        ref={ref => {
                            this.RBSheet = ref;
                        }}
                        height={Dimensions.get('window').height * .70}
                        duration={250}
                        closeOnDragDown={true}
                        customStyles={{
                            container: {
                                borderTopLeftRadius: 12,
                                borderTopRightRadius: 12,
                            },
                            draggableIcon: {
                                borderColor: '#333',
                            },
                        }}
                    >
                        <SheetContent name={this.state.sheetTitle} description={this.state.sheetDescription} registered={true}/>
                    </RBSheet>
                </Container>
            );
        }
    }

    openSheet = (() => {
        this.RBSheet.open();
    });
}

const Styles = StyleSheet.create({
    image: {
        borderRadius: 100,
        alignItems: 'center',
        width: Dimensions.get('window').width * .32,
        height: Dimensions.get('window').width * .32,
        marginTop: 55,
        marginBottom: 25,
    },

    walletText: {
        color: '#FFF',
        fontFamily: 'Glacial Indifference',
        fontSize: Dimensions.get('window').width * .07,
        fontWeight: '700',
        marginBottom: 16,
    },

    nameText: {
        color: '#FFF',
        fontFamily: 'Glacial Indifference',
        fontSize: Dimensions.get('window').width * .07,
        fontWeight: '700',
        marginBottom: 5,
    },

    schoolText: {
        color: '#FFF',
        fontFamily: 'Glacial Indifference',
        fontSize: Dimensions.get('window').width * .04,
        fontWeight: '700',
        marginBottom: 44,
    },

});
