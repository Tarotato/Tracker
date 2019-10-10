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
        header: null
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
                <LinearGradient
                    colors={[Colors.lightPink, Colors.pink, Colors.darkPink]}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        height: 300
                    }}
                />
                <Text style={styles.heading}>Expiring Next</Text>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignContent: 'center',
                        padding: 10,
                        margin: 10,
                        borderRadius: 25
                    }}
                >
                    <Image
                        style={{
                            width: 100,
                            height: 100,
                            marginTop: 15,
                            marginBottom: 10,
                            borderRadius: 50
                        }}
                        source={{
                            uri:
                                'https://www.sephora.com/productimages/sku/s2173714-main-zoom.jpg'
                        }}
                    />
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Text style={styles.subtitle}>Item name</Text>
                        <Text style={styles.subtitle}>X Days, X Months</Text>
                    </View>
                </View>
            </View>
        );
    }

    // TODO : get top 2nd-4th items expiring soon
    renderItemsExpiringSoon() {
        return (
            <ScrollView styles={styles.heading}>
                {this.renderNextItemExpiring()}
                <View>
                    <Text style={styles.headingBlock}>Upcoming</Text>
                </View>
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
                            />
                        );
                    }}
                />
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
        display: 'flex'
    },
    heading: {
        color: Colors.white,
        fontSize: 25,
        paddingTop: 50,
        paddingLeft: 20
    },
    headingBlock: {
        color: Colors.white,
        fontSize: 25,
        padding: 5,
        backgroundColor: Colors.darkPink,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 2
    },
    subtitle: {
        color: Colors.white,
        fontSize: 20,
        padding: 5
    }
});
