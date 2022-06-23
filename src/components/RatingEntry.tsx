import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { FC, memo } from 'react'
import { FormattedMessage } from 'react-intl'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

import { useThemeColor } from './Themed'
import faker from '@faker-js/faker'

export interface Props {
    readonly rating: number
    readonly feedbacksCount?: number
    readonly single?: boolean
}

export const RatingEntry: FC<Props> = memo(function RatingEntry({
    rating,
    feedbacksCount,
    single,
}) {
    const roundedRating = Math.round(rating)
    const starColor = useThemeColor({ light: '#ccc', dark: 'white' }, 'tabIconDefault')

    return feedbacksCount || single ? (
        <Text>
            {faker.datatype.array(5).map((_m, index) => (
                <MaterialCommunityIcons
                    size={12}
                    name="star"
                    color={index + 1 <= roundedRating ? 'gold' : starColor}
                    key={index}
                />
            ))}
            {` ${rating}`}
            {single ? null : ` (${feedbacksCount})`}
        </Text>
    ) : (
        <Text>
            <FormattedMessage id="rating.no-rating" defaultMessage="Оценок еще нет, будь первым!" />
        </Text>
    )
})

const styles = StyleSheet.create({
    base: {},
})
