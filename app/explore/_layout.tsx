import { Stack } from 'expo-router';

export default function ExploreLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen 
        name="home" 
        options={{ 
          headerShown: true,
          title: 'Home',
          animationEnabled: true,
        }} 
      />
    </Stack>
  );
}
