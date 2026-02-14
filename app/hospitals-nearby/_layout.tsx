import { Stack } from 'expo-router';

export default function HospitalsNearbyLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen 
        name="login" 
        options={{ 
          headerShown: true,
          title: 'Hospitals Near You',
          animationEnabled: true,
        }} 
      />
      <Stack.Screen 
        name="signup" 
        options={{ 
          headerShown: true,
          title: 'Create Account',
          animationEnabled: true,
        }} 
      />
    </Stack>
  );
}
