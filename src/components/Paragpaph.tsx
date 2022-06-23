import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { FC, memo } from 'react'
import { useIntl } from 'react-intl'
import { Dimensions, StyleSheet } from 'react-native'
import { IconButton, Title } from 'react-native-paper'

import { View, useThemeColor } from './Themed'
import { MessageDescriptor } from '@formatjs/intl/src/types'

export const paragpaphOffset = 44
export interface Props {
    readonly icon: string
    readonly title: MessageDescriptor | string
    readonly onEdit?: () => void
}

export const Paragpaph: FC<Props> = memo(function Paragpaph({ icon, title, children, onEdit }) {
    const iconColor = useThemeColor({}, 'text')
    const intl = useIntl()

    return (
        <View style={styles.base}>
            <MaterialCommunityIcons
                style={styles.startIcon}
                // @ts-ignore
                name={icon}
                size={20}
                color={iconColor}
            />
            <View style={styles.content}>
                <View style={styles.titleContainer}>
                    <Title>{typeof title === 'string' ? title : intl.formatMessage(title)}</Title>
                    {onEdit && (
                        <IconButton
                            style={styles.endIcon}
                            icon="pencil"
                            color={iconColor}
                            size={20}
                            onPress={onEdit}
                        />
                    )}
                </View>
                {children}
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
    },
    titleContainer: {
        flexDirection: 'row',
        // backgroundColor: 'blue',
    },
    startIcon: {
        marginTop: 14,
        marginLeft: 16,
        marginRight: 8,
    },
    endIcon: {
        marginLeft: 'auto',
    },
    content: {
        width: Dimensions.get('screen').width - paragpaphOffset,
        marginTop: 6,
        // backgroundColor: 'red',
    },
})
