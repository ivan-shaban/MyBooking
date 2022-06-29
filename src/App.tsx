import { useStore } from 'effector-react'
// import { locale } from 'expo-localization'
import React, { useCallback, useEffect } from 'react'
import { IntlProvider } from 'react-intl'
import { enableLatestRenderer } from 'react-native-maps'
import { Provider as PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import useCachedResources from './hooks/useCachedResources'
import './locales/app'
import Navigation from './navigation'
import { $isInitialDataLoaded } from './store'
import { $language, $messages, defaultLanguage } from './store/locale'
import { requestInitialData, requestPermissions } from './store/main'
import { OnErrorFn } from '@formatjs/intl/src/types'
import 'intl'
import 'intl/locale-data/jsonp/en'

enableLatestRenderer()

export function App() {
    const isLoadingComplete = useCachedResources()
    const isInitialDataLoaded = useStore($isInitialDataLoaded)
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

    if (isLoadingComplete && isInitialDataLoaded) {
        return (
            <IntlProvider
                messages={messages}
                locale={language}
                defaultLocale={defaultLanguage}
                onError={handleIntlError}
            >
                <PaperProvider>
                    <SafeAreaProvider>
                        <Navigation />
                    </SafeAreaProvider>
                </PaperProvider>
            </IntlProvider>
        )
    } else {
        return null
    }
}
