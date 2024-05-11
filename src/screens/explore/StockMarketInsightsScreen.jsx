import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const StockMarketInsightsScreen = () => {


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Stock Market Insights</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default StockMarketInsightsScreen;
