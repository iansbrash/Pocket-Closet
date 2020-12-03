import React from 'react'
import {
    View,
    Text
} from 'react-native'
import {ScreenHeader} from './GlobalComponents/ScreenHeader'
import GlobalStyles from './GlobalComponents/GlobalStyles'
import { 
    StatsIcon,
    ShirtIcon,
    LegIcon,
    ShoeIcon,
    BagIcon
 } from './GlobalComponents/GlobalIcons'

const StatContainer = ({stat, icon, value}) => {
    return (
        <View style={{
            width: '50%'
        }}>
            <View style={{
                margin: 5,
                width: 'auto',
                height: 'auto',
            }}>
                <View style={[{
                    width: '100%',
                    padding: 5,     
                    borderRadius: 5,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: 'white'
                }, GlobalStyles.shadowLightest]}>
                    {icon}
                    <Text style={[GlobalStyles.h4, GlobalStyles.colorMain, {fontWeight: 'bold'}]}>
                        {value}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const AllStatsOne = () => {
    return (
        <View style={{
            margin: 5,
            width: 'auto'
        }}>
            <View style={{
                width: '100%'
            }}>
                <View style={{
                    width: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <StatContainer icon={<ShirtIcon size={35} style={GlobalStyles.colorMain}/>} stat={'teststat'} value={20}/>
                    <StatContainer icon={<LegIcon size={35} style={GlobalStyles.colorMain}/>} stat={'teststat'} value={20}/>
                </View>
            </View>
        </View>
    )
}

const AllStatsTwo = () => {
    const StatsTwoContainer = ({stat, value, icon}) => {
        return (
            <View style={{
                width: '20%',
            }}>
                <View style={{
                    margin: 10,
                    width: 'auto'
                }}> 
                    <View style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        {icon}
                        <Text style={[
                            GlobalStyles.colorMain,
                            GlobalStyles.h3,
                            {fontWeight: 'bold'}
                        ]}>
                            {value}
                        </Text>
                    </View>
                </View>
                
            </View>
        )   
    }

    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
        }}>
            <StatsTwoContainer value={30} icon={<ShirtIcon size={35} style={GlobalStyles.colorMain}/>}/>
            <StatsTwoContainer value={30} icon={<LegIcon size={35} style={GlobalStyles.colorMain}/>}/>
            <StatsTwoContainer value={30} icon={<LegIcon size={35} style={GlobalStyles.colorMain}/>}/>
            <StatsTwoContainer value={30} icon={<LegIcon size={35} style={GlobalStyles.colorMain}/>}/>
            <StatsTwoContainer value={30} icon={<LegIcon size={35} style={GlobalStyles.colorMain}/>}/>
        </View>
    )
}

const AllStatsThree = () => {
    const StatsContainerThree = ({stat, value, icon}) => {
        return (
            <View style={{
                width: '100%',
                height: 'auto'
            }}>
                <View style={{
                    margin: 5,
                    width: 'auto'
                }}>
                    <View style={[{
                        width: '100%',
                        borderRadius: 5,
                        padding: 5,
                        backgroundColor: 'white',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#fcfcfc'
                    }, GlobalStyles.shadowLightest]}>
                        {icon}
                        <Text style={[
                            GlobalStyles.h4, GlobalStyles.colorMain
                        ]}>
                            {value}
                        </Text>
                    </View>
                </View>
            </View>
        )
        
    }
    
    return (
        <View style={{
            width: '35%',
            height: 'auto'
        }}>
            <View style={{
                margin: 5,
                width: 'auto'
            }}>
                <View style={[{
                    width: '100%',
                    borderRadius: 10,
                    padding: 5,
                    // backgroundColor: '#f5f5f5'
                    backgroundColor: 'white'
                }, GlobalStyles.shadowLightest]}>
                    <StatsContainerThree value={30} icon={<ShirtIcon size={35} style={GlobalStyles.colorMain}/>}/>
                    <StatsContainerThree value={30} icon={<LegIcon size={35} style={GlobalStyles.colorMain}/>}/>
                    <StatsContainerThree value={30} icon={<ShoeIcon size={35} style={GlobalStyles.colorMain}/>}/>
                    <StatsContainerThree value={30} icon={<BagIcon size={35} style={GlobalStyles.colorMain}/>}/>
                </View>
            </View>
        </View>
    )
}

const VerbalStats = () => {


    const VerbalContainer = ({stat, value}) => {
        return (
            <View style={{
                width: '100%'
            }}>
                <View style={{
                    margin: 5,
                    width: 'auto'
                }}>
                    <View style={[{
                        width: '100%',
                    }, ]}>
                        <View style={[{
                            padding: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: 'white',
                            borderRadius: 5
                        }, GlobalStyles.shadowLightest]}>
                            <Text style={[{
                                fontWeight: 'bold'
                            }, GlobalStyles.h5]}>{stat}</Text>
                            <Text style={[
                                GlobalStyles.h5
                            ]}>{value}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={{
            width: '65%',
            backgroundColor: 'white'
        }}>
            <View style={{
                margin: 5,
                width: 'auto'
            }}>
                <View style={[{
                    width: '100%',
                    padding: 5,
                    backgroundColor: 'white',
                    borderRadius: 10
                }, GlobalStyles.shadowLightest]}>
                    <VerbalContainer stat={'Closet worth'} value={'$' + 1000}/>
                    <VerbalContainer stat={'Average price'} value={'$' + 1000}/>
                    <VerbalContainer stat={'Closet worth'} value={'$' + 1000}/>
                </View>
            </View>
        </View>
    )
}

export const StatsScreen = () => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <View style={{
                justifyContent: 'flex-start',
                flexDirection: 'row',
                marginLeft: 30
            }}>
                <Text style={[
                    {fontWeight: 'bold', fontSize: 40}
                ]}>
                    Stats
                </Text>
                <StatsIcon size={45} style={{marginLeft: 10}}/>
            </View>
            <View style={{
                margin: 10,
                width: 'auto'
            }}>
                <View style={{
                    width: '100%',
                    flexDirection: 'row'
                }}>
                    <AllStatsThree />
                    <VerbalStats />
                </View>
                
            </View>
        </View>
    )
}