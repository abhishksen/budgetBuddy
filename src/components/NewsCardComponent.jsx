import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

const NewsCardComponent = ({ article, onPress }) => {
    const { title, description, urlToImage } = article;

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
        overflow: 'hidden',
        elevation: 2,
        backgroundColor: '#fff',
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
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
});

export default NewsCardComponent;
