import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { FC, memo, useCallback } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { SortOrder } from '../store/sorting'
import { Text, useThemeColor } from './Themed'

export interface Props {
    readonly title: React.ReactNode
    readonly order: SortOrder
    readonly onChange: (order: SortOrder) => void
}

export const SortingEntry: FC<Props> = memo(function SortingEntry({ title, order, onChange }) {
    const color = useThemeColor({}, 'text')
    const handlePress = useCallback(() => {
        onChange(
            order === SortOrder.ASC
                ? SortOrder.DESC
                : order === SortOrder.DESC
                ? SortOrder.NONE
                : SortOrder.ASC,
        )
    }, [onChange, order])

    return (
        <TouchableOpacity style={styles.base} onPress={handlePress}>
            <Text>{title}</Text>
            <MaterialCommunityIcons
                size={16}
                name={
                    order === SortOrder.ASC
                        ? 'sort-ascending'
                        : order === SortOrder.DESC
                        ? 'sort-descending'
                        : 'sort'
                }
                color={color}
            />
            {/*<MaterialCommunityIcons size={16} name="sort-reverse-variant" color={color} />*/}
        </TouchableOpacity>
    )
})

const styles = StyleSheet.create({
    base: {
        height: 40,
        // backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})
