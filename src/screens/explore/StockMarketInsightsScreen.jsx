import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { alphaVantageStockAPI, coinMarketCapAPI } from '../../../constant';
import Icon from 'react-native-vector-icons/Ionicons';

const STOCK_API_KEY = alphaVantageStockAPI;
const CRYPTO_API_KEY = coinMarketCapAPI;
const STOCK_SYMBOLS = ['AAPL', 'GOOGL', 'AMZN'];

const StockMarketInsightsScreen = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [view, setView] = useState('cryptos'); // 'stocks' or 'cryptos'

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                if (view === 'stocks') {
                    const stockData = await Promise.all(
                        STOCK_SYMBOLS.map(async (symbol) => {
                            const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${STOCK_API_KEY}`);
                            const data = await response.json();
                            const globalQuote = data['Global Quote'];
                            const price = parseFloat(globalQuote['05. price']);
                            const open = parseFloat(globalQuote['02. open']);
                            const change = price - open;
                            const changePercent = ((change / open) * 100).toFixed(2);
                            return {
                                name: symbol,
                                symbol,
                                price,
                                change: change.toFixed(2),
                                changePercent
                            };
                        })
                    );
                    setData(stockData);
                } else {
                    const response = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=10&convert=USD`, {
                        headers: {
                            'X-CMC_PRO_API_KEY': CRYPTO_API_KEY,
                        },
                    });
                    const data = await response.json();
                    const cryptos = data.data.map(crypto => ({
                        name: crypto.name,
                        symbol: crypto.symbol,
                        price: crypto.quote.USD.price,
                        change: (crypto.quote.USD.price * (crypto.quote.USD.percent_change_24h / 100)).toFixed(2),
                        changePercent: crypto.quote.USD.percent_change_24h.toFixed(2),
                    }));
                    setData(cryptos);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [view]);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemHeader}>
                <Text style={styles.itemName}>{item.name} ({item.symbol})</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.itemDetails}>
                <Text style={[styles.itemChange, item.change >= 0 ? styles.up : styles.down]}>
                    {item.change >= 0 ? '+' : ''}{item.change} ({item.changePercent}%)
                </Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.switchContainer}>
                <TouchableOpacity onPress={() => setView('stocks')} style={styles.switchButton}>
                    <Icon name="trending-up-outline" size={24} color={view === 'stocks' ? '#4CAF50' : '#888'} />
                    <Text style={[styles.switchText, view === 'stocks' && { color: '#4CAF50' }]}>Stocks</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setView('cryptos')} style={styles.switchButton}>
                    <Icon name="logo-bitcoin" size={24} color={view === 'cryptos' ? '#4CAF50' : '#888'} />
                    <Text style={[styles.switchText, view === 'cryptos' && { color: '#4CAF50' }]}>Cryptos</Text>
                </TouchableOpacity>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#4CAF50" />
            ) : error ? (
                <Text style={styles.errorText}>Error: {error}</Text>
            ) : (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.symbol}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    switchButton: {
        alignItems: 'center',
    },
    switchText: {
        fontSize: 16,
        marginTop: 4,
        color: '#888',
    },
    list: {
        paddingHorizontal: 20,
    },
    itemContainer: {
        padding: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 18,
        color: '#888',
    },
    itemDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    itemChange: {
        fontSize: 16,
    },
    up: {
        color: 'green',
    },
    down: {
        color: 'red',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default StockMarketInsightsScreen;
