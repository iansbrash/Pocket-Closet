import React, { useState, useEffect } from 'react'
import {
    View,
    Image,
    TouchableOpacity,
    Text,
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

export const HomeScreenNew = ({route}) => {


    //this is dumb... maybe use redux instead
    const [status, setStatus] = useState(route.params ? route.params.status : 'idle')
    console.log('route')
    console.log(route)
    console.log(`status: ${status}`)

    if (status === 'success'){
        console.log("Sucess!")
        setStatus('idle')
    }

    // useEffect(() => {
    //     console.log(`status: ${status}`)
    //     status ? console.log("status was updated") : console.log("we got null but still lggging")
    //     setStatus('idle')
    // }, [status])

    let src = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' }
    const navigation = useNavigation();

    return (
        <View  style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <View style={{
                width: '100%',
                height: 160,
                paddingBottom: 10,
                // borderBottomWidth: 1,
                // borderColor: '#c4c8cc',
            }}>
                
                <View style={{
                    margin: 10,
                    width: 'auto',
                    backgroundColor: 'white',
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10
                }}>
                    <View style={{ //if we don't use this please remove
                        //backgroundColor: '#09122b',
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
                                    }, GlobalStyles.h2]} category='h2'>Welcome back,</Text>
                                <Text style={[{ color: 'blue'}, GlobalStyles.h1]} category='h1' status='primary'>Ian</Text>
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
                                        <Image style={{
                                            width: 110, 
                                            height: 110,
                                            borderRadius: 55}} source={src} />
                                </View>
                                
                            </View>
                        </View>
                    </View>
                </View>
            </View>
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
            <MiniScreenHeader title={'Recent Stats / Recently Worn'}/>
            <View style={{
                width: '100%',
                height: 120
            }}>
                <View style={{
                    margin: 20,
                    width: 'auto',
                    height: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <StatContainer title={'Stat 1'}/>
                    <StatContainer title={'Stat 2'}/>
                </View>
            </View>
        </View >
    )
}

