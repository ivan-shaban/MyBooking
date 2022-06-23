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
