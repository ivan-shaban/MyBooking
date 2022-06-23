import { useStore } from 'effector-react'

import { $locations } from '../store/locations'

export function useLocation(id: number | string) {
    id = typeof id === 'string' ? parseInt(id, 10) : id

    const locations = useStore($locations)
    return locations.find(({ id: locationId }) => id === locationId)!
}
