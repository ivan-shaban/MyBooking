import { EventMapCore } from '@react-navigation/core/src/types'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationState } from '@react-navigation/routers/src/types'
import React, { FC, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { StyleSheet } from 'react-native'

import { colorByTab } from '../constants/Colors'
import { Tab } from '../constants/Tab'
import { menuLocale } from '../locales/menu'
import { changeSubRouter } from '../store/header'
import { RootTabParamList } from '../types'
import { FavouriteScreen } from './FavouriteScreen'
import { LocationsScreen } from './LocationsScreen'
import { MastersScreen } from './MastersScreen'
import { ProfileScreen } from './ProfileScreen'

const BottomTab = createMaterialBottomTabNavigator<RootTabParamList>()

export interface Props {}

export const MainScreen: FC<Props> = function MainScreen(props) {
    const intl = useIntl()
    const listeners = useMemo(
        () => ({
            state: (event: EventMapCore<NavigationState<RootTabParamList>>['state']) => {
                const routeName = event.data.state.routes[event.data.state.index].name as Tab
                changeSubRouter(routeName)
            },
        }),
        [],
    )

    return (
        <BottomTab.Navigator
            shifting={true}
            sceneAnimationEnabled={false}
            // @ts-ignore
            screenListeners={listeners}
        >
            <BottomTab.Screen
                name={Tab.Masters}
                component={MastersScreen}
                options={{
                    title: intl.formatMessage(menuLocale[Tab.Masters]),
                    tabBarIcon: 'account-group-outline',
                    tabBarBadge: 2,
                    tabBarColor: colorByTab[Tab.Masters],
                }}
            />
            <BottomTab.Screen
                name={Tab.Locations}
                component={LocationsScreen}
                options={{
                    title: intl.formatMessage(menuLocale[Tab.Locations]),
                    tabBarIcon: 'map-marker-multiple-outline',
                    tabBarColor: colorByTab[Tab.Locations],
                }}
            />
            <BottomTab.Screen
                name={Tab.Favourite}
                component={FavouriteScreen}
                options={{
                    title: intl.formatMessage(menuLocale[Tab.Favourite]),
                    tabBarIcon: 'cards-heart-outline',
                    tabBarColor: colorByTab[Tab.Favourite],
                }}
            />
            <BottomTab.Screen
                name={Tab.Profile}
                component={ProfileScreen}
                options={{
                    title: intl.formatMessage(menuLocale[Tab.Profile]),
                    tabBarIcon: 'account',
                    tabBarColor: colorByTab[Tab.Profile],
                }}
            />
        </BottomTab.Navigator>
    )
}

const styles = StyleSheet.create({
    base: {},
})
