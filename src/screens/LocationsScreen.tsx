import { useStore } from 'effector-react'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import { LocationItem } from '../components/LocationItem'
import { Tab } from '../constants/Tab'
import { $managedLocations } from '../store/locations'
import { RootTabScreenProps } from '../types'

export function LocationsScreen({ navigation }: RootTabScreenProps<Tab.Locations>) {
    const locations = useStore($managedLocations)

    return (
        <ScrollView style={styles.container}>
            {locations.map((location, index) => (
                <LocationItem
                    location={location}
                    isLast={index === locations.length - 1}
                    key={location.id}
                />
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
