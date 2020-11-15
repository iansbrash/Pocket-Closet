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
    Modal,
    Pressable
  } from 'react-native'
import { useSelector, useDispatch as dispatchRedux } from 'react-redux' 
import { TabRouter, useNavigation } from '@react-navigation/native';
import { configureStore } from '@reduxjs/toolkit';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PlusButton } from './NewOutfit/PlusButton'
import GlobalStyles from './GlobalComponents/GlobalStyles'
import { PlusIcon, HeartIcon } from './GlobalComponents/GlobalIcons'



//90 x 90
const makeSmallImage = (imgurUrl) => {
    //adds an s after the image filename (not including jpeg/jpg/etc)
    //i.e. https://i.imgur.com/btOmlNRs.jpg (small) vs https://i.imgur.com/btOmlNR.jpg (normal size)
    return imgurUrl.substr(0, 20) + imgurUrl.substr(20, 7) + 's' + imgurUrl.substr(27)
}

//320 x 320
const makeMediumImage = (imgurUrl) => {
    console.log(`Making medium: ${imgurUrl}`)
    //adds an s after the image filename (not including jpeg/jpg/etc)
    //i.e. https://i.imgur.com/btOmlNRs.jpg (small) vs https://i.imgur.com/btOmlNR.jpg (normal size)
    return imgurUrl.substr(0, 20) + imgurUrl.substr(20, 7) + 'm' + imgurUrl.substr(27)
}

// used as render method for FlatList in ClosetListOneCol
function RenderSingleLineClosetItem ({item})  {

    let src;

    if (!item.images || item.images.length === 0){
        //very important function
        src = { uri: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100 % 100 + 1)}.jpg` } //default replacement image
    } else {
        src = {uri: makeSmallImage(item.images[0])}
    }
    

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
                                    marginLeft: 5, //was 10
                                    marginTop: 5, //was 10
                                    marginBottom: 5, //was 10
                                    borderRadius: 10,
                                }, GlobalStyles.shadowLight]}> 
                                <Image source={src} style={{height: '100%', aspectRatio: 1, borderRadius: 10}} />
                            </View>
                            <View style={{
                                height: '85%',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                }}>
                                    <Text category='h4' 
                                    numberOfLines={1}
                                    style={[{
                                        fontWeight: 'bold', 
                                        marginLeft: 10, 
                                        maxWidth: 250,
                                        lineHeight: 20,}, GlobalStyles.h5]}
                                    >{item.clothingName}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'column',
                                    flexWrap: 'wrap',

                                }}>
                                    {item.brandName.slice(0, 4).map((brand, index) => (
                                        <View>
                                            <Text category='h5' appearance='hint' 
                                            style={[{fontWeight: 'bold', marginLeft: 10, marginTop: -5, flexShrink: 1}, 
                                            GlobalStyles.h6, GlobalStyles.hint]}
                                            >{`${brand}${index === 3 && item.brandName.length > 4 ? '...' : ''}`}</Text>
                                        </View>
                                        )
                                    )}
                                </View>
                            </View>
                        </View>
                        {/* This is going to be the heart at the bottom */}
                        <View style={{
                            position: 'absolute',
                            bottom: 5,
                            right: 5
                        }}>
                            {
                                item.favorite ? <HeartIcon size={20} style={{color: '#ff4040'}}/> : null
                            }
                        </View>
                        <View style={{width: '15%', justifyContent: 'center', alignItems: 'center'}}>
                            {/* This accounts for 15% of the right of the card lmaoooo spaghetti */}
                        </View>
                    </View>
                </View> 
            </TouchableOpacity>
        </View>
    )
}




/** An outfit is an object
 *  that contains 4 arrays
 *  topsArray, bottomsArray, footwearArray, otherArray */
const OutfitList = ({searchInput}) => {

    //temp
    let src = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' }

    const outfitsArray = useSelector(state => state.outfits.outfitsArray);
    const closetObject = useSelector(state => state.closet.closetObject);

    /** An outfit is an object
     *  that contains 4 arrays
     *  topsArray, bottomsArray, footwearArray, otherArray */
    function RenderOutfit ({item})  {

        // let src;

        // if (!item.images || item.images.length === 0){
        //     //very important function
        //     src = { uri: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100 % 100 + 1)}.jpg` } //default replacement image
        // } else {
        //     src = {uri: item.images[0]}
        // }

        //wtf... so apparently item contains a date object, then an outfitArr object (with the arrays)

        

        let outfitArray = item.outfitArr;


        // console.log(item);


        //this is now one big list of IDs
        let combinedClothingItemsArray = [
            ...outfitArray.topsArray,
            ...outfitArray.bottomsArray,
            ...outfitArray.footwearArray,
            ...outfitArray.otherArray
        ]

        const origLength = combinedClothingItemsArray.length

        const needsCrop = combinedClothingItemsArray.length > 4;

        if (needsCrop){
            combinedClothingItemsArray = combinedClothingItemsArray.slice(0, 3) // should only include the first 3 terms
        }


        //this used to be const but we are pushing to it
        let imageArrayFromIds = [];


        //what is this spaghettii...
        //this should definitely be in some sort of hook...
        for (const key of Object.keys(outfitArray)){
            for (const id of outfitArray[key]){
                //the clothingObject we find using the ID
                const temp = closetObject[key].find(clothingObj => clothingObj._id === id);
                if (!temp.images){
                    imageArrayFromIds.push(`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100 % 100 + 1)}.jpg`)

                } else if (temp.images.length === 0){
                    imageArrayFromIds.push(`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100 % 100 + 1)}.jpg`)
                } else {
                    imageArrayFromIds.push(temp.images[0])
                }
                
                if (imageArrayFromIds.length >= combinedClothingItemsArray.length){
                    break;
                }
            }
        }

        // console.log(combinedClothingItemsArray)
        

        const navigation = useNavigation();


        return (
            <View style={{
                height: 200, //origLength > 4 ? 200 : 115, //was 120
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
                onPress={() => navigation.navigate("VIEWINDIVIDUALOUTFIT", {item: item})}> 
                    <View style={{
                        height: 'auto',
                        width: '100%',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}>
                        <View style={[{
                            position: 'absolute',
                            width: 'auto',
                            height: 'auto',
                            borderRadius: 10,
                            top: 0,
                            right: 0,
                            zIndex: 3,
                            padding: 5
                        }, GlobalStyles.bgColorMain]}>
                            <Text style={[{color: 'white', fontWeight: 'bold'}, GlobalStyles.h5]}>
                                {`${new Date(item.date).toLocaleString('en-GB').substr(0, 10)}`}
                            </Text>
                        </View>
                        <View 
                        style={{
                            height: 10, 
                            borderTopLeftRadius: 10, 
                            borderTopRightRadius: 10, 
                            backgroundColor: '#09122b',
                            width: '100%'}}></View>
                        <View style={{
                            //height: 180, //origLength > 4 ? 180 : 95,
                            width: '100%',
                            height: 'auto',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}>
                            <View style={{
                                justifyContent: 'flex-start',
                                alignItems: 'left',
                                flexDirection: 'row',
                                height: 'auto',
                                width: '100%',
                                flexWrap: 'wrap',

                            }}>
                                <View style={{
                                    width: '50%',
                                    height: 'auto'}}>
                                    <View style={{
                                        width: 'auto',
                                        marginLeft: 10,
                                        marginTop: 10,
                                        marginBottom: 10,
                                        height: 'auto'
                                    }}>
                                        <View style={[{
                                            marginRight: 5,
                                            width: 'auto',
                                            aspectRatio: 1,
                                            backgroundColor: 'white',
                                            borderRadius: 10
                                        }, GlobalStyles.shadowLight]}>
                                            <Image source={item.fitpic && item.fitpic !== '' ? {uri: makeMediumImage(item.fitpic)} : null}
                                                style={{height: '100%', width: '100%', borderRadius: 10}}/>
                                        </View>
                                    </View>
                                </View>
                                
                                <View style={{
                                    width: '50%',
                                }}>
                                    <View style={{
                                        marginTop: 5,
                                        marginRight: 5,
                                        marginBottom: 5,
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        alignItems: 'center'
                                    }}>
                                        {combinedClothingItemsArray.map((clothingObject, index) => (
                                            <View style={[{
                                                    width: '50%', 
                                                    aspectRatio: 1,
                                                }]}> 
                                                <View style={[{
                                                    margin: 5,
                                                    width: 'auto',
                                                    height: 'auto',
                                                    borderRadius: 10,
                                                    backgroundColor: 'white'
                                                }, GlobalStyles.shadowLight]}>
                                                    <Image  
                                                        source={{uri:imageArrayFromIds[index]}} 
                                                        style={{height: '100%', aspectRatio: 1, borderRadius: 10}} />
                                                </View>
                                                
                                            </View>
                                            )
                                        )}
                                        {needsCrop ? (
                                            <View style={[{
                                                height: 'auto', 
                                                aspectRatio: 1,
                                                borderRadius: 10,
                                                margin: 5,
                                                borderRadius: 10,
                                                backgroundColor: 'white'
                                            }, GlobalStyles.shadowLight]}> 
                                                <View 
                                                style={{
                                                    height: 75, 
                                                    aspectRatio: 1, 
                                                    borderRadius: 10, 
                                                    justifyContent: 'center',
                                                    alignItems: 'center'}} >
                                                        {/* <PlusIcon size={45} style={GlobalStyles.colorMain}/> */}
                                                        <Text style={[GlobalStyles.h3, {fontWeight: 'bold'}]}>
                                                            {`+${origLength - 3}`}
                                                        </Text>
                                                </View>
                                        </View>
                                        ) : null}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View> 
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{
            width: '100%',
            height: 'auto'
        }}>
            
            <FlatList
            data={outfitsArray}
            renderItem={object => <RenderOutfit {...object}/>
            /** HOW THE FUCK DOES THE ABOVE WORK... WTF */}
            />
            
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
        ...closetObject.otherArray //was accessories
    ]
    return (

        <View style={{
            width: '100%',
            height: '100%'
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
        ...closetObject.otherArray //was accessories
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
                        <Pressable style={{
                            height: 30,
                            aspectRatio: 1,
                            position: 'absolute',
                            backgroundColor: '#e8e8e8',
                            borderRadius: 5,
                            margin: 5,
                            top: 0,
                            right: 0,
                            zIndex: 3,
                            justifyContent: 'center',
                            alignItems: 'center'
                            }}
                            onPress={() => navigation.navigate('NEWCLOTHING')}
                            hitSlop={10}>
                            <PlusIcon size={25} style={GlobalStyles.colorMain}/>
                        </Pressable>
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
                                height: '100%', }}>
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