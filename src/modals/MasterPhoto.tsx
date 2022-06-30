import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { StyleSheet, View } from 'react-native'
import { Button, Subheading, Title } from 'react-native-paper'

import { Avatar } from '../components/Avatar'
import { mastersLocale } from '../locales/masters'
import { RootStackScreenProps } from '../types'

export default function MasterPhoto({
    route,
    navigation,
}: RootStackScreenProps<'MasterPhotoModal'>) {
    const intl = useIntl()
    const { master } = route.params

    return (
        <View style={styles.base}>
            <Avatar style={styles.avatar} uri={master.avatar} size={300} />
            <Title>{master.name}</Title>
            <Subheading>
                {master.type.map((type) => intl.formatMessage(mastersLocale[type])).join(', ')}
            </Subheading>
            <Button style={styles.backButton} onPress={navigation.goBack}>
                <FormattedMessage id="button.back" defaultMessage="Назад" />
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        marginTop: 'auto',
        marginBottom: 8,
    },
    backButton: {
        marginTop: 'auto',
        marginBottom: 20,
    },
})
