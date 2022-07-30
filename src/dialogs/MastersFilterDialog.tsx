import { useStore } from 'effector-react'
import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Button, Dialog, Portal, Text } from 'react-native-paper'

import { FilterCheckbox } from '../components/FilterCheckbox'
import { FilterParagraph } from '../components/FilterParagraph'
import { Flag } from '../components/Flag'
import { MaterialIcon } from '../components/MaterialIcon'
import { ClientType, Gender, clientsTypes as defaultClientTypes } from '../constants/genders'
import { MasterLanguage, MasterType, masterLanguages, masterTypes } from '../constants/masters'
import { Service, serviceValuesList } from '../constants/services'
import { titleLocale } from '../locales/app'
import { mastersGenderLocale, mastersLocale } from '../locales/masters'
import { servicesLocale } from '../locales/services'
import { subheadersLocale } from '../locales/subheaders'
import { $mastersFilters, resetMastersFilters, setMastersFilters } from '../store/filtering'
import faker from '@faker-js/faker'

export interface Props {
    /**
     * Determines whether clicking outside the dialog dismiss it.
     */
    readonly dismissable?: boolean
    /**
     * Callback that is called when the user dismisses the dialog.
     */
    readonly onDismiss?: () => void
    /**
     * Determines Whether the dialog is visible.
     */
    readonly visible: boolean
    readonly style?: StyleProp<ViewStyle>
}

export const MastersFilterDialog: FC<Props> = memo(function MastersFilterDialog(props) {
    const filtersData = useStore($mastersFilters)
    const [{ services, mastersGender, clientsTypes, languages, types, rating }, setState] =
        useState(filtersData)

    const handleMasterGenderPress = useCallback((gender: Gender) => {
        setState((prev) => ({
            ...prev,
            mastersGender: prev.mastersGender.includes(gender)
                ? prev.mastersGender.filter((s) => s !== gender)
                : [...prev.mastersGender, gender],
        }))
    }, [])

    const handleClientTypePress = useCallback((client: ClientType) => {
        setState((prev) => ({
            ...prev,
            clientsTypes: prev.clientsTypes.includes(client)
                ? prev.clientsTypes.filter((s) => s !== client)
                : [...prev.clientsTypes, client],
        }))
    }, [])

    const handleServicePress = useCallback((service: Service) => {
        setState((prev) => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter((s) => s !== service)
                : [...prev.services, service],
        }))
    }, [])

    const handleMasterTypePress = useCallback((type: MasterType) => {
        setState((prev) => ({
            ...prev,
            types: prev.types.includes(type)
                ? prev.types.filter((s) => s !== type)
                : [...prev.types, type],
        }))
    }, [])

    const handleRatingPress = useCallback((value: number) => {
        setState((prev) => ({
            ...prev,
            rating: prev.rating.includes(value)
                ? prev.rating.filter((s) => s !== value)
                : [...prev.rating, value],
        }))
    }, [])

    const handleLanguagePress = useCallback((language: MasterLanguage) => {
        setState((prev) => ({
            ...prev,
            languages: prev.languages.includes(language)
                ? prev.languages.filter((s) => s !== language)
                : [...prev.languages, language],
        }))
    }, [])

    const handleReset = useCallback(() => {
        resetMastersFilters()

        props.onDismiss?.()
    }, [props])

    const handleApply = useCallback(() => {
        setMastersFilters({
            services,
            mastersGender,
            clientsTypes,
            languages,
            types,
            rating,
        })

        props.onDismiss?.()
    }, [props, services, mastersGender, clientsTypes, languages, types, rating])

    useEffect(() => {
        if (props.visible) {
            setState(filtersData)
        }
    }, [props.visible, filtersData])

    return (
        <Portal>
            <Dialog {...props} style={[props.style, styles.base]}>
                <Dialog.Title>
                    <FormattedMessage id={titleLocale.filters.id} />
                </Dialog.Title>
                <ScrollView contentContainerStyle={styles.content}>
                    <FilterParagraph icon="human-male-female" title={mastersGenderLocale.master}>
                        {[Gender.Male, Gender.Female].map((gender) => (
                            <FilterCheckbox
                                title={mastersGenderLocale[gender].id}
                                data={gender}
                                checked={mastersGender.includes(gender)}
                                disabled={
                                    mastersGender.includes(gender) && mastersGender.length === 1
                                }
                                key={gender}
                                onPress={handleMasterGenderPress}
                            />
                        ))}
                    </FilterParagraph>
                    <FilterParagraph icon="human-male-female" title={mastersGenderLocale.client}>
                        {defaultClientTypes.map((client) => (
                            <FilterCheckbox
                                title={subheadersLocale[client].id}
                                data={client}
                                checked={clientsTypes.includes(client)}
                                disabled={
                                    clientsTypes.includes(client) && clientsTypes.length === 1
                                }
                                key={client}
                                onPress={handleClientTypePress}
                            />
                        ))}
                    </FilterParagraph>
                    <FilterParagraph icon="translate" title="language" inline>
                        {masterLanguages.map((language) => (
                            <FilterCheckbox
                                postfix={<Flag language={language} />}
                                data={language}
                                checked={languages.includes(language)}
                                key={language}
                                inline
                                onPress={handleLanguagePress}
                            />
                        ))}
                    </FilterParagraph>
                    <FilterParagraph
                        icon="account-check-outline"
                        title={subheadersLocale.speciality}
                    >
                        {masterTypes.map((type) => (
                            <FilterCheckbox
                                title={mastersLocale[type].id}
                                data={type}
                                checked={types.includes(type)}
                                key={type}
                                onPress={handleMasterTypePress}
                            />
                        ))}
                    </FilterParagraph>
                    <FilterParagraph icon="chair-rolling" title={subheadersLocale.services}>
                        {serviceValuesList.map((service) => (
                            <FilterCheckbox
                                title={servicesLocale[service].id}
                                data={service}
                                checked={services.includes(service)}
                                key={service}
                                onPress={handleServicePress}
                            />
                        ))}
                    </FilterParagraph>
                    <FilterParagraph icon="star-half-full" title={subheadersLocale.rating}>
                        {faker.datatype
                            .array(5)
                            .map((_, index) => index + 1)
                            .reverse()
                            .map((rate) => (
                                <FilterCheckbox
                                    title={
                                        <View style={styles.ratingItem}>
                                            <Text>{rate} </Text>
                                            <MaterialIcon name="star" size={16} />
                                        </View>
                                    }
                                    data={rate}
                                    checked={rating.includes(rate)}
                                    key={rate}
                                    onPress={handleRatingPress}
                                />
                            ))}
                    </FilterParagraph>
                </ScrollView>

                <Dialog.Actions>
                    <Button onPress={handleReset}>
                        <FormattedMessage id="button.reset" defaultMessage="Сбросить" />
                    </Button>
                    <Button onPress={handleApply}>
                        <FormattedMessage id="button.apply" defaultMessage="Применить" />
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
})

const styles = StyleSheet.create({
    base: { maxHeight: '90%' },
    content: { marginHorizontal: 16 },
    ratingItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})
