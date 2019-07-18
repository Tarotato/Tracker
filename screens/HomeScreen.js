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

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        ...navOptions,
        title: 'Home'
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

    handleRefresh = () => {
        console.warn('refreshing');
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                >
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
                                                'https://data.whicdn.com/images/211488621/large.jpg'
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
            </View>
        );
    }
}

const styles = StyleSheet.create({});
