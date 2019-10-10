import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Dimensions,
    DatePickerAndroid,
    Button,
    ToastAndroid,
    AsyncStorage
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

    saveNewItem = async () => {
        const { name, purchaseDate, expiryDate } = this.state;
        const item = { name, purchaseDate, expiryDate };
        const items = await this.loadItems();
        let parsedItems = JSON.parse(items);

        // Turn into array if not an array
        if (!Array.isArray(parsedItems)) {
            parsedItems = [parsedItems];
        }

        // Check for duplicates
        const itemDoesNotExist = items.indexOf(JSON.stringify(item)) == -1;
        if (itemDoesNotExist) {
            parsedItems.push(item);
            try {
                // Save
                await AsyncStorage.setItem(
                    'ITEMS',
                    JSON.stringify(parsedItems)
                );
                ToastAndroid.show(
                    'Saved ' + this.state.name + ' successfully',
                    ToastAndroid.LONG
                );
                this.resetForm();
            } catch (error) {
                // Error saving data
                console.log('Error saving data', error);
            }
        } else {
            ToastAndroid.show(
                this.state.name + ' already exists',
                ToastAndroid.LONG
            );
        }
    };

    loadItems = async () => {
        try {
            let items = await AsyncStorage.getItem('ITEMS');
            if (items === null) return [];
            return items;
        } catch (error) {
            console.log('Error loading items', error);
        }
    };

    resetForm() {
        this.setState({
            name: '',
            purchaseDate: '',
            expiryDate: ''
        });
    }

    render() {
        const { name, purchaseDate, expiryDate } = this.state;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.name}>
                    <Text>Name:</Text>
                    <TextInput
                        selectionColor={Colors.pink}
                        underlineColorAndroid={Colors.pink}
                        placeholder="Product Name"
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
                <Button
                    onPress={this.saveNewItem}
                    title="Save"
                    color={Colors.pink}
                    disabled={
                        this.state.name === '' ||
                        this.state.purchaseDate === '' ||
                        this.state.expiryDate === ''
                    }
                    accessibilityLabel="Save the current item details"
                />
            </ScrollView>
        );
    }

    renderDateInput(label, value, fieldName) {
        const day = new Date(value).getDate().toString();
        const month = new Date(value).getMonth().toString();
        const year = new Date(value).getFullYear().toString();
        const date = value !== '' ? day + '/' + month + '/' + year : '';

        return (
            <View style={styles.date}>
                <Text>{label}:</Text>
                <TextInput
                    placeholder="DD/MM/YYYY"
                    underlineColorAndroid={Colors.grey}
                    style={styles.textInput}
                    value={date}
                    editable={false}
                />
                <Button
                    onPress={() => this.openDatePicker(fieldName)}
                    title="Choose Date"
                    color={Colors.lightPurple}
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
                if (
                    fieldName === 'expiryDate' &&
                    new Date(year, month, day) <=
                        new Date(this.state.purchaseDate)
                ) {
                    ToastAndroid.show(
                        'Expiry cannot be before purchase!',
                        ToastAndroid.LONG
                    );
                } else {
                    this.setState({
                        [fieldName]: new Date(year, month, day).toString()
                    });
                }
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
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        minWidth: width * 0.3,
        maxWidth: width * 0.3,
        marginLeft: 5,
        paddingLeft: 10
    }
});
