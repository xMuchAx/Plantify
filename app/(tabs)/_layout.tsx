import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { colors } from '../../src/theme';

type FeatherName = React.ComponentProps<typeof Feather>['name'];

function TabIcon({ name, color, size }: { name: FeatherName; color: string; size: number }) {
  return <Feather name={name} size={size} color={color} />;
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.forest900,
          borderTopColor: colors.forest700,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 64,
        },
        tabBarActiveTintColor: colors.leaf400,
        tabBarInactiveTintColor: colors.bark600,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="home" color={color} size={focused ? 24 : 22} />
          ),
        }}
      />
      <Tabs.Screen
        name="plants"
        options={{
          title: 'Mes Plantes',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="grid" color={color} size={focused ? 24 : 22} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Découvrir',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="compass" color={color} size={focused ? 24 : 22} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Réglages',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="settings" color={color} size={focused ? 24 : 22} />
          ),
        }}
      />
    </Tabs>
  );
}
