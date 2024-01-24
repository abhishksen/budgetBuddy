import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

const RegisterScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create an Account</Text>
            <TextInput
                style={styles.input}
                placeholder="Full Name"
            />
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
            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Register</Text>
            </Pressable>
            <View style={styles.loginTextContainer}>
                <Text style={{}}>Already have an account?</Text>
                <Pressable style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginText}>Login here</Text>
                </Pressable>
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
