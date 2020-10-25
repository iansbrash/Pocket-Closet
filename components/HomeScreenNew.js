import React from 'react'
import {
    View,
    Image,
    TouchableOpacity,
    Text,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { ScreenHeader, MiniScreenHeader } from './GlobalComponents/ScreenHeader'

const NewOutfitButton = () => {

    const navigation = useNavigation();

    return (
        <View style={{
            height: 75,
            width: '100%',
            marginTop: 5,
            marginBottom: 5
        }}>
            <View style={{
                width: 'auto',
                marginLeft: 10,
                marginRight: 10,
                marginTop: 5,
                marginBottom: 5,
                height: 'auto',
                backgroundColor: 'white',
                elevation: 10,
                borderRadius: 10
            }}>
                <TouchableOpacity style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
                onPress={() => navigation.navigate('RECORD')}>
                    <View 
                    style={{
                        height: 10, 
                        borderTopLeftRadius: 10, 
                        borderTopRightRadius: 10, 
                        backgroundColor: '#09122b',
                        width: '100%'}}></View>
                    <View style={{
                        height: 'auto',
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginTop: 8
                    }}>
                        <Text category='h4' style={{fontWeight: 'bold', marginLeft: 15}}>{'New Outfit'}</Text>
                            {/* <Ionicons style={{marginRight: 15, marginLeft: 5}} width='30' height='30' fill='#09122b' name={'plus'}/> */}
                            <Ionicons name="md-checkmark-circle" size={32} color="green" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const StatContainer = (props) => {
    return (
        <View style={{
            width: '50%',
            height: 'auto',
            flexDirection: 'column'
        }}>
            <View style={{
                width: 'auto',
                height: 'auto',
                margin: 10,
                borderRadius: 5,
                elevation: 5,
                backgroundColor: 'white',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <View style={{
                borderTopLeftRadius: 10, 
                borderTopRightRadius: 10, 
                backgroundColor: 'black', //this is just the black cap
                height: 10,
                width: '100%',}}></View>
                <View style={{width: '100%', aspectRatio: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
                    <Text category='h5' style={{marginTop: 0, fontWeight: 'bold'}}>{props.title}</Text>
                    <View>
                        <Text>Something Else</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export const HomeScreenNew = () => {

    let src = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' }

    return (
        <View style={{
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
                                <Text style={{
                                    fontWeight: 'bold',
                                    marginBottom: -15}} category='h2'>Welcome back,</Text>
                                <Text category='h1' status='primary'>Ian</Text>
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
                                <View style={{
                                    width: 110, 
                                    height: 110,
                                    borderRadius: 55,
                                    elevation: 10,
                                    backgroundColor: 'white'}}>
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
                <NewOutfitButton />
            </View>
            <View style={{height: 10 /** Spacer */ }}></View> 
            <MiniScreenHeader title={'Recent Stats'}/>
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
        </View>
    )
}