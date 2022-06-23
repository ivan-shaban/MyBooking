import { locale } from 'expo-localization'

import en from '../../assets/locales/en.json'
import ge from '../../assets/locales/ge.json'
import ru from '../../assets/locales/ru.json'
import { createEvent, createStore } from 'effector'

export const languages = ['en', 'ru', 'ge'] as const
export type Language = typeof languages[number]
export const defaultLanguage: Language = 'ru'
const translations = {
    en,
    ge,
    ru,
}

export const changeLanguage = createEvent<Language>('change language')
export const $language = createStore(locale.split(/[-_]/)[0] as Language).on(
    changeLanguage,
    (_, language) => language,
)

export const $messages = $language.map(
    (language) => translations[language] || translations[defaultLanguage],
)
