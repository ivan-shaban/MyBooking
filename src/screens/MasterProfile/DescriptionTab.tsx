import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs/src/types'
import React, { FC, Fragment } from 'react'
import { useIntl } from 'react-intl'
import { View as DefaultView, Dimensions, StyleSheet, View } from 'react-native'
import { Chip, Subheading } from 'react-native-paper'

import { Flag } from '../../components/Flag'
import { LocationItem } from '../../components/LocationItem'
import { Paragpaph, paragpaphOffset } from '../../components/Paragpaph'
import { ServiceChip } from '../../components/ServiceChip'
import { ScrollView } from '../../components/Themed'
import { Tab } from '../../constants/Tab'
import { ClientType } from '../../constants/genders'
import { useLocation } from '../../hooks/useLocation'
import { menuLocale } from '../../locales/menu'
import { subheadersLocale } from '../../locales/subheaders'
import { MasterProfileTabParamList } from '../../types'

export interface Props
    extends MaterialTopTabScreenProps<MasterProfileTabParamList, 'Description'> {}

export const DescriptionTab: FC<Props> = function Description({ route }) {
    const intl = useIntl()
    const { master } = route.params
    const location = useLocation(master.locationId)

    return (
        <ScrollView>
            <Paragpaph icon="image-text" title={subheadersLocale.aboutSelf}>
                <Subheading>{master.description}</Subheading>
            </Paragpaph>
            <Paragpaph icon="account-multiple-check-outline" title={subheadersLocale.clients}>
                <View style={styles.clientsContainer}>
                    {master.worksWith.map((type) => (
                        <Chip
                            icon={
                                type === ClientType.Girls || type === ClientType.Boys
                                    ? 'baby-face-outline'
                                    : type === ClientType.Men
                                    ? 'face-man'
                                    : 'face-woman-outline'
                            }
                            style={[
                                styles.clientChip,
                                type === ClientType.Women || type === ClientType.Girls
                                    ? styles.clientChipFemale
                                    : styles.clientChipMale,
                            ]}
                            key={type}
                        >
                            {intl.formatMessage(subheadersLocale[type])}
                        </Chip>
                    ))}
                </View>
            </Paragpaph>
            <Paragpaph icon="translate" title={subheadersLocale.languages}>
                <View style={styles.servicesContainer}>
                    {master.languages.map((language, index) => (
                        <Fragment key={language}>
                            <Flag language={language} indicator />
                            {index !== master.languages.length - 1 && (
                                <DefaultView style={styles.divider} />
                            )}
                        </Fragment>
                    ))}
                </View>
            </Paragpaph>
            <Paragpaph icon="chair-rolling" title={subheadersLocale.services}>
                <View style={styles.servicesContainer}>
                    {master.services.map((service) => (
                        <ServiceChip type={service} key={service} />
                    ))}
                </View>
            </Paragpaph>
            {location && (
                <Paragpaph icon="map-marker-outline" title={menuLocale[Tab.Locations]}>
                    <View style={styles.pContent}>
                        <LocationItem location={location} isLast key={location.id} />
                    </View>
                </Paragpaph>
            )}
            <View style={{ height: 20 }} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    subtitle: {
        marginTop: 8,
    },
    clientsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor: 'red',
    },
    clientChip: {
        marginTop: 8,
        marginRight: 8,
    },
    clientChipMale: {
        backgroundColor: '#00c5ff',
    },
    clientChipFemale: {
        backgroundColor: 'rgba(255,0,243,0.52)',
    },
    servicesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor: 'red',
    },
    serviceChip: {
        marginTop: 8,
        marginRight: 8,
    },
    pContent: { marginLeft: -paragpaphOffset, width: Dimensions.get('screen').width },
    divider: {
        width: 1,
        height: 20,
        backgroundColor: '#ccc',
    },
})
