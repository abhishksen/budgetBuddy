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
import OnboardingNavigation from './OnboardingNavigation';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import LoginScreen from '../screens/onboarding/LoginScreen';
import RegisterScreen from '../screens/onboarding/RegisterScreen';
import UseAuth from '../hooks/UseAuth';
import FinancialCalculatorScreen from '../screens/explore/FinancialCalculatorScreen';
import EducationalContentScreen from '../screens/explore/EducationalContentScreen';
import StockMarketInsightsScreen from '../screens/explore/StockMarketInsightsScreen';

const Stack = createStackNavigator();

const HomeNavigation = () => {
    const { user } = UseAuth();

    if (!user) {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Welcome">
                    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Expense" component={ExpenseTrackingScreen} />
                    <Stack.Screen name="Explore" component={ExploreScreen} />
                    <Stack.Screen name="Financial Calculator" component={FinancialCalculatorScreen} />
                    <Stack.Screen name="Educational Content" component={EducationalContentScreen} options={{ headerTitle: 'Videos & Articles' }} />
                    <Stack.Screen name="Market Insights" component={StockMarketInsightsScreen} />
                    <Stack.Screen name="Chat" component={ChatScreen} />
                    <Stack.Screen name="Full Article" component={FullArticleScreen} />
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                    <Stack.Screen name="Analytics" component={AnalyticsScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
};

export default HomeNavigation;

