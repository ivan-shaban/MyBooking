import { defineMessages } from 'react-intl'

import { Gender } from '../constants/genders'
import { MasterType } from '../constants/masters'

export const mastersLocale = defineMessages({
    [MasterType.Hairdresser]: {
        id: 'master.hairdresser',
        defaultMessage: 'Парикмахер',
    },
    [MasterType.Stylist]: {
        id: 'master.stylist',
        defaultMessage: 'Косметолог',
    },
    [MasterType.Masseur]: {
        id: 'master.masseur',
        defaultMessage: 'Масажист',
    },
    [MasterType.Podiatrist]: {
        id: 'master.podiatrist',
        defaultMessage: 'Подолог',
    },
    [MasterType.NailsMaster]: {
        id: 'master.nailsmaster',
        defaultMessage: 'Маникюрист',
    },
    [MasterType.Beautician]: {
        id: 'master.beautician',
        defaultMessage: 'Косметолог',
    },
    [MasterType.Cosmetic]: {
        id: 'master.cosmetic',
        defaultMessage: 'Косметик',
    },
})

export const mastersGenderLocale = defineMessages({
    master: {
        id: 'gender.master',
        defaultMessage: 'Пол специалиста',
    },
    client: {
        id: 'gender.client',
        defaultMessage: 'Пол клиента',
    },
    [Gender.Male]: {
        id: 'gender.male',
        defaultMessage: 'Мужчина',
    },
    [Gender.Female]: {
        id: 'gender.female',
        defaultMessage: 'Женщина',
    },
})
