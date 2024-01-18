import React from 'react';
import { View, StyleSheet } from 'react-native';
import CardButtonComponent from '../../components/CardButtonComponent';
import HeaderComponent from '../../components/HeaderComponent';

const HomeScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
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
        justifyContent: 'center',
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
});

export default HomeScreen;
