import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs/src/types'
import { useStore } from 'effector-react'
import React, { FC } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'

import { MasterItem } from '../../components/MasterItem'
import { Paragpaph, paragpaphOffset } from '../../components/Paragpaph'
import { ServiceChip } from '../../components/ServiceChip'
import { ScrollView } from '../../components/Themed'
import { Tab } from '../../constants/Tab'
import { Service } from '../../constants/services'
import { menuLocale } from '../../locales/menu'
import { subheadersLocale } from '../../locales/subheaders'
import { $masters } from '../../store/masters'
import { LocationProfileTabParamList } from '../../types'

export interface Props extends MaterialTopTabScreenProps<LocationProfileTabParamList, 'Masters'> {}

export const MastersTab: FC<Props> = function Description({ route }) {
    const masters = useStore($masters)
    const { location } = route.params
    const localMasters = masters.filter(({ locationId }) => locationId === location.id)!

    return (
        <ScrollView showsVerticalScrollIndicator={true}>
            <Paragpaph icon="chair-rolling" title={subheadersLocale.services}>
                <View style={styles.servicesContainer}>
                    {Array.from(
                        localMasters.reduce((result, master) => {
                            master.services.forEach((service) => result.add(service))
                            return result
                        }, new Set<Service>()),
                    ).map((service) => (
                        <ServiceChip type={service} key={service} />
                    ))}
                </View>
            </Paragpaph>
            <Paragpaph icon="account-group-outline" title={menuLocale[Tab.Masters]}>
                <View style={styles.pContent}>
                    {localMasters.map((master, index) => (
                        <MasterItem
                            master={master}
                            isLast={index === localMasters.length - 1}
                            key={master.id}
                        />
                    ))}
                </View>
            </Paragpaph>
            <View style={{ height: 20 }} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    servicesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor: 'red',
    },
    pContent: { marginLeft: -paragpaphOffset, width: Dimensions.get('screen').width },
})
