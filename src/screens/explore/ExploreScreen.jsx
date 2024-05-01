// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { MaterialIcons } from '@expo/vector-icons';
// import axios from 'axios';
// import NewsCardComponent from '../../components/NewsCardComponent';
// import { newsApiKey } from '../../../constant';

// const ExploreScreen = () => {
//     const [news, setNews] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const navigation = useNavigation();

//     const NEWS_API_KEY = newsApiKey;

//     useEffect(() => {
//         fetchNews();
//     }, []);

//     const fetchNews = async () => {
//         try {
//             const response = await axios.get(
//                 `https://newsapi.org/v2/top-headlines?category=business&country=us&apiKey=${NEWS_API_KEY}`
//             );

//             setNews(response.data.articles);
//         } catch (error) {
//             console.error('Error fetching news:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleCardPress = (article) => {
//         navigation.navigate('Full Article', { article });
//     };

//     const handleFinancialCalculatorPress = () => {
//         // Navigate to FinancialCalculatorScreen
//         navigation.navigate('FinancialCalculatorScreen');
//     };

//     const handleEducationalContentPress = () => {
//         // Navigate to EducationalContentScreen
//         navigation.navigate('EducationalContentScreen');
//     };

//     const handleStockMarketInsightsPress = () => {
//         // Navigate to StockMarketInsightsScreen
//         navigation.navigate('StockMarketInsightsScreen');
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.navigationIconsContainer}>
//                 <TouchableOpacity onPress={handleFinancialCalculatorPress}>
//                     <MaterialIcons name="attach-money" size={24} color="black" style={styles.icon} />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={handleEducationalContentPress}>
//                     <MaterialIcons name="library-books" size={24} color="black" style={styles.icon} />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={handleStockMarketInsightsPress}>
//                     <MaterialIcons name="trending-up" size={24} color="black" style={styles.icon} />
//                 </TouchableOpacity>
//             </View>
//             {isLoading ? (
//                 <ActivityIndicator size="large" color="#8BC34A" style={styles.spinner} />
//             ) : (
//                 <ScrollView style={styles.newsContainer}>
//                     {news.map((article, index) => (
//                         <NewsCardComponent key={index} article={article} onPress={handleCardPress} />
//                     ))}
//                 </ScrollView>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingHorizontal: 16,
//     },
//     newsContainer: {
//         flex: 1,
//     },
//     spinner: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     navigationIconsContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginVertical: 10,
//     },
//     icon: {
//         marginRight: 20,
//     },
// });

// export default ExploreScreen;

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
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
                <NavigationIconButton iconName="attach-money" onPress={handleFinancialCalculatorPress} />
                <NavigationIconButton iconName="library-books" onPress={handleEducationalContentPress} />
                <NavigationIconButton iconName="trending-up" onPress={handleStockMarketInsightsPress} />
            </View>

            <View style={styles.articleContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#8BC34A" style={styles.spinner} />
                ) : (
                    <ScrollView style={styles.newsContainer} showsVerticalScrollIndicator={false}>
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
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    articleContainer: {
        flex: 1,
    },
    newsContainer: {
        flex: 1,
    },
    spinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navigationIconsContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
});

export default ExploreScreen;
