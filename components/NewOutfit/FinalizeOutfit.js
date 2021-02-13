import React, {useState, useEffect} from 'react'
import  { 
    Image,
    View,
    TouchableOpacity,
    FlatList,
    Text,
    ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { 
    outfitCreatedFromHome, 
    outfitInProgressItemDeleted, 
    createdOutfitTagged 
} from '../../redux/reducers/outfitsSlice'

import { useNavigation } from '@react-navigation/native'
import { TopNavScreenHeader } from '../GlobalComponents/TopNav'
import { ScreenHeader, MiniScreenHeader } from '../GlobalComponents/ScreenHeader'
import { FinalizeButton } from '../NewClothing/NextButton'
import GlobalStyles from '../GlobalComponents/GlobalStyles'
import { XIcon } from '../GlobalComponents/GlobalIcons'
import { MediumButton } from '../GlobalComponents/GlobalButtons'
import { outfitInProgressCleansed } from '../../redux/reducers/outfitsSlice'
import { nanoid } from 'nanoid/async/index.native'
import { clothingInOutfitWorn } from '../../redux/reducers/closetSlice'
import { updateVariableStats } from '../../redux/reducers/statsSlice'
///
import {batchActions} from 'redux-batched-actions';




const OutfitDivider = ({item, index, }) => {
//outfitTitle
    let src = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' }

    var tempOutfitArray = item;
    console.log(tempOutfitArray);

    // item is an object
    const renderItem = ({item, index}) => {
        return (
            <View
                style={{flex: 1,
                        justifyContent: 'space-between',
                        width: '100%',
                        flexDirection: 'row',
                        borderBottomRightRadius: 10,
                        borderBottomLeftRadius: 10,
                        
                        }} level='3'>
                <View style={{
                    height: 'auto',
                    width: '80%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    margin: 10
                }} level='3'>
                    <View level='3'>
                        <Image source={src} style={{
                                height: 40,
                                aspectRatio: 1,
                                marginRight: 10,
                                borderRadius: 10
                            }}/>
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginTop: -5,
                        marginBottom: -5
                    }} level='3'>
                        <Text category='h6'
                            style={{marginBottom: -5,
                                    fontWeight: 'bold'}}>
                            {item.clothingName}
                        </Text>
                        <Text>
                            {item.brandName}
                        </Text>
                    </View>
                </View>
                
                <View level='3' style={{
                    justifyContent: 'center',
                    marginRight: 10,
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10
                }}>
                    {/* <Button
                        size='small'
                        appearance='outline'
                        style={{aspectRatio: 1, borderRadius: 10}}
                        onPress={() => console.log("XD")}>
                    </Button> */}
                </View>
            </View>
        )
    }

    if (tempOutfitArray.length === 0) return (null) //can be null?

    return (
        <View style={{
            width: '100%',
            height: 'auto',
            borderRadius: 10,
            marginBottom: 20,
            elevation: 10,
        }}
        level='4'>
            <Text category='h3' style={{
                fontWeight: 'bold',
                marginLeft: 10
                }}>
                {item.length != 0 ? item[0].clothingType.toUpperCase() : 'null'}
            </Text>
            <Text>RIP DA FINALIZED OUTFIT</Text>
            {/* <List 
                style={{maxHeight: 'auto', width: '100%', 
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10}}
                data={tempOutfitArray}
                renderItem={renderItem} 
                /> */}
        </View>
    )
}



export const FinalizeOutfit = () => {

    const outfitInProgress = useSelector(state => state.outfits.outfitInProgress);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [brands, setBrands] = useState([])
    const [colors, setColors] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalPieces, setTotalPieces] = useState(0)

    // This seems to work
    useEffect(() => {
        let { outfitArr } = outfitInProgress
        let brandSet = new Set();
        let colorSet = new Set();
        let totalPrice = 0;
        let totalPieces = 0;
        Object.keys(outfitArr).forEach(key => {
            outfitArr[key].forEach(clothingObject => {
                clothingObject.brandName.forEach(brand => {
                    brandSet.add(brand);
                });
                clothingObject.color.forEach(col => {
                    colorSet.add(col);
                });
                totalPrice += clothingObject.price === '' ? 0 : parseInt(clothingObject.price);
                totalPieces++;
            })
        })

        // Spread out set into array. Nice.
        setColors([...colorSet])
        setBrands([...brandSet])
        setTotalPieces(totalPieces);
        setTotalPrice(totalPrice)
    }, [outfitInProgress])
    
    
    const FinalizeClicked = async () => {



        //we can leave much of the codebase unchanged (11/5/20 update)
        //but we need to instead to fill the 4 clothing arrays with the IDs

        const combinedClothingArrays = [
            ...outfitInProgress.outfitArr.topsArray,
            ...outfitInProgress.outfitArr.bottomsArray,
            ...outfitInProgress.outfitArr.footwearArray,
            ...outfitInProgress.outfitArr.otherArray,
        ]

        const idArrayObject = {
            topsArray: [],
            bottomsArray: [],
            footwearArray: [],
            otherArray: []
        }

        combinedClothingArrays.forEach((outfitObj, index) => {
            idArrayObject[`${outfitObj.clothingType.toLowerCase()}Array`].push(outfitObj._id)
        })

        //dispatch(clothingInOutfitWornThunk(idArrayObject))

        let nid = await nanoid();
        let date = Date.parse(new Date());

        

        // TODO
        /**
         *  The problem here is that our outfitSlice outfitInProgress structure is not as detailed / intricate
         *  as our closetSlice clothingPieceInProgress structure. Our outfitInProgress is a 1-layer-deep object...
         *  We should reformat it to reflect what the final outfitObject will look like
         *  i.e. 
         *  outfitInProgress: {
        *      fitpic: {
        *          fitpic: '',
        *          type: 'imgur' or 'local', default ''
        *      },             
        *      date: new Date(),
        *      favorite: false,        
        *      description: ''         
        *      tags: []               
        *      _id: 'ms892-sdj3ds'
        *      outfitArr: {            
        *          topsArray: [],
        *          bottomsArray: [],
        *          footwearArray: [],
        *          otherArray: []
        *      }
        *  } 
         */


        dispatch(batchActions([
            clothingInOutfitWorn(idArrayObject, nid),
            outfitCreatedFromHome(idArrayObject, nid, date),
            createdOutfitTagged(nid, outfitInProgress.tags),
            // For StatsScreen
            updateVariableStats(
                //objectName
                ['piecesPerOutfit', 'pricesPerOutfit', 'brandsPerOutfit', 'colorsPerOutfit', 'perOutfitDates'],
                //objectAttribute
                ['pieces',          'price',            'brands',          'colors',          'dates'],
                //attributeValueToPush
                [totalPieces,       totalPrice,         brands.length,     colors.length,    date],
            )
        ]
        ))

        //we have a prepare: statement in our action, so we just need to pass in these 2 arguments
        // dispatch(outfitCreatedFromHome(idArrayObject, await nanoid()
        // ))

        // dispatch(outfitCreatedFromHome(outfitInProgress))
        // navigation.navigate("FINALIZESUCCESS")
        navigation.navigate("HOMESCREEN", {status: 'success'})
    }

    const testArray = [];

    var arrayOfTempObjectValues = Object.values(outfitInProgress)
    console.log(arrayOfTempObjectValues)

    // console.log(arrayOfTempObjectValues);
    console.log(outfitInProgress.fitpic)

    const NumOfBrandsPiecesColorsPrice = () => {

        const Bullet = () => (
            <Text style={[{fontWeight: 'bold', marginLeft: 5, marginRight: 5}, GlobalStyles.h5, GlobalStyles.lighterHint]}>•</Text>
        )

        const NiceText = ({text}) => (
            <Text style={[GlobalStyles.h6, {fontWeight: 'bold'}]}>
                    {text}
            </Text>
        )

        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 5,
                paddingLeft: 5,
                paddingRight: 5
            }}>
                <NiceText text={`${brands.length} Brand${brands.length != 1 ? 's' : ''}`}/>
                <Bullet />
                <NiceText text={`${colors.length} Color${colors.length != 1 ? 's' : ''}`}/>
                <Bullet />
                <NiceText text={`${totalPieces} Piece${totalPieces != 1 ? 's' : ''}`}/>
                <Bullet />
                <NiceText text={`$${totalPrice}`}/>
            </View>
        )
    }


    return (

        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
           <TopNavScreenHeader title={'Finalize Outfit'} exitDestination={'HOMESCREEN'} 
                extraFunc={() => dispatch(outfitInProgressCleansed())}
                />
            <View style={{
                flex: 1
            }}>
                <View style={[{
                    margin: 10,
                    width: 'auto',
                    borderRadius: 10,
                    zIndex: 2
                }, GlobalStyles.shadowLight]}>
                    {outfitInProgress.fitpic.fitpic != '' ? <Image 
                        source={{uri: outfitInProgress.fitpic.fitpic}}
                        style={{width: '100%', aspectRatio: 1, borderRadius: 10}}
                    /> : null}
                    <View style={{
                        position: 'absolute',
                        bottom: -15,
                        width: '100%'
                    }}>
                        <View style={{
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <NumOfBrandsPiecesColorsPrice />
                        </View>
                    </View>
                </View>
                <View style={{
                    flex: 1,
                    zIndex: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10
                    
                }}>
                   
                    <View style={{
                        top: -17,
                        position: 'absolute',
                        height: '113.7%', //terrible practice. nice !
                        width: 'auto',
                    }}>
                        <FlatList 
                            renderItem={key => ( 
                                // <Text>{key.item}</Text>) this is weird af.... why key.item...
                                outfitInProgress.outfitArr[key.item].length !== 0 ?
                                <>
                                    <MiniScreenHeader 
                                    title={outfitInProgress.outfitArr[key.item][0].clothingType.charAt(0).toUpperCase() 
                                        + outfitInProgress.outfitArr[key.item][0].clothingType.slice(1)}/>
                                    <FlatList 
                                        data={outfitInProgress.outfitArr[key.item]}
                                        bounces={false}
                                        keyExtractor={item => item._id.toString()}
                                        renderItem={item => (
                                            <MediumButton 
                                                title={item.item.clothingName}
                                                onPressFunc={null}
                                                buttonFunc={() => dispatch(outfitInProgressItemDeleted(item.item))}
                                                icon={<XIcon size={30} style={[{marginRight: 10}, GlobalStyles.colorMain]}/>}
                                            />
                                        )}
                                    />
                                </> : null)
                            }
                            data={Object.keys(outfitInProgress.outfitArr)}
                            keyExtractor={key => key.toString()}
                            style={{
                                paddingTop: 20
                            }}
                            showsVerticalScrollIndicator={false}
                            //
                            //['topsArray', 'bottomsArray', 'footwearArray', 'otherArray']
                        
                        />
                    </View>
                </View>
                <FinalizeButton 
                disabledHook={false}
                onPressFunc={FinalizeClicked}/>
            </View>
        </View>
    )
}

const FinalizeClothingContainer = (props) => {

    const item = props.item;

    const dispatch = useDispatch();

    const removeFromOutfit = () => {
        dispatch(outfitInProgressItemDeleted({...item}))
    }

    return (
        <View style={{
            height: 75,
            width: '100%',
            marginTop: 5,
            marginBottom: 5,
            position: 'relative'
        }}>
            <TouchableOpacity style={{width: 'auto', height: 'auto'}}
                        onPress={() => removeFromOutfit(item)}>
            <View style={[{
                width: 'auto',
                marginLeft: 10,
                marginRight: 10,
                marginTop: 5,
                marginBottom: 5,
                height: 'auto',
                backgroundColor: 'white',
                borderRadius: 10
            }, GlobalStyles.shadowLight]}>
                <View style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
                >
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
                        <Text category='h4' style={[{fontWeight: 'bold', marginLeft: 15}, GlobalStyles.h4]}>{item.clothingName}</Text>
                        
                            {/* <Icon  width='30' height='30' fill='black' name={'plus'}/> */}
                            <XIcon size={30} style={[{marginRight: 10}, GlobalStyles.colorMain]}/> 
                        
                    </View>
                </View>
            </View>
            </TouchableOpacity>
            
        </View>
    )
}