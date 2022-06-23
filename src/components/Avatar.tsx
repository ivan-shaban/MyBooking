import React, { FC, memo } from 'react'
import {
    GestureResponderEvent,
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
} from 'react-native'
import { Avatar as PaperAvatar } from 'react-native-paper'

export interface Props {
    readonly uri?: string
    readonly size?: number
    readonly style?: StyleProp<ViewStyle>
    readonly onPress?: (event: GestureResponderEvent) => void
}

export const Avatar: FC<Props> = memo(function Avatar({ uri, size = 40, style, onPress }) {
    return (
        <TouchableOpacity style={[styles.base, { borderRadius: size }, style]} onPress={onPress}>
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
        borderColor: 'rgba(255,255,255,0.7)',
    },
})
