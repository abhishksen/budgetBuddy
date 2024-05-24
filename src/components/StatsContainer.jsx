import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Define a mapping from category names to icons
const categoryIcons = {
    food: 'restaurant',
    travel: 'directions-car',
    medical: 'local-hospital',
    education: 'school',
    shopping: 'shopping-cart',
    bills: 'receipt',
    entertainment: 'local-movies',
    misc: 'miscellaneous-services',
    others: 'category',
};

const StatsContainer = ({ totalCategoryWiseExpenses, expenses }) => {
    const totalSpent = expenses.reduce((total, item) => total + item.amount, 0);

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#8BC34A', '#4CAF50', '#00796B']} style={styles.card}>
                <Text style={styles.statsTitle}>Expense Statistics</Text>
                <View style={styles.statsTable}>
                    {Object.entries(totalCategoryWiseExpenses).map(([category, totalAmount], index) => (
                        <View key={index} style={styles.statsRow}>
                            <Icon
                                name={categoryIcons[category] || 'category'}
                                size={24}
                                color="#fff"
                            />
                            <Text style={styles.statsCategory}>{category}</Text>
                            <Text style={styles.statsAmount}>{`₹${totalAmount.toFixed(2)}`}</Text>
                        </View>
                    ))}
                    <View style={styles.statsRow}>
                        <Icon name="attach-money" size={24} color="#fff" />
                        <Text style={styles.statsCategory}>Total</Text>
                        <Text style={styles.statsAmount}>{`₹${totalSpent.toFixed(2)}`}</Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 16,
    },
    card: {
        borderRadius: 15,
        padding: 20,
        width: Dimensions.get('window').width - 32,
        justifyContent: 'center',
    },
    statsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff',
        textAlign: 'center',
    },
    statsTable: {
        flexDirection: 'column',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    statsCategory: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        flex: 1,
        marginLeft: 10,
    },
    statsAmount: {
        fontSize: 16,
        color: '#ffeb3b',
        flex: 1,
        textAlign: 'right',
    },
});

export default StatsContainer;
