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
import { PieChart } from 'react-native-chart-kit';
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

    return (
        <ScrollView style={styles.container}>
            <View style={styles.chartContainer}>
                <PieChart
                    data={data}
                    width={300}
                    height={200}
                    chartConfig={{
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                    }}
                    accessor="amount"
                    backgroundColor="transparent"
                    paddingLeft="15"
                />
            </View>
            <Text style={styles.title}>Expense Distribution</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        textAlign: 'center',
        color: '#2C3E50',
    },
    chartContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
});

export default AnalyticsScreen;
