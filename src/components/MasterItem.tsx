import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useStore } from 'effector-react'
import React, { FC, memo, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Headline, Text } from 'react-native-paper'

import { mastersLocale } from '../locales/masters'
import { Master } from '../store/masters'
import { $currentUser } from '../store/user'
import { Avatar } from './Avatar'
import { RatingEntry } from './RatingEntry'
import { View as ThemedView } from './Themed'

export interface Props {
    readonly master: Master
    readonly isLast: boolean
}

export const MasterItem: FC<Props> = memo(function MasterItem({ master, isLast }) {
    const intl = useIntl()
    const navigation = useNavigation()
    const currentUser = useStore($currentUser)
    const isFavourite = currentUser?.favourite.masters.includes(master.id)

    const handleOpenProfile = useCallback(() => {
        navigation.navigate('MasterProfile', {
            id: master.id.toString(),
            screen: 'Description',
            params: { master },
        })
    }, [master])

    return (
        <TouchableOpacity onPress={handleOpenProfile}>
            <ThemedView style={styles.base}>
                <Avatar style={styles.avatar} uri={master.avatar} />
                <View>
                    <Headline numberOfLines={1} style={styles.reducedText}>
                        {master.name}
                    </Headline>
                    <Text>
                        {master.type
                            .map((type) => intl.formatMessage(mastersLocale[type]))
                            .join(', ')}
                        ,{' '}
                        <RatingEntry
                            rating={master.rating}
                            feedbacksCount={master.feedbacks.length}
                            single
                        />
                    </Text>
                </View>
                {isFavourite && (
                    <MaterialCommunityIcons
                        style={styles.favourite}
                        size={24}
                        name="cards-heart"
                        color="red"
                    />
                )}
            </ThemedView>
            {!isLast && <View style={styles.divider} />}
        </TouchableOpacity>
    )
})

const styles = StyleSheet.create({
    base: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        // backgroundColor: 'powderblue',
    },
    divider: {
        width: '60%',
        alignSelf: 'center',
        borderBottomColor: '#e1e1e1',
        borderBottomWidth: 1,
    },
    avatar: {
        marginRight: 16,
    },
    reducedText: { width: Dimensions.get('screen').width - 85 },
    favourite: {
        marginLeft: 'auto',
    },
})
