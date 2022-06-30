import React, { FC, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'

import { useLocation } from '../../hooks/useLocation'
import { RootStackScreenProps } from '../../types'

export interface Props extends RootStackScreenProps<'ChatWithLocation'> {}

export const ChatWithLocation: FC<Props> = function ChatWithLocation({
    route: {
        params: { id },
    },
    navigation,
}) {
    const location = useLocation(id)
    const handleBackPress = useCallback(() => {
        navigation.goBack()
    }, [navigation])

    return (
        <View style={styles.base}>
            <Text>Hello, you start chatting with administrator of "{location.name}" location.</Text>
            <Button style={styles.backButton} onPress={handleBackPress}>
                Back
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    base: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
    backButton: {
        marginTop: 20,
    },
})
