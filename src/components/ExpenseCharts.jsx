import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ExpenseCharts = ({ totalCategoryWiseExpenses, dataForLineChart, setColorByCategory }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Visualize Your Expense Distribution</Text>
            <View style={styles.chartContainer}>
                <PieChart
                    data={Object.entries(totalCategoryWiseExpenses).map(([category, totalAmount]) => ({
                        name: category,
                        amount: totalAmount,
                        color: setColorByCategory(category),
                        legendFontColor: '#ffffff',
                        legendFontSize: 12,
                    }))}
                    width={screenWidth - 40}
                    height={screenHeight / 3.5}
                    chartConfig={{
                        backgroundColor: '#000000',
                        backgroundGradientFrom: '#2c3e50',
                        backgroundGradientTo: '#4ca1af',
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    }}
                    accessor="amount"
                    backgroundColor='#2c3e50'
                    paddingLeft="15"
                    style={styles.chartStyle}
                />
                <Text style={styles.chartTitle}>Figure: Pie Chart</Text>
            </View>
            <View style={styles.chartContainer}>
                <BarChart
                    data={{
                        labels: Object.keys(totalCategoryWiseExpenses),
                        datasets: [{ data: Object.values(totalCategoryWiseExpenses) }],
                    }}
                    width={screenWidth - 40}
                    height={screenHeight / 3}
                    yAxisLabel="₹"
                    chartConfig={{
                        backgroundColor: '#000000',
                        backgroundGradientFrom: '#2c3e50',
                        backgroundGradientTo: '#4ca1af',
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        barPercentage: 0.5,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    }}
                    xLabelsOffset={-12}
                    verticalLabelRotation={90}
                    style={styles.chartStyle}
                />
                <Text style={styles.chartTitle}>Figure: Bar Chart</Text>
            </View>

            <View style={styles.chartContainer}>
                <LineChart
                    data={{
                        labels: Object.keys(totalCategoryWiseExpenses),
                        datasets: [{ data: dataForLineChart.length > 0 ? dataForLineChart : [0] }],
                    }}
                    width={screenWidth - 40}
                    height={screenHeight / 3}
                    yAxisLabel='₹'
                    chartConfig={{
                        backgroundColor: '#000000',
                        backgroundGradientFrom: '#0f2027',
                        backgroundGradientTo: '#2c5364',
                        color: (opacity = 1) => `rgba(237, 237, 237, ${opacity})`,
                    }}
                    xLabelsOffset={-12}
                    verticalLabelRotation={90}
                    bezier
                    style={styles.chartStyle}
                />
                <Text style={styles.chartTitle}>Figure: Line Chart</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 10,
        textAlign: 'center',
        color: '#2C3E50',
    },
    chartContainer: {
        marginBottom: 10,
    },
    chartTitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#0f2027',
    },
    chartStyle: {
        marginVertical: 10,
        borderRadius: 10,
    },
});

export default ExpenseCharts;
