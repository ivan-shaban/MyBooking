import { delay } from '../utils/time'
import faker from '@faker-js/faker'
import { combine, createEffect, createStore } from 'effector'
import shuffle from 'lodash.shuffle'

export interface CurrentUser {
    readonly avatar: string
    readonly tel: string
    readonly favourite: {
        readonly masters: number[]
        readonly locations: number[]
    }
}

export const requestUserDataFx = createEffect({
    name: 'request current user data',
    handler: async (): Promise<CurrentUser> => {
        await delay(500)

        const masterIds = shuffle(faker.datatype.array(17).map((_, index) => index))
        const favouriteMastersCount = faker.datatype.number({
            min: 1,
            max: 6,
        })
        const locationsIds = shuffle(faker.datatype.array(8).map((_, index) => index))
        const favouriteLocationsCount = faker.datatype.number({
            min: 1,
            max: locationsIds.length - 1,
        })

        return {
            avatar: 'https://media-exp1.licdn.com/dms/image/D5603AQEECTGL5iYzXg/profile-displayphoto-shrink_400_400/0/1632843294224?e=1660780800&v=beta&t=2gN1UUQ8gJspNJtplukngF1cjn1xwHIyjHCZo5V4CD4',
            // avatar: 'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
            tel: faker.phone.phoneNumber('+375 29 ### ## ##'),
            favourite: {
                masters: masterIds.filter((_, index) => index <= favouriteMastersCount),
                locations: locationsIds.filter((_, index) => index <= favouriteLocationsCount),
            },
        }
    },
})

export const addFavouriteMasterFx = createEffect({
    name: 'add master to favourite list',
    handler: async (masterId: number) => {
        await delay(500)

        return masterId
    },
})

export const removeFavouriteMasterFx = createEffect({
    name: 'remove master from favourite list',
    handler: async (masterId: number) => {
        await delay(500)

        return masterId
    },
})

export const $isFavouriteMasterRequestPending = combine(
    addFavouriteMasterFx.pending,
    removeFavouriteMasterFx.pending,
    (...args) => args.some((pending) => pending),
)

export const addFavouriteLocationFx = createEffect({
    name: 'add location to favourite list',
    handler: async (locationId: number) => {
        await delay(500)

        return locationId
    },
})

export const removeFavouriteLocationFx = createEffect({
    name: 'remove master from favourite list',
    handler: async (locationId: number) => {
        await delay(500)

        return locationId
    },
})

export const $isFavouriteLocationRequestPending = combine(
    addFavouriteLocationFx.pending,
    removeFavouriteLocationFx.pending,
    (...args) => args.some((pending) => pending),
)

export const $currentUser = createStore<Nullable<CurrentUser>>(null)
    .on(requestUserDataFx.doneData, (_, currentUser) => currentUser)
    .on(addFavouriteMasterFx.doneData, (currentUser, masterId) =>
        currentUser
            ? {
                  ...currentUser,
                  favourite: {
                      ...currentUser.favourite,
                      masters: [...currentUser.favourite.masters, masterId],
                  },
              }
            : null,
    )
    .on(removeFavouriteMasterFx.doneData, (currentUser, masterId) =>
        currentUser
            ? {
                  ...currentUser,
                  favourite: {
                      ...currentUser.favourite,
                      masters: currentUser.favourite.masters.filter((id) => id !== masterId),
                  },
              }
            : null,
    )
    .on(addFavouriteLocationFx.doneData, (currentUser, locationId) =>
        currentUser
            ? {
                  ...currentUser,
                  favourite: {
                      ...currentUser.favourite,
                      locations: [...currentUser.favourite.locations, locationId],
                  },
              }
            : null,
    )
    .on(removeFavouriteLocationFx.doneData, (currentUser, locationId) =>
        currentUser
            ? {
                  ...currentUser,
                  favourite: {
                      ...currentUser.favourite,
                      locations: currentUser.favourite.locations.filter((id) => id !== locationId),
                  },
              }
            : null,
    )
