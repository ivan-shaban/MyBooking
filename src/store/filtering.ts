import { ClientType, Gender, clientsTypes } from '../constants/genders'
import { MasterLanguage, MasterType } from '../constants/masters'
import { Service } from '../constants/services'
import { combine, createEvent, createStore } from 'effector'

export enum WorkType {
    OPEN_NOW = 'open_now',
    ALL = 'all',
}

export interface MastersFilters {
    readonly mastersGender: Gender[]
    readonly clientsTypes: ClientType[]
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
    clientsTypes,
    languages: [],
    types: [],
    rating: [],
})
    .on(setMastersFilters, (_, state) => state)
    .reset(resetMastersFilters)

export const $masterFiltersApplied = combine(
    $mastersFilters,
    (filters) => JSON.stringify(filters) !== JSON.stringify($mastersFilters.defaultState),
)

export interface LocationsFilters {
    readonly services: Service[]
    readonly rating: number[]
    readonly open: WorkType
}

export const resetLocationFilters = createEvent('reset locations filters')
export const setLocationsFilters = createEvent<LocationsFilters>('set locations filters')
export const $locationsFilters = createStore<LocationsFilters>({
    services: [],
    rating: [],
    open: WorkType.ALL,
})
    .on(setLocationsFilters, (_, state) => state)
    .reset(resetLocationFilters)

export const $locationsFiltersApplied = combine(
    $locationsFilters,
    (filters) => JSON.stringify(filters) !== JSON.stringify($locationsFilters.defaultState),
)
