import { useStore } from 'effector-react'
import React, { FC, memo, useCallback } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
// @ts-ignore
import Icon from 'react-native-ico-flags'

import { MasterLanguage } from '../constants/masters'
import { $language, $locale, changeLocale } from '../store/locale'

export type Props = {
    readonly language: MasterLanguage
    readonly locale?: string
}

const countryByLang = {
    ru: 'russia',
    ka: 'georgia',
    en: 'united-states-of-america',
    fr: 'france',
    de: 'germany',
    ar: 'united-arab-emirates',
    tr: 'turkey',
    ua: 'ukraine',
    be: 'belarus',
}

export const Flag: FC<Props> = memo(function Flag({ language, locale }) {
    const lang = useStore($language)
    const handlePress = useCallback(() => {
        // @ts-ignore
        changeLocale(locale)
    }, [locale])

    return locale ? (
        <TouchableOpacity onPress={handlePress}>
            <Icon
                style={styles.icon}
                name={countryByLang[language]}
                width={lang === language ? 30 : 20}
                height={lang === language ? 30 : 20}
            />
        </TouchableOpacity>
    ) : (
        <Icon style={styles.icon} name={countryByLang[language]} />
    )
})

const styles = StyleSheet.create({
    icon: {
        marginHorizontal: 8,
    },
})
