// import React, { useEffect, useState, useCallback } from 'react';
// import {
//     View, Text, TextInput, Pressable, StyleSheet, FlatList, SafeAreaView, Alert, ActivityIndicator
// } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import * as SecureStore from 'expo-secure-store';
// import { Picker } from '@react-native-picker/picker';
// import { Calendar } from 'react-native-calendars';

// const ExpenseTrackerScreen = () => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [expenseAmount, setExpenseAmount] = useState('');
//     const [expenseCategory, setExpenseCategory] = useState('');
//     const [expenseDescription, setExpenseDescription] = useState('');
//     const [expenseDate, setExpenseDate] = useState(new Date());
//     const [showDatePicker, setShowDatePicker] = useState(false);
//     const [allExpenses, setAllExpenses] = useState([]);
//     const [editExpense, setEditExpense] = useState(null);
//     const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//     const [markedDates, setMarkedDates] = useState({});
//     const [calendarView, setCalendarView] = useState(false);

//     const expenseCategories = [
//         { label: 'Select Expense Category', value: '', color: '' },
//         { label: 'Food', value: 'food', color: '#e59866' },
//         { label: 'Travel', value: 'travel', color: '#154360' },
//         { label: 'Medical', value: 'medical', color: '#c70039' },
//         { label: 'Education', value: 'education', color: '#f39c12' },
//         { label: 'Shopping', value: 'shopping', color: '#c0392b' },
//         { label: 'Bills', value: 'bills', color: '#8e44ad' },
//         { label: 'Entertainment', value: 'entertainment', color: '#2c3e50' },
//         { label: 'Misc', value: 'misc', color: '#27ae60' },
//         { label: 'Others', value: 'others', color: '#3498db' },
//     ];

//     const setColorByCategory = useCallback((category) => {
//         const categoryObj = expenseCategories.find(cat => cat.value === category);
//         return categoryObj ? categoryObj.color : '#2c3e50';
//     }, []);

//     const handleDateChange = (event, date) => {
//         if (event.type === 'set') {
//             setExpenseDate(date || new Date());
//         }
//         setShowDatePicker(false);
//     };

//     const resetForm = () => {
//         setExpenseAmount('');
//         setExpenseCategory('');
//         setExpenseDescription('');
//         setExpenseDate(new Date());
//         setEditExpense(null);
//     };

//     const handleSaveExpense = async () => {
//         if (!expenseAmount || !expenseCategory || !expenseDescription) {
//             return Alert.alert('Error', 'Please fill all the fields');
//         }
//         setIsLoading(true);
//         const expenseData = {
//             id: editExpense ? editExpense.id : Date.now(),
//             amount: expenseAmount,
//             category: expenseCategory,
//             description: expenseDescription,
//             date: expenseDate.toISOString(),
//         };

//         const updatedExpenses = editExpense
//             ? allExpenses.map(expense => expense.id === editExpense.id ? { ...expense, ...expenseData } : expense)
//             : [...allExpenses, expenseData];

//         try {
//             await SecureStore.setItemAsync('expenseData', JSON.stringify(updatedExpenses));
//             setAllExpenses(updatedExpenses);
//             resetForm();
//         } catch (error) {
//             console.error('Error saving expense:', error);
//             Alert.alert('Error', 'There was an error saving the expense');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const fetchExpenses = useCallback(async () => {
//         try {
//             const storedData = await SecureStore.getItemAsync('expenseData');
//             const storedArray = storedData ? JSON.parse(storedData) : [];
//             setAllExpenses(storedArray);
//         } catch (error) {
//             console.error('Error fetching expenses:', error);
//             Alert.alert('Error', 'There was an error fetching the expenses');
//         }
//     }, []);

//     useEffect(() => {
//         fetchExpenses();
//     }, [fetchExpenses]);

//     useEffect(() => {
//         const updatedMarkedDates = {};
//         allExpenses.forEach((expense) => {
//             const formattedDate = new Date(expense.date).toISOString().split('T')[0];
//             updatedMarkedDates[formattedDate] = {
//                 marked: true,
//                 dotColor: setColorByCategory(expense.category)
//             };
//         });
//         setMarkedDates(updatedMarkedDates);
//     }, [allExpenses, setColorByCategory]);

//     const deleteExpense = (id) => {
//         Alert.alert(
//             'Confirm',
//             'Are you sure you want to delete this expense?',
//             [
//                 { text: 'Cancel', style: 'cancel' },
//                 {
//                     text: 'Yes',
//                     onPress: async () => {
//                         try {
//                             const updatedExpenses = allExpenses.filter(expense => expense.id !== id);
//                             await SecureStore.setItemAsync('expenseData', JSON.stringify(updatedExpenses));
//                             setAllExpenses(updatedExpenses);
//                         } catch (error) {
//                             console.error('Error deleting expense:', error);
//                             Alert.alert('Error', 'There was an error deleting the expense');
//                         }
//                     },
//                 },
//             ],
//             { cancelable: false }
//         );
//     };

//     const editExpenseItem = (expense) => {
//         setExpenseAmount(expense.amount);
//         setExpenseCategory(expense.category);
//         setExpenseDescription(expense.description);
//         setExpenseDate(new Date(expense.date));
//         setEditExpense(expense);
//     };

//     const clearAsyncStorage = () => {
//         Alert.alert(
//             'Confirm',
//             'Are you sure you want to clear all your previous expenses?',
//             [
//                 { text: 'Cancel', style: 'cancel' },
//                 {
//                     text: 'Yes',
//                     onPress: async () => {
//                         try {
//                             await SecureStore.deleteItemAsync('expenseData');
//                             setAllExpenses([]);
//                             Alert.alert('Success', 'All expenses cleared successfully');
//                         } catch (error) {
//                             console.error('Error clearing SecureStore:', error);
//                             Alert.alert('Error', 'There was an error clearing the expenses');
//                         }
//                     },
//                 },
//             ],
//             { cancelable: false }
//         );
//     };

//     const handleDayPress = (day) => {
//         setSelectedDate(day.dateString);
//         const expensesForTheDay = allExpenses.filter(expense => expense.date.startsWith(day.dateString));

//         if (expensesForTheDay.length > 0) {
//             const expenseDetails = expensesForTheDay.map(expense =>
//                 `Amount: ${expense.amount}\nCategory: ${expense.category}\nDescription: ${expense.description}`
//             ).join('\n\n');
//             Alert.alert(`Expenses on ${day.dateString}`, expenseDetails);
//         } else {
//             Alert.alert('No Expenses', `There are no expenses for the selected date ${day.dateString}`);
//         }
//     };

//     const renderExpenseItem = ({ item }) => (
//         <View style={[styles.expenseItem, { backgroundColor: setColorByCategory(item.category) }]}>
//             <Text style={styles.expenseAmount}>{`Amount: ${item.amount}`}</Text>
//             <Text style={styles.expenseCategory}>{`Category: ${item.category}`}</Text>
//             <Text style={styles.expenseDescription}>{`Description: ${item.description}`}</Text>
//             <Text style={styles.expenseDate}>{`Date: ${item.date ? new Date(item.date).toLocaleDateString() : ''}`}</Text>
//             <View style={styles.iconContainer}>
//                 <Icon
//                     name="edit"
//                     size={20}
//                     color="#fff"
//                     style={styles.editIcon}
//                     onPress={() => editExpenseItem(item)}
//                 />
//                 <Icon
//                     name="trash-o"
//                     size={20}
//                     color="#fff"
//                     style={styles.deleteIcon}
//                     onPress={() => deleteExpense(item.id)}
//                 />
//             </View>
//         </View>
//     );

//     return (
//         <SafeAreaView style={styles.container}>
//             {/* expese form */}
//             <View>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Expense Amount"
//                     placeholderTextColor="#aaa"
//                     keyboardType="numeric"
//                     value={expenseAmount ? expenseAmount.toString() : ''}
//                     onChangeText={(text) => setExpenseAmount(parseFloat(text) || '')}
//                 />
//                 <View style={styles.categoryInput}>
//                     <Picker
//                         selectedValue={expenseCategory}
//                         style={styles.picker}
//                         onValueChange={(itemValue) => setExpenseCategory(itemValue)}
//                     >
//                         {expenseCategories.map((category, index) => (
//                             <Picker.Item key={index} label={category.label} value={category.value} />
//                         ))}
//                     </Picker>
//                 </View>
//                 <Pressable
//                     style={[styles.input, styles.datePickerButton]}
//                     onPress={() => setShowDatePicker(true)}
//                 >
//                     <Icon name="calendar" size={24} color="#2C3E50" />
//                     <Text style={styles.datePickerButtonText}>
//                         {expenseDate ? expenseDate.toDateString() : ''}
//                     </Text>
//                 </Pressable>
//                 {showDatePicker && (
//                     <DateTimePicker
//                         value={expenseDate}
//                         mode="date"
//                         display="default"
//                         maximumDate={new Date()}
//                         onChange={handleDateChange}
//                     />
//                 )}
//                 <TextInput
//                     style={[styles.input, styles.textArea]}
//                     placeholder="Expense Description"
//                     placeholderTextColor="#aaa"
//                     multiline
//                     numberOfLines={4}
//                     value={expenseDescription}
//                     onChangeText={(text) => setExpenseDescription(text)}
//                 />
//                 <Pressable style={styles.saveButton} onPress={handleSaveExpense}>
//                     {isLoading ? <ActivityIndicator color={"#8BC34A"} /> : <Text style={styles.saveButtonText}>{editExpense ? 'Update Expense' : 'Save Expense'}</Text>}
//                 </Pressable>
//             </View>

//             {allExpenses.length > 0 &&
//                 <View style={styles.headerContainer}>
//                     <Text style={styles.title}>Previous Expenses</Text>
//                     <Icon
//                         name={calendarView ? 'list' : 'calendar'}
//                         size={22}
//                         color="#2C3E50"
//                         onPress={() => setCalendarView(!calendarView)}
//                     />
//                 </View>
//             }

//             {calendarView ? (
//                 <Calendar
//                     current={selectedDate}
//                     markedDates={markedDates}
//                     onDayPress={handleDayPress}
//                     theme={calendarTheme}
//                 />
//             ) : (
//                 <FlatList
//                     showsVerticalScrollIndicator={false}
//                     data={allExpenses}
//                     keyExtractor={(item) => item.id.toString()}
//                     renderItem={renderExpenseItem}
//                     getItemLayout={(data, index) => (
//                         { length: 100, offset: 100 * index, index }
//                     )}
//                     initialNumToRender={10}
//                     maxToRenderPerBatch={10}
//                 />
//             )}

//             {!calendarView && allExpenses.length > 0 && (
//                 <Pressable style={styles.clearButton} onPress={clearAsyncStorage}>
//                     <Text style={styles.clearButtonText}>Clear Expenses</Text>
//                 </Pressable>
//             )}
//         </SafeAreaView>
//     );
// };

// const calendarTheme = {
//     backgroundColor: '#ffffff',
//     calendarBackground: '#ffffff',
//     textSectionTitleColor: '#8BC34A',
//     selectedDayBackgroundColor: '#4CAF50',
//     selectedDayTextColor: '#ffffff',
//     todayTextColor: '#8BC34A',
//     dayTextColor: '#2d4150',
//     textDisabledColor: '#d9e1e8',
//     dotColor: '#4CAF50',
//     selectedDotColor: '#ffffff',
//     arrowColor: '#8BC34A',
//     monthTextColor: '#8BC34A',
//     indicatorColor: '#4CAF50',
//     textDayFontFamily: 'monospace',
//     textMonthFontFamily: 'monospace',
//     textDayHeaderFontFamily: 'monospace',
//     textDayFontWeight: '300',
//     textMonthFontWeight: 'bold',
//     textDayHeaderFontWeight: '300',
//     textDayFontSize: 16,
//     textMonthFontSize: 16,
//     textDayHeaderFontSize: 16
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//         backgroundColor: '#fff',
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: 'bold',
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
//         height: 40,
//         borderColor: '#2C3E50',
//         borderBottomWidth: 1,
//         marginBottom: 12,
//         justifyContent: 'center',
//     },
//     picker: {
//         height: 40,
//         color: '#2C3E50',
//     },
//     textArea: {
//         height: 80,
//         paddingHorizontal: 8,
//         paddingVertical: 8,
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
//         elevation: 3,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
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
//     iconContainer: {
//         top: 0,
//         right: 0,
//         display: 'flex',
//         alignItems: 'center',
//         position: 'absolute',
//         flexDirection: 'row',
//         padding: 16,
//     },
//     headerContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingHorizontal: 8,
//         marginBottom: 14,
//         marginTop: 4,
//     },
//     editIcon: {
//         marginRight: 12,
//         paddingTop: 3,
//     },
//     deleteIcon: {
//         marginRight: 0,
//     },
//     clearButton: {
//         backgroundColor: '#f44336',
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

import React, { useEffect, useState, useCallback } from 'react';
import {
    View, Text, TextInput, Pressable, StyleSheet, FlatList, SafeAreaView, Alert, ActivityIndicator
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SecureStore from 'expo-secure-store';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';

const ExpenseTrackerScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenseCategory, setExpenseCategory] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseDate, setExpenseDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [allExpenses, setAllExpenses] = useState([]);
    const [editExpense, setEditExpense] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [markedDates, setMarkedDates] = useState({});
    const [calendarView, setCalendarView] = useState(false);
    const [showForm, setShowForm] = useState(true);

    const expenseCategories = [
        { label: 'Select Expense Category', value: '', color: '' },
        { label: 'Food', value: 'food', color: '#e59866' },
        { label: 'Travel', value: 'travel', color: '#154360' },
        { label: 'Medical', value: 'medical', color: '#c70039' },
        { label: 'Education', value: 'education', color: '#f39c12' },
        { label: 'Shopping', value: 'shopping', color: '#c0392b' },
        { label: 'Bills', value: 'bills', color: '#8e44ad' },
        { label: 'Entertainment', value: 'entertainment', color: '#2c3e50' },
        { label: 'Misc', value: 'misc', color: '#27ae60' },
        { label: 'Others', value: 'others', color: '#3498db' },
    ];

    const setColorByCategory = useCallback((category) => {
        const categoryObj = expenseCategories.find(cat => cat.value === category);
        return categoryObj ? categoryObj.color : '#2c3e50';
    }, []);

    const handleDateChange = (event, date) => {
        if (event.type === 'set') {
            setExpenseDate(date || new Date());
        }
        setShowDatePicker(false);
    };

    const resetForm = () => {
        setExpenseAmount('');
        setExpenseCategory('');
        setExpenseDescription('');
        setExpenseDate(new Date());
        setEditExpense(null);
    };

    const handleSaveExpense = async () => {
        if (!expenseAmount || !expenseCategory || !expenseDescription) {
            return Alert.alert('Error', 'Please fill all the fields');
        }
        setIsLoading(true);
        const expenseData = {
            id: editExpense ? editExpense.id : Date.now(),
            amount: expenseAmount,
            category: expenseCategory,
            description: expenseDescription,
            date: expenseDate.toISOString(),
        };

        const updatedExpenses = editExpense
            ? allExpenses.map(expense => expense.id === editExpense.id ? { ...expense, ...expenseData } : expense)
            : [...allExpenses, expenseData];

        try {
            await SecureStore.setItemAsync('expenseData', JSON.stringify(updatedExpenses));
            setAllExpenses(updatedExpenses);
            resetForm();
        } catch (error) {
            console.error('Error saving expense:', error);
            Alert.alert('Error', 'There was an error saving the expense');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchExpenses = useCallback(async () => {
        try {
            const storedData = await SecureStore.getItemAsync('expenseData');
            const storedArray = storedData ? JSON.parse(storedData) : [];
            setAllExpenses(storedArray);
        } catch (error) {
            console.error('Error fetching expenses:', error);
            Alert.alert('Error', 'There was an error fetching the expenses');
        }
    }, []);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    useEffect(() => {
        const updatedMarkedDates = {};
        allExpenses.forEach((expense) => {
            const formattedDate = new Date(expense.date).toISOString().split('T')[0];
            updatedMarkedDates[formattedDate] = {
                marked: true,
                dotColor: setColorByCategory(expense.category)
            };
        });
        setMarkedDates(updatedMarkedDates);
    }, [allExpenses, setColorByCategory]);

    const deleteExpense = (id) => {
        Alert.alert(
            'Confirm',
            'Are you sure you want to delete this expense?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            const updatedExpenses = allExpenses.filter(expense => expense.id !== id);
                            await SecureStore.setItemAsync('expenseData', JSON.stringify(updatedExpenses));
                            setAllExpenses(updatedExpenses);
                        } catch (error) {
                            console.error('Error deleting expense:', error);
                            Alert.alert('Error', 'There was an error deleting the expense');
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const editExpenseItem = (expense) => {
        setShowForm(true);
        setExpenseAmount(expense.amount);
        setExpenseCategory(expense.category);
        setExpenseDescription(expense.description);
        setExpenseDate(new Date(expense.date));
        setEditExpense(expense);
    };

    const clearAsyncStorage = () => {
        Alert.alert(
            'Confirm',
            'Are you sure you want to clear all your previous expenses?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            await SecureStore.deleteItemAsync('expenseData');
                            setAllExpenses([]);
                            Alert.alert('Success', 'All expenses cleared successfully');
                        } catch (error) {
                            console.error('Error clearing SecureStore:', error);
                            Alert.alert('Error', 'There was an error clearing the expenses');
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
        const expensesForTheDay = allExpenses.filter(expense => expense.date.startsWith(day.dateString));

        if (expensesForTheDay.length > 0) {
            const expenseDetails = expensesForTheDay.map(expense =>
                `Amount: ${expense.amount}\nCategory: ${expense.category}\nDescription: ${expense.description}`
            ).join('\n\n');
            Alert.alert(`Expenses on ${day.dateString}`, expenseDetails);
        } else {
            Alert.alert('No Expenses', `There are no expenses for the selected date ${day.dateString}`);
        }
    };

    const renderExpenseItem = ({ item }) => (
        <View style={[styles.expenseItem, { backgroundColor: setColorByCategory(item.category) }]}>
            <Text style={styles.expenseAmount}>{`Amount: ${item.amount}`}</Text>
            <Text style={styles.expenseCategory}>{`Category: ${item.category}`}</Text>
            <Text style={styles.expenseDescription}>{`Description: ${item.description}`}</Text>
            <Text style={styles.expenseDate}>{`Date: ${item.date ? new Date(item.date).toLocaleDateString() : ''}`}</Text>
            <View style={styles.iconContainer}>
                <Icon
                    name="edit"
                    size={20}
                    color="#fff"
                    style={styles.editIcon}
                    onPress={() => editExpenseItem(item)}
                />
                <Icon
                    name="trash-o"
                    size={20}
                    color="#fff"
                    style={styles.deleteIcon}
                    onPress={() => deleteExpense(item.id)}
                />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* expese form */}
            {showForm ? (
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Expense Amount"
                        placeholderTextColor="#aaa"
                        keyboardType="numeric"
                        value={expenseAmount ? expenseAmount.toString() : ""}
                        onChangeText={(text) => setExpenseAmount(parseFloat(text) || "")}
                    />
                    <View style={styles.categoryInput}>
                        <Picker
                            selectedValue={expenseCategory}
                            style={styles.picker}
                            onValueChange={(itemValue) => setExpenseCategory(itemValue)}
                        >
                            {expenseCategories.map((category, index) => (
                                <Picker.Item
                                    key={index}
                                    label={category.label}
                                    value={category.value}
                                />
                            ))}
                        </Picker>
                    </View>
                    <Pressable
                        style={[styles.input, styles.datePickerButton]}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Icon name="calendar" size={24} color="#2C3E50" />
                        <Text style={styles.datePickerButtonText}>
                            {expenseDate ? expenseDate.toDateString() : ""}
                        </Text>
                    </Pressable>
                    {showDatePicker && (
                        <DateTimePicker
                            value={expenseDate}
                            mode="date"
                            display="default"
                            maximumDate={new Date()}
                            onChange={handleDateChange}
                        />
                    )}
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Expense Description"
                        placeholderTextColor="#aaa"
                        multiline
                        numberOfLines={4}
                        value={expenseDescription}
                        onChangeText={(text) => setExpenseDescription(text)}
                    />
                    <Pressable style={styles.saveButton} onPress={handleSaveExpense}>
                        {isLoading ? (
                            <ActivityIndicator color={"#8BC34A"} />
                        ) : (
                            <Text style={styles.saveButtonText}>
                                {editExpense ? "Update Expense" : "Save Expense"}
                            </Text>
                        )}
                    </Pressable>
                </View>
            ) : (
                <View>
                    {allExpenses.length > 0 && (
                        <View style={styles.headerContainer}>
                            <Text style={styles.title}>Previous Expenses</Text>
                            <Icon
                                name={calendarView ? "list" : "calendar"}
                                size={22}
                                color="#2C3E50"
                                onPress={() => setCalendarView(!calendarView)}
                            />
                        </View>
                    )}

                    {calendarView ? (
                        <Calendar
                            current={selectedDate}
                            markedDates={markedDates}
                            onDayPress={handleDayPress}
                            theme={calendarTheme}
                        />
                    ) : (
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={allExpenses}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderExpenseItem}
                            getItemLayout={(data, index) => ({
                                length: 100,
                                offset: 100 * index,
                                index,
                            })}
                            initialNumToRender={10}
                            maxToRenderPerBatch={10}
                            marginBottom={20}
                        />
                    )}

                    {!calendarView && allExpenses.length > 0 && (
                        <Pressable style={styles.clearButton} onPress={clearAsyncStorage}>
                            <Text style={styles.clearButtonText}>Clear Expenses</Text>
                        </Pressable>
                    )}
                </View>
            )}

            <View style={styles.floatingToggleContainer}>
                <Icon
                    name={showForm ? "eye" : "eye-slash"}
                    size={30}
                    color="#fff"
                    onPress={() => setShowForm(!showForm)}
                />
            </View>

            {/* expense items */}
        </SafeAreaView>
    );
};

const calendarTheme = {
    backgroundColor: '#ffffff',
    calendarBackground: '#ffffff',
    textSectionTitleColor: '#8BC34A',
    selectedDayBackgroundColor: '#4CAF50',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#8BC34A',
    dayTextColor: '#2d4150',
    textDisabledColor: '#d9e1e8',
    dotColor: '#4CAF50',
    selectedDotColor: '#ffffff',
    arrowColor: '#8BC34A',
    monthTextColor: '#8BC34A',
    indicatorColor: '#4CAF50',
    textDayFontFamily: 'monospace',
    textMonthFontFamily: 'monospace',
    textDayHeaderFontFamily: 'monospace',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
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
        height: 40,
        borderColor: '#2C3E50',
        borderBottomWidth: 1,
        marginBottom: 12,
        justifyContent: 'center',
    },
    picker: {
        height: 40,
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
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
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
    iconContainer: {
        top: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        flexDirection: 'row',
        padding: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        marginBottom: 14,
    },
    editIcon: {
        marginRight: 12,
        paddingTop: 3,
    },
    deleteIcon: {
        marginRight: 0,
    },
    clearButton: {
        backgroundColor: '#f44336',
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
    floatingToggleContainer: {
        position: 'absolute',
        bottom: 40,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
    },
});

export default ExpenseTrackerScreen;

