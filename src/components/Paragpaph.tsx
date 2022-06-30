import React, { FC, memo, useCallback, useState } from 'react'
import { useIntl } from 'react-intl'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import { IconButton, Title } from 'react-native-paper'

import { MaterialIcon } from './MaterialIcon'
import { MessageDescriptor } from '@formatjs/intl/src/types'

export const paragpaphOffset = 44
export type Props =
    | {
          readonly icon: string
          readonly title: MessageDescriptor | string
          readonly collapsable?: undefined | false
          readonly onEdit?: () => void
      }
    | {
          readonly icon: string
          readonly title: MessageDescriptor | string
          readonly collapsable: true
          readonly onEdit?: undefined
      }

export const Paragpaph: FC<Props> = memo(function Paragpaph({
    icon,
    title,
    children,
    collapsable,
    onEdit,
}) {
    const [collapsed, setCollapsed] = useState(false)
    const intl = useIntl()
    const handleCollapse = useCallback(() => {
        setCollapsed((prev) => !prev)
    }, [])

    return collapsable ? (
        <View style={styles.base}>
            <TouchableOpacity style={styles.header} onPress={handleCollapse}>
                <MaterialIcon
                    // @ts-ignore
                    name={icon}
                />
                <Title style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                    {typeof title === 'string' ? title : intl.formatMessage(title)}
                </Title>
                {<IconButton icon={collapsed ? 'chevron-down' : 'chevron-up'} size={20} />}
            </TouchableOpacity>
            {collapsable && collapsed ? null : <View style={styles.content}>{children}</View>}
        </View>
    ) : (
        <View style={styles.base}>
            <View style={styles.header}>
                <MaterialIcon
                    // @ts-ignore
                    name={icon}
                />
                <Title style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                    {typeof title === 'string' ? title : intl.formatMessage(title)}
                </Title>
                {onEdit && <IconButton icon="pencil" size={20} onPress={onEdit} />}
            </View>
            <View style={styles.content}>{children}</View>
        </View>
    )
})

const styles = StyleSheet.create({
    base: {},
    header: {
        width: 'auto',
        height: 40,
        marginHorizontal: 16,
        alignItems: 'center',
        flexDirection: 'row',
        // backgroundColor: 'blue',
    },
    title: {
        flex: 1,
        flexWrap: 'nowrap',
        marginLeft: 8,
        // backgroundColor: 'green',
    },
    content: {
        width: Dimensions.get('screen').width - paragpaphOffset,
        marginLeft: paragpaphOffset,
        // backgroundColor: 'red',
    },
})
