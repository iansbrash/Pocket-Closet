import React, {useState} from 'react'
import {
    View,
    Animated,
    Pressable
} from 'react-native'
import GlobalStyles from './GlobalStyles'
import { ArrowBack } from './GlobalIcons'


export const TogglableDrawer = ({minHeight, children}) => {
    const [viewHeight, setViewHeight] = useState(null)
    const [brandTagsArrowRotation] = useState(new Animated.Value(0))
    const [drawerOpen, setDrawerOpen] = useState(false)

    const ToggleDrawer = () => {
        // console.log("Toggling drawer")
        // console.log(`viewHeight: ${viewHeight}`)
        if (drawerOpen){
            onDrawerClose();
        } else {
            onDrawerOpen()
        }
        setDrawerOpen(!drawerOpen)
    }

    const onDrawerOpen = () => {
        Animated.timing(brandTagsArrowRotation, {
            toValue: 1,
            duration: 250,
            useNativeDriver: false
        }).start();
    }
    //makes image big
    const onDrawerClose = () => {
        Animated.timing(brandTagsArrowRotation, {
            toValue: 0,
            duration: 250,
            useNativeDriver: false
        }).start();
    }

    return (
        <View style={{width: '100%', height: 'auto', backgroundColor: 'white'}}>
            <Pressable style={{
                marginLeft: 10,
                marginRight: 10,
                width: 'auto'
            }}
            onPress={() => ToggleDrawer()}>
                <View style={{
                    width: '100%',
                    height: 'auto',
                }}>
                    <View style={{
                        position: 'absolute',
                        right: 0,
                        width: 30,
                        height: 30,
                        justifyContent: 'center',
                        alignItems:'center',
                    }}>
                        {viewHeight >= minHeight+2 ? //why is this +2 here... spaghett
                            <Animated.View
                            style={{
                                transform: [{rotate: 
                                    brandTagsArrowRotation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '-90deg']
                                    })
                                }]
                            }}>
                                <ArrowBack style={GlobalStyles.lighterHint} size={30} />
                            </Animated.View>
                        : null}
                    </View>
                    <View 
                    onLayout={event => !viewHeight ? setViewHeight(event.nativeEvent.layout.height) : null}>
                        <Animated.View style={{
                            height: viewHeight ? brandTagsArrowRotation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [viewHeight >= minHeight ? minHeight : viewHeight,
                                    viewHeight]
                            }) : 'auto',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            flexWrap: 'wrap'
                        }}
                        >
                            {children}
                        </Animated.View>
                    </View>
                </View>
            </Pressable>
        </View>
    )
}