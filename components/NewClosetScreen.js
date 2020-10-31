import React, { useState, useRef, useEffect } from 'react'
import { 
    Image,
    TouchableHighlight,
    StyleSheet,
    View,
    ScrollView,
    KeyboardAvoidingView,
    FlatList,
    TextInput,
    Animated,
    Text,
    Modal
  } from 'react-native'
import { useSelector, useDispatch as dispatchRedux } from 'react-redux' 
import { TabRouter, useNavigation } from '@react-navigation/native';
import { configureStore } from '@reduxjs/toolkit';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PlusButton } from './NewOutfit/PlusButton'
import GlobalStyles from './GlobalComponents/GlobalStyles'
import { PlusIcon } from './GlobalComponents/GlobalIcons'





// used as render method for FlatList in ClosetListOneCol
function RenderSingleLineClosetItem ({item})  {

    let src = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' }

    const navigation = useNavigation();


    return (
        <View style={{
            height: 120,
            width: '100%',
        }}>
            <TouchableOpacity style={[{
                width: 'auto',
                marginLeft: 10,
                marginRight: 10,
                marginTop: 5,
                marginBottom: 5,
                height: 'auto',
                backgroundColor: 'white',
                borderRadius: 10
            }, GlobalStyles.shadowLight]}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('VIEWINDIVIDUALPIECE', {item: item})}> 
                <View style={{
                    height: 'auto',
                    width: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <View 
                    style={{
                        height: 10, 
                        borderTopLeftRadius: 10, 
                        borderTopRightRadius: 10, 
                        backgroundColor: '#09122b',
                        width: '100%'}}></View>
                    <View style={{
                        height: 100,
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                        <View style={{
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            flexDirection: 'row',
                            height: '100%',
                            width: '85%'

                        }}>
                            <View style={[{
                                    height: 'auto', 
                                    aspectRatio: 1,
                                    borderRadius: 10,
                                    marginLeft: 10,
                                    marginTop: 10,
                                    marginBottom: 10,
                                    borderRadius: 10,
                                }, GlobalStyles.shadowLight]}> 
                                <Image source={src} style={{height: '100%', aspectRatio: 1, borderRadius: 10}} />
                            </View>
                            <View style={{
                                height: '85%',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                flexShrink: 1
                                
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    flexShrink: 1
                                }}>
                                    <Text category='h4' 
                                    style={[{fontWeight: 'bold', marginLeft: 15, flexShrink: 1}, GlobalStyles.h4]}
                                    >{item.clothingName}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    flexShrink: 1
                                }}>
                                    <Text category='h5' appearance='hint' 
                                    style={[{fontWeight: 'bold', marginLeft: 15, marginTop: -5, flexShrink: 1}, 
                                    GlobalStyles.h5, GlobalStyles.hint]}
                                    >{item.brandName[0]}</Text>
                                </View>
                                
                            </View>
                            
                        </View>
                        <View style={{width: '15%', justifyContent: 'center', alignItems: 'center'}}>
                            {/* <Icon style={{marginRight: 15, marginLeft: 5}} width='30' height='30' fill='black' name={'plus'}/> */}
                            {/* <Ionicons name="md-checkmark-circle" size={32} color="green" /> */}
    
                        </View>
                    </View>
                </View> 
            </TouchableOpacity>
        </View>
    )
}

const OutfitList = ({searchInput}) => {

    //temp
    let src = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' }

    const outfitArray = useSelector(state => state.outfits.outfitsArray);

    //item is an outfitObject
    const renderItem = ({item, index}) => {
        return (
            <View style={{
                width: '100%', 
                height: 100,
                paddingTop: 5,
                paddingBottom: 5}}>
                <View style={{
                    height: '100%',
                    aspectRatio: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image source={src} style={{
                        height: '90%',
                        aspectRatio: 1,
                        borderRadius: 5
                    }}/>
                </View>
            </View>
        )
    }

    return (
            <View>
                <Text>List used to be here XD</Text>
                {/* <List
                style={{maxHeight: '100%', width: '100%'}}
                data={outfitArray}
                renderItem={renderItem} /> */}
            </View>
    )
}

const renderClothingPiece = ({item, index}) => {

    let src = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' }

    return (
        <View style={{width: '50%', height: 'auto'}}>
            <View style={{
                marginTop: 5,
                marginBottom: 5,
                marginLeft: index % 2 === 0 ? 10 : 5,
                marginRight: index % 2 === 0 ? 5 : 10,
                width: 'auto',
            }}> 
                <View style={{borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: 'black', height: 10}}></View>
                <View style={{
                    width: '100%',
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        width: '100%',
                        marginTop: 5,
                        borderBottomRightRadius: 10,
                        borderBottomLeftRadius: 10,
                        elevation: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            width: '95%',
                            aspectRatio: 1,
                            elevation: 5,
                            borderRadius: 5
                        }}> 
                            <Image source={src} style={{height: '100%', width: '100%', borderRadius: 5}}/>
                        </View>
                        <View style={{width: '90%'}}>
                            <Text category='h6' style={{fontWeight: 'bold'}}>{item.clothingName}</Text>
                        </View> 
                    </View>
                </View>
            </View>

        </View>
    )
}

const ClosetListOneCol = ({searchInput, filtersEnabled, heartToggleChecked}) => {
    const closetObject = useSelector(state => state.closet.closetObject);
    const closetObjectKeys = Object.keys(closetObject);

    const navigation = useNavigation();
    let src = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' }
    // Renders all the clothing under the search bar.
    // called by the <List /> 

    const combinedArrays = [
        ...closetObject.topsArray, 
        ...closetObject.bottomsArray, 
        ...closetObject.footwearArray, 
        ...closetObject.accessoriesArray
    ]
    return (

        <View style={{
            width: '100%',
            height: 'auto'
        }}>
            
            <FlatList
            data={combinedArrays.filter((item, index) => 
                (
                    item.clothingName.toLowerCase().includes(searchInput.toLowerCase()) ||
                    item.brandName.find(name => name.toLowerCase().includes(searchInput.toLowerCase()))
                ) && (!filtersEnabled ? true : (
                        (heartToggleChecked ? item.favorite : true)
                        && (true) //you can chain filters after this true.
                    )  //this might be a little innefficent.\ xdddd
                )
            )}
            renderItem={object => <RenderSingleLineClosetItem {...object}/>
            /** HOW THE FUCK DOES THE ABOVE WORK... WTF */}
            />
            
        </View>
    )
}

const ClosetListTwoCol = ({searchInput, filtersEnabled, heartToggleChecked}) => {


    const closetObject = useSelector(state => state.closet.closetObject);
    const closetObjectKeys = Object.keys(closetObject);

    const navigation = useNavigation();
    let src = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' }
    // Renders all the clothing under the search bar.
    // called by the <List /> 

    const combinedArrays = [
        ...closetObject.topsArray, 
        ...closetObject.bottomsArray, 
        ...closetObject.footwearArray, 
        ...closetObject.accessoriesArray
    ]

    return (

        <View style={{
            width: '100%',
            height: 'auto'
        }}>
            
            <FlatList
            columnWrapperStyle={{justifyContent:'space-between', }}
            numColumns={2}
            data={combinedArrays.filter((item, index) => 
                (
                    item.clothingName.toLowerCase().includes(searchInput.toLowerCase()) ||
                    item.brandName.find(name => name.toLowerCase().includes(searchInput.toLowerCase()))
                ) && (!filtersEnabled ? true : (
                        (heartToggleChecked ? item.favorite : true)
                        && (true) //you can chain filters after this true.
                    )  //this might be a little innefficent.\ xdddd
                )
            )}
            renderItem={renderClothingPiece}
            />
            
        </View>

        // <ScrollView>
        //     <View style={{
        //         width: '100%', 
        //         height: 'auto', 
        //         flexDirection: 'row',
        //         flexWrap: 'wrap',
        //         marginTop: 5}}>
        //         {closetObjectKeys.map((key, index) => (
        //         closetObject[key].filter((item, index) => 
        //                 (
        //                     item.clothingName.includes(searchInput) ||
        //                     item.brandName.find(name => name.includes(searchInput))
        //                 ) && (!filtersEnabled ? true : (
        //                         (heartToggleChecked ? item.favorite : true)
        //                         && (true) //you can chain filters after this true.
        //                     )  //this might be a little innefficent.\ xdddd
        //                 )
        //             ).map(item => (
        //                 <Layout style={{width: '50%', height: 'auto'}}>
                            
        //                     {/** For Image */}
        //                     <Layout style={{width: '100%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center'}}>
                                
        //                             <Layout style={{width: '95%',  aspectRatio: 1, borderRadius: 5, elevation: 5,}}>
                                    
        //                             <TouchableOpacity 
        //                             style={{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}
        //                             activeOpacity={0.7}
        //                             onPress={() => (navigation.push('VIEWINDIVIDUALPIECE', {
        //                                 item //pass in the mf item we're clicking on
        //                             }))}>
        //                                 <Layout style={{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
        //                                     <Image source={src} 
        //                                     style={{
        //                                         width: '100%', 
        //                                         aspectRatio: 1,
        //                                         borderRadius: 5, 
        //                                         }}/> 
        //                                 </Layout>
        //                             </TouchableOpacity>
                                        
                                            
        //                             </Layout>
                                
                               
        //                     </Layout>
        //                     {/** For Text */}
        //                     <Layout style={{
        //                         width: '100%', 
        //                         height: 'auto', 
        //                         alignItems: 'center', 
        //                         justifyContent: 'center',
        //                         flexDirection: 'column',
        //                         marginTop: -5}}>
        //                         <Layout style={{width: '95%', justifyContent: 'center', alignItems:'flex-start'}}>
        //                             <Text style={{fontWeight: 'bold'}}>
        //                                 {item.clothingName.split(' ') //temp solution...
        //                                     .map((s) => s.charAt(0).toUpperCase() + s.substring(1)) //integrate into redux reducers
        //                                     .join(' ')}
        //                             </Text>
        //                             <Text appearance='hint' style={{
        //                                 marginTop: -5
        //                             }}>{item.brandName[0]}</Text>
        //                         </Layout>
        //                     </Layout>
        //                 </Layout>
        //     ))
        //     ))}
        //     </View>
        //     <View style={{paddingBottom: 10}}></View>
        // </ScrollView>
        
    )
/** 
    return (
        closetObjectKeys.map((key, index) => (
            <Layout>st
                style={{
                    maxHeight: '100%', 
                    width: '100%',
                    flexDirection: 'row',
                    flexWrap: 'wrap'}}
                data={closetObject[key].filter((item, index) => 
                    (
                        item.clothingName.includes(searchInput) ||
                        item.brandName.find(name => name.includes(searchInput))
                    ) && (!filtersEnabled ? true : (
                            (heartToggleChecked ? item.favorite : true)
                             && (true) //you can chain filters after this true.
                        )  //this might be a little innefficent.\ xdddd
                    ) 
                               
                )
                }
                renderItem={renderItemBig} 
                ItemSeparatorComponent={Divider}/>
                
                
                <Divider />
            </Layout>
        ))
    ) */
}

const ClosetOutfitsToggle = ({closetIsActive, setClosetIsActive }) => {
    return (
        <View style={{
            width: '100%', 
            height: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',}}>
            <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() => setClosetIsActive(true)}
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
            </TouchableHighlight>
            <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() => setClosetIsActive(false)}
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
            </TouchableHighlight>
        </View>
    )
}



const ClosetSearch = ({searchInput, setSearchInput}) => {

    const navigation = useNavigation();
    const [inputLength] = useState(new Animated.Value(1))
    const searchInputRef = useRef(null);


    const onBlur = () => {
        Animated.timing(inputLength, {
            toValue: 1,
            duration: 250
        }).start();
    }

    const onFocus = () => {
        Animated.timing(inputLength, {
            toValue: 0,
            duration: 250
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
                            placeholder={`Search clothing!`}
                            onFocus={() => onFocus()}
                            onBlur={() => onBlur()}
                            // inlineImageLeft='search40x40'
                            //inlineImagePadding={5} // might have to be in curly braces?
                            selectTextOnFocus={true}
                            placeholderTextColor="#9e9e9e"  //random ass color
                            onChangeText={text => setSearchInput(text)}
                            value={searchInput}
                        />
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
                
                {/* <View style={{
                width: '100%',
                height: 'auto',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingRight: 7
            }}>
                <Input
                    style={{
                        borderRadius: 5,
                        marginLeft: 10,
                        // marginBottom: 10,
                        width: '70%',
                        //backgroundColor: 'white',
                        borderColor: 'white'
                    }}
                    //value={searchInput}
                    placeholder='Search your closet!'
                    //onChangeText={nextValue => setSearchInput(nextValue)}
                    status='basic'
                    accessoryLeft={SearchIcon}
                    textStyle={{fontWeight: 'bold'}}
                    >
                </Input>
                <Button
                    status='basic'
                    appearance='outline'
                    style={{
                        width: '10%',
                        aspectRatio: 1,
                        borderRadius: 5,
                        borderColor: 'white'
                    }}
                    //onPress={() => setModalVisible(true)}
                    accessoryLeft={ListIcon}>

                </Button>
                <Button
                    status='basic'
                    appearance='outline'
                    style={{
                        width: '10%',
                        aspectRatio: 1,
                        borderRadius: 5,
                        borderColor: 'white'
                    }}
                    accessoryLeft={PlusIconSmall}
                    onPress={() => navigation.navigate('NEWCLOTHING')}>

                </Button>
            </View> */}
            </View>
            
        //</KeyboardAvoidingView>
        
            
       
    )
}


export const NewClosetScreen = () => {

    let src = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' }

    
    const [searchInput, setSearchInput] = useState('')

    /** All of these hooks are for the filters modal */
    const [modalVisible, setModalVisible] = useState(false);
    const [heartToggleChecked, setHeartToggleChecked] = useState(false)
    // const [wornSelectedIndex, setWornSelectedIndex] = useState(new IndexPath(0))
    // const [typeSelectedIndex, setTypeSelectedIndex] = useState(new IndexPath(0));
    // const [colorSelectedIndex, setColorSelectedIndex] = useState(new IndexPath(0));
    const [filtersEnabled, setFiltersEnabled] = useState(false);
    const [closetIsActive, setClosetIsActive] = useState(true);

    // Lets our <Select> in filters display the name of the option, not the index
    // We need to eventually fetch this data from our redux store so we don't
    // Have to manually program the values into these arrays / options
    // This is indeed a little buggy lol
    const wornSelectData = ['Recently', 'Not Recently', 'Never']
    const typeSelectData = ['Bottoms', 'Tops', 'Footwear', 'Other']
    const colorSelectData= ['Red', 'Green', 'Blue', 'Multi']
    // const wornDisplayValue = wornSelectData[wornSelectedIndex.row];
    // const typeDisplayValue = typeSelectData[typeSelectedIndex.row];
    // const colorDisplayValue = colorSelectData[colorSelectedIndex.row];

    const navigation = useNavigation();

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


    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'white'
        }} 
        level='1'>
            <View 
            status='primary'
            style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingTop: 10
            }}>
                <View 
                style={{
                    flex: 1,
                    borderRadius: 10,
                }}>
                    <ClosetSearch searchInput={searchInput} setSearchInput={setSearchInput}/>
                    {/** This is going to be the clothing/outfits toggle */}
                    <View style={{height: 10}}></View>
                    <View style={{
                        height: 20,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        flexDirection: 'row',
                        }}>
                        <TouchableOpacity style={{
                            height: 35,
                            aspectRatio: 1,
                            borderRadius: 5,
                            backgroundColor: '#f2f2f2',
                            marginRight: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={() => navigation.navigate('NEWCLOTHING')}>
                            <PlusIcon size={25} style={GlobalStyles.colorMain}/>
                        </TouchableOpacity>
                    </View>
                    <ClosetOutfitsToggle closetIsActive={closetIsActive} setClosetIsActive={setClosetIsActive} />
                    
                    <View 
                        style={{
                            height: '85.5%', //this right here... this is some FUCKY ass code
                            //could potentially fix by putting a view under the list with the same height
                            //as the bottomtabnav
                            }}>
                        {closetIsActive ? <ClosetListOneCol  //can change between ClosetListOneCol and TwoCol
                                    searchInput={searchInput}
                                    filtersEnabled={filtersEnabled}
                                    heartToggleChecked={heartToggleChecked}/>
                                : <OutfitList 
                                    searchInput={searchInput}/>
                            }
                            {/* <ShittyModal /> currently doesnt work we need to rework */}
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