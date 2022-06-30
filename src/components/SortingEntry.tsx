import React, { FC, ReactNode, memo, useCallback } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'

import { SortOrder } from '../store/sorting'
import { MaterialIcon } from './MaterialIcon'

export interface Props {
    readonly title: ReactNode
    readonly order: SortOrder
    readonly onChange: (order: SortOrder) => void
}

export const SortingEntry: FC<Props> = memo(function SortingEntry({ title, order, onChange }) {
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
            <MaterialIcon
                size={24}
                name={
                    order === SortOrder.ASC
                        ? 'sort-ascending'
                        : order === SortOrder.DESC
                        ? 'sort-descending'
                        : 'sort'
                }
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
