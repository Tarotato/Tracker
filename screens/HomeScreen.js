import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    FlatList,
    View,
    AsyncStorage
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import navOptions from '../styles/NavOptions';
import { Button, List, ListItem, Card } from 'react-native-elements';
import Colors from '../constants/Colors';

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

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        ...navOptions,
        title: 'Expiring Next'
    };

    state = {
        items: null,
        latestItem: null
    };

    async componentWillMount() {
        const items = await this.loadItems();
        const now = new Date();
        let parsedItems = JSON.parse(items);

        // Turn into array if not an array
        if (!Array.isArray(parsedItems)) {
            parsedItems = [parsedItems];
        }

        // TODO: Check length of items
        const latest = parsedItems.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        })[parsedItems.length - 1];

        // Get only the next 3 items excluding the next item expiring past this date
        parsedItems = parsedItems
            .sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            })
            .filter(item => new Date(item.date) > now)
            .slice(1, 4);

        //Set items
        this.setState({ items: parsedItems });
        this.setState({ latestItem: latest });
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

    renderNextItemExpiring() {
        const latest = this.state.latestItem;
        if (!latest) return null;
        const date = new Date(latest.expiryDate);
        return (
            <View>
                <Text style={styles.heading}>
                    Fenty Pro Filt'r Soft Matte Longwear Foundation
                    {latest.name}
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
                        <Text style={styles.subtitle}>Expires on:</Text>
                        <Text style={styles.expiringText}>
                            {daysOfWeek[date.getDay()] +
                                ' ' +
                                date.getDay() +
                                ' ' +
                                month[date.getMonth()] +
                                ' ' +
                                date.getFullYear()}
                        </Text>
                    </View>
                    <Image
                        style={styles.image}
                        source={{
                            uri:
                                'https://www.sephora.com/productimages/sku/s2173714-main-zoom.jpg'
                        }}
                    />
                </View>
            </View>
        );
    }

    renderListItem(item) {
        const date = new Date(item.expiryDate);
        const itemExpiryDate =
            'Use by: ' +
            daysOfWeek[date.getDay()] +
            ' ' +
            date.getDay() +
            ' ' +
            month[date.getMonth()] +
            ' ' +
            date.getFullYear();
        return (
            <ListItem
                leftAvatar={{
                    source: {
                        uri:
                            'https://www.sephora.com/productimages/sku/s2156578-main-zoom.jpg'
                    }
                }}
                title={
                    item.name +
                    "Fenty Pro Filt'r Soft Matte Longwear Foundation"
                }
                subtitle={itemExpiryDate}
                bottomDivider={true}
                chevron={{
                    size: 35,
                    name: 'navigate-next',
                    type: 'material'
                }}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView styles={{ display: 'flex' }}>
                    {this.renderNextItemExpiring()}
                    <View>
                        <Text style={styles.headingBlock}>Upcoming</Text>
                    </View>
                    {this.state.items && this.state.items.length > 0 ? (
                        <FlatList
                            data={this.state.items}
                            keyExtractor={(item, index) => item + index}
                            renderItem={item => {
                                this.renderListItem(item);
                            }}
                        />
                    ) : (
                        <Text style={styles.upcomingText}>
                            No more upcoming
                        </Text>
                    )}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: Colors.white,
        height: '100%'
    },
    expiringText: {
        fontSize: 25,
        color: Colors.purple,
        fontFamily: 'font'
    },
    heading: {
        fontSize: 25,
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        fontFamily: 'font'
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
        textShadowRadius: 0.5,
        fontFamily: 'font'
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 10,
        flex: 1,
        borderRadius: 25,
        borderColor: Colors.lightPink,
        borderWidth: 2
    },
    subtitle: {
        fontSize: 20,
        fontFamily: 'font'
    },
    upcomingText: {
        textAlign: 'center',
        color: Colors.grey,
        paddingTop: 20,
        paddingBottom: 20,
        fontFamily: 'font'
    }
});
