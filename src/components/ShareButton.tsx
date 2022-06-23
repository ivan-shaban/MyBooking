import React, { FC, memo, useCallback } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { Appbar } from 'react-native-paper'

import { share } from '../utils/share'

export interface Props {
    title: string
    message: string
    url: string
    style?: ViewStyle
}

export const ShareButton: FC<Props> = memo(function ShareButton({ title, message, url, style }) {
    const handlePress = useCallback(() => {
        share(title, message, url)
    }, [title, message, url])

    return <Appbar.Action style={style} icon="share-variant" onPress={handlePress} color="white" />
})
