import React, { useState, useEffect } from 'react'
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    Pressable,
    TextInput
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ScreenHeader, MiniScreenHeader } from './GlobalComponents/ScreenHeader'
import { Entypo } from '@expo/vector-icons';
import GlobalStyles from './GlobalComponents/GlobalStyles'
import { MediumButton } from './GlobalComponents/GlobalButtons'



const StatContainer = (props) => {
    return (
        <View style={{
            width: '50%',
            height: 'auto',
            flexDirection: 'column'
        }}>
            <View style={[{
                width: 'auto',
                height: 'auto',
                margin: 10,
                borderRadius: 10,
                elevation: 5,
                backgroundColor: 'white',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'column'
            }, GlobalStyles.shadowLight]}>
                <View style={
                    {height: 10,
                    width: '100%',
                    zIndex: 0}
                }>
                    <View 
                    style={{
                        position: 'absolute',
                        borderTopLeftRadius: 10, 
                        borderTopRightRadius: 10, 
                        backgroundColor: 'black', //this is just the black cap
                        height: 20,
                        width: '100%',}}>

                    </View>
                </View>
                
                <View 
                style={{
                    width: '100%', 
                    aspectRatio: 1, 
                    alignItems: 'center', 
                    justifyContent: 'flex-start',
                    zIndex: 1,
                    backgroundColor: 'white',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10}}>
                    <Text category='h5' style={{marginTop: 0, fontWeight: 'bold'}}>{props.title}</Text>
                    <View>
                        <Text>Something Else</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const WelcomeBackHeader = ({username}) => {

    let src = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' };

    const [editingName, setEditingName] = useState(false);
    const [nameInput, setNameInput] = useState('redux')

    // dispatch action to change new name once TextInput is blurred
    useEffect(() => {

    }, [editingName])

    return (
        <View style={{
            width: '100%',
            height: 160,
            paddingBottom: 10,
        }}>
            
            <View style={{
                margin: 10,
                width: 'auto',
                backgroundColor: 'white',
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10
            }}>
                <View style={{ //if we don't use this please remove
                    // backgroundColor: '#09122b',
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    height: 10
                }}></View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                    <View style={{
                        width: '65%'
                    }}>
                        <View style={{
                            width: 'auto',
                            height: 'auto',
                            margin: 10,
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start'
                        }}>
                            <Text style={[{
                                fontWeight: 'bold',
                                marginBottom: -10,
                            }, GlobalStyles.h2]} category='h2'>
                                Welcome back,
                            </Text>
                            {!editingName ? 
                                <>
                                    <Pressable
                                    hitSlop={30}
                                    onPressIn={() => setEditingName(true)}
                                    >
                                        <Text style={[{ color: 'blue' }, GlobalStyles.h1]}>
                                            {nameInput}
                                        </Text>
                                    </Pressable>
                                </>
                            :
                                <>
                                    <TextInput 
                                    style={[{ 
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 'auto', 
                                        width: '100%',
                                        borderRadius: 5,
                                        fontSize: 15,
                                        backgroundColor: 'white',
                                        elevation: 10,
                                        zIndex: -1,
                                        color: 'blue'
                                    }, GlobalStyles.h1]}
                                    // ref={searchInputRef}
                                    placeholder={`Search clothing!`}
                                    // onFocus={() => onFocus()}
                                    onBlur={() => setEditingName(false)}
                                    // inlineImageLeft='search40x40'
                                    //inlineImagePadding={5} // might have to be in curly braces?
                                    selectTextOnFocus={true}
                                    placeholderTextColor="blue"  //random ass color
                                    onChangeText={text => setNameInput(text)}
                                    value={nameInput}
                                    numberOfLines={2}
                                    />
                                </>
                            }
                            {/* <Text category='h5'>@iansbrash</Text> */}
                        </View>
                    </View >
                    <View style={{
                        width: '35%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            width: 'auto',
                            margin: 10,
                            aspectRatio: 1
                        }}>
                            <View style={[{
                                width: 110, 
                                height: 110,
                                borderRadius: 55,
                                backgroundColor: 'white'},
                                GlobalStyles.shadowLight]}>
                                <TouchableOpacity
                                activeOpacity={0.7}
                                >
                                    <Image style={{
                                        width: 110, 
                                        height: 110,
                                        borderRadius: 55}} source={src} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export const HomeScreenNew = ({route}) => {


    //this is dumb... maybe use redux instead
    const [status, setStatus] = useState(route.params ? route.params.status : 'idle')
    console.log('route')
    console.log(route)
    console.log(`status: ${status}`)

    if (status === 'success'){
        console.log("Sucess!");
        setStatus('idle');
    }

    const navigation = useNavigation();

    return (
        <View  style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <WelcomeBackHeader username={`${`Ian`}`} />
            <View style={{height: 20 /** Spacer */ }}></View> 
            <View style={{
                width: '100%',
                height: 'auto',
                marginBottom: 20
                // borderBottomWidth: 1,
                // borderColor: '#c4c8cc'
            }}>
                <MediumButton 
                title={'New Outfit'} 
                icon={<Entypo style={{marginRight: 15, marginLeft: 5}} name="plus" size={30} color="black" />}
                onPressFunc={() => navigation.navigate('RECORD')}/>
            </View>
            <View style={{height: 10 /** Spacer */ }}></View> 

            {/* 
                How to fill the blank space
                    Calendar with days filled on days recorded
                    Quirky stats
                    Carosel View of random clothing
                        Maybe like...
                            You haven't worn ______ this month
                            You've worn _____ the most this month
                            You wear ____ and ____ together a lot
                    "At Glance"
            */}
        </View >
    )
}

