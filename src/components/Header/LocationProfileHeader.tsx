import { useStore } from 'effector-react'
import * as Linking from 'expo-linking'
import React, { useCallback } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'

import { colorByTab } from '../../constants/Colors'
import { Tab } from '../../constants/Tab'
import { useLocation } from '../../hooks/useLocation'
import {
    $currentUser,
    $isFavouriteLocationRequestPending,
    addFavouriteLocationFx,
    removeFavouriteLocationFx,
} from '../../store/user'
import { RootStackScreenProps } from '../../types'
import { ShareButton } from '../ShareButton'

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical'

// console.log(
//     `>> `,
//     `npx uri-scheme open ${Linking.createURL('locations/3')} --android`,
//     // `intent:#Intent;scheme=${expo.scheme}://locations/${3};package=${expo.android.package};end`,
// )
export const LocationProfileHeader = ({
    navigation,
    route,
}: RootStackScreenProps<'LocationProfile'>) => {
    const currentUser = useStore($currentUser)
    const isFavouriteLocationRequestPending = useStore($isFavouriteLocationRequestPending)
    const location = useLocation(route.params.id)
    const isFavourite = currentUser?.favourite.locations.includes(location.id)
    const handleFavouritePress = useCallback(() => {
        isFavourite ? removeFavouriteLocationFx(location.id) : addFavouriteLocationFx(location.id)
    }, [location, isFavourite])
    const navigateToBack = useCallback(() => {
        navigation.canGoBack()
            ? navigation.goBack()
            : navigation.navigate('Root', {
                  screen: Tab.Locations,
              })
    }, [navigation])

    return (
        <Appbar.Header style={styles.base}>
            <Appbar.BackAction color="white" onPress={navigateToBack} />
            <Appbar.Content color="white" title={location.name} subtitle={location.address} />
            <Appbar.Action
                style={styles.bigItem}
                icon={isFavourite ? 'cards-heart' : 'cards-heart-outline'}
                color="red"
                disabled={isFavouriteLocationRequestPending}
                onPress={handleFavouritePress}
            />
            <ShareButton
                style={styles.smallItem}
                title={`Location profile: ${location.name}`}
                message={Linking.createURL(`locations/${location.id}`)}
                // message={`intent:#Intent;scheme=${expo.scheme}://locations/${location.id};package=${expo.android.package};end`}
                // message={`Please install this app and stay safe , AppLink: ${`https://www.amazinghorse.io/locations/${location.id}`}`}
                // message={`Please install this app and stay safe , AppLink: ${getAppStoreURL()}`}
                url={Linking.createURL(`locations/${location.id}`)}
            />
            <Appbar.Action
                style={styles.smallItem}
                icon={MORE_ICON}
                color="white"
                onPress={() => {}}
            />
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    base: { backgroundColor: colorByTab[Tab.Locations] },
    bigItem: {
        marginLeft: 'auto',
    },
    smallItem: {
        marginLeft: -5,
    },
})
