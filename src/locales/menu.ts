import { defineMessages } from 'react-intl'

import { Tab } from '../constants/Tab'

export const menuLocale = defineMessages({
    [Tab.Masters]: {
        id: 'menu.masters',
        defaultMessage: 'Специалисты',
    },
    [Tab.Locations]: {
        id: 'menu.locations',
        defaultMessage: 'Места',
    },
    [Tab.Favourite]: {
        id: 'menu.favourite',
        defaultMessage: 'Избранное',
    },
    [Tab.Profile]: {
        id: 'menu.profile',
        defaultMessage: 'Профиль',
    },
})
