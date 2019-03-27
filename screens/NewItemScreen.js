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
import Colors from '../constants/Colors';

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
        const { name, purchaseDate, expiryDate } = this.state;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.name}>
                    <Text>Name:</Text>
                    <TextInput
                        style={styles.nameTextInput}
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
                    editable={false}
                />
                <Button
                    onPress={() => this.openDatePicker(fieldName)}
                    title="Choose Date"
                    color={Colors.primaryColor}
                />
            </View>
        );
    }

    async openDatePicker(fieldName) {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: new Date()
            });
            // if (action !== DatePickerAndroid.dismissedAction) {
            //     // Selected year, month (0-11), day
            //     this.setState({ [fieldName]: `${day}/${month}/${year} ` });
            // }
            if (action === DatePickerAndroid.dateSetAction) {
                // Selected year, month (0-11), day
                this.setState({ [fieldName]: `${day}/${month}/${year} ` });
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
    nameTextInput: {
        minWidth: width * 0.7,
        maxWidth: width * 0.7,
        marginLeft: 5,
        paddingLeft: 10,
        paddingBottom: 5
    },
    date: {
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textInput: {
        minWidth: width * 0.3,
        marginLeft: 5,
        paddingLeft: 10,
        paddingBottom: 5
    }
});
