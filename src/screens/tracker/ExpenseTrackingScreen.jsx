import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, FlatList, ScrollView, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart } from 'react-native-chart-kit';

const ExpenseTrackerScreen = () => {
    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenseCategory, setExpenseCategory] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseDate, setExpenseDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [allExpenses, setAllExpenses] = useState([]);


    const handleDateChange = (event, date) => {
        if (event.type === 'set') {
            setExpenseDate(date || new Date());
        }
        setShowDatePicker(false);
    };

    const handleSaveExpense = async () => {
        try {
            const expenseData = {
                amount: expenseAmount,
                category: expenseCategory,
                description: expenseDescription,
                date: expenseDate.toISOString(),
            };

            // Get existing expense data from AsyncStorage
            const existingData = await AsyncStorage.getItem('expenseData');
            const existingArray = existingData ? JSON.parse(existingData) : [];

            // Add the new expense data
            existingArray.push(expenseData);

            // Save the updated data back to AsyncStorage
            await AsyncStorage.setItem('expenseData', JSON.stringify(existingArray));

            // Update the list of expenses
            setAllExpenses(existingArray);

            // Optionally, you can reset the form fields after successful save
            setExpenseAmount('');
            setExpenseCategory('');
            setExpenseDescription('');
            setExpenseDate(new Date());
        } catch (error) {
            console.error('Error saving expense:', error);
            // Handle any errors (e.g., show an error message)
        }
    };

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const storedData = await AsyncStorage.getItem('expenseData');
                const storedArray = storedData ? JSON.parse(storedData) : [];
                setAllExpenses(storedArray);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses();
    }, []);

    const clearAsyncStorage = async () => {
        try {
            await AsyncStorage.removeItem('expenseData');
            setAllExpenses([]); // Clear the expenses in the state
            console.log('AsyncStorage cleared successfully');
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    };

    const getExpenseDataForChart = () => {
        // Calculate expense distribution by category for the pie chart
        const categoryDistribution = {};

        allExpenses.forEach((expense) => {
            const { category, amount } = expense;

            if (categoryDistribution[category]) {
                categoryDistribution[category] += amount;
            } else {
                categoryDistribution[category] = amount;
            }
        });

        // Convert the category distribution object into an array of objects
        const chartData = Object.keys(categoryDistribution).map((category) => ({
            category,
            amount: categoryDistribution[category],
        }));

        return chartData;
    };

    const getCategoryColor = (category) => {
        switch (category.toLowerCase()) {
            case 'Food':
                return '#4CAF50'; // Green for Food
            case 'entertainment':
                return '#3498db'; // Blue for Entertainment
            case 'transportation':
                return '#e74c3c'; // Red for Transportation
            case 'shopping':
                return '#f39c12'; // Yellow for Shopping
            case 'utilities':
                return '#9b59b6'; // Purple for Utilities
            // Add more cases for other categories as needed
            default:
                return '#3498db'; // Default color for unrecognized categories
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            {/* <Text style={styles.title}>Add Expense</Text> */}

            <TextInput
                style={styles.input}
                placeholder="Expense Amount"
                keyboardType="numeric"
                value={expenseAmount.toString()} // Convert number to string for TextInput
                onChangeText={(text) => {
                    const amount = parseFloat(text) || 0; // Parse input as float or set to 0 if invalid
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

            {/* expenses items */}
            <Text style={styles.title}>Previous Expenses</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={allExpenses}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.expenseItem, { backgroundColor: getCategoryColor(item.category) }]}>
                        <Text style={styles.expenseAmount}>{`Amount: ${item.amount}`}</Text>
                        <Text style={styles.expenseCategory}>{`Category: ${item.category}`}</Text>
                        <Text style={styles.expenseDescription}>{`Description: ${item.description}`}</Text>
                        <Text style={styles.expenseDate}>{`Date: ${new Date(item.date).toLocaleDateString()}`}</Text>
                    </View>
                )}
            />

            {/* Clear AsyncStorage Button */}
            <Pressable style={styles.clearButton} onPress={clearAsyncStorage}>
                <Text style={styles.clearButtonText}>Clear AsyncStorage</Text>
            </Pressable>


            {/* Pie chart for expense analytics */}
            {/* <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Expense Distribution</Text>
                <PieChart
                    data={getExpenseDataForChart()}
                    width={300}
                    height={200}
                    chartConfig={{
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    accessor="amount"
                    backgroundColor="transparent"
                />
            </View> */}

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
        backgroundColor: '#fff', // Adjust based on your color scheme
        borderRadius: 8,
        marginBottom: 16,
        padding: 16,
    },
    expenseAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fefefe', // Adjust based on your color scheme
    },
    expenseCategory: {
        fontSize: 16,
        color: '#fff', // Example color for category, adjust based on your color scheme
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

    chartContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2C3E50',
    },
    clearButton: {
        backgroundColor: '#e74c3c', // Red color for the button
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

