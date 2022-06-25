import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { useStore } from 'effector-react'
import React, { FC, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'

import { colorByTab } from '../../constants/Colors'
import { Tab } from '../../constants/Tab'
import { MastersFilterDialog } from '../../dialogs/MastersFilterDialog'
import { MastersSortingDialog } from '../../dialogs/MastersSortingDialog'
import { $masterFiltersApplied } from '../../store/filtering'
import { $mastersSorting, SortOrder } from '../../store/sorting'
import { $currentUser } from '../../store/user'
import { Avatar } from '../Avatar'
import { HeaderAction } from './HeaderAction'

export interface Props extends NativeStackHeaderProps {}

export const MastersHeader: FC<Props> = () => {
    const user = useStore($currentUser)
    const masterFiltersApplied = useStore($masterFiltersApplied)
    const { rating, feedbacks, name } = useStore($mastersSorting)
    const sortingIcon =
        rating === SortOrder.ASC || feedbacks === SortOrder.ASC || name === SortOrder.ASC
            ? 'sort-ascending'
            : rating === SortOrder.DESC || feedbacks === SortOrder.DESC || name === SortOrder.DESC
            ? 'sort-descending'
            : 'sort'
    const filtersIcon = masterFiltersApplied ? 'filter-check-outline' : 'filter-remove'

    const [sortingDialogVisible, setSortingDialogVisible] = useState(false)
    const showSortingDialog = () => setSortingDialogVisible(true)
    const hideSortingDialog = () => setSortingDialogVisible(false)

    const [filtersDialogVisible, setFiltersDialogVisible] = useState(false)
    const showFiltersDialog = () => setFiltersDialogVisible(true)
    const hideFiltersDialog = () => setFiltersDialogVisible(false)

    return (
        <Appbar.Header style={styles.base}>
            <Avatar style={styles.avatar} uri={user?.avatar} />
            <HeaderAction icon="magnify" onPress={() => {}} />
            <HeaderAction icon={sortingIcon} onPress={showSortingDialog} />
            <HeaderAction icon={filtersIcon} onPress={showFiltersDialog} />
            <HeaderAction icon="bell" onPress={() => {}} />
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
})
