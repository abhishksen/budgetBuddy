// HomeScreen.js

import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Button
                title="Track Expenses"
                onPress={() => navigation.navigate('ExpenseTracking')}
            />
            <Button
                title="Explore"
                onPress={() => navigation.navigate('Explore')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
