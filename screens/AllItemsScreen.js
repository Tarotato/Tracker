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
import { orderBy } from 'lodash';

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

export default class AllItemsScreen extends React.Component {
    static navigationOptions = {
        ...navOptions,
        title: 'All Items'
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

        parsedItems = orderBy(parsedItems, i => {
            return new Date(i.date);
        }).reverse();

        //Set items
        this.setState({ items: parsedItems });
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

    render() {
        return (
            <View>
                <ScrollView>
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
                                    titleStyle={{
                                        fontFamily: 'font'
                                    }}
                                    subtitleStyle={{
                                        fontFamily: 'font'
                                    }}
                                    leftAvatar={{
                                        source: {
                                            uri:
                                                'https://data.whicdn.com/images/211488621/large.jpg'
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
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({});
