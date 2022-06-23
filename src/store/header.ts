import { colorByTab } from '../constants/Colors'
import { Tab } from '../constants/Tab'
import { createEvent, createStore } from 'effector'

export const changeSubRouter = createEvent<Tab>('change sub router')
export const $subrouterName = createStore(Tab.Masters).on(changeSubRouter, (_, route) => route)
export const $headerColor = $subrouterName.map((route) => colorByTab[route])
