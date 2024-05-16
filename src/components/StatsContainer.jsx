import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatsContainer = ({ totalCategoryWiseExpenses, expenses }) => {
    return (
        <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Expense Statistics</Text>
            <View style={styles.statsTable}>
                {Object.entries(totalCategoryWiseExpenses).map(([category, totalAmount], index) => (
                    <View key={index} style={styles.statsRow}>
                        <Text style={styles.statsCategory}>{category}</Text>
                        <Text style={styles.statsAmount}>{`₹${totalAmount.toFixed(2)}`}</Text>
                    </View>
                ))}
                <View style={styles.statsRow}>
                    <Text style={styles.statsCategory}>Total</Text>
                    <Text style={styles.statsAmount}>{`₹${expenses.reduce((total, item) => total + item.amount, 0).toFixed(2)}`}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    statsContainer: {
        marginVertical: 10,
        padding: 16,
        borderRadius: 10,
        backgroundColor: '#2C3E50',
    },
    statsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff',
    },
    statsTable: {
        flexDirection: 'column',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    statsCategory: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#fff',
    },
    statsAmount: {
        fontSize: 16,
        color: '#3498db',
    },
});

export default StatsContainer;
