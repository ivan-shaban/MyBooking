import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { ActivityIndicator } from 'react-native-paper'

import { ScreenHeader } from '../components/ScreenHeader'
import MasterPhoto from '../modals/MasterPhoto'
import { LocationProfile } from '../screens/LocationProfile'
import { MainScreen } from '../screens/MainScreen'
import { MasterProfile } from '../screens/MasterProfile'
import { RootStackParamList } from '../types'
import linking from './LinkingConfiguration'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function Navigation() {
    return (
        <NavigationContainer
            linking={linking}
            fallback={<ActivityIndicator color="blue" size="large" />}
        >
            <Stack.Navigator
                screenOptions={{
                    header: ScreenHeader,
                }}
            >
                <Stack.Screen name="Root" component={MainScreen} />
                <Stack.Screen name="MasterProfile" component={MasterProfile} />
                <Stack.Screen name="LocationProfile" component={LocationProfile} />
                <Stack.Group screenOptions={{ presentation: 'modal' }}>
                    <Stack.Screen name="MasterPhotoModal" component={MasterPhoto} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
