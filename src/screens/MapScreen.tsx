import { useStore } from 'effector-react'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import { LocationMarker } from '../components/Map/LocationMarker'
import { useLightTheme } from '../components/Themed'
import { $managedLocations } from '../store/locations'
import { RootStackScreenProps } from '../types'
import { batumiCoordinates, darkTheme, lightTheme } from '../utils/maps'

export function MapScreen({ route }: RootStackScreenProps<'Map'>) {
    const locationId = route.params?.id ? parseInt(route.params.id, 10) : -1
    const isLightTheme = useLightTheme()
    const locations = useStore($managedLocations)
    const targetLocation = locations.find(({ id }) => id === locationId)

    return (
        <View style={styles.base}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                initialRegion={{
                    latitude: targetLocation?.latitude || batumiCoordinates.latitude,
                    longitude: targetLocation?.longitude || batumiCoordinates.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.01,
                }}
                showsUserLocation
                showsMyLocationButton
                followsUserLocation
                moveOnMarkerPress
                showsBuildings
                customMapStyle={isLightTheme ? lightTheme : darkTheme}
            >
                {locations.map((location) => (
                    <LocationMarker
                        location={location}
                        selected={location === targetLocation}
                        key={location.id}
                    />
                ))}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
})
