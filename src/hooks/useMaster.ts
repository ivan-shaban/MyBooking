import { useStore } from 'effector-react'

import { $masters } from '../store/masters'

export function useMaster(id: string | number) {
    id = typeof id === 'string' ? parseInt(id, 10) : id

    const masters = useStore($masters)
    return masters.find(({ id: masterId }) => id === masterId)!
}
