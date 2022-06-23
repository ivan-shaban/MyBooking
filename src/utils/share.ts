import { Platform, Share } from 'react-native'

import { expo } from '../../app.json'
import { $language } from '../store/locale'

export const share = async (title: string, message: string, url: string) => {
    try {
        const result = await Share.share({
            title,
            message,
            url,
        })
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error) {
        console.log(`>> ERROR: cannot share`, error)
    }
}

const APP_ID = Platform.OS === 'ios' ? expo.name : expo.android.package
export function getAppStoreURL() {
    const language = $language.getState()

    return `https://play.google.com/store/apps/details?id=${APP_ID}&hl=${language}`
}
