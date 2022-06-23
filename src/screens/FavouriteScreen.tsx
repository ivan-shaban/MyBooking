import { useStore } from 'effector-react'
import React from 'react'
import { useIntl } from 'react-intl'
import { Dimensions, StyleSheet } from 'react-native'

import { LocationItem } from '../components/LocationItem'
import { MasterItem } from '../components/MasterItem'
import { Paragpaph, paragpaphOffset } from '../components/Paragpaph'
import { ScrollView, View } from '../components/Themed'
import { Tab } from '../constants/Tab'
import { menuLocale } from '../locales/menu'
import { $locations } from '../store/locations'
import { $masters } from '../store/masters'
import { $currentUser } from '../store/user'
import { RootTabScreenProps } from '../types'

export function FavouriteScreen({ navigation }: RootTabScreenProps<Tab.Favourite>) {
    const currentUser = useStore($currentUser)
    const masters = useStore($masters)
    const locations = useStore($locations)

    const favouriteLocations = currentUser?.favourite.locations
        .map((locationId) => locations.find(({ id }) => id === locationId))
        .filter((location) => location !== undefined)

    const favouriteMasters = currentUser?.favourite.masters
        .map((masterId) => masters.find(({ id }) => id === masterId))
        .filter((master) => master !== undefined)

    return (
        <ScrollView style={styles.base}>
            <Paragpaph icon="account-group-outline" title={menuLocale[Tab.Masters]}>
                <View style={styles.pContent}>
                    {favouriteMasters?.map((master, index) => (
                        <MasterItem
                            master={master!}
                            isLast={index === favouriteMasters.length - 1}
                            key={master!.id}
                        />
                    ))}
                </View>
            </Paragpaph>
            <Paragpaph icon="map-marker-multiple-outline" title={menuLocale[Tab.Locations]}>
                <View style={styles.pContent}>
                    {favouriteLocations?.map((location, index) => (
                        <LocationItem
                            location={location!}
                            isLast={index === favouriteLocations.length - 1}
                            key={location!.id}
                        />
                    ))}
                </View>
            </Paragpaph>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
    },
    pContent: { marginLeft: -paragpaphOffset, width: Dimensions.get('screen').width },
})
