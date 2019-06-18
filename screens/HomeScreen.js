import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    SectionList,
    View,
    RefreshControl,
    AsyncStorage
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import navOptions from '../styles/NavOptions';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        ...navOptions,
        title: 'Home'
    };

    state = {
        set: null
    };

    handleRefresh = () => {
        console.warn('refreshing');
    };

    async componentDidMount() {
        const initialState = await this.loadSettings();
    }

    loadSettings = async () => {
        try {
            let settings = await AsyncStorage.getItem('SETTINGS');

            if (settings === null) {
                console.warn('NOPE');
                return;
            }

            // console.warn(settings);
            //   return JSON.parse(settings);
        } catch (error) {
            console.log('Error loading settings', error);
        }
    };

    handleRefresh = () => {
        console.warn('refreshing');
    };

    render() {
        const a = this.state.set;
        return (
            <View style={styles.container}>
                <Text>Expiring Next</Text>
                <Text>Total Items</Text>
                <Text>Expired Items</Text>
                <Text>Discarded Items</Text>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                >
                    <SectionList
                        renderItem={({ item, index, section }) => (
                            <Text key={index}>{item}</Text>
                        )}
                        renderSectionHeader={({ section: { title } }) => (
                            <Text style={{ fontWeight: 'bold' }}>{title}</Text>
                        )}
                        sections={[
                            { title: 'Title1', data: ['item1', 'item2'] },
                            { title: 'Title2', data: ['item3', 'item4'] },
                            { title: 'Title3', data: ['item5', 'item6'] }
                        ]}
                        keyExtractor={(item, index) => item + index}
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={this.handleRefresh}
                            />
                        }
                    />

                    {/* <View style={styles.welcomeContainer}>
                        <Image
                            source={
                                __DEV__
                                    ? require('../assets/images/robot-dev.png')
                                    : require('../assets/images/robot-prod.png')
                            }
                            style={styles.welcomeImage}
                        />
                    </View>

                    <View style={styles.getStartedContainer}>
                        {this._maybeRenderDevelopmentModeWarning()}

                        <Text style={styles.getStartedText}>
                            Get started by opening
                        </Text>

                        <View
                            style={[
                                styles.codeHighlightContainer,
                                styles.homeScreenFilename
                            ]}
                        >
                            <MonoText style={styles.codeHighlightText}>
                                screens/HomeScreen.js
                            </MonoText>
                        </View>

                        <Text style={styles.getStartedText}>LOL</Text>
                    </View>

                    <View style={styles.helpContainer}>
                        <TouchableOpacity
                            onPress={this._handleHelpPress}
                            style={styles.helpLink}
                        >
                            <Text style={styles.helpLinkText}>
                                Help, it didn’t automatically reload!
                            </Text>
                        </TouchableOpacity>
                    </View> */}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({});
