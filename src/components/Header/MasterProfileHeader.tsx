import { useStore } from 'effector-react'
// import * as Linking from 'expo-linking'
import React, { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { Platform, StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'

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
import { Avatar } from '../Avatar'

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical'

export const MasterProfileHeader = ({
    navigation,
    route,
}: RootStackScreenProps<'MasterProfile'>) => {
    const intl = useIntl()
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
    const navigateToBack = useCallback(() => {
        navigation.canGoBack()
            ? navigation.goBack()
            : navigation.navigate('Root', {
                  screen: Tab.Masters,
              })
    }, [navigation])

    return (
        <Appbar.Header style={[styles.base, { backgroundColor: headerColor }]}>
            <Appbar.BackAction onPress={navigateToBack} />
            <Avatar uri={master.avatar} onPress={handleOpenMasterPhotoModal} />
            <Appbar.Content
                title={master.name}
                subtitle={master.type
                    .map((type) => intl.formatMessage(mastersLocale[type]))
                    .join(', ')}
            />
            <Appbar.Action
                style={styles.bigItem}
                icon={isFavourite ? 'cards-heart' : 'cards-heart-outline'}
                color="red"
                disabled={isFavouriteMasterRequestPending}
                onPress={handleFavouritePress}
            />
            {/*<ShareButton*/}
            {/*    style={styles.smallItem}*/}
            {/*    title={`Master profile: ${master.name}`}*/}
            {/*    message={Linking.createURL(`masters/${master.id}`)}*/}
            {/*    url={Linking.createURL(`masters/${master.id}`)}*/}
            {/*/>*/}
            <Appbar.Action style={styles.smallItem} icon={MORE_ICON} onPress={() => {}} />
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    base: {},
    bigItem: {
        marginLeft: 'auto',
    },
    smallItem: {
        marginLeft: -5,
    },
})
