import React, { useState, useEffect } from 'react'
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
import { useSelector, useDispatch } from 'react-redux'

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

const VerbalStats = ({reRender, setReRender}) => {
    /**
     *                  DATA WE NEED
     *  Closet Worth
     *  Average Clothing Price (Closet Worth / Number of Clothing)
     *  Average Times Worn (Total Number Times Worn / Number of Clothing)
     *  Number of Brands (Either just do state.closetObject.brandsArray.length, or create a set and sum everything from closetObject)
     * 
     */
    const closetObject = useSelector(state => state.closet.closetObject)

    const [closetWorth, setClosetWorth] = useState(0)
    const [closetSize, setClosetSize] = useState(0)
    const [totalTimesWorn, setTotalTimesWorn] = useState(0)
    const [totalNumberOfBrands, setTotalNumberOfBrands] = useState(0)


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
    }, [reRender])
    
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
                    <VerbalContainerTwo stat={'Closet worth'} value={`$${closetWorth}`}/>
                    <VerbalContainerTwo stat={'Average clothing price'} value={`$${closetWorth / closetSize}`}/>
                    <VerbalContainerTwo stat={'Average times worn'} value={`${totalTimesWorn / closetSize} times`}/>
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

    console.log(dataArray)
    console.log(labelsArray)


    useEffect(() => {
        // Labels: x axis
        // Data: y axis
        // We'll start by making number of pieces per outfit

        let labels = []
        let dataArray = []

        const maxNumOfPlots = 6;

        for (let revIndex = outfitsArray.length - 1; revIndex >= 0 && revIndex >= outfitsArray.length - maxNumOfPlots; revIndex--){
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
                    <AllStatsThree reRender={reRender} setReRender={setReRender}/>
                    <VerbalStats reRender={reRender} setReRender={setReRender}/>
                </View>
                <RefreshStats reRender={reRender} setReRender={setReRender}/>
                <VariableChart reRender={reRender} setReRender={setReRender}/>
                
            </View>
        </View>
    )
}


//nah
const fetchStats = (
    setNumberOfTops, setNumberOfBottoms, setNumberOfFootwear, setNumberOfOther, setNumberOfOutfits,
    setClosetWorth,
    setNumberOfClothing,
    setTotalTimesWorn,
    setNumberOfBrands,
    setNumberOfColors,


    ) => {
    /**         TO FETCH:
     * Number of tops,bottoms,...,outfits
     * Closet Worth
     * Total Number of Clothing
     * Total Times Worn
     * Total Number of Brands
     * 
     *  # of [Brands, Clothing, Colors] Worn / Outfit Cost      PER Day
     *  Closet Worth / Number of Clothing in Closet             PER Month
     * 
     */



    return;
}