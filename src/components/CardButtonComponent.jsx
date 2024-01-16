// CardButtonComponent.js

import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CardButtonComponent = ({ icon, title, onPress }) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.card,
                {
                    backgroundColor: pressed ? '#8BC34A' : '#4CAF50',
                    elevation: pressed ? 1 : 0,
                },
            ]}
            onPress={onPress}
        >
            <Icon name={icon} size={40} color="#fff" />
            <Text style={styles.cardTitle}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#4CAF50',
        padding: 20,
        borderRadius: 10,
        margin: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: 16,
        marginTop: 10,
        color: '#fff',
    },
});

export default CardButtonComponent;
