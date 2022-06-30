import { LinkingOptions } from '@react-navigation/native'

import { Tab } from '../constants/Tab'
import { RootStackParamList } from '../types'
import { appName } from '../utils/share'

const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [`${appName}://`, `https://${appName}.com`, `https://*.${appName}.com`],
    config: {
        initialRouteName: 'Root',
        screens: {
            Root: {
                initialRouteName: Tab.Locations,
                // initialRouteName: Tab.Masters,
                path: 'root',
                screens: {
                    [Tab.Masters]: {
                        path: 'masters',
                    },
                    [Tab.Locations]: {
                        path: 'locations',
                    },
                    [Tab.Favourite]: {
                        path: 'favourite',
                    },
                    [Tab.Profile]: {
                        path: 'profile',
                    },
                },
            },
            Map: 'map/:id?',
            MasterPhotoModal: 'masters/:id/photo',
            ChatWithMaster: 'masters/:id/chat',
            ChatWithLocation: 'locations/:id/chat',
            MasterProfile: {
                path: 'masters/:id',
                // initialRouteName: Tab.Locations,
                // screens: {
                //     Description: {
                //         screens: {
                //             MastersScreen: 'one',
                //         },
                //     },
                //     Feedbacks: {
                //         screens: {
                //             LocationsScreen: 'two',
                //         },
                //     },
                // },
            },
            LocationProfile: {
                path: 'locations/:id',
            },
        },
    },
}

export default linking
