import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import * as SecureStore from 'expo-secure-store';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('user@gmail.com');
    const [password, setPassword] = useState('password');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (email === '' || password === '') return Alert.alert('Error', 'Please fill in all fields');

        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);

            // Store user credentials securely in local storage
            await SecureStore.setItemAsync('user', JSON.stringify({ email, password }));

        } catch (error) {
            Alert.alert('Error', 'Invalid email or password');
        } finally {
            setLoading(false);
        }
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
                <Text style={styles.title}>Please login to continue</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor="#FFFFFF"
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Password"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholderTextColor="#FFFFFF"
                    />
                    <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                        <Icon name={showPassword ? "visibility-off" : "visibility"} size={24} color="#FFFFFF" />
                    </Pressable>
                </View>
                <Pressable style={styles.button} onPress={handleLogin}>
                    {loading ? <ActivityIndicator color={"#8BC34A"} /> : <Text style={styles.buttonText}>Login</Text>}
                </Pressable>
                <View style={styles.registerTextContainer}>
                    <Text style={styles.registerText}>Don't have an account?</Text>
                    <Pressable onPress={() => navigation.navigate('Register')}>
                        <Text style={[styles.registerText, styles.registerLink]}>Register here</Text>
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
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 10,
        height: 50,
        marginBottom: 14,
        paddingLeft: 15,
    },
    passwordInput: {
        flex: 1,
        color: '#FFFFFF',
    },
    eyeIcon: {
        padding: 10,
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
    registerTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    registerText: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    registerLink: {
        marginLeft: 5,
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
