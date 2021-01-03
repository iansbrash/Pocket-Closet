import React, { useState, useRef, useCallback } from 'react'
import { 
    TouchableHighlight,
    StyleSheet,
    View,
    TextInput,
    Animated,
    Text,
    Pressable
  } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GlobalStyles from '../GlobalComponents/GlobalStyles'
import { PlusIcon, XIcon } from '../GlobalComponents/GlobalIcons'
import { OutfitList } from './OutfitList'
import { ClosetList } from './ClosetList'
import { useSelector } from 'react-redux'

import * as Haptics from 'expo-haptics';


const ClosetOutfitsToggle = ({closetIsActive, setClosetIsActive }) => {

    const ToggleCloset = (bool) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        setClosetIsActive(bool)
    }

    return (
        <View style={{
            width: '100%', 
            height: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',}}>
            <Pressable
                activeOpacity={0.6} //was used for TouchableHighlight
                underlayColor="#DDDDDD" //was used for TouchableHighlight
                onPress={() => ToggleCloset(true)}
                style={{
                    width: '50%',
                    height: 40,
                    justifyContent: 'center',
                }}>
                <View style={{
                    width: '100%', 
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                        <View style={styles.JACenter}>
                            <Text category='h6' style={closetIsActive ? styles.activeTab : styles.inactiveTab}>Closet</Text>
                        </View>
                        
                        {/* <Icon fill="#00c3ff" height='30' width='30' name="book-open-outline"/> */}
                        <View style={closetIsActive ? styles.activeBar : styles.inactiveBar}>
                        </View>
                </View>
            </Pressable>
            <Pressable
                activeOpacity={0.6} //was used for TouchableHighlight
                underlayColor="#DDDDDD" //was used for TouchableHighlight
                onPress={() => ToggleCloset(false)}
                style={{
                    width: '50%',
                    height: 40,
                    justifyContent: 'center',
                }}>
                <View style={{
                    width: '100%', 
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                        <View style={styles.JACenter}>
                            <Text category='h6' style={!closetIsActive ? styles.activeTab : styles.inactiveTab}>Outfits</Text>
                        </View>
                        <View style={!closetIsActive ? styles.activeBar : styles.inactiveBar}>
                        </View>
                </View>
            </Pressable>
        </View>
    )
}

export const ClosetSearch = ({searchInput, setSearchInput, notClosetSearch, placeholder}) => {

    const navigation = useNavigation();
    const [inputLength] = useState(new Animated.Value(1))
    const searchInputRef = useRef(null);

    const [isFocused, setIsFocused] = useState(false)


    const onBlur = () => {
        setIsFocused(false)
        Animated.timing(inputLength, {
            toValue: 1,
            duration: 250,
            useNativeDriver: false
        }).start();
    }

    const onFocus = () => {
        setIsFocused(true)
        Animated.timing(inputLength, {
            toValue: 0,
            duration: 250,
            useNativeDriver: false
        }).start();
    }

    return (
        // <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "position"}>
            <View style={{
            height: 50,
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
        }}>
            <View style={{
                margin: 10,
                height: 'auto',
                width: 'auto'
            }}>
                
                    <Animated.View 
                    style={{
                        width: inputLength.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['84%', '100%']
                    }),
                        flexDirection: 'row',
                        alignItems: 'center'}}>
                        <TextInput 
                            style={{ 
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 40, 
                                width: '100%',
                                borderRadius: 5,
                                //fontWeight: 'bold',
                                fontSize: 15,
                                paddingLeft: 25,
                                backgroundColor: '#f2f2f2',
                                elevation: 10,
                                zIndex: 2
                            }}
                            ref={searchInputRef}
                            placeholder={placeholder ? placeholder : `Search clothing!`}
                            onFocus={() => onFocus()}
                            onBlur={() => onBlur()}
                            // inlineImageLeft='search40x40'
                            //inlineImagePadding={5} // might have to be in curly braces?
                            selectTextOnFocus={true}
                            placeholderTextColor="#9e9e9e"  //random ass color
                            onChangeText={text => setSearchInput(text)}
                            value={searchInput}
                        />
                        {notClosetSearch ? null : 
                        <>
                            <Animated.View
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                zIndex: 3,
                                opacity: inputLength,
                                transform: [{
                                    translateX: inputLength.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-10, 0]  // Edit this to change absolute position of textinput
                                    }),
                                }]
                            }}
                            pointerEvents={isFocused ? 'none' : 'auto'}
                            >
                                <Pressable 
                                    style={{
                                        height: 30,
                                        aspectRatio: 1,
                                        backgroundColor: '#e8e8e8',
                                        borderRadius: 5,
                                        margin: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    onPress={() => navigation.navigate('NEWCLOTHING')}
                                    hitSlop={10}>
                                    <PlusIcon size={25} style={GlobalStyles.colorMain}/>
                                </Pressable>
                            </Animated.View>
                        </>
                        }
                        <>
                            <Animated.View style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                height: '100%',
                                aspectRatio: 1,
                                zIndex: 3,
                                justifyContent: 'center',
                                alignItems: 'center',
                                opacity: inputLength.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 0]
                                }),
                            }}
                            pointerEvents={isFocused ? 'auto' : 'none'}
                            >
                                <Pressable
                                onPress={() => setSearchInput('')}
                                hitSlop={10}
                                >
                                    <View style={{
                                        height: 25,
                                        aspectRatio: 1,
                                        borderRadius: 12.5,
                                        backgroundColor: '#e8e8e8',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <XIcon size={16} style={GlobalStyles.hint}/>
                                    </View>
                                </Pressable>
                                
                            </Animated.View>
                        </>

                            <Animated.View 
                            style={{
                                opacity: inputLength.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 0]
                                }),
                                zIndex: 1,
                                margin: 10,
                               
                            }}>
                                <TouchableOpacity style={{
                                    height: 'auto',
                                    width: 'auto',
                                    alignItems: 'center'
                                }}
                                onPress={() => searchInputRef.current.blur()}>
                                    
                                    <Text style={{ fontWeight: 'bold'}}>Cancel</Text>
                                </TouchableOpacity>
                        </Animated.View>
                    </Animated.View>
                </View>
            </View>
    )
}


export const NewClosetScreen = () => {

    console.log('NewClosetScreen being re-rendered')

    // Search bar at the top
    const [searchInput, setSearchInput] = useState('')

    /** All of these hooks are for the filters modal */
    const [modalVisible, setModalVisible] = useState(false);
    const [heartToggleChecked, setHeartToggleChecked] = useState(false)
    const [filtersEnabled, setFiltersEnabled] = useState(false);

    // Whether the ClosetList is displayed or not
    const [closetIsActive, setClosetIsActive] = useState(true);

    // Whether the entire screen is focused or not (controlled by useFocusEffect)
    const [screenIsFocused, setScreenIsFocused] = useState(true)


    const navigation = useNavigation();


    useFocusEffect(
        useCallback(() => {
            //focus
            setScreenIsFocused(true)


            //blur
            return () => {
                setScreenIsFocused(false)
            }
        }, [])
    )

    const resetFilters = () => {

        setFiltersEnabled(false);

        // Reset favorites
        setHeartToggleChecked(false);

        // //Reset worn params
        // setWornSelectedIndex(0);

        // //Reset type params
        // setTypeSelectedIndex(0);

        // //Reset colors params
        // setColorSelectedIndex(0)
    }

    const heartClicked = () => {
        setFiltersEnabled(true);
        setHeartToggleChecked(!heartToggleChecked);
    }

    const onClickFunc = (outfitObject) => {
        navigation.navigate("VIEWINDIVIDUALOUTFIT", {item: outfitObject})
    }

    


    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'white'
        }}>
            
            <View 
            status='primary'
            style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                paddingTop: 10
            }}>
                <View 
                style={{
                    height: 'auto',
                    width: '100%',
                    borderRadius: 10,
                }}>
                    <ClosetSearch searchInput={searchInput} setSearchInput={setSearchInput}/>
                    {/** This is going to be the clothing/outfits toggle */}
                    <View style={{height: 10}}></View>
                    <ClosetOutfitsToggle closetIsActive={closetIsActive} setClosetIsActive={setClosetIsActive} />
                </View>
                <View style={{flex: 1}}>
                    <View 
                    style={{
                        height: '100%'
                    }}
                    // Prevents accidentally tapping on stuff when swiping left to go back a screen
                    pointerEvents={screenIsFocused ? 'auto' : 'none'}
                    >
                        <View style={{
                            display: closetIsActive ? 'flex' : 'none'
                        }}
                        pointerEvents={closetIsActive ? 'auto' : 'none'}>
                            <ClosetList  //can change between ClosetListOneCol and TwoCol
                                searchInput={searchInput}
                                filtersEnabled={filtersEnabled}
                                heartToggleChecked={heartToggleChecked}/>
                        </View>
                        <View style={{
                            display: closetIsActive ? 'none' : 'flex'

                        }}
                        pointerEvents={closetIsActive ? 'none' : 'auto'}>
                            <OutfitList customFilter={null} onClickFunc={onClickFunc}/>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    activeTab: {
        color: '#09122b', //#0daaff
        fontWeight: 'bold',
        width: '100%',
        height: '90%',
        paddingTop: 5,
    },
    inactiveTab: {
        color: '#c9c9c9',
        width: '100%',
        height: '90%',
        paddingTop: 5,
    },
    JACenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeBar: {
        width: '100%', 
        height: '10%',
        backgroundColor: '#09122b' //#0daaff
    },
    inactiveBar: {
        width: '100%', 
        height: '10%',
    }
})