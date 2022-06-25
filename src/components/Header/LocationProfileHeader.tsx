import { useStore } from 'effector-react'
// import * as Linking from 'expo-linking'
import React, { useCallback } from 'react'
import { Linking, Platform, StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'

import { Tab } from '../../constants/Tab'
import { useLocation } from '../../hooks/useLocation'
import { $headerColor } from '../../store/header'
import {
    $currentUser,
    $isFavouriteLocationRequestPending,
    addFavouriteLocationFx,
    removeFavouriteLocationFx,
} from '../../store/user'
import { RootStackScreenProps } from '../../types'
import { share } from '../../utils/share'
import { useThemeColor } from '../Themed'
import { HeaderAction } from './HeaderAction'

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
    const textColor = useThemeColor({}, 'background')
    const currentUser = useStore($currentUser)
    const headerColor = useStore($headerColor)
    const isFavouriteLocationRequestPending = useStore($isFavouriteLocationRequestPending)
    const location = useLocation(route.params.id)
    const isFavourite = currentUser?.favourite.locations.includes(location.id)
    const handleFavouritePress = useCallback(() => {
        isFavourite ? removeFavouriteLocationFx(location.id) : addFavouriteLocationFx(location.id)
    }, [location, isFavourite])

    const handleSharePress = useCallback(() => {
        share(
            `Location profile: ${location.name}`,
            'ok it is share message',
            `locations/${location.id}`,
        )
    }, [location])

    const navigateToBack = useCallback(() => {
        navigation.canGoBack()
            ? navigation.goBack()
            : navigation.navigate('Root', {
                  screen: Tab.Locations,
              })
    }, [navigation])

    return (
        <Appbar.Header style={[styles.base, { backgroundColor: headerColor }]}>
            <Appbar.BackAction color={textColor} onPress={navigateToBack} />
            <Appbar.Content
                style={styles.bigItem}
                color={textColor}
                title={location.name}
                subtitle={location.address}
            />
            <HeaderAction
                icon={isFavourite ? 'cards-heart' : 'cards-heart-outline'}
                color="red"
                disabled={isFavouriteLocationRequestPending}
                onPress={handleFavouritePress}
            />
            <HeaderAction icon="forum" onPress={() => {}} />
            <HeaderAction icon="share-variant" onPress={handleSharePress} />
            <HeaderAction icon={MORE_ICON} onPress={() => {}} />
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    base: {},
    bigItem: {
        marginLeft: -10,
        marginRight: 'auto',
    },
})
