import { StatusBar } from 'expo-status-bar';
import HomeNavigation from './src/navigation/HomeNavigation';

export default function App() {
  return (
    <>
      <HomeNavigation />
      <StatusBar style="auto" />
    </>
  );
}

