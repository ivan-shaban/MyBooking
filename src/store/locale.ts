import AsyncStorage from '@react-native-async-storage/async-storage'
import { NativeModules, Platform } from 'react-native'

import en from '../../assets/locales/en.json'
import ka from '../../assets/locales/ka.json'
import ru from '../../assets/locales/ru.json'
import { createEffect, createEvent, createStore } from 'effector'

const getLangFromLocale = (locale: string) => locale.split(/[-_]/)[0] as Language

const getDeviceLocaleLang = () => {
    let locale =
        Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings.AppleLocale ||
              NativeModules.SettingsManager.settings.AppleLanguages[0]
            : NativeModules.I18nManager.localeIdentifier

    // at start locale may be any that has the same domain, e.g. ru_BY, en-EN
    const localeSupported = locales.find((supportedLocale) =>
        locale.startsWith(getLangFromLocale(supportedLocale)),
    )
    locale = localeSupported ? locale : locales[0]

    return locale
}

export const languages = ['en', 'ru', 'ka'] as const
export const locales = ['ru-RU', 'en-US', 'ka_GE'] as const
export type Language = typeof languages[number]
export const defaultLanguage: Language = 'ru'
const translations = {
    en,
    ka,
    ru,
}

export const loadLocaleFx = createEffect({
    name: 'request device locale',
    handler: async () => {
        try {
            const locale = await AsyncStorage.getItem('@locale')
            return locale || getDeviceLocaleLang()
        } catch (e) {
            console.log(`>> Error: cannot load locale`, e)
            return locales[0]
        }
    },
})

export const saveLocaleFx = createEffect({
    name: 'save device locale',
    handler: async (locale: string) => {
        try {
            await AsyncStorage.setItem('@locale', locale)
        } catch (e) {
            console.log(`>> Error: cannot save locale`, locale)
        }
    },
})

export const changeLocale = createEvent<string>('change locale')
export const $locale = createStore<Nullable<string>>(null)
    .on(changeLocale, (_, locale) => locale)
    .on(loadLocaleFx.doneData, (_, locale) => locale)

export const $language = $locale.map((locale) => (locale ? getLangFromLocale(locale) : null))
export const $messages = $language.map((language) => (language ? translations[language] : null))
