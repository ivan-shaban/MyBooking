import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'
import { useStore } from 'effector-react'
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper'

import useColorScheme from '../hooks/useColorScheme'
import { $theme, Theme } from '../store/theme'
import merge from 'deepmerge'

export function useLightTheme() {
    const theme = useStore($theme)
    const systemTheme = useColorScheme()
    return theme === Theme.System ? systemTheme === 'light' : theme === Theme.Light
}

export const CombinedDefaultTheme = merge(PaperDefaultTheme, {
    ...NavigationDefaultTheme,
    colors: {
        ...NavigationDefaultTheme.colors,
        primary: 'rgba(255,0,146,0.6)',
        accent: 'rgba(255,0,146,0.6)',
        placeholder: 'rgb(128,63,218)',
        transparentBackground: 'rgba(242, 242, 242, 0.7)',
    },
})

export const CombinedDarkTheme = merge(PaperDarkTheme, {
    ...NavigationDarkTheme,
    colors: {
        ...NavigationDarkTheme.colors,
        primary: 'rgba(255,0,146,0.6)',
        accent: 'rgba(255,0,146,0.6)',
        placeholder: 'rgb(128,63,218)',
        transparentBackground: 'rgba(1, 1, 1, 0.7)',
    },
})
