import React, { FC, memo, useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'
import { Marker } from 'react-native-maps'

import { Location } from '../../store/locations'
import { LocationCallout } from './LocationCallout'

export interface Props {
    readonly location: Location
    readonly selected?: boolean
}

export const LocationMarker: FC<Props> = memo(function LocationMarker({ location, selected }) {
    const ref = useRef<Nullable<Marker>>(null)

    useEffect(() => {
        if (selected && ref.current) {
            ref.current.showCallout()
        }
    }, [selected, ref])

    return (
        <Marker coordinate={location} tracksViewChanges={false} ref={ref}>
            <LocationCallout location={location} />
        </Marker>
    )
})

const styles = StyleSheet.create({
    base: {},
})
