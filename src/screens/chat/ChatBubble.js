import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from "react-native-vector-icons";

const ChatBubble = ({ role, text, onSpeech }) => {

    return (
        <View style={[
            styles.chatItem,
            role === "user" ? styles.userChatItem : styles.modelChatItem,
        ]}
        >
            <Text style={styles.chatText}>{text}</Text>
            {role === "model" && (
                <TouchableOpacity onPress={onSpeech} style={styles.speakerIcon}>
                    <Ionicons name="volume-high-outline" size={24} color="#fff" />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    chatItem: {
        padding: 8,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        maxWidth: "79%",
        alignItems: "flex-end"
    },
    userChatItem: {
        alignSelf: "flex-end",
        color: "#fff",
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
        backgroundColor: "#2C3E50",
    },
});

export default ChatBubble;
