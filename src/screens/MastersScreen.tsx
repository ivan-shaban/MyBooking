import { useStore } from 'effector-react'
import { StyleSheet } from 'react-native'

import { MasterItem } from '../components/MasterItem'
import { ScrollView } from '../components/Themed'
import { Tab } from '../constants/Tab'
import { $masters, $sortedMasters } from '../store/masters'
import { RootTabScreenProps } from '../types'

export function MastersScreen({ navigation }: RootTabScreenProps<Tab.Masters>) {
    // const masters = useStore($masters)
    const masters = useStore($sortedMasters)
    console.log(
        `>> masters`,
        masters.map(({ name }) => name),
    )
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
