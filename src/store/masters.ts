import { ClientType, allGenders } from '../constants/genders'
import { MasterLanguage, MasterType } from '../constants/masters'
import { HairServices, Service } from '../constants/services'
import { delay } from '../utils/time'
import { $mastersSorting, SortOrder } from './sorting'
import faker from '@faker-js/faker'
import { combine, createEffect, createStore } from 'effector'
import shuffle from 'lodash.shuffle'

export const allMasterTypes = [
    MasterType.Hairdresser,
    MasterType.Stylist,
    MasterType.Masseur,
    MasterType.Podiatrist,
    MasterType.NailsMaster,
    MasterType.Beautician,
    MasterType.Cosmetic,
] as const

export interface Master {
    readonly id: number
    readonly name: string
    readonly type: MasterType[]
    readonly shortDescription: string
    readonly description: string
    readonly gender: 'male' | 'female'
    readonly avatar?: string
    readonly locationId: number
    readonly services: Service[]
    readonly languages: MasterLanguage[]
    readonly worksWith: ClientType[]
    readonly rating: number
    readonly feedbacks: Feedback[]
}

export const requestAllMastersData = createEffect({
    name: 'request all masters',
    handler: async () => {
        await delay(500)

        return faker.datatype.array(17).map((_, index): Master => {
            const gender = Math.random() > 0.6 ? 'male' : 'female'
            const shuffledGenders = shuffle(allGenders)
            const shuffledServices = shuffle(Object.values(HairServices))
            const shuffledLanguages = shuffle(Object.values(MasterLanguage))

            return {
                id: index,
                name: `${faker.name.firstName(gender)} ${faker.name.lastName(gender)}`,
                type: [
                    allMasterTypes[
                        faker.datatype.number({ min: 0, max: allMasterTypes.length - 1 })
                    ],
                ],
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
    requestAllMastersData.doneData,
    (_, data) => data,
)

export const $sortedMasters = combine(
    $masters,
    $mastersSorting,
    (masters, { name, rating, feedbacks }) => {
        // console.log(`>> 111`, { name, rating, feedbacks })
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
        console.log(
            `>> masters`,
            masters.map(
                ({ name, rating, feedbacks }) => `${name} (${rating}) > ${feedbacks.length}`,
            ),
        )
        return masters
    },
)
