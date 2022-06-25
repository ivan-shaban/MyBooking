import React, { FC, memo, useCallback } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { Appbar } from 'react-native-paper'

import { share } from '../utils/share'
import { HeaderAction } from './Header/HeaderAction'

export interface Props {
    readonly title: string
    readonly message: string
    readonly url: string
    readonly style?: ViewStyle
}

export const ShareButton: FC<Props> = memo(function ShareButton({ title, message, url, style }) {
    const handlePress = useCallback(() => {
        share(title, message, url)
    }, [title, message, url])

    return <HeaderAction style={style} icon="share-variant" onPress={handlePress} />
})
