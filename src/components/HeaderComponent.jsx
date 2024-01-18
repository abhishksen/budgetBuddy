import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const HeaderComponent = ({ title, slogan }) => {
    return (
        <View style={styles.header}>
            <Image
                source={require('../../assets/img/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.slogan}>{slogan}</Text>
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#2C3E50',
        padding: 16,
        borderRadius: 10,
        elevation: 4,
    },
    logo: {
        width: windowWidth * 0.4,
        height: windowWidth * 0.4,
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#ECF0F1',
    },
    slogan: {
        fontSize: 16,
        color: '#BDC3C7',
        textAlign: 'center',
        marginTop: 8,
    },
});

export default HeaderComponent;
