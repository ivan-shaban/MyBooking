import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { useStore } from 'effector-react'
import React, { FC, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'

import { colorByTab } from '../../constants/Colors'
import { Tab } from '../../constants/Tab'
import { LocationsFilterDialog } from '../../dialogs/LocationsFilterDialog'
import { LocationsSortingDialog } from '../../dialogs/LocationsSortingDialog'
import { $locationsFiltersApplied } from '../../store/filtering'
import { $locationsSorting, SortOrder } from '../../store/sorting'
import { $currentUser } from '../../store/user'
import { Avatar } from '../Avatar'
import { HeaderAction } from './HeaderAction'

export interface Props extends NativeStackHeaderProps {}

export const LocationsHeader: FC<Props> = () => {
    const user = useStore($currentUser)
    const locationsFiltersApplied = useStore($locationsFiltersApplied)
    const { rating, feedbacks, name } = useStore($locationsSorting)
    const sortingIcon =
        rating === SortOrder.ASC || feedbacks === SortOrder.ASC || name === SortOrder.ASC
            ? 'sort-ascending'
            : rating === SortOrder.DESC || feedbacks === SortOrder.DESC || name === SortOrder.DESC
            ? 'sort-descending'
            : 'sort'

    const filtersIcon = locationsFiltersApplied ? 'filter-check-outline' : 'filter-remove'

    const [sortingDialogVisible, setSortingDialogVisible] = useState(false)
    const showDialog = () => setSortingDialogVisible(true)
    const hideSortingDialog = () => setSortingDialogVisible(false)

    const [filtersDialogVisible, setFiltersDialogVisible] = useState(false)
    const showFiltersDialog = () => setFiltersDialogVisible(true)
    const hideFiltersDialog = () => setFiltersDialogVisible(false)

    return (
        <Appbar.Header style={styles.base}>
            <Avatar style={styles.avatar} uri={user?.avatar} />
            <HeaderAction icon="magnify" onPress={() => {}} />
            <HeaderAction icon="map-search-outline" onPress={() => {}} />
            <HeaderAction icon={sortingIcon} onPress={showDialog} />
            <HeaderAction icon={filtersIcon} onPress={showFiltersDialog} />
            <HeaderAction icon="bell" onPress={() => {}} />
            <LocationsSortingDialog visible={sortingDialogVisible} onDismiss={hideSortingDialog} />
            <LocationsFilterDialog visible={filtersDialogVisible} onDismiss={hideFiltersDialog} />
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    base: {
        paddingHorizontal: 16,
        backgroundColor: colorByTab[Tab.Locations],
    },
    avatar: {
        marginRight: 'auto',
    },
})
