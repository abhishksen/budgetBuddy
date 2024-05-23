import React from 'react';
import { View, Pressable, Image, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NavbarHeader = ({ navigation, handleLogout, loading }) => {
    return (
        <View style={styles.header}>
            <Pressable style={styles.profileContainer} onPress={() => navigation.navigate('Profile')}>
                <Image
                    style={styles.profileImage}
                    source={require('../../assets/img/profilePic.png')}
                />
            </Pressable>
            <Text style={styles.text}>BudgetBuddy</Text>
            <Pressable style={styles.logoutBtn} onPress={handleLogout}>
                {loading ? <ActivityIndicator color={"#fff"} /> : <Icon name={"logout"} size={24} color="#fff" />}
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        marginTop: 10,
        marginBottom: 6,
    },
    profileContainer: {
        padding: 5,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    logoutBtn: {
        backgroundColor: '#f44336',
        padding: 8,
        borderRadius: 25,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2C3E50',
        fontStyle: 'italic',
        textDecorationLine: 'underline',
    },
    analyticsIcon: {
        padding: 5,
    },
});

export default NavbarHeader;
