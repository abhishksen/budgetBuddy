import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeNavigation from './src/navigation/HomeNavigation';

export default function App() {
  return (
    <>
      <HomeNavigation />
      <StatusBar style="auto" />
    </>
  );
}

