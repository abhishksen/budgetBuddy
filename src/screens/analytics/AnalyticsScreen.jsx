import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { BarChart, LineChart, PieChart, ProgressChart } from 'react-native-chart-kit';
import * as SecureStore from 'expo-secure-store';
import NotFound from '../../components/NotFound';

const AnalyticsScreen = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const expensesData = await SecureStore.getItemAsync('expenseData');
                if (expensesData) {
                    setExpenses(JSON.parse(expensesData));
                }
            } catch (error) {
                console.error('Error fetching expenses:', error);
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

    // console.log(totalCategoryWiseExpenses);

    const setColorByCategory = (category) => {
        const trimmedCategory = category.trim().toLowerCase();

        if (trimmedCategory === 'food') return '#3498db';
        else if (trimmedCategory === 'travel') return '#9b59b6';
        else if (trimmedCategory === 'medical') return '#e74c3c';
        else if (trimmedCategory === 'education') return '#f1c40f';
        else if (trimmedCategory === 'shopping') return '#e67e22';
        else if (trimmedCategory === 'bills') return '#e74c3c';
        else if (trimmedCategory === 'entertainment') return '#f1c40f';
        else if (trimmedCategory === 'misc') return '#2ecc71';
        else if (trimmedCategory === 'others') return '#1abc9c';
        else return '#2c3e50';
    };

    const dataForLineChart = Object.values(totalCategoryWiseExpenses);

    if (expenses.length === 0) return <NotFound text={"Not enough data!"} />;

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

            {/* chart container with chart items */}
            <View style={styles.chartContainer}>
                <Text style={styles.title}>Visualize Your Expense Distribution</Text>
                {/* Pie Chart */}
                <PieChart
                    data={Object.entries(totalCategoryWiseExpenses).map(([category, totalAmount]) => ({
                        name: category,
                        amount: totalAmount,
                        // color: '#' + Math.floor(Math.random() * 16777215).toString(16), // Generate random color
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
                {/* <ProgressChart
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
                /> */}

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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
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
