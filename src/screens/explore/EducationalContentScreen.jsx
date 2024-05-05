import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import VideoCard from '../../components/VideoCard';
import { youtubeApiKey } from '../../../constant';

// Mock data for articles
const articles = [
    { id: 1, title: '10 Tips for Saving Money', description: 'Learn how to save money with these practical tips.', author: 'John Doe' },
    { id: 2, title: 'Understanding Credit Scores', description: 'What is a credit score and how does it affect your financial health?', author: 'Jane Smith' },
];

const EducationalContentScreen = () => {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const response = await axios.get(
                'https://www.googleapis.com/youtube/v3/search',
                {
                    params: {
                        key: youtubeApiKey,
                        part: 'snippet',
                        // q: ['personal finance', 'financial literacy', 'money management', 'investing', 'saving money', 'credit score'],
                        q: 'personal finance',
                        maxResults: 15,
                        type: 'video',
                    },
                }
            );
            setVideos(response.data.items);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    // console.log(videos);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.videoContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {videos.map(video => (
                        <VideoCard key={video.id.videoId} video={video} />
                    ))}
                </ScrollView>
            </View>
            {articles.map(article => (
                <View key={article.id} style={styles.articleCard}>
                    <Text style={styles.articleTitle}>{article.title}</Text>
                    <Text style={styles.articleDescription}>{article.description}</Text>
                    <Text style={styles.articleAuthor}>By {article.author}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#8BC34A',
        paddingBottom: 16,
    },
    videoContainer: {
        paddingVertical: 10,
    },
    articleCard: {
        backgroundColor: '#f0f0f0',
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
    },
    articleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    articleDescription: {
        fontSize: 16,
        marginBottom: 5,
    },
    articleAuthor: {
        fontSize: 14,
        color: '#666',
    },
});

export default EducationalContentScreen;
