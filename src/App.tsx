import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useStore } from 'effector-react'
import React, { useCallback, useEffect } from 'react'
import { IntlProvider } from 'react-intl'
import { enableLatestRenderer } from 'react-native-maps'
import { ActivityIndicator, Provider as PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { ScreenHeader } from './components/ScreenHeader'
import { CombinedDarkTheme, CombinedDefaultTheme, useLightTheme } from './components/Themed'
import useCachedResources from './hooks/useCachedResources'
import './locales/app'
import MasterPhoto from './modals/MasterPhoto'
import linking from './navigation/LinkingConfiguration'
import { LocationProfile } from './screens/LocationProfile'
import { MainScreen } from './screens/MainScreen'
import { MapScreen } from './screens/MapScreen'
import { MasterProfile } from './screens/MasterProfile'
import { $isInitialDataLoaded } from './store'
import { $language, $messages, defaultLanguage } from './store/locale'
import { requestInitialData, requestPermissions } from './store/main'
import { RootStackParamList } from './types'
import { OnErrorFn } from '@formatjs/intl/src/types'
import 'intl'
import 'intl/locale-data/jsonp/en'

enableLatestRenderer()

const Stack = createNativeStackNavigator<RootStackParamList>()

export function App() {
    const isLoadingComplete = useCachedResources()
    const isInitialDataLoaded = useStore($isInitialDataLoaded)
    const isLightTheme = useLightTheme()
    const theme = isLightTheme ? CombinedDefaultTheme : CombinedDarkTheme
    const language = useStore($language)
    const messages = useStore($messages)

    const handleIntlError = useCallback<OnErrorFn>((error) => {
        if (process.env.NODE_ENV !== 'development') {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        requestInitialData()
        requestPermissions()
    }, [])

    if (!isLoadingComplete || !isInitialDataLoaded || !messages || !language) {
        return null
    }

    return (
        <IntlProvider
            messages={messages}
            locale={language}
            defaultLocale={defaultLanguage}
            onError={handleIntlError}
        >
            {/* @ts-ignore*/}
            <PaperProvider theme={theme}>
                <SafeAreaProvider>
                    <NavigationContainer
                        linking={linking}
                        theme={theme}
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
                            <Stack.Screen name="Map" component={MapScreen} />
                            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                                <Stack.Screen name="MasterPhotoModal" component={MasterPhoto} />
                            </Stack.Group>
                        </Stack.Navigator>
                    </NavigationContainer>
                </SafeAreaProvider>
            </PaperProvider>
        </IntlProvider>
    )
}
