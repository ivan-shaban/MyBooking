import React, { FC, memo, useCallback, useState } from 'react'
import {
    Animated,
    Dimensions,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Pressable,
    StyleSheet,
    View,
} from 'react-native'

import { ScrollView } from './Themed'

export interface ImageInfo {
    url: string
    width: number
    height: number
}

export interface Props {
    images: string[] | ImageInfo[]
}

export const Gallery: FC<Props> = memo(function Gallery({ images }) {
    const [activeIndexNumber, setActiveIndexNumber] = useState(0)
    const handleScroll = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            const slide =
                (event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width) >> 0
            if (slide !== activeIndexNumber) {
                setActiveIndexNumber(slide) //here we will set our active index num
            }
        },
        [activeIndexNumber],
    )

    return (
        <Animated.View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                alwaysBounceVertical
                directionalLockEnabled={true}
                disableIntervalMomentum={true}
                horizontal
                onScroll={handleScroll}
            >
                {images.map((item) =>
                    typeof item === 'string' ? (
                        <Pressable key={item}>
                            <Image style={styles.defaultImageStyle} source={{ uri: item }} />
                        </Pressable>
                    ) : (
                        <Pressable key={item.url}>
                            <Image
                                style={
                                    !item.width || !item.height
                                        ? styles.defaultImageStyle
                                        : { width: item.width, height: item.height }
                                }
                                source={{ uri: item.url }}
                            />
                        </Pressable>
                    ),
                )}
            </ScrollView>
            <View style={styles.dotContainer}>
                {images.length > 1 &&
                    images.map((item, index) => (
                        <View
                            key={typeof item === 'string' ? item : item.url}
                            style={
                                index == activeIndexNumber
                                    ? [styles.dot, styles.dot__selected]
                                    : styles.dot
                            }
                        />
                    ))}
            </View>
        </Animated.View>
    )
})

const styles = StyleSheet.create({
    defaultImageStyle: {
        width: Dimensions.get('window').width,
        height: 250,
    },
    dotContainer: {
        flexDirection: 'row',
        position: 'absolute',
        alignSelf: 'center',
        bottom: 20,
    },
    dot: {
        overflow: 'hidden',
        width: 8,
        height: 8,
        opacity: 0.5,
        borderColor: 'white',
        backgroundColor: 'white',
        borderWidth: 2,
        marginHorizontal: 4,
        borderRadius: 10,
    },
    dot__selected: {
        opacity: 1,
    },
})
