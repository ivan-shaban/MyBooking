import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs/src/types'
import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'

import { FeedbackEntry } from '../../components/FeedbackEntry'
import { ScrollView } from '../../components/Themed'
import { MasterProfileTabParamList } from '../../types'

export interface Props extends MaterialTopTabScreenProps<MasterProfileTabParamList, 'Feedbacks'> {}

export const FeedbacksTab: FC<Props> = function Feedbacks({ route }) {
    const { master } = route.params

    return (
        <ScrollView>
            {master.feedbacks.map((feedback) => (
                <FeedbackEntry key={feedback.id} feedback={feedback} />
            ))}
            <View style={{ height: 20 }} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
