import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { auth } from '../../config/firebase';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        // function to register a user
        if (name === '' || email === '' || password === '') return Alert.alert('Error', 'All the fields are required.');

        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // Save user details to secure store
            await SecureStore.setItemAsync('user', JSON.stringify({ name, email, password }));
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again later.');
            console.log(error);
        } finally {
            setLoading(false);
        }

        // Navigate to the Home screen after registration
        // navigation.navigate('Home');
    }
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#8BC34A', '#4CAF50', '#00796B']}
                style={styles.gradient}
            />
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
                    placeholderTextColor="#FFFFFF"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor="#FFFFFF"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor="#FFFFFF"
                />
                <Pressable style={styles.button} onPress={handleRegister}>
                    {loading ? <ActivityIndicator color={"#8BC34A"} /> : <Text style={styles.buttonText}>Register</Text>}
                </Pressable>
                <View style={styles.loginTextContainer}>
                    <Text style={styles.loginText}>Already have an account?</Text>
                    <Pressable style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
                        <Text style={[styles.loginText, styles.loginLinkText]}>Login here</Text>
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
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
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
        color: '#FFFFFF',
    },
    input: {
        height: 50,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 10,
        paddingLeft: 15,
        marginBottom: 14,
        color: '#FFFFFF',
    },
    button: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginBottom: 16,
    },
    buttonText: {
        color: '#4CAF50',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    loginText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    loginLink: {
        marginLeft: 8,
    },
    loginLinkText: {
        textDecorationLine: 'underline',
    },
});

export default RegisterScreen;