import { useStore } from 'effector-react'
import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { Button, Dialog, Portal } from 'react-native-paper'

import { SortingEntry } from '../components/SortingEntry'
import { sortingLocale, titleLocale } from '../locales/app'
import {
    $mastersSorting,
    SortOrder,
    resetMastersOrdering,
    setMastersOrdering,
} from '../store/sorting'

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

export const MastersSortingDialog: FC<Props> = memo(function MastersSortingDialog(props) {
    const intl = useIntl()
    const sortingData = useStore($mastersSorting)
    const [{ name, rating, feedbacks }, setState] = useState(sortingData)

    const handleSortingByNameChange = useCallback((order: SortOrder) => {
        setState({
            ...$mastersSorting.defaultState,
            name: order,
        })
    }, [])

    const handleSortingByRatingChange = useCallback((order: SortOrder) => {
        setState({
            ...$mastersSorting.defaultState,
            rating: order,
        })
    }, [])

    const handleSortingByFeedbacksChange = useCallback((order: SortOrder) => {
        setState({
            ...$mastersSorting.defaultState,
            feedbacks: order,
        })
    }, [])

    const handleReset = useCallback(() => {
        resetMastersOrdering()

        props.onDismiss?.()
    }, [props])

    const handleApply = useCallback(() => {
        setMastersOrdering({ name, rating, feedbacks })

        props.onDismiss?.()
    }, [props, name, rating, feedbacks])

    useEffect(() => {
        if (props.visible) {
            setState(sortingData)
        }
    }, [props.visible, sortingData])

    return (
        <Portal>
            <Dialog {...props}>
                <Dialog.Title>
                    <FormattedMessage id={titleLocale.sorting.id} />
                </Dialog.Title>
                <Dialog.Content>
                    <SortingEntry
                        title={intl.formatMessage(sortingLocale.name)}
                        order={name}
                        onChange={handleSortingByNameChange}
                    />
                    <SortingEntry
                        title={intl.formatMessage(sortingLocale.rating)}
                        order={rating}
                        onChange={handleSortingByRatingChange}
                    />
                    <SortingEntry
                        title={intl.formatMessage(sortingLocale.feedbacksCount)}
                        order={feedbacks}
                        onChange={handleSortingByFeedbacksChange}
                    />
                </Dialog.Content>
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

const styles = StyleSheet.create({})
