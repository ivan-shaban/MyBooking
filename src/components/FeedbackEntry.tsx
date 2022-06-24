import React, { FC, memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Caption } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { RatingEntry } from './RatingEntry'
import { useThemeColor } from './Themed'
import moment from 'moment'

export interface Props {
    readonly feedback: Feedback
}

export const FeedbackEntry: FC<Props> = memo(function FeedbackEntry({ feedback }) {
    const color = useThemeColor({}, 'text')

    return (
        <View style={styles.base}>
            <MaterialCommunityIcons
                style={styles.icon}
                size={16}
                name="comment-text-outline"
                color={color}
            />
            <View style={styles.content}>
                <Caption style={[styles.title, { color }]}>{feedback.title}</Caption>
                <Caption>
                    {moment(feedback.date).format('YYYY.MM.DD, hh:mm')} /{' '}
                    <RatingEntry rating={feedback.rating} />
                </Caption>
                <Caption style={{ color }}>{feedback.message}</Caption>
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    base: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 8,
        // backgroundColor: 'green',
    },
    content: { flex: 1 },
    title: { fontWeight: 'bold', fontSize: 12 },
    icon: {
        marginLeft: 16,
        marginRight: 8,
        marginTop: 6,
    },
})