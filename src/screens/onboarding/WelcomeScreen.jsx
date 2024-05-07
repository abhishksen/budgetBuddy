import { LinearGradient } from 'expo-linear-gradient';
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
            <LinearGradient
                colors={['#8BC34A', '#4CAF50', '#00796B']}
                style={styles.gradient}
            />
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    image: {
        height: 200,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    button: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
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
});

export default WelcomeScreen;