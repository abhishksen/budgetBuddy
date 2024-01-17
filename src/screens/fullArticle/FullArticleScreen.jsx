// FullArticleScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, Linking, ActivityIndicator } from 'react-native';

const FullArticleScreen = ({ route }) => {
    const { article } = route.params;

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 1200);

        return () => clearTimeout(loadingTimeout);
    }, []);

    const openArticleURL = () => {
        if (article.url) {
            Linking.openURL(article.url);
        }
    };

    return (
        <>
            {
                isLoading ? (
                    <View style={styles.spinnerContainer} >
                        <ActivityIndicator size="large" color="#8BC34A" style={styles.spinner} />
                    </View >
                ) : (
                    <ScrollView style={styles.container}>
                        <Image
                            source={article.urlToImage ? { uri: article.urlToImage } : require('../../../assets/img/placeholder.jpeg')}
                            style={styles.image}
                        />
                        <View style={styles.contentContainer}>
                            <Text style={styles.title}>{article.title}</Text>
                            <Text style={styles.authorAndDate}>
                                {`By ${article.author} | ${new Date(article.publishedAt).toDateString()}`}
                            </Text>
                            <Text style={styles.source}>{article.source?.name}</Text>
                            <Text style={styles.description}>{article.description}</Text>
                            <Text style={styles.content}>{article.content}</Text>

                            {/* Pressable to open the article URL */}
                            <Pressable style={styles.readMoreButton} onPress={openArticleURL}>
                                <Text style={styles.readMoreButtonText}>Read More</Text>
                            </Pressable>
                        </View>
                    </ScrollView >
                )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        height: 200,
        width: '100%',
        marginBottom: 16,
    },
    contentContainer: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    authorAndDate: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
    },
    source: {
        fontSize: 14,
        color: '#888',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: '#333',
        marginBottom: 16,
    },
    content: {
        fontSize: 14,
        color: '#333',
        marginBottom: 16,
    },
    readMoreButton: {
        backgroundColor: '#8BC34A',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 16,
    },
    readMoreButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    spinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FullArticleScreen;

