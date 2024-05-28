import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from "react-native-vector-icons";

const ChatBubble = ({ role, text, onSpeech }) => {
    // Format response text into human-readable format
    text = text.replace(/\*\*/g, '');
    text = text.replace(/\*/g, '');
    return (
        <View style={[
            styles.chatItem,
            role === "user" ? styles.userChatItem : styles.modelChatItem,
        ]}
        >
            <Text style={styles.chatText}>{text}</Text>
            {/* {role === "model" && (
                <TouchableOpacity onPress={onSpeech} style={styles.speakerIcon}>
                    <Ionicons name="volume-high-outline" size={24} color="#fff" />
                </TouchableOpacity>
            )} */}
        </View>
    );
};

const styles = StyleSheet.create({
    chatItem: {
        padding: 12,
        marginVertical: 8,
        borderRadius: 8,
        maxWidth: "80%",
        alignItems: "flex-end",
    },
    userChatItem: {
        alignSelf: "flex-end",
        backgroundColor: "#8BC34A",
    },
    modelChatItem: {
        alignSelf: "flex-start",
        backgroundColor: "#f4f4f4",
    },
    chatText: {
        fontSize: 16,
        color: "#000",
    },
    speakerIcon: {
        padding: 5,
        marginTop: 5,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: "#4CAF50",
    },
});

export default ChatBubble;
