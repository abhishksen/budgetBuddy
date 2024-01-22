import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/home/HomeScreen';
import ExpenseTrackingScreen from '../screens/tracker/ExpenseTrackingScreen';
import ExploreScreen from '../screens/explore/ExploreScreen.jsx';
import ChatScreen from '../screens/chat/ChatScreen';
import FullArticleScreen from '../screens/fullArticle/FullArticleScreen';
import AnalyticsScreen from '../screens/analytics/AnalyticsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Stack = createStackNavigator();

const HomeNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Expense" component={ExpenseTrackingScreen} />
                <Stack.Screen name="Explore" component={ExploreScreen} />
                <Stack.Screen name="Chat" component={ChatScreen} />
                <Stack.Screen name="Full Article" component={FullArticleScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Analytics" component={AnalyticsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default HomeNavigation;
