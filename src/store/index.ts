import { changeLocale, loadLocaleFx, saveLocaleFx } from './locale'
import { requestAllLocationsDataFx } from './locations'
import { requestInitialData } from './main'
import { requestAllMastersDataFx } from './masters'
import { changeTheme, loadThemeFx, saveThemeFx } from './theme'
import { requestUserDataFx } from './user'
import { combine, sample } from 'effector'

let isInitialDataStarted = false
export const $isInitialDataLoaded = combine(
    requestUserDataFx.pending,
    requestAllMastersDataFx.pending,
    requestAllLocationsDataFx.pending,
    loadLocaleFx.pending,
    loadThemeFx.pending,
    (...args) => {
        const isRequestsPending = args.some((flag) => flag)
        if (isRequestsPending) {
            isInitialDataStarted = true
        }
        return isInitialDataStarted && !isRequestsPending
    },
)

// load initial data
sample({
    source: requestInitialData,
    target: [
        requestUserDataFx,
        requestAllMastersDataFx,
        requestAllLocationsDataFx,
        loadLocaleFx,
        loadThemeFx,
    ],
})

sample({
    source: changeLocale,
    target: saveLocaleFx,
})

sample({
    source: changeTheme,
    target: saveThemeFx,
})

// sample({
//     source: requestPermissions,
//     target: [requestPhoneCallPermissionFx],
// })
