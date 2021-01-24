import React, { useState, useEffect, useCallback } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Pressable,
    Animated
} from 'react-native'
import GlobalStyles from './GlobalComponents/GlobalStyles'
import { 
    StatsIcon,
    ShirtIcon,
    LegIcon,
    ShoeIcon,
    BagIcon,
    TieIcon,
    RefreshIcon,
    PlusIcon
 } from './GlobalComponents/GlobalIcons'
 import { Dimensions } from "react-native";
import {
    LineChart
} from 'react-native-chart-kit'
import { useSelector, useDispatch } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import * as Haptics from 'expo-haptics';
import {
    updateStatObjectFromIndividualStat,
    updateStatObjectFromStatArray,
} from '../redux/reducers/statsSlice'


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

const AllStatsThree = ({reRender, setReRender}) => {

    /**
     *              DATA WE NEED
     * Number of Tops, Bottoms, Footwear, Other, Outfits
     * 
     */

    const closetObject = useSelector(state => state.closet.closetObject)
    const outfitsArray = useSelector(state => state.outfits.outfitsArray)

    

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
                    <StatsContainerThree 
                        value={closetObject.topsArray.length} 
                        icon={<ShirtIcon size={35} style={GlobalStyles.colorMain}/>}/>
                    <StatsContainerThree 
                        value={closetObject.bottomsArray.length} 
                        icon={<LegIcon size={35} style={GlobalStyles.colorMain}/>}/>
                    <StatsContainerThree 
                        value={closetObject.footwearArray.length} 
                        icon={<ShoeIcon size={35} style={GlobalStyles.colorMain}/>}/>
                    <StatsContainerThree 
                        value={closetObject.otherArray.length} 
                        icon={<BagIcon size={35} style={GlobalStyles.colorMain}/>}/>
                    <StatsContainerThree 
                        value={outfitsArray.length} 
                        icon={<TieIcon size={35} style={GlobalStyles.colorMain}/>}/>
                </View>
            </View>
        </View>
    )
}

const VerbalStats = ({reRender, setReRender, modalVisible, setModalVisible}) => {

    /**
     *                  DATA WE NEED
     *  Closet Worth
     *  Average Clothing Price (Closet Worth / Number of Clothing)
     *  Average Times Worn (Total Number Times Worn / Number of Clothing)
     *  Number of Brands (Either just do state.closetObject.brandsArray.length, or create a set and sum everything from closetObject)
     * 
     */

    const closetObject = useSelector(state => state.closet.closetObject)
    const verbalStats = useSelector(state => state.stats.statsObject.verbalStats)

    const dispatch = useDispatch()


    //updateStatObjectFromStatArray

    // Sum clothingObject.price for all 4 topsArray,... etc
    const [closetWorth, setClosetWorth] = useState(verbalStats.totalClosetWorth)

    const [closetSize, setClosetSize] = useState(verbalStats.totalClosetSize)
    const [totalTimesWorn, setTotalTimesWorn] = useState(verbalStats.totalTimesWorn)
    const [totalNumberOfBrands, setTotalNumberOfBrands] = useState(verbalStats.totalNumberOfBrands)


    // This seems to be the solution to my rerendering problem
    // Only the last call to any useState hook works in a useEffect call
    // So we have to use local variables to accumulate the cost
    // Then finally do one call to the useState hook, setting it to the local variable
    useEffect(() => {
        let accum = 0;
        let size = 0;
        let timesWorn = 0;
        let brandsSet = new Set()

        Object.keys(closetObject).forEach(key => {
            closetObject[key].forEach(clothingObject => {
                // Add price. Add 0 if price is undefined
                accum += clothingObject.price === '' ? 0 : parseInt(clothingObject.price)

                // Closet size is one bigger
                size++;

                //Add all brands to set. If duplicates exist, it won't be added (is a set)
                clothingObject.brandName.forEach(brand => brandsSet.add(brand))

                // Sum timesWorn
                timesWorn += clothingObject.timesWorn
            })
        })

        setClosetSize(size)
        setClosetWorth(accum)
        setTotalNumberOfBrands(brandsSet.size)
        setTotalTimesWorn(timesWorn)

        dispatch(updateStatObjectFromStatArray(
            'verbalStats',                                                                         //statCategory
            ['totalClosetWorth', 'totalTimesWorn', 'totalNumberOfBrands', 'totalClosetSize'],      //statNameArray
            [accum,               timesWorn,        brandsSet.size,        timesWorn]              //statArray
        ))
    }, [reRender])
    
    const VerbalContainerTwo = ({stat, value}) => {

        const [ pressed, setPressed ] = useState(false)
        
        const options = {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: false
        };

        const onLongPress = () => {
            setPressed(true)
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            setModalVisible(true)
            // Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
            // ReactNativeHapticFeedback.trigger("selection", options)
        } 

        return (
            <View style={{
                width: '100%',
                height: 69, //nice
                zIndex: 5//pressed ? 6 : 2
            }}>
                <View style={{
                    margin: 5,
                    width: 'auto'
                }}>
                    <View style={[{
                        width: '100%',
                    }, ]}>
                        <Pressable
                        onPress={null}
                        onPressIn={() => setPressed(true)}
                        onPressOut={() => setPressed(false)}
                        onLongPress={() => onLongPress()}
                        >
                            <View style={[{
                                padding: 5,
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                backgroundColor: 'white',
                                alignItems: 'flex-start',
                                borderRadius: 5,
                                opacity: pressed ? 0.5 : 1
                            }, GlobalStyles.shadowLightest]}>
                                <Text style={[{
                                    fontWeight: 'bold'
                                }, GlobalStyles.h4]}>{value}</Text>
                                <Text style={[
                                    GlobalStyles.h6, GlobalStyles.hint
                                ]}>{stat}</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={{
            width: '65%',
            backgroundColor: 'white',
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
                    <VerbalContainerTwo stat={'Closet worth'} value={`$${closetWorth.toFixed(2)}`}/>

                    <VerbalContainerTwo stat={'Average clothing price'} 
                        value={`$${closetSize !== 0 ? (closetWorth / closetSize).toFixed(2) : 0}`}/>

                    <VerbalContainerTwo stat={'Average times worn'} 
                        value={`${closetSize !== 0 ? (totalTimesWorn / closetSize).toFixed(2) : 0} times`}/>

                    <VerbalContainerTwo stat={'Number of brands'} value={`${totalNumberOfBrands} brands`}/>
                </View>
            </View>
        </View>
    )
}

const RefreshStats = ({reRender, setReRender}) => {
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
                <TouchableOpacity
                onPress={() => setReRender(!reRender)}>
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

const VariableChart = ({reRender, setReRender}) => {

    /** 
     *                  THINGS WE CAN CHART
     * 
     *  # of [Brands, Clothing, Colors] Worn / Outfit Cost      PER Day
     *  Closet Worth / Number of Clothing in Closet             PER Month
     * 
     *  # of [Brands, Clothing, Colors] Worn / Outfit Cost      PER Day
     *      --> state.outfits.outfitsArray 
     *          --> 7 most recent objects (we only have outfitArr with clothingObject _ids)
     *              --> Clothing:
     *                  --> Sum from each of four outfitArr arrays. Easy.
     *              --> Brands / Color / Outfit Cost
     *                  --> For each of the 7 most recent outfitObjects
     *                      --> Create a set for brands AND color
     *                      --> Create a 'totalCost' variable
     *                      --> For each of the 4 outfitArr attributes
     *                          --> Fetch via _id from state.closet.closetObject[key]
     *                          --> Add each item in brands AND color to the set
     *                          --> totalCost += item.price
     *                      --> set.length can be plotted now, as well as totalCost
     *  
     * 
     *  Closet Worth / Number of Clothing in Closet             PER Month
     *  --> This isn't something we can just dynamically fetch
     *  --> If we want to plot this, we probably need to create a statsSlice.js or something to store
     *      stats data that we update weekly / monthly (and that can't be changed once inputted)
     *  --> i.e. Every week, we push a new closetObjectValue or closetObjectNumber to the statsSlice state
     *  --> To find closet worth / number of clothing in closet, just fetch those numbers and plot them
     *  --> This seems to be the only approach, as we are not able to store our history anywhere else
     */


    const [dataArray, setDataArray] = useState(["January", "February", "March", "April", "May", "June"])
    const [labelsArray, setLabelsArray] = useState([
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100
    ])

    // used to re-update the LineChart so it doesn't crash on the initial render
    const [mounted, setMounted] = useState(false)

    

    const outfitsArray = useSelector(state => state.outfits.outfitsArray)

    // In case there is no graph
    if (outfitsArray.length === 0 ){
        return (
            <View style={{
                width: '80%',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                 <View style={[{
                    marginTop: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderRadius: 10,
                    backgroundColor: '#fafafa',
                    padding: 5,
                }, GlobalStyles.shadowLightest]}>
                    <Text style={[{
                        fontWeight: 'normal',
                        // color: '#3e3e40'
                    }, GlobalStyles.h6, GlobalStyles.lighterHint
                    ]}>
                        {`Add an outfit to see graph!`}
                    </Text>
                    <PlusIcon size={25} style={GlobalStyles.lighterHint}/>
                </View>
            </View>
        )
    }

    console.log(dataArray)
    console.log(labelsArray)
    console.log('VariableChart rerender')


    useEffect(() => {
        // Labels: x axis
        // Data: y axis
        // We'll start by making number of pieces per outfit

        let labels = []
        let dataArray = []

        const maxNumOfPlots = 6;

        for (let revIndex = 0; revIndex >= 0 && revIndex < outfitsArray.length - maxNumOfPlots; revIndex++){
            let accum = 0;

            Object.keys(outfitsArray[revIndex].outfitArr).forEach(key => {
                accum += outfitsArray[revIndex].outfitArr[key].length
            })

            console.log(labels)
            console.log(accum)

            labels.push(`${ new Date(outfitsArray[revIndex].date).toLocaleString('en-GB').substr(0, 5)}`)
            dataArray.push(accum)  
        }

        setDataArray(dataArray)
        setLabelsArray(labels)
    }, [reRender])


    /** 
     *  Not only am I surprised that this works,
     *  But I am astonished that I have to implement this garbage
     *  spaghetti solution in order to get the LineGraph to not
     *  crash the entire app.
     */
    useEffect(() => {
        setMounted(true)
    }, [])

    

    

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
        backgroundGradientFrom: "#ffffff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#ffffff",
        backgroundGradientToOpacity: 0.5,
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, //color of inside dots and conncecting lines
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, //color of labels on x and y axis
        style: {
            borderRadius: 10,
        },
        propsForDots: {
            r: "6", //radius of each dot
            strokeWidth: "2",
            stroke: "#ffffff" //stroke outside each dot... the border color
        }
    }

    return (
        <View style={[
            {backgroundColor: 'white', borderRadius: 10, margin: 5}, 
            GlobalStyles.shadowLightest]}
        >
            <LineChart
                data={{
                    labels: mounted ? labelsArray : ["Jan"],
                    datasets: [
                        {
                        data: mounted ? dataArray : [123.32]
                        }
                    ]
                }}
                width={Dimensions.get("window").width - 30} // from react-native
                height={240}
                // yAxisLabel={null}
                // yAxisSuffix={' pieces'}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={chartConfig}
                // bezier //makes lines go curvy
                style={{
                    marginVertical: 8, //why
                    borderRadius: 10,
                    marginHorizontal: -20
                }}
            />
        </View>
    )
}

export const StatsScreen = () => {
    // yet another garbage solution to control the quirks of useEffect
    const [reRender, setReRender] = useState(false)

    const [viewBlur] = useState(new Animated.Value(0))
    const [modalVisible, setModalVisible] = useState(false)

    const onShow = () => {
        Animated.timing(viewBlur, {
            toValue: .95,
            duration: 250,
            useNativeDriver: true
        }).start();
    }

    const onDismiss = () => {
        Animated.timing(viewBlur, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true
        }).start();
    }

    useEffect(() => {
        if (modalVisible){
            onShow()
        } else {
            onDismiss()
        }
    },[modalVisible])

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            
            {/* Used to blur everything */}
            {/* <Animated.View style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                opacity: viewBlur,
                zIndex: 1,
                backgroundColor: 'pink'
            }}
            pointerEvents={'none'}> */}
                {/* <BlurView style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                }}
                intensity={95}>
                    
                </BlurView> */}
            {/* </Animated.View> */}
            {/* ^^Used to blur everything^^ */}

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
                    flexDirection: 'row',
                }}>
                    
                    <AllStatsThree reRender={reRender} setReRender={setReRender}/>
                    <VerbalStats reRender={reRender} setReRender={setReRender}
                        modalVisible={modalVisible} setModalVisible={setModalVisible}/>
                </View>
                <RefreshStats reRender={reRender} setReRender={setReRender}/>
                <VariableChart reRender={reRender} setReRender={setReRender}/>
                
            </View>
        </View>
    )
}