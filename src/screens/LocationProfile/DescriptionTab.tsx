import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs/src/types'
import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { Subheading } from 'react-native-paper'

import { Gallery } from '../../components/Gallery'
import { LocationWorkStatus } from '../../components/LocationWorkStatus'
import { Paragpaph } from '../../components/Paragpaph'
import { PhoneRecord } from '../../components/PhoneRecord'
import { RatingEntry } from '../../components/RatingEntry'
import { Schedule } from '../../components/Schedule'
import { ScrollView } from '../../components/Themed'
import { subheadersLocale } from '../../locales/subheaders'
import { LocationProfileTabParamList } from '../../types'

export interface Props
    extends MaterialTopTabScreenProps<LocationProfileTabParamList, 'Description'> {}

export const DescriptionTab: FC<Props> = function Description({ route }) {
    const { location } = route.params

    return (
        <ScrollView showsVerticalScrollIndicator={true}>
            <Gallery images={location.gallery} />
            <Paragpaph icon="image-text" title={location.name}>
                <RatingEntry rating={location.rating} feedbacksCount={location.feedbacks.length} />
                <LocationWorkStatus location={location} />
                <Subheading>{location.description}</Subheading>
            </Paragpaph>
            <Paragpaph icon="map-outline" title={subheadersLocale.address}>
                <Subheading>{location.address}</Subheading>
            </Paragpaph>
            <Paragpaph icon="phone-outline" title={subheadersLocale.contacts}>
                {location.tel.map((tel) => (
                    <PhoneRecord key={tel} phone={tel} />
                ))}
            </Paragpaph>
            <Paragpaph icon="clock-outline" title={subheadersLocale.schedule}>
                {location.schedules.map((schedule, index) => (
                    <Schedule key={index} value={schedule} index={index} />
                ))}
            </Paragpaph>
            <View style={{ height: 20 }} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
