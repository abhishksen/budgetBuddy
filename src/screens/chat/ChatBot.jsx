import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Alert } from "react-native";
import axios from "axios";
import { speak, isSpeakingAsync, stop } from "expo-speech";
import { geminiApiKey } from "../../../constant";
import ChatBubble from "./ChatBubble";
import { FontAwesome } from "react-native-vector-icons";
import * as SecureStore from 'expo-secure-store';

const ChatBot = () => {
    const [chat, setChat] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const API_KEY = geminiApiKey;

    useEffect(() => {
        // Load chat history from SecureStore
        const loadChatHistory = async () => {
            try {
                const savedChat = await SecureStore.getItemAsync('chatHistory');
                if (savedChat) {
                    setChat(JSON.parse(savedChat));
                } else {
                    // Add a welcome message if no chat history is found
                    const welcomeMessage = {
                        role: "model",
                        parts: [{ text: "Hello there!👋 How can I assist you today? Is there anything I can help you with?" }],
                    };
                    setChat([welcomeMessage]);
                }
            } catch (error) {
                console.error('Error loading chat history:', error);
            }
        };
        loadChatHistory();
    }, []);

    const saveChatHistory = async (chat) => {
        try {
            await SecureStore.setItemAsync('chatHistory', JSON.stringify(chat));
        } catch (error) {
            console.error('Error saving chat history:', error);
        }
    };

    const clearChatHistory = async () => {
        Alert.alert(
            'Confirm',
            'Are you sure you want to clear all your previous chat?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            await SecureStore.deleteItemAsync('chatHistory');
                            const welcomeMessage = {
                                role: "model",
                                parts: [{ text: "Hello there!👋 How can I assist you today? Is there anything I can help you with?" }],
                            };
                            setChat([welcomeMessage]);
                        } catch (error) {
                            console.error('Error clearing chat history:', error);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const handleUserInput = async () => {
        if (!userInput) return;

        let updatedChat = [
            ...chat,
            {
                role: "user",
                parts: [{ text: userInput }],
            },
        ];
        setLoading(true);
        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
                {
                    contents: updatedChat,
                }
            );
            const modelResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn't understand that.";

            if (modelResponse) {
                const updatedChatWithModel = [
                    ...updatedChat,
                    {
                        role: "model",
                        parts: [{ text: modelResponse }],
                    },
                ];
                setChat(updatedChatWithModel);
                saveChatHistory(updatedChatWithModel); // Save chat history
                setUserInput("");
            }
        } catch (error) {
            console.error("error calling gemini", error);
            console.error("error response", error.response);
            setError("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleSpeech = async (text) => {
        if (isSpeaking) {
            stop();
            setIsSpeaking(false);
        } else {
            if (!(await isSpeakingAsync())) {
                speak(text);
                setIsSpeaking(true);
            }
        }
    };

    const renderChatItem = ({ item }) => (
        <ChatBubble
            role={item.role}
            text={item.parts[0].text}
            onSpeech={() => handleSpeech(item.parts[0].text)}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={chat}
                renderItem={renderChatItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.chatContainer}
                showsVerticalScrollIndicator={false}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={userInput}
                    onChangeText={setUserInput}
                    placeholder="Type a message..."
                    placeholderTextColor={"#666"}
                />
                <TouchableOpacity style={styles.button} onPress={handleUserInput}>
                    {loading ? <ActivityIndicator size="small" color="#fff" /> : <FontAwesome name="send" size={24} color="white" />}
                </TouchableOpacity>
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
            {chat.length > 1 && <TouchableOpacity style={styles.clearButton} onPress={clearChatHistory}>
                <Text style={styles.clearButtonText}>Clear Chat History</Text>
            </TouchableOpacity>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    chatContainer: {
        flexGrow: 1,
        justifyContent: "flex-end",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        paddingTop: 5,
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 16,
        marginRight: 8,
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        marginRight: 8,
    },
    button: {
        padding: 12,
        backgroundColor: "#4CAF50",
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    loading: {
        marginTop: 8,
    },
    error: {
        color: "red",
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 8,
    },
    clearButton: {
        padding: 10,
        backgroundColor: "#f44336",
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center',
    },
    clearButtonText: {
        color: "#fff",
        fontWeight: 'bold',
    },
});

export default ChatBot;
