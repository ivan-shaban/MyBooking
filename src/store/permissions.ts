import {Platform} from 'react-native'

import {createEffect} from 'effector'
import {requestPhoneCallPermission} from './permissions.android'

export const requestPhoneCallPermissionFx = createEffect({
    name: 'request phone call permission',
    handler: async () => {
        if (Platform.OS === 'android') {
            await requestPhoneCallPermission()
        }
    },
})
