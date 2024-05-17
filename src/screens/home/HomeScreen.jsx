import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Image, Text, Alert, ActivityIndicator, ScrollView } from 'react-native';
import CardButtonComponent from '../../components/CardButtonComponent';
import HeaderComponent from '../../components/HeaderComponent';
import { AntDesign } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import * as SecureStore from 'expo-secure-store';
import CalendarComponent from '../../components/CalendarComponent';

const HomeScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const handlelogout = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            // Clear user credentials from secure store
            await SecureStore.deleteItemAsync('user');
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>

            {/* navigation */}
            <View style={styles.header}>
                <Pressable style={styles.profileContainer} onPress={() => navigation.navigate('Profile')}>
                    <Image
                        style={styles.profileImage}
                        source={require('../../../assets/img/profilePic.png')}
                    />
                </Pressable>
                <Pressable style={styles.logoutBtn} onPress={handlelogout}>
                    {loading ? <ActivityIndicator color={"#fff"} /> : <Text style={styles.btnText}>Logout</Text>}
                </Pressable>
                <Pressable style={styles.analyticsIcon} onPress={() => navigation.navigate('Analytics')}>
                    <AntDesign name="piechart" size={40} color="#2C3E50" />
                </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <HeaderComponent
                    title="BudgetBuddy"
                    slogan="Beyond Budgeting – BudgetBuddy, Your Guide to Financial Wisdom."
                />

                {/* Card Buttons */}
                <View style={styles.cardContainer}>
                    <CardButtonComponent
                        icon="attach-money"
                        title="Track"
                        onPress={() => navigation.navigate('Expense')}
                    />

                    <CardButtonComponent
                        icon="explore"
                        title="Explore"
                        onPress={() => navigation.navigate('Explore')}
                    />

                    <CardButtonComponent
                        icon="chat"
                        title="Chat"
                        onPress={() => navigation.navigate('Chat')}
                    />
                </View>

                {/* palaner */}
                <CalendarComponent />
            </ScrollView>
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
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
});

export default HomeScreen;