import { Location } from '../store/locations'
import moment from 'moment'

export const isLocationOpen = (location: Location) => {
    const now = moment().local(true)
    const schedule = location.schedules[now.isoWeekday() - 1]

    return (
        schedule !== false &&
        (schedule === '24h' ||
            schedule.some(([starts, ends]) => {
                const opening = moment(starts, 'HH:mm:ss')
                const closing = moment(ends, 'HH:mm:ss')
                return now.isBetween(opening, closing)
            }))
    )
}
