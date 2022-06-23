import { defineMessages } from 'react-intl'

import { ClientType } from '../constants/genders'

export const subheadersLocale = defineMessages({
    languages: {
        id: 'subheader.languages',
        defaultMessage: 'Языки которыми владеет',
    },
    services: {
        id: 'subheader.services',
        defaultMessage: 'Услуги',
    },
    clients: {
        id: 'subheader.clients',
        defaultMessage: 'Клиенты',
    },
    aboutSelf: {
        id: 'subheader.aboutSelf',
        defaultMessage: 'O себе',
    },
    feedbacks: {
        id: 'subheader.feedbacks',
        defaultMessage: 'Отзывы',
    },
    address: {
        id: 'subheader.address',
        defaultMessage: 'Адрес',
    },
    contacts: {
        id: 'subheader.contacts',
        defaultMessage: 'Контактные данные',
    },
    schedule: {
        id: 'subheader.schedule',
        defaultMessage: 'График работы',
    },
    [ClientType.Men]: {
        id: `subheader.men`,
        defaultMessage: 'Мужчины',
    },
    [ClientType.Women]: {
        id: `subheader.women`,
        defaultMessage: 'Женщины',
    },
    [ClientType.Boys]: {
        id: `subheader.boys`,
        defaultMessage: 'Мальчики',
    },
    [ClientType.Girls]: {
        id: `subheader.girls`,
        defaultMessage: 'Девочки',
    },
})
