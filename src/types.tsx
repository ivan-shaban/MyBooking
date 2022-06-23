/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { Tab } from './constants/Tab'
import { Location } from './store/locations'
import { Master } from './store/masters'

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }

    type Nullable<T> = null | T
    interface Feedback {
        readonly id: number
        readonly title: string
        readonly message: string
        readonly rating: number
        readonly date: string
    }
}

export type RootStackParamList = {
    Root: NavigatorScreenParams<RootTabParamList>
    MasterProfile: { id: string } & NavigatorScreenParams<MasterProfileTabParamList>
    LocationProfile: { id: string } & NavigatorScreenParams<LocationProfileTabParamList>
    MasterPhotoModal: { master: Master }
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    Screen
>

export type RootTabParamList = {
    [Tab.Masters]: undefined
    [Tab.Locations]: undefined
    [Tab.Favourite]: undefined
    [Tab.Profile]: undefined
}

export type MasterProfileTabParamList = {
    Description: { master: Master }
    Feedbacks: { master: Master }
}

export type LocationProfileTabParamList = {
    Description: { location: Location }
    Masters: { location: Location }
    Feedbacks: { location: Location }
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
>
