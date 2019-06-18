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
import ExpiredScreen from '../screens/ExpiredScreen';
import NewItemScreen from '../screens/NewItemScreen';
import SettingsScreen from '../screens/SettingsScreen';

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
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-home'
            }
        />
    )
};

const ExpiredStack = createStackNavigator({
    Expired: ExpiredScreen
});

ExpiredStack.navigationOptions = {
    tabBarLabel: 'All Items',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-link${focused ? '' : '-outline'}`
                    : 'md-close-circle'
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
                    ? `ios-link${focused ? '' : '-outline'}`
                    : 'md-add-circle'
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
        ExpiredStack,
        NewItemStack,
        SettingsStack
    },
    {
        tabBarOptions: {
            activeTintColor: '#fff',
            inactiveTintColor: '#99a2ff',
            labelStyle: {
                fontSize: 12
            },
            style: {
                backgroundColor: Colors.primaryColor,
                paddingTop: 5
            }
        }
    }
);
