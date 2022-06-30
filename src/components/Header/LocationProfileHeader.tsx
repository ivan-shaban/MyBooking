import { useStore } from 'effector-react'
import React, { useCallback } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { Appbar, useTheme } from 'react-native-paper'

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
    const { colors } = useTheme()
    const currentUser = useStore($currentUser)
    const headerColor = useStore($headerColor)
    const isFavouriteLocationRequestPending = useStore($isFavouriteLocationRequestPending)
    const location = useLocation(route.params.id)
    const isFavourite = currentUser?.favourite.locations.includes(location.id)
    const handleFavouritePress = useCallback(() => {
        isFavourite ? removeFavouriteLocationFx(location.id) : addFavouriteLocationFx(location.id)
    }, [location, isFavourite])

    const handleChatPress = useCallback(() => {
        navigation.navigate('ChatWithLocation', {
            id: location.id.toString(),
        })
    }, [navigation, location])

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
            <Appbar.BackAction color={colors.background} onPress={navigateToBack} />
            <Appbar.Content
                style={styles.bigItem}
                color={colors.background}
                title={location.name}
                subtitle={location.address}
            />
            <HeaderAction
                icon={isFavourite ? 'cards-heart' : 'cards-heart-outline'}
                color="red"
                disabled={isFavouriteLocationRequestPending}
                onPress={handleFavouritePress}
            />
            <HeaderAction icon="forum" onPress={handleChatPress} />
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
