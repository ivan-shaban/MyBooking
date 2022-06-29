// import { locale } from 'expo-localization'
import { NativeModules, Platform } from 'react-native'

import en from '../../assets/locales/en.json'
import ka from '../../assets/locales/ka.json'
import ru from '../../assets/locales/ru.json'
import { createEvent, createStore } from 'effector'

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

export const changeLocale = createEvent<string>('change locale')
export const $locale = createStore(getDeviceLocaleLang()).on(changeLocale, (_, locale) => locale)
export const $language = $locale.map((locale) => getLangFromLocale(locale))
export const $messages = $language.map((language) => translations[language])
