// ExpenseTrackingScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExpenseTrackingScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Expense Tracking Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ExpenseTrackingScreen;
