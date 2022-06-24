import { createEvent, createStore } from 'effector'

export enum SortOrder {
    ASC,
    DESC,
    NONE,
}

export interface MastersSorting {
    readonly name: SortOrder
    readonly rating: SortOrder
    readonly feedbacks: SortOrder
}

export const resetMastersOrdering = createEvent('reset masters sorting')
export const setMastersOrdering = createEvent<MastersSorting>('set masters sorting')
export const $mastersSorting = createStore<MastersSorting>({
    name: SortOrder.NONE,
    rating: SortOrder.NONE,
    feedbacks: SortOrder.NONE,
})
    .on(setMastersOrdering, (_, state) => state)
    .reset(resetMastersOrdering)

export interface LocationsSorting {
    readonly name: SortOrder
    readonly rating: SortOrder
    readonly feedbacks: SortOrder
}

export const resetLocationOrdering = createEvent('reset masters sorting')
export const setLocationsOrdering = createEvent<LocationsSorting>('set masters sorting')
export const $locationsSorting = createStore<LocationsSorting>({
    name: SortOrder.NONE,
    rating: SortOrder.NONE,
    feedbacks: SortOrder.NONE,
})
    .on(setLocationsOrdering, (_, state) => state)
    .reset(resetLocationOrdering)
