import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Pressable } from 'react-native';

const ChatScreen = () => {
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSendMessage = async () => {
        if (inputText.trim() === '') {
            return; // Don't send empty messages
        }

        // Simulate user message
        setMessages([...messages, { text: inputText, isUser: true }]);
        setInputText('');

        try {
            // Simulate chatbot response (replace this with actual chatbot API call)
            const chatbotResponse = await simulateChatbotResponse(inputText);

            // Simulate delay for a more realistic chat experience
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simulate chatbot message
            setMessages([...messages, { text: chatbotResponse, isUser: false }]);
        } catch (error) {
            console.error('Error getting chatbot response:', error);
        }
    };

    const simulateChatbotResponse = async (userMessage) => {
        // Simulate a simple chatbot response (replace this with actual chatbot logic)
        return `Chatbot: I received your message - "${userMessage}".`;
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.messageContainer,
                            item.isUser ? styles.userMessageContainer : styles.botMessageContainer,
                        ]}
                    >
                        <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                )}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type your message..."
                    value={inputText}
                    onChangeText={(text) => setInputText(text)}
                />
                <Pressable style={styles.sendButton} onPress={handleSendMessage}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    messageContainer: {
        borderRadius: 8,
        marginBottom: 8,
        padding: 12,
        maxWidth: '70%',
    },
    userMessageContainer: {
        backgroundColor: '#4CAF50',
        alignSelf: 'flex-end',
    },
    botMessageContainer: {
        backgroundColor: '#2C3E50',
        alignSelf: 'flex-start',
    },
    messageText: {
        color: '#fff',
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    input: {
        flex: 1,
        height: 45,
        borderColor: '#2C3E50',
        borderWidth: 2,
        borderRightWidth: 0, // To make it look like the input and button are one element
        // marginRight: 8,
        paddingHorizontal: 8,
        borderRadius: 10, // Adjusted to make it rounded
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    sendButton: {
        backgroundColor: '#2C3E50',
        borderRadius: 10, // Rounded to match the input box
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        paddingVertical: 11.6,
        paddingHorizontal: 16,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
});

export default ChatScreen;
