import React, { ReactNode, useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { RadioButton, Text } from 'react-native-paper'

export interface Props<T> {
    readonly title?: ReactNode
    readonly data: T
    readonly checked: boolean
    readonly disabled?: boolean
    readonly onPress: (data: T) => void
}

export const FilterRadioButton = function FilterRadioButton<T>({
    title,
    data,
    checked,
    disabled,
    onPress,
}: Props<T>) {
    const handlePress = useCallback(() => {
        onPress(data)
    }, [data, onPress])

    return (
        <TouchableOpacity style={styles.base} onPress={handlePress} disabled={disabled}>
            {typeof title === 'string' ? (
                <Text style={disabled ? styles.titleDisabled : null}>
                    <FormattedMessage id={title} />
                </Text>
            ) : typeof title === 'number' ? (
                <Text style={disabled ? styles.titleDisabled : null}>{title}</Text>
            ) : (
                title
            )}
            <View pointerEvents="none">
                <RadioButton
                    // @ts-ignore
                    value={data}
                    disabled={disabled}
                    status={checked ? 'checked' : 'unchecked'}
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    base: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 16,
        marginRight: 4,
        // backgroundColor: 'red',
    },
    titleDisabled: {
        opacity: 0.4,
    },
})
