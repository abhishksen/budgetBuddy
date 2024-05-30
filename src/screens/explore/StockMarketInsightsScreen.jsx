import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { alphaVantageStockAPI } from '../../../constant';

const API_KEY = alphaVantageStockAPI;
const STOCK_SYMBOLS = ['AAPL', 'GOOGL', 'AMZN'];

const StockMarketInsightsScreen = () => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const stockData = await Promise.all(
                    STOCK_SYMBOLS.map(async (symbol) => {
                        const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
                        const data = await response.json();
                        return {
                            symbol,
                            price: data['Global Quote']['05. price'],
                        };
                    })
                );
                setStocks(stockData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStockData();
    }, []);

    const renderStockItem = ({ item }) => (
        <View style={styles.stockItem}>
            <Text style={styles.stockSymbol}>{item.symbol}</Text>
            <Text style={styles.stockPrice}>${item.price}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#4CAF50" />
            ) : error ? (
                <Text style={styles.errorText}>Error: {error}</Text>
            ) : (
                <FlatList
                    data={stocks}
                    renderItem={renderStockItem}
                    keyExtractor={(item) => item.symbol}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    list: {
        paddingHorizontal: 20,
    },
    stockItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    stockSymbol: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    stockPrice: {
        fontSize: 18,
        color: '#888',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default StockMarketInsightsScreen;
