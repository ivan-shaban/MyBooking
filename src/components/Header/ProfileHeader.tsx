import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { useStore } from 'effector-react'
import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'

import { colorByTab } from '../../constants/Colors'
import { Tab } from '../../constants/Tab'
import { $currentUser } from '../../store/user'
import { Avatar } from '../Avatar'
import { HeaderAction } from './HeaderAction'

export interface Props extends NativeStackHeaderProps {}

export const ProfileHeader: FC<Props> = () => {
    const user = useStore($currentUser)

    return (
        <Appbar.Header style={styles.base}>
            <Avatar style={styles.avatar} uri={user?.avatar} />
            <HeaderAction icon="bell" onPress={() => {}} />
            <HeaderAction icon="forum" onPress={() => {}} />
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    base: {
        paddingHorizontal: 16,
        backgroundColor: colorByTab[Tab.Profile],
    },
    avatar: {
        marginRight: 'auto',
    },
})
