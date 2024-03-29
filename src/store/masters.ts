import { ClientType, Gender, clientsTypes } from '../constants/genders'
import { MasterLanguage, MasterType, masterLanguages, masterTypes } from '../constants/masters'
import { Service, serviceValuesList } from '../constants/services'
import { delay } from '../utils/time'
import { $masterFiltersApplied, $mastersFilters } from './filtering'
import { $mastersSorting, $mastersSortingApplied, SortOrder } from './sorting'
import faker from '@faker-js/faker'
import { combine, createEffect, createStore } from 'effector'
import shuffle from 'lodash.shuffle'

export interface Master {
    readonly id: number
    readonly name: string
    readonly type: MasterType[]
    readonly shortDescription: string
    readonly description: string
    readonly gender: Gender
    readonly avatar?: string
    readonly locationId: number
    readonly services: Service[]
    readonly languages: MasterLanguage[]
    readonly worksWith: ClientType[]
    readonly rating: number
    readonly feedbacks: Feedback[]
}

export const requestAllMastersDataFx = createEffect({
    name: 'request all masters',
    handler: async () => {
        await delay(500)

        return faker.datatype.array(17).map((_, index): Master => {
            const gender = Math.random() > 0.6 ? Gender.Male : Gender.Female
            const shuffledGenders = shuffle(clientsTypes)
            const shuffledServices = shuffle(serviceValuesList)
            const shuffledLanguages = shuffle(masterLanguages)

            return {
                id: index,
                name: `${faker.name.firstName(gender)} ${faker.name.lastName(gender)}`,
                type: [masterTypes[faker.datatype.number({ min: 0, max: masterTypes.length - 1 })]],
                shortDescription: faker.random.words(5),
                description: faker.random.words(20),
                gender,
                avatar: `https://randomuser.me/api/portraits/${
                    gender === 'male' ? 'men' : 'women'
                }/${index + 1}.jpg`,
                locationId: faker.datatype.number({ min: 0, max: 7 }),
                services: faker.datatype
                    .array(faker.datatype.number({ min: 1, max: shuffledServices.length - 1 }))
                    .map((_, index) => shuffledServices[index]),
                languages: faker.datatype
                    .array(faker.datatype.number({ min: 1, max: shuffledLanguages.length - 1 }))
                    .map((_, index) => shuffledLanguages[index]),
                worksWith: faker.datatype
                    .array(faker.datatype.number({ min: 1, max: 4 }))
                    .map((_, index) => shuffledGenders[index]),
                rating: faker.datatype.number({ min: 30, max: 50 }) / 10,
                feedbacks: faker.datatype
                    .array(faker.datatype.number({ min: 0, max: 30 }))
                    .map((_, index) => ({
                        id: index,
                        title: faker.random.words(faker.datatype.number({ min: 4, max: 20 })),
                        message: faker.random.words(faker.datatype.number({ min: 20, max: 100 })),
                        rating: faker.datatype.number({ min: 30, max: 50 }) / 10,
                        date: faker.date.past(0).toISOString(),
                    })),
            }
        })
    },
})

export const $masters = createStore<Master[]>([]).on(
    requestAllMastersDataFx.doneData,
    (_, data) => data,
)

/**
 * Filtered and sorted masters list.
 */
export const $managedMasters = combine(
    $masters,
    $mastersSortingApplied,
    $mastersSorting,
    $masterFiltersApplied,
    $mastersFilters,
    (masters, applySorting, { name, rating, feedbacks }, applyFilters, filters) => {
        if (applyFilters) {
            if (filters.rating.length) {
                masters = masters.filter(({ rating }) =>
                    filters.rating.some((r) =>
                        r === 5 ? rating >= 4.8 : r <= rating && r + 1 > rating,
                    ),
                )
            }
            if (filters.languages.length) {
                masters = masters.filter(({ languages }) =>
                    filters.languages.some((lang) => languages.includes(lang)),
                )
            }
            if (filters.mastersGender !== $mastersFilters.defaultState.mastersGender) {
                masters = masters.filter(({ gender }) => filters.mastersGender.includes(gender))
            }
            if (filters.clientsTypes !== $mastersFilters.defaultState.clientsTypes) {
                masters = masters.filter(({ worksWith }) =>
                    filters.clientsTypes.some((client) => worksWith.includes(client)),
                )
            }

            if (filters.services.length) {
                masters = masters.filter(({ services }) =>
                    filters.services.some((service) => services.includes(service)),
                )
            }
            if (filters.types.length) {
                masters = masters.filter(({ type }) => filters.types.some((t) => type.includes(t)))
            }
        }

        if (applySorting) {
            if (feedbacks !== SortOrder.NONE) {
                masters = [...masters].sort((a, b) =>
                    feedbacks === SortOrder.ASC
                        ? b.feedbacks.length - a.feedbacks.length
                        : a.feedbacks.length - b.feedbacks.length,
                )
            }
            if (rating !== SortOrder.NONE) {
                masters = [...masters].sort((a, b) =>
                    rating === SortOrder.ASC ? b.rating - a.rating : a.rating - b.rating,
                )
            }
            if (name !== SortOrder.NONE) {
                masters = [...masters].sort((a, b) =>
                    name === SortOrder.ASC
                        ? a.name.localeCompare(b.name)
                        : b.name.localeCompare(a.name),
                )
            }
        }
        return masters
    },
)
