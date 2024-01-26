import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, FlatList, SafeAreaView, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SecureStore from 'expo-secure-store';

const ExpenseTrackerScreen = () => {
    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenseCategory, setExpenseCategory] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseDate, setExpenseDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [allExpenses, setAllExpenses] = useState([]);

    // for handling date change in date picker
    const handleDateChange = (event, date) => {
        if (event.type === 'set') {
            setExpenseDate(date || new Date());
        }
        setShowDatePicker(false);
    };

    // for saving the expense in async storage
    const handleSaveExpense = async () => {

        if (!expenseAmount || !expenseCategory || !expenseDescription) {
            return alert('Please fill all the fields');
        }

        try {
            const expenseData = {
                amount: expenseAmount,
                category: expenseCategory,
                description: expenseDescription,
                date: expenseDate.toISOString(),
            };

            const existingData = await SecureStore.getItemAsync('expenseData');
            const existingArray = existingData ? JSON.parse(existingData) : [];

            existingArray.push(expenseData);

            await SecureStore.setItemAsync('expenseData', JSON.stringify(existingArray));

            setAllExpenses(existingArray);

            setExpenseAmount('');
            setExpenseCategory('');
            setExpenseDescription('');
            setExpenseDate(new Date());
        } catch (error) {
            console.error('Error saving expense:', error);
        }
    };

    // for fetching the expenses when component mounts
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const storedData = await SecureStore.getItemAsync('expenseData');
                const storedArray = storedData ? JSON.parse(storedData) : [];
                setAllExpenses(storedArray);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses();
    }, []);

    // for clearing the async storage
    const clearAsyncStorage = async () => {
        Alert.alert(
            'Confirm',
            'Are you sure you want to clear all your previous expenses?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            await SecureStore.deleteItemAsync('expenseData');
                            setAllExpenses([]);
                            console.log('SecureStore cleared successfully');
                            Alert.alert('SecureStore cleared successfully');
                        } catch (error) {
                            console.error('Error clearing SecureStore:', error);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    // for setting color by category
    const setColorByCategory = (category) => {
        const trimmedCategory = category.trim().toLowerCase();

        if (trimmedCategory === 'food') return '#3498db';
        else if (trimmedCategory === 'travel') return '#9b59b6';
        else if (trimmedCategory === 'medical') return '#e74c3c';
        else if (trimmedCategory === 'education') return '#f1c40f';
        else if (trimmedCategory === 'shopping') return '#e67e22';
        else if (trimmedCategory === 'bills') return '#e74c3c';
        else if (trimmedCategory === 'entertainment') return '#f1c40f';
        else if (trimmedCategory === 'misc') return '#2ecc71';
        else if (trimmedCategory === 'others') return '#1abc9c';
        else return '#2c3e50';
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Expense Amount"
                keyboardType="numeric"
                value={expenseAmount.toString()}
                onChangeText={(text) => {
                    const amount = parseFloat(text) || 0;
                    setExpenseAmount(amount);
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Expense Category"
                value={expenseCategory}
                onChangeText={(text) => setExpenseCategory(text)}
            />

            <Pressable
                style={[styles.input, styles.datePickerButton]}
                onPress={() => setShowDatePicker(true)}
            >
                <Icon name="calendar" size={24} color="#2C3E50" />
                <Text style={styles.datePickerButtonText}>
                    {expenseDate.toDateString()}
                </Text>
            </Pressable>
            {showDatePicker && (
                <DateTimePicker
                    value={expenseDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Expense Description"
                multiline
                numberOfLines={4}
                value={expenseDescription}
                onChangeText={(text) => setExpenseDescription(text)}
            />
            <Pressable style={styles.saveButton} onPress={handleSaveExpense}>
                <Text style={styles.saveButtonText}>Save Expense</Text>
            </Pressable>


            {/* for rendering all the expenses */}
            <Text style={styles.title}>Previous Expenses</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={allExpenses}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    // <View style={[styles.expenseItem, { backgroundColor: "#3498db" }]}>
                    <View style={[styles.expenseItem, { backgroundColor: setColorByCategory(item.category) }]}>
                        <Text style={styles.expenseAmount}>{`Amount: ${item.amount}`}</Text>
                        <Text style={styles.expenseCategory}>{`Category: ${item.category}`}</Text>
                        <Text style={styles.expenseDescription}>{`Description: ${item.description}`}</Text>
                        <Text style={styles.expenseDate}>{`Date: ${new Date(item.date).toLocaleDateString()}`}</Text>
                    </View>
                )}
            />
            {allExpenses && allExpenses.length > 0 && (
                <Pressable style={styles.clearButton} onPress={clearAsyncStorage}>
                    <Text style={styles.clearButtonText}>Clear Expenses</Text>
                </Pressable>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#2C3E50',
    },
    input: {
        height: 40,
        borderColor: '#2C3E50',
        borderBottomWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        color: '#2C3E50',
    },
    textArea: {
        height: 80,
        paddingHorizontal: 8,
        paddingVertical: 8,
        textAlignVertical: 'top',
    },
    datePickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#2C3E50',
        paddingBottom: 8,
    },
    datePickerButtonText: {
        marginLeft: 8,
        color: '#2C3E50',
        fontSize: 16,
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginVertical: 12,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    expenseItem: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        padding: 16,
    },
    expenseAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fefefe',
    },
    expenseCategory: {
        fontSize: 16,
        color: '#fff',
        marginTop: 8,
    },
    expenseDescription: {
        fontSize: 14,
        color: '#eee',
        marginTop: 8,
    },
    expenseDate: {
        fontSize: 12,
        color: '#ddd',
        marginTop: 8,
    },
    clearButton: {
        backgroundColor: '#e74c3c',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginVertical: 12,
    },
    clearButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ExpenseTrackerScreen;


