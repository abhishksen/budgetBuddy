import React from 'react';
import { View, StyleSheet, Pressable, Image, Text } from 'react-native';
import CardButtonComponent from '../../components/CardButtonComponent';
import HeaderComponent from '../../components/HeaderComponent';
import { AntDesign } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import * as SecureStore from 'expo-secure-store';

const HomeScreen = ({ navigation }) => {

    const handlelogout = async () => {
        await signOut(auth);
        // Clear user credentials from secure store
        await SecureStore.deleteItemAsync('user');
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
                    <Text style={styles.btnText}>Logout</Text>
                </Pressable>
                <Pressable style={styles.analyticsIcon} onPress={() => navigation.navigate('Analytics')}>
                    <AntDesign name="piechart" size={40} color="#2C3E50" />
                </Pressable>
            </View>

            <HeaderComponent
                title="BudgetBuddy"
                slogan="Beyond Budgeting – BudgetBuddy, Your Guide to Financial Wisdom."
            />

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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginTop: 10,
        paddingTop: 16,
        paddingBottom: 8,
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
        // backgroundColor: "#4CAF50",
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: 20,
    },
});

export default HomeScreen;
