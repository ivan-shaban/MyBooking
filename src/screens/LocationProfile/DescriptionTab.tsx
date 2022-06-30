import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs/src/types'
import { useNavigation } from '@react-navigation/native'
import React, { FC, useCallback } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Subheading, useTheme } from 'react-native-paper'

import { Gallery } from '../../components/Gallery'
import { LocationWorkStatus } from '../../components/LocationWorkStatus'
import { Paragpaph } from '../../components/Paragpaph'
import { PhoneRecord } from '../../components/PhoneRecord'
import { RatingEntry } from '../../components/RatingEntry'
import { Schedule } from '../../components/Schedule'
import { subheadersLocale } from '../../locales/subheaders'
import { LocationProfileTabParamList } from '../../types'

export interface Props
    extends MaterialTopTabScreenProps<LocationProfileTabParamList, 'Description'> {}

export const DescriptionTab: FC<Props> = function Description({ route }) {
    const { location } = route.params
    const { colors } = useTheme()
    const navigation = useNavigation()
    const handleAddressPress = useCallback(() => {
        navigation.navigate('Map', {
            id: location.id.toString(),
        })
    }, [navigation, location])

    return (
        <ScrollView showsVerticalScrollIndicator={true}>
            <Gallery images={location.gallery} />
            <Paragpaph icon="image-text" title={location.name} collapsable>
                <RatingEntry rating={location.rating} feedbacksCount={location.feedbacks.length} />
                <LocationWorkStatus location={location} />
                <Subheading>{location.description}</Subheading>
            </Paragpaph>
            <Paragpaph icon="map-outline" title={subheadersLocale.address} collapsable>
                <Subheading
                    style={[styles.address, { color: colors.accent }]}
                    onPress={handleAddressPress}
                >
                    {location.address}
                </Subheading>
            </Paragpaph>
            <Paragpaph icon="phone-outline" title={subheadersLocale.contacts} collapsable>
                {location.tel.map((tel) => (
                    <PhoneRecord key={tel} phone={tel} />
                ))}
            </Paragpaph>
            <Paragpaph icon="clock-outline" title={subheadersLocale.schedule} collapsable>
                {location.schedules.map((schedule, index) => (
                    <Schedule key={index} value={schedule} index={index} />
                ))}
            </Paragpaph>
            <View style={styles.bottomOffset} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    bottomOffset: { height: 20 },
    address: { fontWeight: 'bold' },
})
