import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const NavigationIconButton = ({ iconName, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.iconContainer}>
                <MaterialIcons name={iconName} size={24} color="white" />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        backgroundColor: '#4CAF50',
        width: 45,
        height: 45,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        // marginRight: 20,
    },
});

export default NavigationIconButton;
