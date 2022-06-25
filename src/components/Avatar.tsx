import React, { FC, memo } from 'react'
import {
    GestureResponderEvent,
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
} from 'react-native'
import { Avatar as PaperAvatar } from 'react-native-paper'

import { useThemeColor } from './Themed'

export interface Props {
    readonly uri?: string
    readonly size?: number
    readonly style?: StyleProp<ViewStyle>
    readonly onPress?: (event: GestureResponderEvent) => void
}

export const Avatar: FC<Props> = memo(function Avatar({ uri, size = 40, style, onPress }) {
    const themedColor = useThemeColor({}, 'background')
    const opacityPart = ((0.7 * 255) >> 0).toString(16).toUpperCase()
    console.log(`>> 111`, themedColor + opacityPart)

    return (
        <TouchableOpacity
            style={[
                styles.base,
                { borderRadius: size, borderColor: themedColor + opacityPart },
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
