import { useStore } from 'effector-react'
import React, { FC, memo, useCallback } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-ico-flags'

import { MasterLanguage } from '../constants/masters'
import { $language, Language, changeLanguage } from '../store/locale'

export type Props =
    | {
          language: MasterLanguage
          indicator: true
      }
    | {
          language: Language
          indicator?: boolean
      }

const countryByLang = {
    ru: 'russia',
    ge: 'georgia',
    en: 'united-states-of-america',
    fr: 'france',
    de: 'germany',
    ar: 'united-arab-emirates',
    tr: 'turkey',
    ua: 'ukraine',
    be: 'belarus',
}

export const Flag: FC<Props> = memo(function Flag({ language, indicator }) {
    const lang = useStore($language)
    const handlePress = useCallback(() => {
        // @ts-ignore
        changeLanguage(language)
    }, [language])

    return indicator ? (
        <Icon style={styles.icon} name={countryByLang[language]} />
    ) : (
        <TouchableOpacity onPress={handlePress}>
            <Icon
                style={styles.icon}
                name={countryByLang[language]}
                width={lang === language ? 30 : 20}
                height={lang === language ? 30 : 20}
            />
        </TouchableOpacity>
    )
})

const styles = StyleSheet.create({
    icon: {
        marginHorizontal: 8,
    },
})
