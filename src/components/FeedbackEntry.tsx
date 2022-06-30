import React, { FC, memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Paragraph } from 'react-native-paper'

import { MaterialIcon } from './MaterialIcon'
import { RatingEntry } from './RatingEntry'
import moment from 'moment'

export interface Props {
    readonly feedback: Feedback
}

export const FeedbackEntry: FC<Props> = memo(function FeedbackEntry({ feedback }) {
    return (
        <View style={styles.base}>
            <MaterialIcon style={styles.icon} size={16} name="comment-text-outline" />
            <View style={styles.content}>
                <Paragraph style={styles.title}>{feedback.title}</Paragraph>
                <Paragraph>
                    {/* TODO: use FormattedDate */}
                    {moment(feedback.date).format('YYYY.MM.DD, hh:mm')} /{' '}
                    <RatingEntry rating={feedback.rating} />
                </Paragraph>
                <Paragraph>{feedback.message}</Paragraph>
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
