import React, { FC, memo } from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Colors from '../constants/Colors'
import { useThemeColor } from './Themed'
import faker from '@faker-js/faker'

export interface Props {
    readonly rating: number
    readonly feedbacksCount?: number
    readonly useLightTheme?: boolean
}

const customColors = { light: '#ccc', dark: 'white' }
export const RatingEntry: FC<Props> = memo(function RatingEntry({
    rating,
    feedbacksCount,
    useLightTheme,
}) {
    const roundedRating = Math.round(rating)
    const starColor = useLightTheme
        ? customColors.light
        : useThemeColor(customColors, 'tabIconDefault')

    return rating ? (
        <Text style={useLightTheme ? styles.lightText : null}>
            {faker.datatype.array(5).map((_m, index) => (
                <MaterialCommunityIcons
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
