import React from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import {ScreenHeader} from './GlobalComponents/ScreenHeader'
import GlobalStyles from './GlobalComponents/GlobalStyles'
import { 
    StatsIcon,
    ShirtIcon,
    LegIcon,
    ShoeIcon,
    BagIcon,
    TieIcon,
    RefreshIcon
 } from './GlobalComponents/GlobalIcons'
 import { Dimensions } from "react-native";
import {
    LineChart
} from 'react-native-chart-kit'

 const screenWidth = Dimensions.get("window").width;



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
                    <StatsContainerThree value={30} icon={<TieIcon size={35} style={GlobalStyles.colorMain}/>}/>
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

    const VerbalContainerTwo = ({stat, value}) => {
        return (
            <View style={{
                width: '100%',
                height: 69 //nice
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
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            backgroundColor: 'white',
                            alignItems: 'flex-start',
                            borderRadius: 5
                        }, GlobalStyles.shadowLightest]}>
                            <Text style={[{
                                fontWeight: 'bold'
                            }, GlobalStyles.h4]}>{value}</Text>
                            <Text style={[
                                GlobalStyles.h6, GlobalStyles.hint
                            ]}>{stat}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    const VerbalContainerThree = ({stat, value}) => {
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
                            alignItems: 'center',
                            borderRadius: 5
                        }, GlobalStyles.shadowLightest]}>
                            <Text style={[{
                                fontWeight: 'bold'
                            }, GlobalStyles.h1]}>{value}</Text>
                            <View style={{
                                flexDirection: 'row',
                                width: '40%',
                                flexWrap: 'wrap',
                                flexShrink: 1,
                                justifyContent: 'flex-end'
                            }}>
                                <Text style={[
                                    GlobalStyles.h7, GlobalStyles.hint, {textAlign: 'right'}
                                ]}>{stat}</Text>
                            </View>
                            
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
                    <VerbalContainerTwo stat={'Closet worth'} value={'$' + 1000}/>
                    <VerbalContainerTwo stat={'Average clothing price'} value={'$' + 79}/>
                    <VerbalContainerTwo stat={'Average times worn'} value={4.3}/>
                    <VerbalContainerTwo stat={'Number of brands'} value={32}/>
                </View>
            </View>
        </View>
    )
}

const RefreshStats = () => {
    return (
        <View style={{
            margin: 5,
            width: 'auto',
        }}>
            <View style={{
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
            }}>
                <Text style={[{fontWeight: 'bold'}, GlobalStyles.h2]}>
                    In Depth
                </Text>
                <TouchableOpacity>
                    <View style={[{
                        height: 50,
                        aspectRatio: 1,
                        borderRadius: 10,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }, GlobalStyles.shadowLightest]}>
                        <RefreshIcon size={30} style={GlobalStyles.colorMain}/>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const InDepthButtons = () => {

    const IndividualDepthButton = ({title, navpath, icon}) => {
        return (
            <View style={{
                width: '33.3%',
                aspectRatio: 1
            }}>
                <View style={{
                    margin: 5,
                    width: 'auto',
                }}>
                    <TouchableOpacity>
                        <View style={[{
                            width: '100%',
                            height: '100%',
                            borderRadius: 5,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }, GlobalStyles.shadowLightest]}>
                            {icon}
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    return (
        <View style={{
            width: 'auto',
        }}>
            <View style={{
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
            }}>
                <IndividualDepthButton 
                    title={'test'} 
                    navpath={'nav'} icon={<ShirtIcon size={80} style={GlobalStyles.colorMain}/>}/>
                <IndividualDepthButton 
                    title={'test'} 
                    navpath={'nav'} icon={<TieIcon size={80} style={GlobalStyles.colorMain}/>}/>
                <IndividualDepthButton 
                    title={'test'} 
                    navpath={'nav'} icon={<ShirtIcon size={60} style={GlobalStyles.colorMain}/>}/>
            </View>
        </View>
    )
}

const VariableChart = () => {

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
            data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
            ]
            }
        ]
    }

    const chartConfig = {
        backgroundColor: "#1E2923",
    //   backgroundGradientFrom: "#fb8c00",
    //   backgroundGradientTo: "#ffa726",
        // fillShadowGradient: '#ffffff',  
        backgroundGradientFrom: "#ffffff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#ffffff",
        backgroundGradientToOpacity: 0.5,
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, //color of inside dots and conncecting lines
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, //color of labels on x and y axis
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: "6", //radius of each dot
            strokeWidth: "2",
            stroke: "#ffffff" //stroke outside each dot... the border color
        }
    }

    return (
        <View style={[{backgroundColor: 'white', borderRadius: 16}, GlobalStyles.shadowLightest]}>
            <LineChart
                data={data}
                width={Dimensions.get("window").width - 20} // from react-native
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={chartConfig}
                // bezier //makes lines go curvy
                style={{
                marginVertical: 8,
                borderRadius: 16,
                }}
            />
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
                <RefreshStats />
                <VariableChart />
                
            </View>
        </View>
    )
}