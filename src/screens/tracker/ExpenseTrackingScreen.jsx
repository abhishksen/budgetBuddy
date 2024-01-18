import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';


const ExpenseTrackerScreen = () => {
    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenseCategory, setExpenseCategory] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseDate, setExpenseDate] = useState(new Date());

    const handleDateChange = (date) => {
        setExpenseDate(date);
    };

    const handleSaveExpense = () => {
        // Add logic to save expense data
        console.log('Expense Amount:', expenseAmount);
        console.log('Expense Category:', expenseCategory);
        console.log('Expense Description:', expenseDescription);
        console.log('Expense Date:', expenseDate);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Expense</Text>

            <TextInput
                style={styles.input}
                placeholder="Expense Amount"
                keyboardType="numeric"
                value={expenseAmount}
                onChangeText={(text) => setExpenseAmount(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Expense Category"
                value={expenseCategory}
                onChangeText={(text) => setExpenseCategory(text)}
            />

            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Expense Description"
                multiline
                numberOfLines={4}
                value={expenseDescription}
                onChangeText={(text) => setExpenseDescription(text)}
            />

            {/* <DateTimePicker
                style={styles.datePickerButton}
                value={expenseDate}
                mode="date"
                display="default"
                onChange={(event, date) => handleDateChange(date)}
            /> */}

            <Pressable style={styles.saveButton} onPress={handleSaveExpense}>
                <Text style={styles.saveButtonText}>Save Expense</Text>
            </Pressable>
        </View>
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
        // borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 8,
        color: '#2C3E50',
    },
    textArea: {
        height: 80,
        paddingHorizontal: 8,
        paddingVertical: 8,
        textAlignVertical: 'top', // to start text from the top of the input
    },
    datePickerButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 12,
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
});

export default ExpenseTrackerScreen;

