import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, SafeAreaView, TextInput, Pressable } from 'react-native';
import VideoCard from '../../components/VideoCard';
import { newsApiKey, youtubeApiKey } from '../../../constant';
import VideoPopup from '../../components/VideoPopup';
import NewsCardComponent from '../../components/NewsCardComponent';
import { useNavigation } from '@react-navigation/native';
import Fontawesome from 'react-native-vector-icons/FontAwesome';
import { randomSearchQueries } from '../../utils/randomSearchQueries';

const EducationalContentScreen = () => {

    const [videos, setVideos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [selectedVideoId, setSelectedVideoId] = useState(null);
    const [news, setNews] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        fetchVideos();
        fetchNews();
    }, []);


    const randomSearchQuery = randomSearchQueries[Math.floor(Math.random() * randomSearchQueries.length)];

    const fetchVideos = async () => {
        try {
            const response = await axios.get(
                'https://www.googleapis.com/youtube/v3/search',
                {
                    params: {
                        key: youtubeApiKey,
                        part: 'snippet',
                        q: randomSearchQuery,
                        maxResults: 15,
                        type: 'video',
                    },
                }
            );
            setVideos(response.data.items);
        } catch (error) {
            console.error('Error fetching videos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const openVideoPopup = (videoId) => {
        setSelectedVideoId(videoId);
    };

    const closeVideoPopup = () => {
        setSelectedVideoId(null);
    };


    const fetchNews = async () => {
        try {
            const response = await axios.get(
                `https://newsapi.org/v2/top-headlines?category=business&country=in&apiKey=${newsApiKey}`
            );

            setNews(response.data.articles);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePress = (article) => {
        navigation.navigate('Full Article', { article });
    }

    const handleSearch = async () => {
        if (!searchQuery) return alert('Please enter a search query');
        // Reset videos and news before fetching new search results
        setVideos([]);
        setNews([]);
        setIsLoading(true);
        try {
            // Fetch videos based on search query
            const videoResponse = await axios.get(
                'https://www.googleapis.com/youtube/v3/search',
                {
                    params: {
                        key: youtubeApiKey,
                        part: 'snippet',
                        q: searchQuery,
                        maxResults: 10,
                        type: 'video',
                    },
                }
            );
            setVideos(videoResponse.data.items);

            // const newsResponse = await axios.get(
            //     `https://newsapi.org/v2/everything`,
            //     {
            //         params: {
            //             q: searchQuery,
            //             apiKey: newsApiKey,
            //             language: 'en',
            //             country: 'in',
            //             sortBy: 'publishedAt',
            //             pageSize: 10,
            //         }
            //     }
            // );
            // setNews(newsResponse.data.articles);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
            setSearchQuery('');
        }
    }


    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#8BC34A" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>

            {/* search box */}
            <View style={styles.searchBox} >
                <TextInput
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search for a topic"
                />
                <Pressable style={styles.btn} onPress={handleSearch}>
                    <Fontawesome name="search" size={24} color="#fff" />
                </Pressable>
            </View>

            {/* videos section */}
            <View style={styles.videoContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {videos.map(video => (
                        <TouchableOpacity key={video.id.videoId} onPress={() => openVideoPopup(video.id.videoId)}>
                            <VideoCard video={video} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {selectedVideoId && (
                <VideoPopup videoId={selectedVideoId} onClose={closeVideoPopup} />
            )}

            {/* article section */}
            <View style={styles.articleContainer}>
                {/* <Text style={styles.title}>Today's Top Headlines</Text> */}
                <ScrollView style={{ marginTop: 10 }} showsVerticalScrollIndicator={false}>
                    {news.map((article, index) => (
                        <NewsCardComponent key={index} article={article} onPress={handlePress} />
                    ))}
                </ScrollView>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginRight: 10,
        fontSize: 16,
    },
    btn: {
        backgroundColor: '#8BC34A',
        padding: 10,
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        color: '#111',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
        textDecorationLine: 'underline',
    },
    videoContainer: {
        paddingVertical: 10,
    },
    articleContainer: {
        flex: 1,
        paddingVertical: 10,
    },
});

export default EducationalContentScreen;
