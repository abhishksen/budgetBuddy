import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StockMarketInsightsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Stock Market Insights</Text>
            {/* Add your stock market insights here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default StockMarketInsightsScreen;
