import { useStore } from 'effector-react'
import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Button, Dialog, Portal, RadioButton } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { FilterCheckbox } from '../components/FilterCheckbox'
import { FilterParagraph } from '../components/FilterParagraph'
import { FilterRadioButton } from '../components/FilterRadioButton'
import { Text, useThemeColor } from '../components/Themed'
import { Service, serviceValuesList } from '../constants/services'
import { scheduleActionsLocale } from '../locales/actions'
import { titleLocale } from '../locales/app'
import { mastersGenderLocale } from '../locales/masters'
import { servicesLocale } from '../locales/services'
import { subheadersLocale } from '../locales/subheaders'
import {
    $locationsFilters,
    WorkType,
    resetLocationFilters,
    setLocationsFilters,
} from '../store/filtering'
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

export const LocationsFilterDialog: FC<Props> = memo(function LocationsFilterDialog(props) {
    const iconColor = useThemeColor({}, 'text')
    const filtersData = useStore($locationsFilters)
    const [{ services, rating, open }, setState] = useState(filtersData)

    const handleSchedulePress = useCallback((open: WorkType) => {
        setState((prev) => ({
            ...prev,
            open,
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

    const handleRatingPress = useCallback((value: number) => {
        setState((prev) => ({
            ...prev,
            rating: prev.rating.includes(value)
                ? prev.rating.filter((s) => s !== value)
                : [...prev.rating, value],
        }))
    }, [])

    const handleReset = useCallback(() => {
        resetLocationFilters()

        props.onDismiss?.()
    }, [props])

    const handleApply = useCallback(() => {
        setLocationsFilters({ services, rating, open })

        props.onDismiss?.()
    }, [props, services, rating, open])

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
                    <FilterParagraph icon="clock-outline" title={scheduleActionsLocale.workType}>
                        <FilterRadioButton
                            title={scheduleActionsLocale[WorkType.OPEN_NOW].id}
                            data={WorkType.OPEN_NOW}
                            checked={open === WorkType.OPEN_NOW}
                            onPress={handleSchedulePress}
                        />
                        <FilterRadioButton
                            title={scheduleActionsLocale[WorkType.ALL].id}
                            data={WorkType.ALL}
                            checked={open === WorkType.ALL}
                            onPress={handleSchedulePress}
                        />
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
                                            <MaterialCommunityIcons
                                                name="star"
                                                size={16}
                                                color={iconColor}
                                            />
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
