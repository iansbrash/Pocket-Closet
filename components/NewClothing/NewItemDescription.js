import React, {useState, useEffect, useRef} from 'react'
import { 
    TouchableOpacity, 
    ScrollView, 
    StyleSheet,
    TextInput,
    Text,
    Animated,
    Pressable, 
    View, 
    Image  } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TopNavScreenHeader } from '../GlobalComponents/TopNav'
import { useSelector } from 'react-redux'
import { NextButton } from './NextButton'
import { ScreenHeader } from '../GlobalComponents/ScreenHeader'
import { useDispatch } from 'react-redux' 
import { clothingInProgressAttributeAdded } from '../../redux/reducers/closetSlice'
import GlobalStyles from '../GlobalComponents/GlobalStyles'
import { XIcon, CheckIcon } from '../GlobalComponents/GlobalIcons'
import { clothingInProgressCleansed } from '../../redux/reducers/closetSlice'



const IndividualDescription = ({
        title, numLines, placeholder, thisRef, 
        nextFocusRef, index, setIndex, specialOnCheck, 
        multiline}) => {

    const [checkPos] = useState(new Animated.Value(1))

    const onBlur = () => {
        Animated.timing(checkPos, {
            toValue: 1,
            duration: 250,
            useNativeDriver: false
        }).start();

        if (specialOnCheck) {
            specialOnCheck()
        }
    }

    const onFocus = () => {
        setIndex(index)
        console.log(index)
        Animated.timing(checkPos, {
            toValue: 0,
            duration: 250,
            useNativeDriver: false
        }).start();
    }

    const onCheck = () => {
        thisRef.current.blur()
        
        //focus next input
        if (nextFocusRef){
            nextFocusRef.current.focus()
            setIndex(index + 1);
        } 
    }

    return (
        <View style={{
            margin: 10,
            width: 'auto',
            height: 'auto'
        }}>
            <Animated.View style={{
                borderRadius: 5,
                width: 'auto',
                padding: 10,
                shadowRadius: 3,
                backgroundColor: 'white',
                shadowOffset: {
                    width: checkPos,
                    height: checkPos
                },
                shadowOpacity: checkPos.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 0]
                }),
                elevation: checkPos.interpolate({
                    inputRange: [0, 1],
                    outputRange: [10, 0]
                })

            }}>
                <Pressable
                onPressIn={() => thisRef.current.focus()}
                >
                    <View style={{
                        width: '100%',
                    }}>
                        <Text style={[GlobalStyles.h2, {fontWeight: 'bold'}]}>
                            {title}
                        </Text>
                        <View style={{
                            width: '100%',
                        }}>
                            <Animated.View style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                zIndex: 3,
                                transform: [{
                                    translateX: checkPos.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 60]  // Edit this to change absolute position of textinput
                                    }),
                                }]
                            }}>
                                <Pressable
                                    onPressIn={() => onCheck()}
                                    hitSlop={10}
                                >
                                    <CheckIcon size={35} style={[GlobalStyles.colorMain]}/>
                                </Pressable>
                            </Animated.View>
                            <TextInput style={[{
                                borderColor: 'white',
                                backgroundColor: 'white',
                                height: 'auto',
                                width: '100%',
                                marginTop: 3,
                            }, GlobalStyles.h4]}
                            onFocus={() => onFocus()}
                            onBlur={() => onBlur()}
                            multiline={multiline}
                            ref={thisRef}
                            // value={descriptionInput}
                            // onChangeText={nextValue => setDescriptionInput(nextValue)}
                            textStyle={{marginLeft: -12}}
                            placeholder={placeholder} />
                        </View>
                    </View>
                </Pressable>
            </Animated.View>
        </View>
    )
}

export const NewItemDescription = () => {

    const nameRef = useRef(null)
    const descriptionRef = useRef(null)
    const colorRef = useRef(null)
    const priceRef = useRef(null)
    const tagsRef = useRef(null)

    const [index, setIndex] = useState(0);
    const [scrollPos] = useState(new Animated.Value(0))

    useEffect(() => {
        Animated.timing(scrollPos, {
            toValue: index > 1 ? -1 * (index - 1) * 115 : 0,
            duration: 250,
            useNativeDriver: false
        }).start();
    }, [index])



    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <TopNavScreenHeader title={'Enter Description'} exitDestination={'CLOSETSCREEN'}
            extraFunc={() => dispatch(clothingInProgressCleansed())}/>
            <View style={{
                width: '100%'
            }}>
                <Animated.View
                style={{
                    transform: [{
                        translateY: scrollPos,
                    }]
                }}>
                    {/* This is going to be each individual input + title */}
                    <IndividualDescription 
                        title={'Name'} 
                        placeholder={'SS17 Bleached Tee'} 
                        thisRef={nameRef} 
                        nextFocusRef={descriptionRef}
                        setIndex={setIndex}
                        index={0}
                        multiline={false}
                    />
                    <IndividualDescription 
                        title={'Description'} 
                        placeholder={'Bought on Grailed 11/17/2019'} 
                        thisRef={descriptionRef} 
                        nextFocusRef={colorRef}
                        setIndex={setIndex}
                        multiline={false}
                        index={1}
                    />
                    <IndividualDescription 
                        title={'Color'} 
                        placeholder={'White'} 
                        thisRef={colorRef} 
                        setIndex={setIndex}
                        multiline={false}
                        index={2}
                        nextFocusRef={priceRef}
                    />
                    <IndividualDescription 
                        title={'Price'} 
                        placeholder={'$79'} 
                        thisRef={priceRef} 
                        setIndex={setIndex}
                        multiline={false}
                        index={3}
                        nextFocusRef={tagsRef}
                    />
                    <IndividualDescription 
                        title={'Tags'} 
                        placeholder={'Seperate tags with commas'} 
                        setIndex={setIndex}
                        multiline={false}
                        index={4}
                        thisRef={tagsRef} 
                        specialOnCheck={() => setIndex(0)}
                        // nextFocusRef={colorRef}
                    />
                </Animated.View>
                
            </View>
        </View>
    )
}