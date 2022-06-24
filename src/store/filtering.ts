import { Gender } from '../constants/genders'
import { MasterLanguage, MasterType } from '../constants/masters'
import { Service } from '../constants/services'
import { createEvent, createStore } from 'effector'

export enum SortOrder {
    ASC,
    DESC,
    NONE,
}

export interface MastersFilters {
    readonly mastersGender: Gender[]
    readonly clientsGender: Gender[]
    readonly languages: MasterLanguage[]
    readonly types: MasterType[]
    readonly services: Service[]
    readonly rating: number[]
}

export const resetMastersFilters = createEvent('reset masters filters')
export const setMastersFilters = createEvent<MastersFilters>('set masters filters')
export const $mastersFilters = createStore<MastersFilters>({
    services: [],
    mastersGender: [Gender.Male, Gender.Female],
    clientsGender: [Gender.Male, Gender.Female],
    languages: [],
    types: [],
    rating: [],
})
    .on(setMastersFilters, (_, state) => state)
    .reset(resetMastersFilters)

export interface LocationsFilters {
    readonly name: SortOrder
    readonly rating: SortOrder
    readonly feedbacks: SortOrder
}

export const resetLocationFilters = createEvent('reset locations filters')
export const setLocationsFilters = createEvent<LocationsFilters>('set locations filters')
export const $locationsFilters = createStore<LocationsFilters>({
    name: SortOrder.NONE,
    rating: SortOrder.NONE,
    feedbacks: SortOrder.NONE,
})
    .on(setLocationsFilters, (_, state) => state)
    .reset(resetLocationFilters)
