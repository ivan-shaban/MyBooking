import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { useStore } from 'effector-react'
import React, { FC, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'

import { colorByTab } from '../../constants/Colors'
import { Tab } from '../../constants/Tab'
import { MastersFilterDialog } from '../../dialogs/MastersFilterDialog'
import { MastersSortingDialog } from '../../dialogs/MastersSortingDialog'
import { $currentUser } from '../../store/user'
import { Avatar } from '../Avatar'

export interface Props extends NativeStackHeaderProps {}

export const MastersHeader: FC<Props> = () => {
    const user = useStore($currentUser)

    const [sortingDialogVisible, setSortingDialogVisible] = useState(false)
    const showSortingDialog = () => setSortingDialogVisible(true)
    const hideSortingDialog = () => setSortingDialogVisible(false)

    const [filtersDialogVisible, setFiltersDialogVisible] = useState(false)
    const showFiltersDialog = () => setFiltersDialogVisible(true)
    const hideFiltersDialog = () => setFiltersDialogVisible(false)

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
                icon="sort"
                color="white"
                style={styles.smallItem}
                onPress={showSortingDialog}
            />
            <Appbar.Action
                icon="filter-outline"
                color="white"
                style={styles.smallItem}
                onPress={showFiltersDialog}
            />
            <Appbar.Action icon="bell" color="white" style={styles.smallItem} onPress={() => {}} />
            <MastersSortingDialog visible={sortingDialogVisible} onDismiss={hideSortingDialog} />
            <MastersFilterDialog visible={filtersDialogVisible} onDismiss={hideFiltersDialog} />
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    base: {
        paddingHorizontal: 16,
        backgroundColor: colorByTab[Tab.Masters],
    },
    avatar: {
        marginRight: 'auto',
    },
    smallItem: {
        marginRight: -5,
    },
})
