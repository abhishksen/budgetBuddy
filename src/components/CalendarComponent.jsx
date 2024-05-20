// import React, { useState, useEffect, useCallback } from 'react';
// import { View, StyleSheet, Modal, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
// import { Agenda, LocaleConfig } from 'react-native-calendars';
// import * as SecureStore from 'expo-secure-store';

// LocaleConfig.locales['en'] = {
//     monthNames: [
//         'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
//     ],
//     dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
//     dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
// };
// LocaleConfig.defaultLocale = 'en';

// const CalendarComponent = React.memo(() => {
//     const [selectedDate, setSelectedDate] = useState('');
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [expenseGoal, setExpenseGoal] = useState('');
//     const [description, setDescription] = useState('');
//     const [amount, setAmount] = useState('');
//     const [markedDates, setMarkedDates] = useState({});
//     const [items, setItems] = useState({});

//     useEffect(() => {
//         loadMarkedDates();
//     }, []);

//     const handleDayPress = useCallback((day) => {
//         setSelectedDate(day.dateString);
//         setIsModalVisible(true);
//     }, []);

//     const handleSave = useCallback(async () => {
//         if (!expenseGoal || !description || !amount) {
//             Alert.alert('Error', 'Please enter all fields.');
//             return;
//         }

//         const expenseData = { expenseGoal, description, amount };
//         try {
//             await SecureStore.setItemAsync(selectedDate, JSON.stringify(expenseData));
//             const newMarkedDates = {
//                 ...markedDates,
//                 [selectedDate]: { selected: true, marked: true, selectedColor: '#4CAF50' }
//             };
//             setMarkedDates(newMarkedDates);
//             setItems({
//                 ...items,
//                 [selectedDate]: [expenseData]
//             });
//             await SecureStore.setItemAsync('ExpenseGoals', JSON.stringify(Object.keys(newMarkedDates)));
//             setIsModalVisible(false);
//         } catch (error) {
//             Alert.alert('Error', 'Failed to save the expense. Please try again.');
//         }
//     }, [expenseGoal, description, amount, selectedDate, markedDates, items]);

//     const loadMarkedDates = useCallback(async () => {
//         let keys = await SecureStore.getItemAsync('ExpenseGoals');
//         keys = keys ? JSON.parse(keys) : [];

//         const newMarkedDates = {};
//         const newItems = {};
//         for (let key of keys) {
//             const expenseData = await SecureStore.getItemAsync(key);
//             if (expenseData) {
//                 newMarkedDates[key] = { selected: true, marked: true, selectedColor: '#4CAF50' };
//                 newItems[key] = [JSON.parse(expenseData)];
//             }
//         }
//         setMarkedDates(newMarkedDates);
//         setItems(newItems);
//     }, []);

//     const renderItem = useCallback((item) => (
//         <View style={styles.item}>
//             <Text>Expense Goal: {item.expenseGoal}</Text>
//             <Text>Description: {item.description}</Text>
//             <Text>Amount: {item.amount}</Text>
//         </View>
//     ), []);

//     const ClearAll = async () => {
//         try {
//             await SecureStore.deleteItemAsync('markedDatesKeys');
//             setItems({});
//         } catch (error) {
//             console.log('Error deleting marked dates:', error);
//         }
//     };

//     return (
//         <View style={{ flex: 1 }}>
//             <Agenda
//                 items={items}
//                 loadItemsForMonth={loadMarkedDates}
//                 selected={selectedDate}
//                 renderItem={renderItem}
//                 onDayPress={handleDayPress}
//                 theme={{
//                     backgroundColor: '#ffffff',
//                     calendarBackground: '#ffffff',
//                     textSectionTitleColor: '#8BC34A',
//                     selectedDayBackgroundColor: '#4CAF50',
//                     selectedDayTextColor: '#ffffff',
//                     todayTextColor: '#8BC34A',
//                     dayTextColor: '#2d4150',
//                     textDisabledColor: '#d9e1e8',
//                     dotColor: '#4CAF50',
//                     selectedDotColor: '#ffffff',
//                     arrowColor: '#8BC34A',
//                     monthTextColor: '#8BC34A',
//                     indicatorColor: '#4CAF50',
//                     textDayFontFamily: 'monospace',
//                     textMonthFontFamily: 'monospace',
//                     textDayHeaderFontFamily: 'monospace',
//                     textDayFontWeight: '300',
//                     textMonthFontWeight: 'bold',
//                     textDayHeaderFontWeight: '300',
//                     textDayFontSize: 16,
//                     textMonthFontSize: 16,
//                     textDayHeaderFontSize: 16
//                 }}
//             />
//             <Modal
//                 visible={isModalVisible}
//                 transparent={true}
//                 animationType="slide"
//                 onRequestClose={() => setIsModalVisible(false)}
//             >
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalContent}>
//                         <Text style={styles.modalTitle}>Log Expense for {selectedDate}</Text>
//                         <TextInput
//                             placeholder="Expense Goal"
//                             value={expenseGoal}
//                             onChangeText={setExpenseGoal}
//                             style={styles.input}
//                         />
//                         <TextInput
//                             placeholder="Description"
//                             value={description}
//                             onChangeText={setDescription}
//                             style={styles.input}
//                         />
//                         <TextInput
//                             placeholder="Amount"
//                             value={amount}
//                             onChangeText={setAmount}
//                             style={styles.input}
//                         />
//                         <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//                             <Text style={styles.saveButtonText}>Save</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
//                             <Text style={styles.cancelButtonText}>Cancel</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </Modal>
//         </View>
//     );
// });

// const styles = StyleSheet.create({
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     modalContent: {
//         width: 300,
//         padding: 20,
//         backgroundColor: 'white',
//         borderRadius: 10,
//         alignItems: 'center',
//     },
//     modalTitle: {
//         fontSize: 18,
//         marginBottom: 10,
//         color: '#8BC34A',
//     },
//     input: {
//         width: '100%',
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 10,
//     },
//     saveButton: {
//         backgroundColor: '#4CAF50',
//         padding: 10,
//         borderRadius: 5,
//         marginBottom: 10,
//     },
//     saveButtonText: {
//         color: 'white',
//     },
//     cancelButton: {
//         padding: 10,
//         borderRadius: 5,
//         backgroundColor: '#8BC34A',
//     },
//     cancelButtonText: {
//         color: 'white',
//     },
//     item: {
//         backgroundColor: 'white',
//         flex: 1,
//         borderRadius: 5,
//         padding: 10,
//         marginRight: 10,
//         marginTop: 17
//     }
// });

// export default CalendarComponent;

import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Modal, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import * as SecureStore from 'expo-secure-store';

LocaleConfig.locales['en'] = {
    monthNames: [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
};
LocaleConfig.defaultLocale = 'en';

const CalendarComponent = React.memo(() => {
    const [selectedDate, setSelectedDate] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [expenseGoal, setExpenseGoal] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [markedDates, setMarkedDates] = useState({});
    const [items, setItems] = useState({});

    useEffect(() => {
        loadMarkedDates();
    }, []);

    const handleDayPress = useCallback((day) => {
        setSelectedDate(day.dateString);
        setIsModalVisible(true);
    }, []);

    const handleSave = useCallback(async () => {
        if (!expenseGoal) {
            Alert.alert('Error', 'Please enter an expense goal.');
            return;
        }

        const expenseData = { expenseGoal, description, amount };
        try {
            await SecureStore.setItemAsync(selectedDate, JSON.stringify(expenseData));
            const newMarkedDates = {
                ...markedDates,
                [selectedDate]: { selected: true, marked: true, selectedColor: '#4CAF50' }
            };
            setMarkedDates(newMarkedDates);
            setItems({
                ...items,
                [selectedDate]: [expenseData]
            });
            await SecureStore.setItemAsync('ExpenseGoals', JSON.stringify(Object.keys(newMarkedDates)));
            setIsModalVisible(false);
            // Clear input fields after saving
            setExpenseGoal('');
            setDescription('');
            setAmount('');
        } catch (error) {
            Alert.alert('Error', 'Failed to save the expense. Please try again.');
        }
    }, [expenseGoal, description, amount, selectedDate, markedDates, items]);

    const loadMarkedDates = useCallback(async () => {
        let keys = await SecureStore.getItemAsync('ExpenseGoals');
        keys = keys ? JSON.parse(keys) : [];

        const newMarkedDates = {};
        const newItems = {};
        for (let key of keys) {
            const expenseData = await SecureStore.getItemAsync(key);
            if (expenseData) {
                newMarkedDates[key] = { selected: true, marked: true, selectedColor: '#4CAF50' };
                newItems[key] = [JSON.parse(expenseData)];
            }
        }
        setMarkedDates(newMarkedDates);
        setItems(newItems);
    }, []);

    const renderItem = useCallback((item) => (
        <View style={styles.item}>
            <Text>Expense Goal: {item.expenseGoal}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Amount: {item.amount}</Text>
        </View>
    ), []);

    return (
        <View style={{ flex: 1 }}>
            <Agenda
                items={items}
                loadItemsForMonth={loadMarkedDates}
                selected={selectedDate}
                renderItem={renderItem}
                onDayPress={handleDayPress}
                theme={{
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
                }}
            />
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Log Expense for {selectedDate}</Text>
                        <TextInput
                            placeholder="Expense Goal"
                            value={expenseGoal}
                            onChangeText={setExpenseGoal}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Description"
                            value={description}
                            onChangeText={setDescription}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Amount"
                            value={amount}
                            onChangeText={setAmount}
                            style={styles.input}
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
});

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10,
        color: '#8BC34A',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    saveButtonText: {
        color: 'white',
    },
    cancelButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#8BC34A',
    },
    cancelButtonText: {
        color: 'white',
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    }
});

export default CalendarComponent;

