import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CardButtonComponent = ({ icon, title, onPress }) => {
    return (
        <Pressable
            style={styles.card}
            onPress={onPress}
        >
            <Icon name={icon} size={36} color="#fff" />
            <Text style={styles.cardTitle}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: 12,
        color: '#fff',
    },
});

export default CardButtonComponent;
