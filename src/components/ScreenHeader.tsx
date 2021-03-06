import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { useStore } from 'effector-react'
import * as React from 'react'
import { FC, useMemo } from 'react'
import { StatusBar } from 'react-native'

import { Tab } from '../constants/Tab'
import { $headerColor, $subrouterName } from '../store/header'
import { FavouriteHeader } from './Header/FavouriteHeader'
import { LocationProfileHeader } from './Header/LocationProfileHeader'
import { LocationsHeader } from './Header/LocationsHeader'
import { MasterProfileHeader } from './Header/MasterProfileHeader'
import { MastersHeader } from './Header/MastersHeader'
import { ProfileHeader } from './Header/ProfileHeader'
import { useLightTheme } from './Themed'

export const ScreenHeader: FC<NativeStackHeaderProps> = (props) => {
    const { route } = props
    const isLightTheme = useLightTheme()
    const headerColor = useStore($headerColor)
    const subroute = useStore($subrouterName)
    const header = useMemo(() => {
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
                // @ts-ignore
                return <MasterProfileHeader {...props} />
            }
            case 'LocationProfile': {
                // @ts-ignore
                return <LocationProfileHeader {...props} />
            }
            case 'ChatWithMaster':
            case 'ChatWithLocation': {
                return true
            }
            default: {
                console.log(`>> no header for this view: ${route.name}`)
                return null
            }
        }
    }, [route, subroute, props])

    return (
        <>
            <StatusBar
                // animated
                showHideTransition="slide"
                backgroundColor={headerColor}
                barStyle={isLightTheme ? 'light-content' : 'dark-content'}
                hidden={header === null}
            />
            {header}
        </>
    )
}
