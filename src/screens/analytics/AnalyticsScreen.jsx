// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const AnalyticsScreen = () => {
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Analytics Screen</Text>
//             {/* Add your analytics content here */}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         padding: 16,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 16,
//         color: '#2C3E50',
//     },
// });

// export default AnalyticsScreen;


import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';

const AnalyticsScreen = () => {
    // Dummy data for pie chart
    const data = [
        {
            name: 'Food',
            amount: 300,
            color: '#3498db',
            legendFontColor: '#7F7F7F',
            legendFontSize: 10,
        },
        {
            name: 'Travel',
            amount: 150,
            color: '#9b59b6',
            legendFontColor: '#7F7F7F',
            legendFontSize: 10,
        },
        {
            name: 'Shopping',
            amount: 200,
            color: '#e67e22',
            legendFontColor: '#7F7F7F',
            legendFontSize: 10,
        },
        {
            name: 'Bills',
            amount: 100,
            color: '#e74c3c',
            legendFontColor: '#7F7F7F',
            legendFontSize: 10,
        },
        {
            name: 'Misc',
            amount: 50,
            color: '#2ecc71',
            legendFontColor: '#7F7F7F',
            legendFontSize: 10,
        },
    ];

    const totalAmount = data.reduce((total, item) => total + item.amount, 0);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

            {/* Stats Table and Total Amount */}
            <View style={styles.statsContainer}>
                <Text style={styles.statsTitle}>Expense Statistics</Text>
                <View style={styles.statsTable}>
                    {data.map((item, index) => (
                        <View key={index} style={styles.statsRow}>
                            <Text style={styles.statsCategory}>{item.name}</Text>
                            <Text style={styles.statsAmount}>{`₹${item.amount.toFixed(2)}`}</Text>
                        </View>
                    ))}
                    <View style={styles.statsRow}>
                        <Text style={styles.statsCategory}>Total</Text>
                        <Text style={styles.statsAmount}>{`₹${totalAmount.toFixed(2)}`}</Text>
                    </View>
                </View>
            </View>

            {/* chart container with chart items */}
            <View style={styles.chartContainer}>
                <Text style={styles.title}>Visualize Your Expense Distribution</Text>
                {/* Bar Chart */}
                <BarChart
                    data={{
                        labels: data.map(item => item.name),
                        datasets: [
                            {
                                data: data.map(item => item.amount),
                            },
                        ],
                    }}
                    width={300}
                    height={200}
                    // yAxisSuffix="₹"
                    yAxisLabel="₹"
                    chartConfig={{
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />

                {/* pie chart */}
                <PieChart
                    data={data}
                    width={300}
                    height={200}
                    chartConfig={{
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`, // blue color
                    }}
                    accessor="amount"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    style={{
                        marginVertical: 10,
                        borderRadius: 16,
                    }}
                />

                {/* Line Chart */}
                <LineChart
                    data={{
                        labels: data.map(item => item.name),
                        datasets: [
                            {
                                data: data.map(item => item.amount),
                            },
                        ],
                    }}
                    width={300}
                    height={200}
                    // yAxisSuffix="₹"
                    yAxisLabel='₹'
                    chartConfig={{
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        color: (opacity = 1) => `rgba(255, 185, 0, ${opacity})`, // Yellow color
                    }}
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
        // marginTop: 20,
        // marginBottom: 20,
        marginVertical: 10,
        padding: 16,
        borderRadius: 10,
        backgroundColor: '#2C3E50', // Light grey background
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
