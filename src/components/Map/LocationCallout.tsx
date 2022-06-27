import { useNavigation } from '@react-navigation/native'
import React, { FC, memo, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { Callout } from 'react-native-maps'
import { Subheading } from 'react-native-paper'

import Colors from '../../constants/Colors'
import { Location } from '../../store/locations'
import { LocationWorkStatus } from '../LocationWorkStatus'
import { RatingEntry } from '../RatingEntry'

export interface Props {
    readonly location: Location
}

export const LocationCallout: FC<Props> = memo(function LocationCallout({ location }) {
    const navigation = useNavigation()
    const handlePress = useCallback(() => {
        navigation.navigate('LocationProfile', {
            id: location.id.toString(),
            screen: 'Description',
            params: { location },
        })
    }, [navigation, location])

    return (
        <Callout onPress={handlePress}>
            <View>
                <Subheading style={styles.title} numberOfLines={1}>
                    {location.name}
                </Subheading>
                <RatingEntry
                    rating={location.rating}
                    feedbacksCount={location.feedbacks.length}
                    useLightTheme
                />
                <LocationWorkStatus location={location} useLightTheme />
            </View>
        </Callout>
    )
})

const styles = StyleSheet.create({
    base: {},
    title: {
        color: Colors.light.text,
    },
})
