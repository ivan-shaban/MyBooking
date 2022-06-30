import AsyncStorage from '@react-native-async-storage/async-storage'

import { createEffect, createEvent, createStore } from 'effector'

export enum Theme {
    System = 'system',
    Light = 'light',
    Dark = 'dark',
}

export const loadThemeFx = createEffect({
    name: 'request device locale',
    handler: async () => {
        try {
            const locale = (await AsyncStorage.getItem('@theme')) as Theme
            return locale || Theme.System
        } catch (e) {
            console.log(`>> Error: cannot load theme`, e)
            return Theme.System
        }
    },
})

export const saveThemeFx = createEffect({
    name: 'save device locale',
    handler: async (theme: Theme) => {
        try {
            await AsyncStorage.setItem('@theme', theme)
        } catch (e) {
            console.log(`>> Error: cannot save theme`, theme)
        }
    },
})

export const changeTheme = createEvent<Theme>('change theme')
export const $theme = createStore<Theme>(Theme.System)
    .on(changeTheme, (_, theme) => theme)
    .on(loadThemeFx.doneData, (_, theme) => theme)
