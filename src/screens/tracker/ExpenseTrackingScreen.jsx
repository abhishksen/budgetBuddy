
// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, Pressable, StyleSheet, FlatList, SafeAreaView, Alert } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import * as SecureStore from 'expo-secure-store';
// import { Picker } from '@react-native-picker/picker';

// const ExpenseTrackerScreen = () => {
//     const [expenseAmount, setExpenseAmount] = useState('');
//     const [expenseCategory, setExpenseCategory] = useState('');
//     const [expenseDescription, setExpenseDescription] = useState('');
//     const [expenseDate, setExpenseDate] = useState(new Date());
//     const [showDatePicker, setShowDatePicker] = useState(false);
//     const [allExpenses, setAllExpenses] = useState([]);

//     // for handling date change in date picker
//     const handleDateChange = (event, date) => {
//         if (event.type === 'set') {
//             setExpenseDate(date || new Date());
//         }
//         setShowDatePicker(false);
//     };

//     // for saving the expense in async storage
//     const handleSaveExpense = async () => {

//         if (!expenseAmount || !expenseCategory || !expenseDescription) {
//             return alert('Please fill all the fields');
//         }

//         try {
//             const expenseData = {
//                 amount: expenseAmount,
//                 category: expenseCategory,
//                 description: expenseDescription,
//                 date: expenseDate.toISOString(),
//             };

//             const existingData = await SecureStore.getItemAsync('expenseData');
//             const existingArray = existingData ? JSON.parse(existingData) : [];

//             existingArray.push(expenseData);

//             await SecureStore.setItemAsync('expenseData', JSON.stringify(existingArray));

//             setAllExpenses(existingArray);

//             setExpenseAmount('');
//             setExpenseCategory('');
//             setExpenseDescription('');
//             setExpenseDate(new Date());
//         } catch (error) {
//             console.error('Error saving expense:', error);
//         }
//     };

//     // for fetching the expenses when component mounts
//     useEffect(() => {
//         const fetchExpenses = async () => {
//             try {
//                 const storedData = await SecureStore.getItemAsync('expenseData');
//                 const storedArray = storedData ? JSON.parse(storedData) : [];
//                 setAllExpenses(storedArray);
//             } catch (error) {
//                 console.error('Error fetching expenses:', error);
//             }
//         };

//         fetchExpenses();
//     }, []);

//     // for clearing the async storage
//     const clearAsyncStorage = async () => {
//         Alert.alert(
//             'Confirm',
//             'Are you sure you want to clear all your previous expenses?',
//             [
//                 {
//                     text: 'Cancel',
//                     style: 'cancel',
//                 },
//                 {
//                     text: 'Yes',
//                     onPress: async () => {
//                         try {
//                             await SecureStore.deleteItemAsync('expenseData');
//                             setAllExpenses([]);
//                             // console.log('SecureStore cleared successfully');
//                             Alert.alert('SecureStore cleared successfully');
//                         } catch (error) {
//                             console.error('Error clearing SecureStore:', error);
//                         }
//                     },
//                 },
//             ],
//             { cancelable: false }
//         );
//     };

//     // Predefined options for expense category
//     const expenseCategories = [
//         { label: 'Select Expense Category', value: '', color: '' },
//         { label: 'Food', value: 'food', color: '#e59866' }, // Copper
//         { label: 'Travel', value: 'travel', color: '#154360' }, // Dark blue
//         { label: 'Medical', value: 'medical', color: '#c70039' }, // Crimson
//         { label: 'Education', value: 'education', color: '#f39c12' }, // Orange
//         { label: 'Shopping', value: 'shopping', color: '#c0392b' }, // Fire engine red
//         { label: 'Bills', value: 'bills', color: '#8e44ad' }, // Purple
//         { label: 'Entertainment', value: 'entertainment', color: '#2c3e50' }, // Midnight blue
//         { label: 'Misc', value: 'misc', color: '#27ae60' }, // Nephritis green
//         { label: 'Others', value: 'others', color: '#3498db' } // Dodger blue
//     ];




//     // for setting color by category
//     const setColorByCategory = (category) => {
//         const trimmedCategory = category.trim().toLowerCase();

//         const categoryObj = expenseCategories.find(cat => cat.value === trimmedCategory);
//         return categoryObj ? categoryObj.color : '#2c3e50';
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Expense Amount"
//                 keyboardType="numeric"
//                 value={expenseAmount.toString()}
//                 onChangeText={(text) => {
//                     const amount = parseFloat(text) || 0;
//                     setExpenseAmount(amount);
//                 }}
//             />
//             {/* Dropdown for Expense Category */}
//             <View style={styles.categoryInput}>
//                 <Picker
//                     selectedValue={expenseCategory}
//                     style={styles.picker}
//                     onValueChange={(itemValue) => setExpenseCategory(itemValue)}
//                 >
//                     {expenseCategories.map((category, index) => (
//                         <Picker.Item key={index} label={category.label} value={category.value} />
//                     ))}
//                 </Picker>
//             </View>

//             <Pressable
//                 style={[styles.input, styles.datePickerButton]}
//                 onPress={() => setShowDatePicker(true)}
//             >
//                 <Icon name="calendar" size={24} color="#2C3E50" />
//                 <Text style={styles.datePickerButtonText}>
//                     {expenseDate.toDateString()}
//                 </Text>
//             </Pressable>
//             {showDatePicker && (
//                 <DateTimePicker
//                     value={expenseDate}
//                     mode="date"
//                     display="default"
//                     maximumDate={new Date()} // Set maximum date to current date
//                     onChange={handleDateChange}
//                 />
//             )}
//             <TextInput
//                 style={[styles.input, styles.textArea]}
//                 placeholder="Expense Description"
//                 multiline
//                 numberOfLines={4}
//                 value={expenseDescription}
//                 onChangeText={(text) => setExpenseDescription(text)}
//             />
//             <Pressable style={styles.saveButton} onPress={handleSaveExpense}>
//                 <Text style={styles.saveButtonText}>Save Expense</Text>
//             </Pressable>


//             {/* for rendering all the expenses */}
//             {allExpenses && allExpenses.length > 0 &&
//                 <Text style={styles.title}>Previous Expenses</Text>
//             }
//             <FlatList
//                 showsVerticalScrollIndicator={false}
//                 data={allExpenses}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={({ item }) => (
//                     <View style={[styles.expenseItem, { backgroundColor: setColorByCategory(item.category) }]}>
//                         <Text style={styles.expenseAmount}>{`Amount: ${item.amount}`}</Text>
//                         <Text style={styles.expenseCategory}>{`Category: ${item.category}`}</Text>
//                         <Text style={styles.expenseDescription}>{`Description: ${item.description}`}</Text>
//                         <Text style={styles.expenseDate}>{`Date: ${new Date(item.date).toLocaleDateString()}`}</Text>
//                     </View>
//                 )}
//             />
//             {allExpenses && allExpenses.length > 0 && (
//                 <Pressable style={styles.clearButton} onPress={clearAsyncStorage}>
//                     <Text style={styles.clearButtonText}>Clear Expenses</Text>
//                 </Pressable>
//             )}
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//         backgroundColor: '#fff',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 16,
//         color: '#2C3E50',
//     },
//     input: {
//         height: 40,
//         borderColor: '#2C3E50',
//         borderBottomWidth: 1,
//         marginBottom: 14,
//         paddingHorizontal: 16,
//         color: '#333',
//     },
//     categoryInput: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         height: 40,
//         borderColor: '#2C3E50',
//         borderBottomWidth: 1,
//         marginBottom: 12,
//         color: '#2C3E50',
//     },
//     picker: {
//         flex: 1,
//         height: 40,
//         color: '#2C3E50',
//     },
//     textArea: {
//         height: 80,
//         paddingHorizontal: 8,
//         paddingVertical: 8,
//         paddingLeft: 16,
//         textAlignVertical: 'top',
//     },
//     datePickerButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderBottomWidth: 1,
//         borderBottomColor: '#2C3E50',
//         paddingBottom: 8,
//     },
//     datePickerButtonText: {
//         marginLeft: 8,
//         color: '#2C3E50',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     saveButton: {
//         backgroundColor: '#4CAF50',
//         borderRadius: 8,
//         paddingVertical: 12,
//         alignItems: 'center',
//         marginVertical: 12,
//     },
//     saveButtonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     expenseItem: {
//         backgroundColor: '#fff',
//         borderRadius: 8,
//         marginBottom: 16,
//         padding: 16,
//     },
//     expenseAmount: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#fefefe',
//     },
//     expenseCategory: {
//         fontSize: 16,
//         color: '#fff',
//         marginTop: 8,
//     },
//     expenseDescription: {
//         fontSize: 14,
//         color: '#eee',
//         marginTop: 8,
//     },
//     expenseDate: {
//         fontSize: 12,
//         color: '#ddd',
//         marginTop: 8,
//     },
//     clearButton: {
//         backgroundColor: '#e74c3c',
//         borderRadius: 8,
//         paddingVertical: 12,
//         alignItems: 'center',
//         marginVertical: 12,
//     },
//     clearButtonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default ExpenseTrackerScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, FlatList, SafeAreaView, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SecureStore from 'expo-secure-store';
import { Picker } from '@react-native-picker/picker';

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
                id: Date.now(), // Generate a unique ID for each expense
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

    // for deleting an expense
    const deleteExpense = async (id) => {
        try {
            const updatedExpenses = allExpenses.filter(expense => expense.id !== id);
            await SecureStore.setItemAsync('expenseData', JSON.stringify(updatedExpenses));
            setAllExpenses(updatedExpenses);
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

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

    // Predefined options for expense category
    const expenseCategories = [
        { label: 'Select Expense Category', value: '', color: '' },
        { label: 'Food', value: 'food', color: '#e59866' }, // Copper
        { label: 'Travel', value: 'travel', color: '#154360' }, // Dark blue
        { label: 'Medical', value: 'medical', color: '#c70039' }, // Crimson
        { label: 'Education', value: 'education', color: '#f39c12' }, // Orange
        { label: 'Shopping', value: 'shopping', color: '#c0392b' }, // Fire engine red
        { label: 'Bills', value: 'bills', color: '#8e44ad' }, // Purple
        { label: 'Entertainment', value: 'entertainment', color: '#2c3e50' }, // Midnight blue
        { label: 'Misc', value: 'misc', color: '#27ae60' }, // Nephritis green
        { label: 'Others', value: 'others', color: '#3498db' } // Dodger blue
    ];

    // for setting color by category
    const setColorByCategory = (category) => {
        const trimmedCategory = category.trim().toLowerCase();
        const categoryObj = expenseCategories.find(cat => cat.value === trimmedCategory);
        return categoryObj ? categoryObj.color : '#2c3e50';
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Expense Amount"
                keyboardType="numeric"
                value={expenseAmount ? expenseAmount.toString() : ''}
                onChangeText={(text) => {
                    const amount = parseFloat(text) || 0;
                    setExpenseAmount(amount);
                }}
            />
            {/* Dropdown for Expense Category */}
            <View style={styles.categoryInput}>
                <Picker
                    selectedValue={expenseCategory}
                    style={styles.picker}
                    onValueChange={(itemValue) => setExpenseCategory(itemValue)}
                >
                    {expenseCategories.map((category, index) => (
                        <Picker.Item key={index} label={category.label} value={category.value} />
                    ))}
                </Picker>
            </View>

            <Pressable
                style={[styles.input, styles.datePickerButton]}
                onPress={() => setShowDatePicker(true)}
            >
                <Icon name="calendar" size={24} color="#2C3E50" />
                <Text style={styles.datePickerButtonText}>
                    {expenseDate ? expenseDate.toDateString() : ''}
                </Text>
            </Pressable>
            {showDatePicker && (
                <DateTimePicker
                    value={expenseDate}
                    mode="date"
                    display="default"
                    maximumDate={new Date()} // Set maximum date to current date
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
            {allExpenses && allExpenses.length > 0 &&
                <Text style={styles.title}>Previous Expenses</Text>
            }
            <FlatList
                showsVerticalScrollIndicator={false}
                data={allExpenses}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.expenseItem, { backgroundColor: setColorByCategory(item.category) }]}>
                        <Text style={styles.expenseAmount}>{`Amount: ${item.amount}`}</Text>
                        <Text style={styles.expenseCategory}>{`Category: ${item.category}`}</Text>
                        <Text style={styles.expenseDescription}>{`Description: ${item.description}`}</Text>
                        <Text style={styles.expenseDate}>{`Date: ${item.date ? new Date(item.date).toLocaleDateString() : ''}`}</Text>
                        <Icon
                            name="trash"
                            size={20}
                            color="#fff"
                            style={styles.deleteIcon}
                            onPress={() => deleteExpense(item.id)}
                        />
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
        marginBottom: 14,
        paddingHorizontal: 16,
        color: '#333',
    },
    categoryInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        borderColor: '#2C3E50',
        borderBottomWidth: 1,
        marginBottom: 12,
        color: '#2C3E50',
    },
    picker: {
        flex: 1,
        height: 40,
        color: '#2C3E50',
    },
    textArea: {
        height: 80,
        paddingHorizontal: 8,
        paddingVertical: 8,
        paddingLeft: 16,
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
    deleteIcon: {
        position: 'absolute',
        top: 12,
        right: 16,
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
