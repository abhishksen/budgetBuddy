import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import CardButtonComponent from '../../components/CardButtonComponent';
import HeaderComponent from '../../components/HeaderComponent';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import * as SecureStore from 'expo-secure-store';
import CalendarComponent from '../../components/CalendarComponent';
import NavbarHeader from '../../components/NavbarHeader';
import Overview from '../../components/Overview';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [showOverview, setShowOverview] = useState(false);

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
    };

    const toggleOverview = () => {
        setShowOverview(!showOverview);
    };

    return (
        <>
            {/* Navigation */}
            <NavbarHeader
                navigation={navigation}
                handleLogout={handleLogout}
                loading={loading}
            />
            <View style={styles.container}>

                {/* Conditionally render Header and Overview */}
                {showOverview ? (
                    <Overview />
                ) : (
                    <HeaderComponent
                        title="BudgetBuddy"
                        slogan="Beyond Budgeting – BudgetBuddy, Your Guide to Financial Wisdom."
                    />
                )}

                {/* Calendar */}
                <CalendarComponent />

                {/* Floating Bottom Navigation */}
                <View style={styles.floatingContainer}>
                    <CardButtonComponent
                        icon="addchart"
                        title="Track"
                        onPress={() => navigation.navigate("Expense")}
                    />
                    <CardButtonComponent
                        icon="bar-chart"
                        title="Stats"
                        onPress={() => navigation.navigate("Analytics")}
                    />
                    <CardButtonComponent
                        icon="travel-explore"
                        title="Explore"
                        onPress={() => navigation.navigate("Explore")}
                    />
                    <CardButtonComponent
                        icon="mark-unread-chat-alt"
                        title="Chat"
                        onPress={() => navigation.navigate("Chat")}
                    />
                </View>

                {/* Floating Toggle Button */}
                <View style={styles.floatingToggleContainer}>
                    <Icon
                        name={showOverview ? "visibility-off" : "visibility"}
                        size={30}
                        color="#fff"
                        onPress={toggleOverview}
                    />
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
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
    floatingToggleContainer: {
        position: 'absolute',
        bottom: 120,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
    },
});

export default HomeScreen;
