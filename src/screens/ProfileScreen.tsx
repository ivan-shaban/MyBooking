import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useStore } from 'effector-react'
import React, { useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { View as DefaultView, StyleSheet } from 'react-native'
import { Subheading, Title } from 'react-native-paper'

import { version } from '../../package.json'
import { Flag } from '../components/Flag'
import { Paragpaph } from '../components/Paragpaph'
import { PhoneRecord } from '../components/PhoneRecord'
import { View, useThemeColor } from '../components/Themed'
import { Tab } from '../constants/Tab'
import { subheadersLocale } from '../locales/subheaders'
import { $currentUser } from '../store/user'
import { RootTabScreenProps } from '../types'

export function ProfileScreen({ navigation }: RootTabScreenProps<Tab.Profile>) {
    const user = useStore($currentUser)
    const iconColor = useThemeColor({}, 'text')
    const handleTelEdit = useCallback(() => {}, [])

    return (
        <View style={styles.base}>
            <View style={styles.language}>
                <MaterialCommunityIcons
                    style={styles.icon}
                    name="translate"
                    size={20}
                    color={iconColor}
                />
                <Title>
                    <FormattedMessage id="language" defaultMessage="Язык" />
                </Title>
                <View style={styles.flags}>
                    <Flag language="ru" />
                    <DefaultView style={styles.divider} />
                    <Flag language="ge" />
                    <DefaultView style={styles.divider} />
                    <Flag language="en" />
                </View>
            </View>
            <Paragpaph
                icon="phone-outline"
                title={subheadersLocale.contacts}
                onEdit={handleTelEdit}
            >
                <PhoneRecord phone={user!.tel} disabled />
            </Paragpaph>
            <Paragpaph icon="cellphone-arrow-down" title="version">
                <Subheading>{version}</Subheading>
            </Paragpaph>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
    },
    icon: {
        marginRight: 8,
    },
    language: {
        marginVertical: 8,
        marginHorizontal: 16,
        alignItems: 'center',
        flexDirection: 'row',
        // backgroundColor: 'red',
    },
    flags: {
        marginLeft: 'auto',
        alignItems: 'center',
        flexDirection: 'row',
    },
    divider: {
        width: 1,
        height: 20,
        backgroundColor: '#ccc',
    },
})
