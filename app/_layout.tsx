import { NativeBaseProvider, Box } from 'native-base'
import { StatusBar } from 'expo-status-bar'
import { Tabs } from 'expo-router'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { PlusCircle, SoccerBall } from 'phosphor-react-native'
import { Platform } from 'react-native'

import { Loading } from '../src/components/Loading'
import { THEME } from '../src/styles/theme'
import { AuthContextProvider } from '../src/context/AuthContext'
import { useAuth } from '../src/hooks/useAuth'

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  })

  const { user } = useAuth()

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <Box flex={1} bgColor="gray.900">
          <StatusBar style="light" translucent />

          {fontsLoaded ? (
            <Tabs
              screenOptions={{
                headerShown: false,
                tabBarLabelPosition: 'beside-icon',
                tabBarActiveTintColor: THEME.colors.yellow[500],
                tabBarInactiveTintColor: THEME.colors.gray[300],
                tabBarStyle: {
                  position: 'absolute',
                  height: THEME.sizes[22],
                  borderTopWidth: 0,
                  backgroundColor: THEME.colors.gray[800],
                },
                tabBarItemStyle: {
                  position: 'relative',
                  top: Platform.OS === 'android' ? -10 : 0,
                },
              }}
              sceneContainerStyle={{ backgroundColor: 'transparent' }}
            >
              <Tabs.Screen
                name="index"
                options={{ href: null, tabBarStyle: { display: 'none' } }}
                redirect={!!user}
              />

              <Tabs.Screen
                name="new"
                options={{
                  tabBarIcon: ({ color }) => (
                    <PlusCircle color={color} size={24} />
                  ),
                  tabBarLabel: 'Novo bolão',
                }}
              />

              <Tabs.Screen
                name="pools"
                options={{
                  tabBarIcon: ({ color }) => (
                    <SoccerBall color={color} size={24} />
                  ),
                  tabBarLabel: 'Meus bolões',
                }}
              />

              <Tabs.Screen name="find" options={{ href: null }} />

              <Tabs.Screen name="details" options={{ href: null }} />
            </Tabs>
          ) : (
            <Loading />
          )}
        </Box>
      </AuthContextProvider>
    </NativeBaseProvider>
  )
}
