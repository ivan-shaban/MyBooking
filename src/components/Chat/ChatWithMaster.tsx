import React, { FC, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'

import { useMaster } from '../../hooks/useMaster'
import { RootStackScreenProps } from '../../types'

export interface Props extends RootStackScreenProps<'ChatWithMaster'> {}

export const ChatWithMaster: FC<Props> = function ChatWithMaster({
    route: {
        params: { id },
    },
    navigation,
}) {
    const master = useMaster(id)
    const handleBackPress = useCallback(() => {
        navigation.goBack()
    }, [navigation])

    return (
        <View style={styles.base}>
            <Text>Hello, you started chat with master "{master.name}"</Text>
            <Button style={styles.backButton} onPress={handleBackPress}>
                Back
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    backButton: {
        marginTop: 20,
    },
})
