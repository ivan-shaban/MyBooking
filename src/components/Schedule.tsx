import React, { FC, memo } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { StyleSheet, View } from 'react-native'
import { Subheading } from 'react-native-paper'

import { Location } from '../store/locations'
import { paragpaphOffset } from './Paragpaph'

export interface Props {
    readonly index: number
    readonly value: Location['schedules'][number]
}

export const Schedule: FC<Props> = memo(function Schedule({ value, index }) {
    return (
        <View style={styles.base}>
            <Subheading>
                <FormattedMessage id={`day${index}`} />
            </Subheading>
            <View style={styles.hours}>
                {value === '24h' ? (
                    <Subheading>
                        <FormattedMessage id="day.wholeDay" />
                    </Subheading>
                ) : value ? (
                    value.map(([start, end]) => (
                        <Subheading key={`${start}-${end}`}>
                            {start}-{end}
                        </Subheading>
                    ))
                ) : (
                    <Subheading>
                        <FormattedMessage id="day.dayoff" />
                    </Subheading>
                )}
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: paragpaphOffset / 2,
    },
    hours: {},
})
