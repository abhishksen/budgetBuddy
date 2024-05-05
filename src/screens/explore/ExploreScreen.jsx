import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import NewsCardComponent from '../../components/NewsCardComponent';
import { newsApiKey } from '../../../constant';
import NavigationIconButton from '../../components/NavigationIconButton';

const ExploreScreen = () => {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    const NEWS_API_KEY = newsApiKey;

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get(
                `https://newsapi.org/v2/top-headlines?category=business&country=us&apiKey=${NEWS_API_KEY}`
            );

            setNews(response.data.articles);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCardPress = (article) => {
        navigation.navigate('Full Article', { article });
    };

    const handleFinancialCalculatorPress = () => {
        // Navigate to FinancialCalculatorScreen
        navigation.navigate('Financial Calculator');
    };

    const handleEducationalContentPress = () => {
        // Navigate to EducationalContentScreen
        navigation.navigate('Educational Content');
    };

    const handleStockMarketInsightsPress = () => {
        // Navigate to StockMarketInsightsScreen
        navigation.navigate('Market Insights');
    };

    return (
        <View style={styles.container}>
            <View style={styles.navigationIconsContainer}>
                <NavigationIconButton iconName="calculate" onPress={handleFinancialCalculatorPress} />
                <NavigationIconButton iconName="library-books" onPress={handleEducationalContentPress} />
                <NavigationIconButton iconName="trending-up" onPress={handleStockMarketInsightsPress} />
            </View>

            <View style={styles.articleContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#8BC34A" style={styles.spinner} />
                ) : (
                    <ScrollView style={styles.newsContainer} showsVerticalScrollIndicator={false}>
                        <Text style={styles.title}>Top Business News</Text>
                        {news.map((article, index) => (
                            <NewsCardComponent key={index} article={article} onPress={handleCardPress} />
                        ))}
                    </ScrollView>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    articleContainer: {
        paddingHorizontal: 18,
        flex: 1,
    },
    newsContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        color: '#333',
        textAlign: 'center',
        fontWeight: 'bold',
        marginVertical: 10,
        textDecorationLine: 'underline',
    },
    spinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navigationIconsContainer: {
        backgroundColor: '#8BC34A',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 6,
    },
});

export default ExploreScreen;
