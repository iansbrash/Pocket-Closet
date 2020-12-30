import React, {useState, useEffect} from 'react'
import { TouchableOpacity, ScrollView, StyleSheet,Text, } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import { 
    View, 
    Image,
    Pressable 
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TopNavScreenHeader } from '../GlobalComponents/TopNav'
import { useSelector, useDispatch } from 'react-redux'
import { FinalizeButton } from './NextButton'
import { ScreenHeader } from '../GlobalComponents/ScreenHeader'
import { 
    clothingAddedToCloset, 
    pushAttributesToAttributedClothing,
    tagDeleted,
    brandDeletedFromClothingPieceInProgress
 } from '../../redux/reducers/closetSlice'
import GlobalStyles from '../GlobalComponents/GlobalStyles'
import { XIcon } from '../GlobalComponents/GlobalIcons'
import { clothingInProgressCleansed } from '../../redux/reducers/closetSlice'
import { nanoid } from 'nanoid/async/index.native'
import {batchActions} from 'redux-batched-actions';
import { TogglableDrawer } from '../GlobalComponents/GlobalDrawers'


const BrandTags = ({brandsArray, setBrands}) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();


    const DeleteBrand = brandToDelete => {
        setBrands(brandsArray.filter(brand => brand !== brandToDelete))
        dispatch(brandDeletedFromClothingPieceInProgress(brandToDelete))
    }

    const IndividualTags = ({title}) => {
        return (
            
            <View style={[{
                width: 'auto',
                padding: 5,
                margin: 5,
                height: 'auto',
                justifyContent: 'flex-start',
                alignItems:'center',
                flexDirection: 'row',
                borderRadius: 5,
                backgroundColor: 'white'
            }, GlobalStyles.shadowLight, ]}>
                <Text style={[{fontWeight: 'bold',}, GlobalStyles.h5, GlobalStyles.colorMain ]}>{title}</Text>
                <Pressable
                hitSlop={10}
                onPress={() => DeleteBrand(title)}
                >
                    <XIcon style={[GlobalStyles.colorMain]} size={20}/>
                </Pressable>
            </View>
            
        )
    }

    return (
        <TogglableDrawer minHeight={88}>
            <View style={{width: '100%', height: 'auto'}}>
                <View style={{
                    width: 'auto'
                }}>
                    <View style={{
                        width: '100%',
                        height: 'auto',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexWrap: 'wrap'
                    }}>
                        {brandsArray.map(tag => <IndividualTags key={tag} title={tag}/>)}
                    </View>
                </View>
            </View>
        </TogglableDrawer>
        
    )
}

const ClothingTags = React.memo(({tagsArray, setTags}) => {


    const navigation = useNavigation()
    const dispatch = useDispatch()

    const DeleteTag = tagToDelete => {
        setTags(tagsArray.filter(tag => tag !== tagToDelete))
        dispatch(tagDeleted(tagToDelete))
        console.log('tags hook')
        console.log(tagsArray)
    }


    const IndividualTags = ({title}) => {
        return (
                <View style={[{
                    width: 'auto',
                    padding: 3,
                    margin: 3,
                    height: 'auto',
                    justifyContent: 'center',
                    alignItems:'center',
                    flexDirection: 'row',
                    borderRadius: 5,
                }, GlobalStyles.shadowLight, GlobalStyles.bgColorMain]}>
                    <Text style={[{fontWeight: 'bold', color: 'white', marginLeft: 2}, GlobalStyles.h6, ]}>{title}</Text>
                    <Pressable
                    hitSlop={10}
                    onPress={() => DeleteTag(title)}
                    >
                        <XIcon style={{color: 'white'}} size={16}/>
                    </Pressable>
                </View>
        )
    }

    return (
        <TogglableDrawer minHeight={33}>
            <View style={{width: '100%', height: 'auto'}}>
                <View style={{
                    width: 'auto',

                }}>
                    <View style={{
                        width: '100%',
                        height: 'auto',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexWrap: 'wrap'
                    }}>
                        {tagsArray.map(tag => (
                            <IndividualTags key={tag} title={tag}/>
                        ))}
                    </View>
                </View>
            </View>
        </TogglableDrawer>
    )
})

const PriceAndColorAndSize = ({price, colorArray, size}) => {
    // const colors = ['pink', 'teal', 'coral', 'white', 'black']
    return (
        <View style={{
            position: 'absolute',
            bottom: -15,
            right: 15
        }}>
            <View style={[{
                padding: 5,
                borderRadius: 5,
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white'
            }, GlobalStyles.shadowLight]}>
                <Text style={[GlobalStyles.h6, {fontWeight: 'bold', }, GlobalStyles.colorMain]}>{`$${price ? price : 0}`}</Text>

                <Text style={[GlobalStyles.h6, {fontWeight: 'bold', marginLeft: 3, marginRight: 3}, GlobalStyles.lighterHint]}>•</Text>
                
                <Text style={[GlobalStyles.h6, {fontWeight: 'bold'}, GlobalStyles.colorMain]}>{`Size ${size}`}</Text>

                <Text style={[GlobalStyles.h6, {fontWeight: 'bold', marginLeft: 3, marginRight: 3}, GlobalStyles.lighterHint]}>•</Text>

                <View style={[{
                    // borderRadius: 1,
                    // borderColor: 'black',
                    // borderStyle: 'solid',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: 'white',
                }, GlobalStyles.shadowLightest]}>
                    {colorArray.map(color => (
                        <ColorIcon key={color} color={color} />
                    ))} 
                </View>
                
            </View>

        </View>
    )
}

const ColorIcon = ({color}) => {
    return (
        <View style={GlobalStyles.bgColorMain}>
            <View style={{
                height: 20,
                aspectRatio: 1,
                // borderWidth: 1,
                // borderColor: color === 'white' ? 'black' : 'white',
                // borderStyle: 'solid',
                backgroundColor: color.toLowerCase().replace(/\s+/g, '')
            }}>

            </View>
        </View>
        
    )
}


export const FinalizeClothing = () => {



    let src = ['https://randomuser.me/api/portraits/men/1.jpg' ]

    // this fucking works bby
    const clothingPieceInProgress = useSelector(state => state.closet.clothingPieceInProgress)
    console.log(clothingPieceInProgress)

    if (clothingPieceInProgress.images.images.length !== 0){
        src = clothingPieceInProgress.images.images
    }
    console.log(clothingPieceInProgress.images)

    const navigation = useNavigation();

    

    const dispatch = useDispatch();


    // i assumwe we're using hooks here bc we can delete tags in the finalize screen
    const [tags, setTags] = useState(clothingPieceInProgress.tags)
    const [colors, setColors] = useState(clothingPieceInProgress.color)
    const [brands, setBrands] = useState(clothingPieceInProgress.brandName)


    const saveItem = async () => {
        //send item to redux store
        let _id = await nanoid();
        dispatch(batchActions([
            clothingAddedToCloset({
                ...clothingPieceInProgress,
                _id: _id
            }),
            pushAttributesToAttributedClothing(_id, clothingPieceInProgress.clothingType, 'taggedClothing', tags),
            pushAttributesToAttributedClothing(_id, clothingPieceInProgress.clothingType, 'coloredClothing', colors)
        ]))
        // dispatch(batchActions([
        //     clothingInOutfitWorn(idArrayObject, nid),
        //     outfitCreatedFromHome(idArrayObject, nid, date),]
        // ))
        navigation.navigate('CLOSETSCREEN');
        //alternatively have  a'success' page like when u create an outfit
    }
    

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <TopNavScreenHeader title={'Finalize'} exitDestination={"CLOSETSCREEN"}
            extraFunc={() => dispatch(clothingInProgressCleansed())}/>
            
            <View style={{
                flex: 1,
                margin: 10
            }}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    aspectRatio: 1
                }}>
                    <ScrollView
                    horizontal={true}
                    style={{
                        margin: -20,
                    }}
                    contentContainerStyle={{
                        width: `${src.length * 100}%`,
                        height: 'auto'
                    }}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    >
                        {src.map((uri, index) => (
                            <View style={[{
                                height: '100%', 
                                aspectRatio: 1, 
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',}, 
                                GlobalStyles.shadowLight]}
                            key={index}>
                                
                                <Image style={{
                                width: '90%',
                                aspectRatio: 1,
                                borderRadius: 5,
                                // height: imageHeight * (windowHeight / imageHeight),
                                // width: imageWidth * (windowWidth / imageWidth)
                                }} source={{uri: uri}}/> 
                            </View>
                        ))}
                    </ScrollView>



                    <PriceAndColorAndSize 
                        price={clothingPieceInProgress.price} 
                        colorArray={clothingPieceInProgress.color}
                        size={clothingPieceInProgress.size}/>
                </View>
                <View style={{
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={
                        [GlobalStyles.colorMain, GlobalStyles.h3, {fontWeight: 'bold'}]
                    }
                    numberOfLines={1}>
                        {clothingPieceInProgress.clothingName}
                    </Text>
                </View>
                
                <View style={{
                    marginTop: -5,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <Text style={[
                        GlobalStyles.colorMain,
                        GlobalStyles.h4
                    ]}>
                        {`${clothingPieceInProgress.clothingType}`}
                    </Text>
                    <Text style={[
                        GlobalStyles.lighterHint,
                        GlobalStyles.h4,
                        {fontWeight: 'bold', marginLeft: 3, marginRight: 3}
                    ]}>
                        {`•`}
                    </Text>
                    <Text style={[
                        GlobalStyles.colorMain,
                        GlobalStyles.h4
                    ]}>
                        {`${clothingPieceInProgress.pieceType}`}
                    </Text>
                </View>

                <View>
                    <Text style={[
                        GlobalStyles.hint,
                        GlobalStyles.h5
                    ]}
                    numberOfLines={2}>
                        {clothingPieceInProgress.description}
                    </Text>
                </View>

                <View style={{
                    marginLeft: -10,
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: '85%'
                    }}>
                        <ClothingTags tagsArray={tags} setTags={setTags}/>

                        <BrandTags brandsArray={brands} setBrands={setBrands}/>
                        <View style={{
                            height: 100,
                            width: 'auto',
                            backgroundColor: 'white'
                        }}>

                        </View>
                    </View>
                    <View style={{
                        width: '15%',
                        height: '100%'
                    }}>
                        <View style={{
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            flexDirection: 'column'
                        }}>
                            <View style={{
                                width: '100%',
                                aspectRatio: 1
                            }}>
                                <View style={{
                                    margin: 5,
                                    width: 'auto',
                                    height: 'auto'
                                }}>
                                    <View style={[{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 5,
                                        backgroundColor: 'white'
                                    }, GlobalStyles.shadowLight]}>

                                    </View>
                                </View>
                            </View> 
                        </View>
                    </View>
                    

                </View>

                    {/* Other things we could put (page is kinda empty rn) */}
                    {/* 
                        Favorite Button
                        Archive Button
                        Advanced Button
                            # of times worn
                            Imgur link (if there is one)

                    
                    
                    */}
                    
                </View>
            <FinalizeButton 
            onPressFunc={() => 
            saveItem()} disabledHook={false}
            
            />
        </View>
    )
}