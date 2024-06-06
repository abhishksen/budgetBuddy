import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const WelcomeScreen = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const contents = [
        {
            title: 'Welcome to BudgetBuddy',
            subtitle: 'Beyond Budgeting – BudgetBuddy, Your Guide to Financial Wisdom.',
            image: require('../../../assets/img/logo.png') // Replace with your image
        },
        {
            title: 'Expense Tracking',
            subtitle: 'Track your expenses with advanced analytics using calendars, charts, and tables.',
            image: require('../../../assets/img/logo.png') // Replace with your image
        },
        {
            title: 'Financial Literacy',
            subtitle: 'Explore financial calculators, business start-up news articles, and videos.',
            image: require('../../../assets/img/logo.png') // Replace with your image
        },
        {
            title: 'AI-powered Chatbot',
            subtitle: 'Your go-to expense companion with smart AI assistance.',
            image: require('../../../assets/img/logo.png') // Replace with your image
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % contents.length);
        }, 2000); // Change content every 2 seconds

        return () => clearInterval(interval);
    }, []);

    const handleSkip = () => {
        navigation.navigate('Home');
    };

    const handleGetStarted = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#8BC34A', '#4CAF50', '#00796B']}
                style={styles.gradient}
            />
            <Image
                source={contents[currentIndex].image}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.title}>{contents[currentIndex].title}</Text>
            <Text style={styles.subtitle}>{contents[currentIndex].subtitle}</Text>
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
