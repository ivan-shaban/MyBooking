import { defineMessages } from 'react-intl'

import { HairServices } from '../constants/services'

export const servicesLocale = defineMessages({
    [HairServices.haircut_man]: {
        id: 'service.haircut_man',
        defaultMessage: 'Мужская стрижка',
    },
    [HairServices.haircut_woman]: {
        id: 'service.haircut_woman',
        defaultMessage: 'Женская стрижка',
    },
    [HairServices.haircut_child]: {
        id: 'service.haircut_child',
        defaultMessage: 'Детская стрижка',
    },
    [HairServices.coloring_melirovanie]: {
        id: 'service.coloring_melirovanie',
        defaultMessage: 'Окрашивание: мелирование',
    },
    [HairServices.coloring_shatush]: {
        id: 'service.coloring_shatush',
        defaultMessage: 'Окрашивание: шатуш',
    },
    [HairServices.coloring_balayaj]: {
        id: 'service.coloring_balayaj',
        defaultMessage: 'Окрашивание: балаяж',
    },
    [HairServices.coloring_airtouch]: {
        id: 'service.coloring_airtouch',
        defaultMessage: 'Окрашивание: аиртач',
    },
    [HairServices.cure_laminirovanie]: {
        id: 'service.cure_laminirovanie',
        defaultMessage: 'Лечение волос: ламинирование',
    },
    [HairServices.cure_ekranirovanie]: {
        id: 'service.cure_ekranirovanie',
        defaultMessage: 'Лечение волос: экранирование',
    },
    [HairServices.cure_glazirovanie]: {
        id: 'service.cure_glazirovanie',
        defaultMessage: 'Лечение волос: глазирование',
    },
    [HairServices.straightening]: {
        id: 'service.straightening',
        defaultMessage: 'Выпрямление',
    },
    [HairServices.hairstyle]: {
        id: 'service.hairstyle',
        defaultMessage: 'Прическа',
    },
    [HairServices.styling_ceremonial]: {
        id: 'service.styling_ceremonial',
        defaultMessage: 'Укладка: торжественная',
    },
    [HairServices.styling_daily]: {
        id: 'service.styling_daily',
        defaultMessage: 'Укладка: ежедневная',
    },
})
