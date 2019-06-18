import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import navOptions from '../styles/NavOptions';

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        ...navOptions,
        title: 'Settings'
    };

    render() {
        /* Go ahead and delete ExpoConfigView and replace it with your
         * content, we just wanted to give you a quick view of your config */
        return <ExpoConfigView />;
    }
}
