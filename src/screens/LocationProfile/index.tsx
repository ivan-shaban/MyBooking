import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useStore } from 'effector-react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { StyleSheet } from 'react-native'
import { Badge, FAB } from 'react-native-paper'

import { View } from '../../components/Themed'
import { colorByTab } from '../../constants/Colors'
import { Tab } from '../../constants/Tab'
import { useLocation } from '../../hooks/useLocation'
import { actionsLocale } from '../../locales/actions'
import { menuLocale } from '../../locales/menu'
import { subheadersLocale } from '../../locales/subheaders'
import { $masters } from '../../store/masters'
import { LocationProfileTabParamList, RootStackScreenProps } from '../../types'
import { DescriptionTab } from './DescriptionTab'
import { FeedbacksTab } from './FeedbacksTab'
import { MastersTab } from './MastersTab'

const TabsBottom = createMaterialTopTabNavigator<LocationProfileTabParamList>()

export function LocationProfile({ navigation, route }: RootStackScreenProps<'LocationProfile'>) {
    const intl = useIntl()
    const masters = useStore($masters)
    const location = useLocation(route.params.id)
    const localMasters = masters.filter(({ locationId }) => locationId === location.id)!

    const [fabOpen, setFabOpen] = useState(false)

    const onStateChange = ({ open }: { open: boolean }) => setFabOpen(open)

    return (
        <View style={styles.base}>
            <TabsBottom.Navigator initialRouteName="Description" tabBarPosition="bottom">
                <TabsBottom.Screen
                    name="Description"
                    component={DescriptionTab}
                    options={{ title: intl.formatMessage(menuLocale[Tab.Profile]) }}
                    initialParams={{ location }}
                />
                <TabsBottom.Screen
                    name="Masters"
                    component={MastersTab}
                    options={{
                        tabBarLabel: intl.formatMessage(menuLocale[Tab.Masters]),
                        tabBarBadge: () =>
                            !!localMasters.length && (
                                <Badge style={styles.mastersBadge}>{localMasters.length}</Badge>
                            ),
                    }}
                    initialParams={{ location }}
                />
                <TabsBottom.Screen
                    name="Feedbacks"
                    component={FeedbacksTab}
                    options={{
                        tabBarLabel: intl.formatMessage(subheadersLocale.feedbacks),
                        tabBarBadge: () =>
                            !!location.feedbacks.length && (
                                <Badge style={styles.feedbackBadge}>
                                    {location.feedbacks.length}
                                </Badge>
                            ),
                    }}
                    initialParams={{ location }}
                />
            </TabsBottom.Navigator>
            <FAB.Group
                open={fabOpen}
                icon={fabOpen ? 'arrow-left-circle' : 'plus'}
                color="white"
                style={styles.fab}
                fabStyle={styles.fabStyle}
                actions={[
                    {
                        icon: 'calendar-today',
                        label: intl.formatMessage(actionsLocale.signUpSoon),
                        onPress: () => console.log('Pressed star'),
                    },
                    {
                        icon: 'calendar-search',
                        label: intl.formatMessage(actionsLocale.signUpAtDate),
                        onPress: () => console.log('Pressed email'),
                    },
                    {
                        icon: 'calendar-remove',
                        label: intl.formatMessage(actionsLocale.cancelRecord),
                        onPress: () => console.log('Pressed email'),
                    },
                    {
                        icon: 'comment-plus-outline',
                        // icon: 'comment-text',
                        label: intl.formatMessage(actionsLocale.leftFeedback),
                        onPress: () => console.log('Pressed email'),
                    },
                    {
                        icon: 'forum',
                        label: intl.formatMessage(actionsLocale.sendMessage),
                        onPress: () => console.log('Pressed email'),
                    },
                ]}
                onStateChange={onStateChange}
                onPress={() => {
                    if (fabOpen) {
                        // do something if the speed dial is open
                    }
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        position: 'relative',
        flex: 1,
    },
    mastersBadge: {
        marginTop: 5,
        marginRight: 0,
        color: 'white',
        backgroundColor: 'red',
    },
    feedbackBadge: {
        marginTop: 5,
        marginRight: 20,
        color: 'white',
        backgroundColor: 'red',
    },
    // fab: { position: 'absolute', bottom: 48, right: 0, backgroundColor: 'red' },
    fab: { position: 'absolute', bottom: 48, right: 0 },
    fabStyle: { backgroundColor: colorByTab[Tab.Locations] },
})
