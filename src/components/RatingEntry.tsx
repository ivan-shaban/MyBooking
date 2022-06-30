import React, { FC, memo } from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

import Colors from '../constants/Colors'
import { MaterialIcon } from './MaterialIcon'
import { useLightTheme } from './Themed'
import faker from '@faker-js/faker'

export interface Props {
    readonly rating: number
    readonly feedbacksCount?: number
    readonly isLightTheme?: boolean
}

const customColors = { light: '#ccc', dark: 'white' }
export const RatingEntry: FC<Props> = memo(function RatingEntry({
    rating,
    feedbacksCount,
    isLightTheme,
}) {
    const roundedRating = Math.round(rating)
    const lightTheme = useLightTheme()
    const starColor = isLightTheme
        ? customColors.light
        : lightTheme
        ? customColors.light
        : customColors.dark

    return rating ? (
        <Text style={isLightTheme ? styles.lightText : null}>
            {faker.datatype.array(5).map((_m, index) => (
                <MaterialIcon
                    size={12}
                    name="star"
                    color={index + 1 <= roundedRating ? 'gold' : starColor}
                    key={index}
                />
            ))}
            {` ${rating}`}
            {feedbacksCount && ` (${feedbacksCount})`}
        </Text>
    ) : null
})

const styles = StyleSheet.create({
    base: {},
    lightText: {
        color: Colors.light.text,
    },
})
