// NewsCardComponent.js

import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

const NewsCardComponent = ({ article, onPress }) => {
    const { title, description, urlToImage } = article;

    // console.log(article)

    return (
        <Pressable onPress={() => onPress(article)} style={styles.card}>
            <Image
                source={urlToImage ? { uri: urlToImage } : require('../../assets/img/placeholder.jpeg')}
                style={styles.image}
            />
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        marginVertical: 8,
        overflow: 'hidden', // Clip the image to stay within the rounded corners
        elevation: 2, // Add shadow for a slight elevation effect
        backgroundColor: '#fff', // White background
    },
    image: {
        height: 200,
        width: '100%',
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333', // Dark text color
    },
    description: {
        fontSize: 14,
        color: '#555', // Slightly darker text color
    },
});

export default NewsCardComponent;
