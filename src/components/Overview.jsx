import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Overview = () => {
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const expensesData = await SecureStore.getItemAsync('expenseData');
                if (expensesData) {
                    setExpenses(JSON.parse(expensesData));
                }
            } catch (error) {
                console.error('Error fetching expenses:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchExpenses();
    }, []);

    const calculateCategoryWiseTotal = () => {
        const categoryTotals = {};
        expenses.forEach((item) => {
            if (categoryTotals[item.category]) {
                categoryTotals[item.category] += item.amount;
            } else {
                categoryTotals[item.category] = item.amount;
            }
        });
        return categoryTotals;
    };

    const getOverviewData = () => {
        if (expenses.length === 0) return {};

        const totalAmount = expenses.reduce((total, item) => total + item.amount, 0);

        const categoryTotals = calculateCategoryWiseTotal();
        const categories = Object.keys(categoryTotals);
        const highestCategory = categories.reduce((max, category) => categoryTotals[category] > categoryTotals[max] ? category : max, categories[0]);
        const lowestCategory = categories.reduce((min, category) => categoryTotals[category] < categoryTotals[min] ? category : min, categories[0]);

        return {
            totalExpenses: expenses.length,
            totalAmount,
            highestCategory,
            lowestCategory,
            categoryTotals
        };
    };

    const overviewData = getOverviewData();

    if (isLoading) return <ActivityIndicator style={styles.loader} size="large" color="#4CAF50" />;

    if (expenses.length === 0) return <Text style={styles.notFoundText}>Not enough data!</Text>;

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#8BC34A', '#4CAF50', '#00796B']} style={styles.card}>
                <View style={styles.statItem}>
                    <Icon name="receipt" size={24} color="#fff" />
                    <Text style={styles.statText}>Total Expenses: {overviewData.totalExpenses}</Text>
                </View>
                <View style={styles.statItem}>
                    <Icon name="attach-money" size={24} color="#fff" />
                    <Text style={styles.statText}>Total Spent: ₹{overviewData.totalAmount.toFixed(2)}</Text>
                </View>
                <View style={styles.statItem}>
                    <Icon name="arrow-upward" size={24} color="#fff" />
                    <Text style={styles.statText}>Highest: {overviewData.highestCategory} (₹{overviewData.categoryTotals[overviewData.highestCategory].toFixed(2)})</Text>
                </View>
                <View style={styles.statItem}>
                    <Icon name="arrow-downward" size={24} color="#fff" />
                    <Text style={styles.statText}>Lowest: {overviewData.lowestCategory} (₹{overviewData.categoryTotals[overviewData.lowestCategory].toFixed(2)})</Text>
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
        height: 200,
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 15,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    statText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 10,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notFoundText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f44336',
        paddingVertical: 20,
        textAlign: 'center',
    },
});

export default Overview;
