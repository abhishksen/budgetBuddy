import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, Alert } from 'react-native';
import { auth } from '../../config/firebase';
import * as SecureStore from 'expo-secure-store';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        // function to register a user
        if (name === '' || email === '' || password === '') return Alert.alert('Error', 'Please fill in all fields');

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // Save user details to secure store
            await SecureStore.setItemAsync('user', JSON.stringify({ name, email, password }));
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again later.');
            console.log(error);
        }

        // Navigate to the Home screen after registration
        // navigation.navigate('Home');
    }
    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image source={require('../../../assets/img/logo.png')} style={styles.image} resizeMode="contain" />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Create an Account</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Pressable style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </Pressable>
                <View style={styles.loginTextContainer}>
                    <Text style={{}}>Already have an account?</Text>
                    <Pressable style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginText}>Login here</Text>
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

export default RegisterScreen;
