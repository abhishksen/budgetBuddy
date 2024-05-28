import React from 'react';
import { View, StyleSheet } from 'react-native';
import ChatBot from './ChatBot';
import { LinearGradient } from 'expo-linear-gradient';

const ChatScreen = () => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#8BC34A', '#4CAF50', '#00796B']}
                style={styles.gradient}
            />
            <ChatBot />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
});

export default ChatScreen;
