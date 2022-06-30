import React, { FC, memo } from 'react'
import { useTheme } from 'react-native-paper'
import { IconProps } from 'react-native-vector-icons/Icon'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export interface Props extends IconProps {}

export const MaterialIcon: FC<Props> = memo(function MaterialIcon(props) {
    const { colors } = useTheme()
    return (
        <MaterialCommunityIcons
            // @ts-ignore
            color={colors.text}
            size={20}
            {...props}
        />
    )
})
