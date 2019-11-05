import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation';

import Colors from '../constants/Colors';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AllItemsScreen from '../screens/AllItemsScreen';
import NewItemScreen from '../screens/NewItemScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { colors } from 'react-native-elements';

const HomeStack = createStackNavigator({
    Home: HomeScreen
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-home${focused ? '' : '-outline'}`
                    : 'md-home'
            }
        />
    )
};

const AllItemsStack = createStackNavigator({
    AllItems: AllItemsScreen
});

AllItemsStack.navigationOptions = {
    tabBarLabel: 'All Items',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-list${focused ? '' : '-outline'}`
                    : 'md-list'
            }
        />
    )
};

const NewItemStack = createStackNavigator({
    NewItem: NewItemScreen
});

NewItemStack.navigationOptions = {
    tabBarLabel: 'New Item',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-add${focused ? '' : '-outline'}`
                    : 'md-add'
            }
        />
    )
};

const SettingsStack = createStackNavigator({
    Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-options${focused ? '' : '-outline'}`
                    : 'md-options'
            }
        />
    )
};

export default createBottomTabNavigator(
    {
        HomeStack,
        AllItemsStack,
        NewItemStack
        // SettingsStack
    },
    {
        tabBarOptions: {
            activeTintColor: Colors.darkPink,
            inactiveTintColor: Colors.lightPink,
            labelStyle: {
                fontSize: 12,
                fontFamily: 'font'
            },
            style: {
                backgroundColor: Colors.white,
                paddingTop: 10,
                paddingBottom: 5
            }
        }
    }
);
