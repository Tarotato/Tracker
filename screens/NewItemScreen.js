import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Dimensions,
    DatePickerAndroid,
    Button
} from 'react-native';

import navOptions from '../styles/NavOptions';

export default class NewItemScreen extends React.Component {
    static navigationOptions = {
        ...navOptions,
        title: 'New Item'
    };

    state = {
        name: '',
        purchaseDate: '',
        expiryDate: ''
    };

    render() {
        const { name, purchaseDate, expiryDate } = this.props;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.name}>
                    <Text>Name:</Text>
                    <TextInput
                        style={styles.textInput}
                        multiline={true}
                        value={name}
                        onChangeText={name => this.setState({ name })}
                    />
                </View>
                {this.renderDateInput(
                    'Purchase Date',
                    purchaseDate,
                    'purchaseDate'
                )}
                {this.renderDateInput('Expiry Date', expiryDate, 'expiryDate')}
            </ScrollView>
        );
    }

    renderDateInput(label, value, fieldName) {
        return (
            <View style={styles.date}>
                <Text>{label}:</Text>
                <TextInput
                    style={styles.textInput}
                    value={value}
                    onChangeText={text =>
                        this.setState({ fieldName: { text } })
                    }
                />
                <Button
                    onPress={() => this.openDatePicker()}
                    title="Learn More"
                />
            </View>
        );
    }

    openDatePicker() {
        try {
            const { action, year, month, day } = DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: new Date(2020, 4, 25)
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff'
    },
    name: {
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    date: {
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textInput: {
        width: width * 0.5,
        marginLeft: 5,
        paddingLeft: 10,
        paddingBottom: 5
    }
});
