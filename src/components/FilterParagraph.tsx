import React, { FC, memo, useCallback, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { IconButton, Subheading } from 'react-native-paper'

import { MaterialIcon } from './MaterialIcon'
import { MessageDescriptor } from '@formatjs/intl/src/types'

export interface Props {
    readonly icon: string
    readonly inline?: boolean
    readonly title: MessageDescriptor | string
}

export const FilterParagraph: FC<Props> = memo(function FilterParagraph({
    icon,
    title,
    inline,
    children,
}) {
    const [collapsed, setCollapsed] = useState(true)
    const intl = useIntl()
    const handleCollapse = useCallback(() => {
        setCollapsed((prev) => !prev)
    }, [])
    const contentStyles = inline ? styles.content__inline : null

    return (
        <View>
            <TouchableOpacity style={styles.header} onPress={handleCollapse}>
                <MaterialIcon
                    // @ts-ignore
                    name={icon}
                />
                <Subheading style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                    {typeof title === 'string' ? (
                        <FormattedMessage id={title} />
                    ) : (
                        intl.formatMessage(title)
                    )}
                </Subheading>
                {<IconButton icon={collapsed ? 'chevron-down' : 'chevron-up'} size={20} />}
            </TouchableOpacity>
            {!collapsed && <View style={contentStyles}>{children}</View>}
        </View>
    )
})

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        // backgroundColor: 'blue',
        marginBottom: 8,
    },
    title: {
        flex: 1,
        flexWrap: 'nowrap',
        marginLeft: 8,
        // backgroundColor: 'green',
    },
    content__inline: {
        marginLeft: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        // backgroundColor: 'red',
    },
})
