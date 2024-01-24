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

const Stack = createStackNavigator();

const HomeNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
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


// HomeNavigation.js
// import React, { useState, useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// import HomeScreen from '../screens/home/HomeScreen';
// import ExpenseTrackingScreen from '../screens/tracker/ExpenseTrackingScreen';
// import ExploreScreen from '../screens/explore/ExploreScreen';
// import ChatScreen from '../screens/chat/ChatScreen';
// import FullArticleScreen from '../screens/fullArticle/FullArticleScreen';
// import AnalyticsScreen from '../screens/analytics/AnalyticsScreen';
// import ProfileScreen from '../screens/profile/ProfileScreen';
// import OnboardingNavigation from './OnboardingNavigation';

// const Stack = createStackNavigator();

// const HomeNavigation = () => {
//     const [isAuthenticated, setAuthenticated] = useState(false);

//     useEffect(() => {
//         // Implement logic to check user authentication status (e.g., check if user is logged in)
//         // For now, let's simulate the user being authenticated after 3 seconds
//         const timeout = setTimeout(() => {
//             setAuthenticated(true);
//         }, 3000);

//         return () => clearTimeout(timeout);
//     }, []);

//     return (
//         <NavigationContainer>
//             <Stack.Navigator initialRouteName={isAuthenticated ? 'Home' : 'Onboarding'}>
//                 <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
//                 <Stack.Screen name="Expense" component={ExpenseTrackingScreen} />
//                 <Stack.Screen name="Explore" component={ExploreScreen} />
//                 <Stack.Screen name="Chat" component={ChatScreen} />
//                 <Stack.Screen name="Full Article" component={FullArticleScreen} />
//                 <Stack.Screen name="Profile" component={ProfileScreen} />
//                 <Stack.Screen name="Analytics" component={AnalyticsScreen} />
//                 <Stack.Screen name="Onboarding" component={OnboardingNavigation} options={{ headerShown: false }} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// };

// export default HomeNavigation;
