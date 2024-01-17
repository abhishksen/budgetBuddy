// // ExploreScreen.js

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import NewsCardComponent from '../../components/NewsCardComponent';
// import Modal from 'react-native-modal';

// const ExploreScreen = () => {
//     const [news, setNews] = useState([]);
//     const [isLoading, setLoading] = useState(false); // Set loading to true on component mount
//     const navigation = useNavigation();

//     const NEWS_API_KEY = 'c908d62e5edd491285c53578aa67b831';
//     // const NEWS_API_KEY = process.env.NEWS_API_KEY;

//     useEffect(() => {
//         fetchNews();
//     }, []);

//     const fetchNews = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get(
//                 `https://newsapi.org/v2/top-headlines?category=business&country=us&apiKey=${NEWS_API_KEY}`
//             );

//             setNews(response.data.articles);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching news:', error);
//         }
//     };

//     const handleCardPress = (article) => {
//         // Navigate to a new screen to display the full article
//         navigation.navigate('Full Article', { article });
//     };

//     return (
//         <View style={styles.container}>
//             <ScrollView style={styles.newsContainer} showsVerticalScrollIndicator={false}>
//                 {news.map((article, index) => (
//                     <NewsCardComponent
//                         key={index}
//                         article={article}
//                         onPress={handleCardPress}
//                     />
//                 ))}
//             </ScrollView>
//             <Modal isVisible={isLoading}>
//                 <View style={styles.modalContainer}>
//                     <Text style={styles.modalText}>Loading...</Text>
//                 </View>
//             </Modal>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingHorizontal: 16,
//     },
//     header: {
//         marginBottom: 20,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 8,
//     },
//     newsContainer: {
//         flex: 1,
//     },
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     modalText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
// });

// export default ExploreScreen;

// ExploreScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import NewsCardComponent from '../../components/NewsCardComponent';

const ExploreScreen = () => {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // State to manage loading state
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
            setIsLoading(false); // Set loading to false once data is fetched
        }
    };

    const handleCardPress = (article) => {
        // Navigate to a new screen to display the full article
        navigation.navigate('Full Article', { article });
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                // Display spinner when loading
                <ActivityIndicator size="large" color="#8BC34A" style={styles.spinner} />
            ) : (
                // Display news when not loading
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

