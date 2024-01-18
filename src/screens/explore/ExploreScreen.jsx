import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import NewsCardComponent from '../../components/NewsCardComponent';

const ExploreScreen = () => {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    const NEWS_API_KEY = 'c908d62e5edd491285c53578aa67b831';
    //   const NEWS_API_KEY = process.env.NEWS_API_KEY;

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

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#8BC34A" style={styles.spinner} />
            ) : (
                <ScrollView style={styles.newsContainer}>
                    {news.map((article, index) => (
                        <NewsCardComponent key={index} article={article} onPress={handleCardPress} />
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: 'center',
    },
    newsContainer: {
        flex: 1,
    },
    spinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ExploreScreen;

