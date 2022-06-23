import { PermissionsAndroid } from 'react-native'

import { createEffect } from 'effector'

export const requestPhoneCallPermissionFx = createEffect({
    name: 'request phone call permission',
    handler: async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CALL_PHONE,
                {
                    title: 'Request phone call permission',
                    message: `Just to quick number target location or master`,
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Phone calls available')
            } else {
                console.log('Phone calls permission denied')
            }
        } catch (err) {
            console.log('> CANNOT REQUEST PERMISSION', err)
        }
    },
})
