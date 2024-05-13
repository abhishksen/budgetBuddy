import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { BarChart, LineChart, PieChart, ProgressChart } from 'react-native-chart-kit';
import * as SecureStore from 'expo-secure-store';
import NotFound from '../../components/NotFound';
import AllExpenses from '../../components/AllExpenses';

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

    // console.log(expenses);

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

    // console.log(totalCategoryWiseExpenses);

    const setColorByCategory = (category) => {
        const trimmedCategory = category.trim().toLowerCase();

        switch (trimmedCategory) {
            case 'food':
                return '#e59866'; // Copper
            case 'travel':
                return '#154360'; // Dark blue
            case 'medical':
                return '#c70039'; // Crimson
            case 'education':
                return '#f39c12'; // Orange
            case 'shopping':
                return '#c0392b'; // Fire engine red
            case 'bills':
                return '#8e44ad'; // Purple
            case 'entertainment':
                return '#2c3e50'; // Midnight blue
            case 'misc':
                return '#27ae60'; // Nephritis green
            case 'others':
                return '#3498db'; // Dodger blue
            default:
                return '#2c3e50'; // Default to Midnight blue
        }
    };


    const dataForLineChart = Object.values(totalCategoryWiseExpenses);

    const handleToggleAllExpenses = () => setShowAllExpenses(true);
    const handleToggleStats = () => setShowAllExpenses(false);

    if (expenses.length === 0) return <NotFound text={"Not enough data!"} />;
    if (isLoading) return <NotFound text={"Loading..."} />;

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

            {/* Stats Table and Total Amount */}
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

            {/* Toggle Buttons */}
            <View style={styles.toggleButtonsContainer}>
                <Pressable style={[styles.toggleButton, !showAllExpenses && styles.activeToggleButton]} onPress={handleToggleStats}>
                    <Text style={[styles.toggleButtonText, !showAllExpenses && styles.activeToggleButtonText]}>Statistics</Text>
                </Pressable>
                <Pressable style={[styles.toggleButton, showAllExpenses && styles.activeToggleButton]} onPress={handleToggleAllExpenses}>
                    <Text style={[styles.toggleButtonText, showAllExpenses && styles.activeToggleButtonText]}>All Expenses</Text>
                </Pressable>
            </View>

            {/* Render All Expenses or Stats */}
            {showAllExpenses ? (
                <View style={styles.chartContainer}>
                    <AllExpenses data={expenses} />
                </View>
            ) : (
                < View style={styles.chartContainer}>
                    <Text style={styles.title}>Visualize Your Expense Distribution</Text>
                    {/* Pie Chart */}
                    <PieChart
                        data={Object.entries(totalCategoryWiseExpenses).map(([category, totalAmount]) => ({
                            name: category,
                            amount: totalAmount,
                            color: setColorByCategory(category), // Generate random color
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 10,
                        }))}
                        width={300}
                        height={200}
                        chartConfig={{
                            backgroundGradientFrom: '#fff',
                            backgroundGradientTo: '#fff',
                            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                        }}
                        accessor="amount"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        style={{
                            marginVertical: 10,
                            borderRadius: 16,
                        }}
                    />

                    {/* Bar Chart */}
                    <BarChart
                        data={{
                            labels: Object.keys(totalCategoryWiseExpenses),
                            datasets: [
                                {
                                    data: Object.values(totalCategoryWiseExpenses),
                                },
                            ],
                        }}
                        width={300}
                        height={200}
                        yAxisLabel="₹"
                        chartConfig={{
                            backgroundGradientFrom: '#fff',
                            backgroundGradientTo: '#fff',
                            color: (opacity = 1) => `rgba(4,77,186, ${opacity})`,
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />

                    {/* progress chart  */}
                    <ProgressChart
                        data={{
                            labels: Object.keys(totalCategoryWiseExpenses),
                            data: dataForLineChart.length > 0 ? dataForLineChart : [0],
                        }}
                        width={300}
                        height={220}
                        strokeWidth={8}
                        radius={20}
                        hideLegend={false}
                        chartConfig={{
                            backgroundGradientFrom: '#fff',
                            backgroundGradientTo: '#fff',
                            color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />

                    {/* Line Chart */}
                    <LineChart
                        data={{
                            labels: Object.keys(totalCategoryWiseExpenses),
                            datasets: [
                                {
                                    data: dataForLineChart.length > 0 ? dataForLineChart : [0],
                                }
                            ]
                        }}
                        width={300}
                        height={200}
                        yAxisLabel='₹'
                        chartConfig={{
                            backgroundGradientFrom: '#fff',
                            backgroundGradientTo: '#fff',
                            color: (opacity = 1) => `rgba(255, 185, 0, ${opacity})`,
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />
                </View>
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
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 10,
        textAlign: 'center',
        color: '#2C3E50',
    },
    chartContainer: {
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 10,
    },
});

export default AnalyticsScreen;
