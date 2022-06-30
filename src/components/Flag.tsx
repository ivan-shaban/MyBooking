import { useStore } from 'effector-react'
import React, { FC, memo } from 'react'
import { StyleSheet } from 'react-native'
// @ts-ignore
import Icon from 'react-native-ico-flags'

import { MasterLanguage } from '../constants/masters'
import { $language } from '../store/locale'

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

    return locale ? (
        <Icon
            style={styles.icon}
            name={countryByLang[language]}
            width={lang === language ? 30 : 20}
            height={lang === language ? 30 : 20}
        />
    ) : (
        <Icon style={styles.icon} name={countryByLang[language]} />
    )
})

const styles = StyleSheet.create({
    icon: {
        marginHorizontal: 8,
    },
})
