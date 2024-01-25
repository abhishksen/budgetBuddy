import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image } from 'react-native';

const LoginScreen = ({ navigation }) => {

    const handleLogin = () => {
        // Navigate to the Home screen or any desired screen
        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image source={require('../../../assets/img/logo.png')} style={styles.image} resizeMode="contain" />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Login to Your Account</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                />
                <Pressable style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
                <View style={styles.loginTextContainer}>
                    <Text style={{}}>Don't have an account?</Text>
                    <Pressable style={styles.loginLink} onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.loginText}>Register here</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    imgContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 16,
    },
    image: {
        height: 200,
        marginBottom: 20,
    },
    formContainer: {
        width: '100%',
        maxWidth: 340,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: '#2C3E50',
        borderBottomWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        color: '#2C3E50',
    },
    button: {
        backgroundColor: '#4CAF50',
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    loginLink: {
        marginLeft: 8,
    },
    loginText: {
        color: '#4CAF50',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default LoginScreen;
