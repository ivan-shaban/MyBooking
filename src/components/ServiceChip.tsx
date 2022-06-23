import React, { FC, memo } from 'react'
import { useIntl } from 'react-intl'
import { StyleSheet } from 'react-native'
import { Chip } from 'react-native-paper'

import { Service } from '../constants/services'
import { servicesLocale } from '../locales/services'

export interface Props {
    readonly type: Service
    readonly duration?: number
}

export const ServiceChip: FC<Props> = memo(function ServiceChip({ type, duration }) {
    const intl = useIntl()

    return (
        <Chip icon="plus-circle" style={styles.base} key={type}>
            {intl.formatMessage(servicesLocale[type])}
            {duration ? `, ${duration}h` : null}
        </Chip>
    )
})

const styles = StyleSheet.create({
    base: {
        marginTop: 4,
        marginRight: 8,
        padding: 0,
    },
})
