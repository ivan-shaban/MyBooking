import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs/src/types'
import React, { FC } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'

import { FeedbackEntry } from '../../components/FeedbackEntry'
import { Paragpaph, paragpaphOffset } from '../../components/Paragpaph'
import { ScrollView } from '../../components/Themed'
import { subheadersLocale } from '../../locales/subheaders'
import { LocationProfileTabParamList } from '../../types'

export interface Props
    extends MaterialTopTabScreenProps<LocationProfileTabParamList, 'Feedbacks'> {}

export const FeedbacksTab: FC<Props> = function Description({ route }) {
    const { location } = route.params

    return (
        <ScrollView showsVerticalScrollIndicator={true}>
            {/*<Paragpaph icon="list-status" title="Feedbacks">*/}
            <Paragpaph icon="comment-text-multiple-outline" title={subheadersLocale.feedbacks}>
                <View style={styles.pContent}>
                    {location.feedbacks.map((feedback) => (
                        <FeedbackEntry key={feedback.id} feedback={feedback} />
                    ))}
                </View>
            </Paragpaph>
            <View style={{ height: 20 }} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    pContent: { marginLeft: -paragpaphOffset, width: Dimensions.get('screen').width },
})
