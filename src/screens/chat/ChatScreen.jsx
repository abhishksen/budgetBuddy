import React from 'react';
import { View, StyleSheet } from 'react-native';
import ChatBot from './ChatBot';

const ChatScreen = () => {

    return (
        <View style={styles.container}>
            <ChatBot />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ChatScreen;
