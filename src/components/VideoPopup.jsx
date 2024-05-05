import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

const VideoPopup = ({ videoId, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
                <WebView
                    style={styles.webview}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
                />
            </View>
        </Modal>
    );
};

const { height, width } = Dimensions.get('window');
const modalWidth = width; // Adjust based on your preference
const modalHeight = height; // Assuming 16:9 aspect ratio

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 999,
    },
    webview: {
        width: modalWidth,
        height: modalHeight,
        borderRadius: 10,
        overflow: 'hidden',
    },
});

export default VideoPopup;
