import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { useStore } from 'effector-react'
import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'

import { colorByTab } from '../../constants/Colors'
import { Tab } from '../../constants/Tab'
import { $currentUser } from '../../store/user'
import { Avatar } from '../Avatar'

export interface Props extends NativeStackHeaderProps {}

export const FavouriteHeader: FC<Props> = () => {
    const user = useStore($currentUser)

    // добавить иконку сортировки и фильтрации
    // добавить иконку сортировку, фильтрации, карту
    // добавить иконку сортировку, фильтрации, карту

    return (
        <Appbar.Header style={styles.base}>
            <Avatar style={styles.avatar} uri={user?.avatar} />
            <Appbar.Action
                icon="magnify"
                color="white"
                style={styles.smallItem}
                onPress={() => {}}
            />
            <Appbar.Action
                icon="map-search-outline"
                color="white"
                style={styles.smallItem}
                onPress={() => {}}
            />
            <Appbar.Action icon="sort" color="white" style={styles.smallItem} onPress={() => {}} />
            <Appbar.Action
                icon="filter-outline"
                color="white"
                style={styles.smallItem}
                onPress={() => {}}
            />
            <Appbar.Action icon="bell" color="white" style={styles.smallItem} onPress={() => {}} />
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    base: {
        paddingHorizontal: 16,
        backgroundColor: colorByTab[Tab.Favourite],
    },
    avatar: {
        marginRight: 'auto',
    },
    smallItem: {
        marginRight: -5,
    },
})
