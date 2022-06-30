import React, { FC, memo } from 'react'
import {
    GestureResponderEvent,
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
} from 'react-native'
import { Avatar as PaperAvatar, useTheme } from 'react-native-paper'

export interface Props {
    readonly uri?: string
    readonly size?: number
    readonly style?: StyleProp<ViewStyle>
    readonly onPress?: (event: GestureResponderEvent) => void
}

export const Avatar: FC<Props> = memo(function Avatar({ uri, size = 40, style, onPress }) {
    const theme = useTheme()

    return (
        <TouchableOpacity
            style={[
                styles.base,
                { borderRadius: size, borderColor: theme.colors.transparentBackground },
                style,
            ]}
            onPress={onPress}
            disabled={!onPress}
        >
            <PaperAvatar.Image
                size={size}
                source={{
                    uri,
                }}
            />
        </TouchableOpacity>
    )
})

const styles = StyleSheet.create({
    base: {
        borderWidth: 3,
    },
})
