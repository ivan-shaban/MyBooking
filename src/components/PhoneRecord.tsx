import React, { FC, memo, useCallback } from 'react'
import { Linking, StyleSheet } from 'react-native'
import { Subheading, useTheme } from 'react-native-paper'

export interface Props {
    readonly phone: string
    readonly disabled?: boolean
}

export const PhoneRecord: FC<Props> = memo(function PhoneRecord({ phone, disabled }) {
    const { colors } = useTheme()
    const handleTelPress = useCallback(() => {
        Linking.openURL(`tel:${phone}`)
    }, [phone])

    return (
        <Subheading
            style={[styles.base, disabled ? undefined : { color: colors.accent }]}
            onPress={disabled ? undefined : handleTelPress}
        >
            {phone}
        </Subheading>
    )
})

const styles = StyleSheet.create({
    base: {
        fontWeight: 'bold',
    },
})
