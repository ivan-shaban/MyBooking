import { useStore } from 'effector-react'
// import * as Linking from 'expo-linking'
import React, { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { Platform, StyleSheet } from 'react-native'
import { Appbar, useTheme } from 'react-native-paper'

import { Tab } from '../../constants/Tab'
import { useMaster } from '../../hooks/useMaster'
import { mastersLocale } from '../../locales/masters'
import { $headerColor } from '../../store/header'
import {
    $currentUser,
    $isFavouriteMasterRequestPending,
    addFavouriteMasterFx,
    removeFavouriteMasterFx,
} from '../../store/user'
import { RootStackScreenProps } from '../../types'
import { share } from '../../utils/share'
import { Avatar } from '../Avatar'
import { HeaderAction } from './HeaderAction'

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical'

export const MasterProfileHeader = ({
    navigation,
    route,
}: RootStackScreenProps<'MasterProfile'>) => {
    const intl = useIntl()
    const { colors } = useTheme()
    const currentUser = useStore($currentUser)
    const headerColor = useStore($headerColor)
    const isFavouriteMasterRequestPending = useStore($isFavouriteMasterRequestPending)
    const master = useMaster(route.params.id)
    const isFavourite = currentUser?.favourite.masters.includes(master.id)
    const handleFavouritePress = useCallback(() => {
        isFavourite ? removeFavouriteMasterFx(master.id) : addFavouriteMasterFx(master.id)
    }, [master, isFavourite])

    const handleOpenMasterPhotoModal = useCallback(() => {
        navigation.navigate('MasterPhotoModal', {
            master,
        })
    }, [master, navigation])

    const handleSharePress = useCallback(() => {
        share(`Master profile: ${master.name}`, 'ok it is share message', `masters/${master.id}`)
    }, [master])

    const navigateToBack = useCallback(() => {
        navigation.canGoBack()
            ? navigation.goBack()
            : navigation.navigate('Root', {
                  screen: Tab.Masters,
              })
    }, [navigation])

    return (
        <Appbar.Header style={[styles.base, { backgroundColor: headerColor }]}>
            <Appbar.BackAction color={colors.background} onPress={navigateToBack} />
            <Avatar uri={master.avatar} onPress={handleOpenMasterPhotoModal} />
            <Appbar.Content
                style={styles.bigItem}
                color={colors.background}
                title={master.name}
                subtitle={master.type
                    .map((type) => intl.formatMessage(mastersLocale[type]))
                    .join(', ')}
            />
            <HeaderAction
                icon={isFavourite ? 'cards-heart' : 'cards-heart-outline'}
                color="red"
                disabled={isFavouriteMasterRequestPending}
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
        marginLeft: -5,
        marginRight: 'auto',
    },
})
