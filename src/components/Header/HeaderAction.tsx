import React, { FC, memo } from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import { Appbar } from 'react-native-paper'
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon'

import { useThemeColor } from '../Themed'

export interface Props {
    readonly style?: ViewStyle
    readonly icon: IconSource
    readonly color?: string
    readonly disabled?: boolean
    readonly onPress?: () => void
}

export const HeaderAction: FC<Props> = memo(function HeaderAction({
    style,
    color,
    icon,
    onPress,
    disabled,
}) {
    const themedColor = useThemeColor({}, 'background')

    return (
        <Appbar.Action
            style={[styles.base, style]}
            icon={icon}
            color={color || themedColor}
            onPress={onPress}
            disabled={disabled}
        />
    )
})
const styles = StyleSheet.create({
    base: {
        marginLeft: -5,
    },
})
