import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const ProfileScreen = () => {
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        // Fetch user profile from secure store when component mounts
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            // Retrieve user details from secure store
            const userString = await SecureStore.getItemAsync('user');
            if (userString) {
                const user = JSON.parse(userString);
                setUserProfile(user);
                setEditedName(user.name);
                setEditedEmail(user.email);
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const openEditModal = () => {
        setIsEditModalVisible(true);
    };

    const closeEditModal = () => {
        setIsEditModalVisible(false);
    };

    const saveChanges = async () => {
        try {
            // Update user profile in secure store
            await SecureStore.setItemAsync('user', JSON.stringify({ name: editedName, email: editedEmail }));
            setUserProfile({ name: editedName, email: editedEmail });
            closeEditModal();
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };

    return (
        <View style={styles.container}>
            {userProfile && (
                <View style={styles.profileHeader}>
                    <Image source={require('../../../assets/img/profilePic.png')} style={styles.profileImage} />
                    <Text style={styles.name}>{userProfile.name}</Text>
                    <Text style={styles.email}>{userProfile.email}</Text>
                </View>
            )}

            <TouchableOpacity style={styles.editButton} onPress={openEditModal}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isEditModalVisible}
                onRequestClose={closeEditModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.editInput}
                            placeholder="Enter new name"
                            value={editedName}
                            onChangeText={setEditedName}
                        />
                        <TextInput
                            style={styles.editInput}
                            placeholder="Enter new email"
                            value={editedEmail}
                            onChangeText={setEditedEmail}
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
                            <Text style={styles.saveButtonText}>Save Changes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={closeEditModal}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: 8,
    },
    email: {
        fontSize: 16,
        color: '#7F8C8D',
    },
    editButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
    },
    editButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        width: '80%',
    },
    editInput: {
        height: 40,
        borderColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 10,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: '#f44336',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
