import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { useStore } from 'effector-react'
import * as React from 'react'
import { FC } from 'react'

import { Tab } from '../constants/Tab'
import { $subrouterName } from '../store/header'
import { FavouriteHeader } from './Header/FavouriteHeader'
import { LocationProfileHeader } from './Header/LocationProfileHeader'
import { LocationsHeader } from './Header/LocationsHeader'
import { MasterProfileHeader } from './Header/MasterProfileHeader'
import { MastersHeader } from './Header/MastersHeader'
import { ProfileHeader } from './Header/ProfileHeader'

export const ScreenHeader: FC<NativeStackHeaderProps> = (props) => {
    const { route } = props
    const subroute = useStore($subrouterName)

    switch (route.name) {
        case 'Root': {
            switch (subroute) {
                case Tab.Masters: {
                    return <MastersHeader {...props} />
                }
                case Tab.Locations: {
                    return <LocationsHeader {...props} />
                }
                case Tab.Favourite: {
                    return <FavouriteHeader {...props} />
                }
                case Tab.Profile: {
                    return <ProfileHeader {...props} />
                }
                default: {
                    console.log(`>> no header for this SUB view: ${route.name} > ${subroute}`)
                    return null
                }
            }
        }
        case 'MasterProfile': {
            return <MasterProfileHeader {...props} />
        }
        case 'LocationProfile': {
            return <LocationProfileHeader {...props} />
        }
        case 'MasterPhotoModal': {
            return null
        }
        default: {
            console.log(`>> no header for this view: ${route.name}`)
            return null
        }
    }
}
