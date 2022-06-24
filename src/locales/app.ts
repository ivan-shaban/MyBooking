import { defineMessages } from 'react-intl'

export const system = defineMessages({
    CFBundleDisplayName: {
        id: 'CFBundleDisplayName',
        defaultMessage: 'CFBundleDisplayName',
    },
    NSContactsUsageDescription: {
        id: 'NSContactsUsageDescription',
        defaultMessage: 'NSContactsUsageDescription',
    },
})

export const titleLocale = defineMessages({
    sorting: {
        id: 'title.sorting',
        defaultMessage: 'Сортировка',
    },
    filters: {
        id: 'title.filtersList',
        defaultMessage: 'Список фильтров',
    },
})

export const sortingLocale = defineMessages({
    name: {
        id: 'sortBy.name',
        defaultMessage: 'По имени',
    },
    rating: {
        id: 'sortBy.rating',
        defaultMessage: 'По рейтингу',
    },
    feedbacksCount: {
        id: 'sortBy.feedbacksCount',
        defaultMessage: 'По количеству отзывов',
    },
})
