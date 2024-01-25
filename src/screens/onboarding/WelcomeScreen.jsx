import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    const handleSkip = () => {
        // Navigate to the Home screen or any desired screen
        navigation.navigate('Home');
    };

    const handleGetStarted = () => {
        // Navigate to the Login screen or any desired screen
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/img/logo.png')}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.title}>Welcome to BudgetBuddy</Text>
            <Text style={styles.subtitle}>
                Beyond Budgeting – BudgetBuddy, Your Guide to Financial Wisdom.
            </Text>
            <Pressable style={styles.button} onPress={handleGetStarted}>
                <Text style={styles.buttonText}>Get Started</Text>
            </Pressable>
            <Pressable style={styles.skipLink} onPress={handleSkip}>
                <Text style={styles.skipText}>Skip</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#4CAF50', // Set your desired background color
    },
    image: {
        height: 200, // Adjust the height as needed
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#fff',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#fff',
        marginBottom: 20,
    },
    button: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 16,
        color: '#4CAF50',
        fontWeight: 'bold',
    },
    skipLink: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
    skipText: {
        fontSize: 16,
        color: '#fff', // Set the color based on your color scheme
        fontWeight: 'bold',
    },
});

export default WelcomeScreen;
