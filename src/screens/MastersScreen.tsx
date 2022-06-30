import { useStore } from 'effector-react'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import { MasterItem } from '../components/MasterItem'
import { Tab } from '../constants/Tab'
import { $managedMasters } from '../store/masters'
import { RootTabScreenProps } from '../types'

export function MastersScreen({ navigation }: RootTabScreenProps<Tab.Masters>) {
    const masters = useStore($managedMasters)

    return (
        <ScrollView style={styles.container}>
            {masters.map((master, index) => (
                <MasterItem master={master} isLast={index === masters.length - 1} key={master.id} />
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
