import React, { useState } from 'react';
import { View, StyleSheet, Modal, Text, TextInput, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['en'] = {
    monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
};
LocaleConfig.defaultLocale = 'en';

const CalendarComponent = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [expenseGoal, setExpenseGoal] = useState('');
    const [expenseDue, setExpenseDue] = useState('');

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
        setIsModalVisible(true);
    };

    const handleSave = () => {
        // Handle saving the expense goal and due
        console.log('Expense Goal:', expenseGoal);
        console.log('Expense Due:', expenseDue);
        setIsModalVisible(false);
    };

    return (
        <View>
            <Calendar
                onDayPress={handleDayPress}
                markedDates={{
                    [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
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
                            placeholder="Expense Due"
                            value={expenseDue}
                            onChangeText={setExpenseDue}
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
};

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
    },
    cancelButtonText: {
        color: 'red',
    },
});

export default CalendarComponent;
