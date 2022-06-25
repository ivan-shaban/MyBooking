import { ClientType, allGenders } from '../constants/genders'
import { Service } from '../constants/services'
import { isLocationOpen } from '../utils/locations'
import { delay } from '../utils/time'
import { $locationsFilters, $locationsFiltersApplied, WorkType } from './filtering'
import { $masters } from './masters'
import { $locationsSorting, $locationsSortingApplied, SortOrder } from './sorting'
import faker from '@faker-js/faker'
import { combine, createEffect, createStore } from 'effector'
import shuffle from 'lodash.shuffle'

export interface Location {
    readonly id: number
    readonly name: string
    readonly address: string
    readonly description: string
    readonly worksWith: ClientType[]
    readonly lat: number
    readonly lng: number
    readonly tel: string[]
    readonly gallery: string[]
    readonly rating: number
    readonly feedbacks: Feedback[]
    /**
     * 7 days, max 3 breaks per day
     */
    readonly schedules: Array<Array<[string, string]> | false | '24h'>
}

export const requestAllLocationsDataFx = createEffect({
    name: 'request all locations',
    handler: async () => {
        await delay(500)

        return faker.datatype.array(8).map((_, index): Location => {
            const shuffledGenders = shuffle(allGenders)

            return {
                id: index,
                name: faker.company.companyName(),
                description: faker.random.words(20),
                address: faker.address.streetAddress(true),
                lat: 0,
                lng: 0,
                tel: faker.datatype
                    .array(faker.datatype.number({ min: 1, max: 4 }))
                    .map(() => faker.phone.phoneNumber('+375 29 ### ## ##')),
                worksWith: faker.datatype
                    .array(faker.datatype.number({ min: 1, max: 4 }))
                    .map((_, index) => shuffledGenders[index]),
                gallery: [
                    'https://batuminow.com/images/articles/saloni-krasoti-v-batumi.jpg',
                    'https://img01.flagma-ge.com/photo/salon-krasoty-i-kafe-bar-1745847_big.jpg',
                    'https://s.zagranitsa.com/images/guides/19900/original/8c14f008529edf5ea10896547c1cd250.jpg?1440410972',
                    'https://design-p.kz/wp-content/uploads/2016/09/%D1%81%D0%B0%D0%BB%D0%BE%D0%BD-4.jpg',
                    'https://alterainvest.ru/upload/resize_cache/iblock/c61/730_520_2fd378400bea36faa9ca1fabcd11528ab/c61755cc40061bf6dffd73db71dbafd2.jpg',
                ],
                schedules: [
                    [['8:00', '21:00']],
                    false,
                    [['8:00', '21:00']],
                    [['8:00', '21:00']],
                    '24h',
                    [['8:00', '21:00']],
                    [['8:00', '19:00']],
                ],
                rating: faker.datatype.number({ min: 30, max: 50 }) / 10,
                feedbacks: faker.datatype
                    .array(faker.datatype.number({ min: 0, max: 100 }))
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

export const $locations = createStore<Location[]>([]).on(
    requestAllLocationsDataFx.doneData,
    (_, data) => data,
)

export const $managedLocations = combine(
    $locations,
    $masters,
    $locationsSortingApplied,
    $locationsSorting,
    $locationsFiltersApplied,
    $locationsFilters,
    (locations, masters, applySorting, { name, rating, feedbacks }, applyFilters, filters) => {
        if (applyFilters) {
            if (filters.rating.length) {
                locations = locations.filter(({ rating }) =>
                    filters.rating.some((r) =>
                        r === 5 ? rating >= 4.8 : r <= rating && r + 1 > rating,
                    ),
                )
            }
            if (filters.open !== WorkType.ALL) {
                locations = locations.filter(isLocationOpen)
            }
            if (filters.services.length) {
                locations = locations.filter(({ id }) => {
                    const localServices = masters
                        .filter(({ locationId }) => locationId === id)
                        .reduce((result, { services }) => {
                            services.forEach((service) => result.add(service))
                            return result
                        }, new Set<Service>())

                    return filters.services.some((service) => localServices.has(service))
                })
            }
        }

        if (applySorting) {
            if (feedbacks !== SortOrder.NONE) {
                locations = [...locations].sort((a, b) =>
                    feedbacks === SortOrder.ASC
                        ? b.feedbacks.length - a.feedbacks.length
                        : a.feedbacks.length - b.feedbacks.length,
                )
            }
            if (rating !== SortOrder.NONE) {
                locations = [...locations].sort((a, b) =>
                    rating === SortOrder.ASC ? b.rating - a.rating : a.rating - b.rating,
                )
            }
            if (name !== SortOrder.NONE) {
                locations = [...locations].sort((a, b) =>
                    name === SortOrder.ASC
                        ? a.name.localeCompare(b.name)
                        : b.name.localeCompare(a.name),
                )
            }
        }
        return locations
    },
)
