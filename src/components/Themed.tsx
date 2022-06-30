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

export const CombinedDefaultTheme = merge(NavigationDefaultTheme, {
    ...PaperDefaultTheme,
    colors: {
        transparentBackground: 'rgba(242, 242, 242, 0.7)',
    },
})
export const CombinedDarkTheme = merge(NavigationDarkTheme, {
    ...PaperDarkTheme,
    colors: {
        transparentBackground: 'rgba(1, 1, 1, 0.7)',
    },
})
