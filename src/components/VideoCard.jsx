// VideoCard.js
import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Linking } from 'react-native';
import { WebView } from 'react-native-webview';

const VideoCard = ({ video }) => {
    const openVideo = () => {
        const videoId = video.id.videoId;
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        Linking.openURL(videoUrl);
    };

    return (
        <TouchableOpacity style={styles.container} onPress={openVideo}>
            <ImageBackground
                source={{ uri: video.snippet.thumbnails.medium.url }}
                style={styles.thumbnail}
                imageStyle={styles.image}
            >
                <View style={styles.overlay}>
                    <Text style={styles.title}>{video.snippet.title}</Text>
                    <Text style={styles.channel}>{video.snippet.channelTitle}</Text>
                    <View style={styles.details}>
                        <Text style={styles.detailText}>Date Posted: {video.snippet.publishedAt}</Text>
                        {/* <Text style={styles.detailText}>Views: {video.statistics.viewCount}</Text> */}
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        borderRadius: 10,
        marginRight: 10,
        width: 300,
        height: 200,
    },
    thumbnail: {
        width: '100%',
        height: 200,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        objectFit: 'cover',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        padding: 10,
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    channel: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 5,
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailText: {
        fontSize: 14,
        color: '#fff',
    },
});

export default VideoCard;
