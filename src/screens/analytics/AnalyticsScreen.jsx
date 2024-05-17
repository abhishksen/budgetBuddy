import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import NotFound from '../../components/NotFound';
import AllExpenses from '../../components/AllExpenses';
import ExpenseCharts from '../../components/ExpenseCharts';
import StatsContainer from '../../components/StatsContainer';

const AnalyticsScreen = () => {
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAllExpenses, setShowAllExpenses] = useState(false);

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

    const totalCategoryWiseExpenses = calculateCategoryWiseTotal();

    const setColorByCategory = (category) => {
        const trimmedCategory = category.trim().toLowerCase();

        switch (trimmedCategory) {
            case 'food':
                return '#e59866';
            case 'travel':
                return '#154360';
            case 'medical':
                return '#c70039';
            case 'education':
                return '#f39c12';
            case 'shopping':
                return '#c0392b';
            case 'bills':
                return '#8e44ad';
            case 'entertainment':
                return '#2c3e50';
            case 'misc':
                return '#27ae60';
            case 'others':
                return '#3498db';
            default:
                return '#2c3e50';
        }
    };

    const dataForLineChart = Object.values(totalCategoryWiseExpenses);

    const handleToggleAllExpenses = () => setShowAllExpenses(true);
    const handleToggleStats = () => setShowAllExpenses(false);

    if (expenses.length === 0) return <NotFound text={"Not enough data!"} />;
    if (isLoading) return <NotFound text={"Loading..."} />;

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

            <StatsContainer totalCategoryWiseExpenses={totalCategoryWiseExpenses} expenses={expenses} />

            <View style={styles.toggleButtonsContainer}>
                <Pressable style={[styles.toggleButton, !showAllExpenses && styles.activeToggleButton]} onPress={handleToggleStats}>
                    <Text style={[styles.toggleButtonText, !showAllExpenses && styles.activeToggleButtonText]}>Statistics</Text>
                </Pressable>
                <Pressable style={[styles.toggleButton, showAllExpenses && styles.activeToggleButton]} onPress={handleToggleAllExpenses}>
                    <Text style={[styles.toggleButtonText, showAllExpenses && styles.activeToggleButtonText]}>All Expenses</Text>
                </Pressable>
            </View>

            {showAllExpenses ? (
                <View style={styles.tableContainer}>
                    <AllExpenses data={expenses} />
                </View>
            ) : (
                <ExpenseCharts
                    totalCategoryWiseExpenses={totalCategoryWiseExpenses}
                    dataForLineChart={dataForLineChart}
                    setColorByCategory={setColorByCategory}
                />
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    toggleButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    toggleButton: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 2,
        backgroundColor: '#4CAF50',
        marginHorizontal: 5,
    },
    activeToggleButton: {
        backgroundColor: '#8BC34A',
    },
    toggleButtonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
    },
    activeToggleButtonText: {
        fontWeight: 'bold',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 10,
        textAlign: 'center',
        color: '#2C3E50',
    },
    tableContainer: {
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 10,
    },
});

export default AnalyticsScreen;
