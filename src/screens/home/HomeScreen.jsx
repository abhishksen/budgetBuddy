import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import CardButtonComponent from '../../components/CardButtonComponent';
import HeaderComponent from '../../components/HeaderComponent';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import * as SecureStore from 'expo-secure-store';
import CalendarComponent from '../../components/CalendarComponent';
import NavbarHeader from '../../components/NavbarHeader';

const HomeScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            await SecureStore.deleteItemAsync('user');
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>

            {/* Navigation */}
            <NavbarHeader navigation={navigation} handleLogout={handleLogout} loading={loading} />

            {/* Header */}
            <HeaderComponent
                title="BudgetBuddy"
                slogan="Beyond Budgeting – BudgetBuddy, Your Guide to Financial Wisdom."
            />

            {/* Calendar */}
            <CalendarComponent />

            {/* Floating Bottom Navigation */}
            <View style={styles.floatingContainer}>
                <CardButtonComponent
                    icon="addchart"
                    title="Track"
                    onPress={() => navigation.navigate('Expense')}
                />
                <CardButtonComponent
                    icon="bar-chart"
                    title="Stats"
                    onPress={() => navigation.navigate('Analytics')}
                />
                <CardButtonComponent
                    icon="travel-explore"
                    title="Explore"
                    onPress={() => navigation.navigate('Explore')}
                />
                <CardButtonComponent
                    icon="mark-unread-chat-alt"
                    title="Chat"
                    onPress={() => navigation.navigate('Chat')}
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingTop: 16,
        paddingBottom: 16,
    },
    profileContainer: {
        borderRadius: 20,
        overflow: 'hidden',
    },
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 20,
    },
    logoutBtn: {
        padding: 10,
        borderRadius: 6,
        backgroundColor: "#4CAF50",
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    analyticsIcon: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    floatingContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingVertical: 14,
        backgroundColor: '#2C3E50',
        borderRadius: 40,
        marginHorizontal: 20,
        elevation: 8,
    },
});

export default HomeScreen;
