import { defineMessages } from 'react-intl'

import { WorkType } from '../store/filtering'

export const actionsLocale = defineMessages({
    signUpSoon: {
        id: 'actions.signUpSoon',
        defaultMessage: 'Записаться на ближайшее время',
    },
    signUpAtDate: {
        id: 'actions.signUpAtDate',
        defaultMessage: 'Записаться на определенную дату',
    },
    cancelRecord: {
        id: 'actions.cancelRecord',
        defaultMessage: 'Отменить запись',
    },
    leftFeedback: {
        id: 'actions.leftFeedback',
        defaultMessage: 'Оставить отзыв',
    },
    sendMessage: {
        id: 'actions.sendMessage',
        defaultMessage: 'Оставить сообщение',
    },
})

export const scheduleActionsLocale = defineMessages({
    workType: {
        id: 'schedule.workType',
        defaultMessage: 'Режим работы',
    },
    [WorkType.OPEN_NOW]: {
        id: 'schedule.openNow',
        defaultMessage: 'Открыто сейчас',
    },
    [WorkType.ALL]: {
        id: 'schedule.all',
        defaultMessage: 'Все',
    },
})
