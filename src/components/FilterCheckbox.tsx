import React, { ReactNode, useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Checkbox } from 'react-native-paper'

import { Text } from './Themed'

export interface Props<T> {
    readonly title?: ReactNode
    readonly postfix?: ReactNode
    readonly data: T
    readonly checked: boolean
    readonly disabled?: boolean
    readonly inline?: boolean
    readonly onPress: (data: T) => void
}

export const FilterCheckbox = function FilterCheckbox<T>({
    title,
    postfix,
    data,
    checked,
    disabled,
    inline,
    onPress,
}: Props<T>) {
    const handlePress = useCallback(() => {
        onPress(data)
    }, [data, onPress])

    const baseStyles = [styles.base, inline ? styles.base__inline : null]

    return (
        <TouchableOpacity style={baseStyles} onPress={handlePress} disabled={disabled}>
            {typeof title === 'string' ? (
                <Text style={disabled ? styles.titleDisabled : null}>
                    <FormattedMessage id={title} />
                </Text>
            ) : typeof title === 'number' ? (
                <Text style={disabled ? styles.titleDisabled : null}>{title}</Text>
            ) : (
                title
            )}
            <Checkbox status={checked ? 'checked' : 'unchecked'} disabled={disabled} />
            {typeof postfix === 'string' ? (
                <Text style={disabled ? styles.titleDisabled : null}>
                    <FormattedMessage id={postfix} />
                </Text>
            ) : typeof postfix === 'number' ? (
                <Text style={disabled ? styles.titleDisabled : null}>{postfix}</Text>
            ) : (
                postfix
            )}
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
    base__inline: {
        justifyContent: 'flex-start',
        marginLeft: 0,
        marginRight: 0,
    },
    titleDisabled: {
        opacity: 0.4,
    },
})
