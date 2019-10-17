import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    SectionList,
    FlatList,
    View,
    RefreshControl,
    AsyncStorage
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import navOptions from '../styles/NavOptions';
import { Button, List, ListItem, Card } from 'react-native-elements';
import Colors from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        ...navOptions,
        title: 'Expiring Next'
    };

    state = {
        items: null
    };

    async componentWillMount() {
        const items = await this.loadItems();
        let parsedItems = JSON.parse(items);

        // Turn into array if not an array
        if (!Array.isArray(parsedItems)) {
            parsedItems = [parsedItems];
        }

        const c = parsedItems.slice(0, 3);
        // .sort(function(a, b) {
        //     const aa = new Date(a.expiryDate);
        //     const bb = new Date(b.expiryDate);
        //     return aa > bb ? 1 : 0;
        // })
        console.log(c);

        //Set items
        this.setState({ items: c });
    }

    loadItems = async () => {
        try {
            let items = await AsyncStorage.getItem('ITEMS');
            if (items === null) return [];
            return items;
        } catch (error) {
            console.log('Error loading items', error);
        }
    };

    handleRefresh = () => {
        console.warn('refreshing');
    };

    renderDate() {
        const date = new Date();
        const daysOfWeek = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];

        const month = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        const today =
            daysOfWeek[date.getDay()] +
            ' ' +
            date.getDate() +
            ' ' +
            month[date.getMonth()];
        return <Text style={styles.heading}>{today}</Text>;
    }

    renderNextItemExpiring() {
        if (!this.state.items) return null;
        return (
            <View>
                <Text style={styles.heading}>
                    Fenty Pro Filt'r Soft Matte Longwear Foundation
                </Text>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        padding: 10,
                        margin: 10
                    }}
                >
                    <View
                        style={{
                            flex: 1
                        }}
                    >
                        <Text style={styles.subtitle}>Expires in:</Text>
                        <Text style={styles.expiringText}>
                            X Days, X Months
                        </Text>
                    </View>
                    <Image
                        style={{
                            width: 150,
                            height: 150,
                            marginBottom: 10,
                            flex: 1,
                            borderRadius: 25,
                            borderColor: Colors.lightPink,
                            borderWidth: 2
                        }}
                        source={{
                            uri:
                                'https://www.sephora.com/productimages/sku/s2173714-main-zoom.jpg'
                        }}
                    />
                </View>
            </View>
        );
    }

    // TODO : get top 2nd-4th items expiring soon
    renderItemsExpiringSoon() {
        return (
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1
                }}
            >
                {this.renderNextItemExpiring()}
                <View>
                    <Text style={styles.headingBlock}>Upcoming</Text>
                </View>
                <View>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={this.handleRefresh}
                            />
                        }
                        data={this.state.items}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => {
                            const date = new Date(item.expiryDate);
                            const itemExpiryDate =
                                'Exp: ' +
                                date.getDate() +
                                '/' +
                                date.getMonth() +
                                '/' +
                                date.getFullYear();
                            return (
                                <ListItem
                                    leftAvatar={{
                                        source: {
                                            uri:
                                                'https://www.sephora.com/productimages/sku/s2156578-main-zoom.jpg'
                                        }
                                    }}
                                    title={item.name}
                                    subtitle={itemExpiryDate}
                                    bottomDivider={true}
                                    chevron={{
                                        size: 35,
                                        name: 'navigate-next',
                                        type: 'material'
                                    }}
                                />
                            );
                        }}
                    />
                </View>
            </ScrollView>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderItemsExpiringSoon()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: Colors.white
    },
    heading: {
        fontSize: 25,
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15
    },
    headingBlock: {
        color: Colors.white,
        fontSize: 22,
        padding: 5,
        paddingLeft: 15,
        backgroundColor: Colors.lightPink,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 2,
        textShadowOffset: { width: 1, height: 1 },
        textShadowColor: Colors.pink,
        textShadowRadius: 0.5
    },
    subtitle: {
        fontSize: 20
    },
    expiringText: {
        fontSize: 25,
        color: Colors.purple
    }
});
