import React from 'react';
import { View, Pressable, Image, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NavbarHeader = ({ navigation, handleLogout, loading }) => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.header}>
                <Pressable style={styles.profileContainer} onPress={() => navigation.navigate('Profile')}>
                    <Image
                        style={styles.profileImage}
                        source={require('../../assets/img/profilePic.png')}
                    />
                </Pressable>
                <Pressable style={styles.logoutBtn} onPress={handleLogout}>
                    {loading ? <ActivityIndicator color={"#fff"} /> : <Icon name={"logout"} size={32} color="#fff" />}
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
        backgroundColor: '#4CAF50',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        marginTop: 10,
    },
    profileContainer: {
        paddingLeft: 4,
    },
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 22,
    },
    logoutBtn: {
        backgroundColor: '#4CAF50',
        paddingRight: 4,
    },
});

export default NavbarHeader;
