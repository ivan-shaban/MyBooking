import { useStore } from 'effector-react'
import React, { useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { View as DefaultView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Subheading, Text, Title } from 'react-native-paper'

import { version } from '../../package.json'
import { Flag } from '../components/Flag'
import { MaterialIcon } from '../components/MaterialIcon'
import { Paragpaph } from '../components/Paragpaph'
import { PhoneRecord } from '../components/PhoneRecord'
import { Tab } from '../constants/Tab'
import { MasterLanguage } from '../constants/masters'
import { subheadersLocale } from '../locales/subheaders'
import { $locale, changeLocale, locales } from '../store/locale'
import { $theme, Theme, changeTheme } from '../store/theme'
import { $currentUser } from '../store/user'
import { RootTabScreenProps } from '../types'

export function ProfileScreen(props: RootTabScreenProps<Tab.Profile>) {
    const user = useStore($currentUser)
    const theme = useStore($theme)
    const locale = useStore($locale)
    const handleLocaleChange = useCallback(() => {
        changeLocale(
            locale === locales[0] ? locales[1] : locale === locales[1] ? locales[2] : locales[0],
        )
    }, [locale])
    const handleThemeChange = useCallback(() => {
        changeTheme(
            theme === Theme.Light ? Theme.Dark : theme === Theme.Dark ? Theme.System : Theme.Light,
        )
    }, [theme])
    const handleTelEdit = useCallback(() => {}, [])

    return (
        <View style={styles.base}>
            <TouchableOpacity style={styles.language} onPress={handleLocaleChange}>
                <MaterialIcon style={styles.icon} name="translate" />
                <Title>
                    <FormattedMessage id="language" defaultMessage="Язык" />
                </Title>
                <View style={styles.flags}>
                    <Flag language={MasterLanguage.ru} locale="ru-RU" />
                    <DefaultView style={styles.divider} />
                    <Flag language={MasterLanguage.ka} locale="ka_GE" />
                    <DefaultView style={styles.divider} />
                    <Flag language={MasterLanguage.en} locale="en-US" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.theme} onPress={handleThemeChange}>
                <MaterialIcon style={styles.icon} name="theme-light-dark" />
                <Title>
                    <FormattedMessage id="light-theme" defaultMessage="Цветовая схема" />
                </Title>
                <View style={styles.themeName}>
                    {theme === Theme.Light ? (
                        <>
                            <MaterialIcon style={styles.icon} name="white-balance-sunny" />
                            <Text>
                                <FormattedMessage id="light-theme.light" defaultMessage="Светлая" />
                            </Text>
                        </>
                    ) : theme === Theme.Dark ? (
                        <>
                            <MaterialIcon style={styles.icon} name="weather-night" />
                            <Text>
                                <FormattedMessage id="light-theme.dark" defaultMessage="Темная" />
                            </Text>
                        </>
                    ) : (
                        <>
                            <MaterialIcon style={styles.icon} name="theme-light-dark" />
                            <Text>
                                <FormattedMessage
                                    id="light-theme.system"
                                    defaultMessage="Системная"
                                />
                            </Text>
                        </>
                    )}
                </View>
            </TouchableOpacity>
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
        marginTop: 8,
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
    theme: {
        marginTop: 8,
        marginBottom: 4,
        marginHorizontal: 16,
        alignItems: 'center',
        flexDirection: 'row',
    },
    themeName: {
        marginRight: 8,
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
