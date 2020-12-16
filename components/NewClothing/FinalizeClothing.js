import React, {useState, useEffect} from 'react'
import { TouchableOpacity, ScrollView, StyleSheet,Text, } from 'react-native'
import ImagePicker from 'react-native-image-picker';

import { View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TopNavScreenHeader } from '../GlobalComponents/TopNav'
import { useSelector, useDispatch } from 'react-redux'
import { FinalizeButton } from './NextButton'
import { ScreenHeader } from '../GlobalComponents/ScreenHeader'
import { clothingAddedToCloset, pushAttributesToAttributedClothing } from '../../redux/reducers/closetSlice'
import GlobalStyles from '../GlobalComponents/GlobalStyles'
import { XIcon } from '../GlobalComponents/GlobalIcons'
import { clothingInProgressCleansed } from '../../redux/reducers/closetSlice'
import { nanoid } from 'nanoid/async/index.native'
import {batchActions} from 'redux-batched-actions';


const FinalizeDescription = ({title, value}) => {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 30
        }}>
            <Text style={[{
                width: 'auto',
                fontWeight: 'bold'
            }, GlobalStyles.h5, ]}>
                {title}: 
            </Text>
            <Text style={value ? [GlobalStyles.h5, {width: 'auto'}] : [GlobalStyles.h5, {width: 'auto', color: 'gray'}]}>
                {value ? value : 'N/A'} 
            </Text>
        </View>
    )
}


const IndividualTag = ({title}) => {
    return (
        <View style={{
            width: 'auto',
            height: 30,
            margin: 5,
            borderRadius: 5,
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'black',
            flexDirection: 'row',
            elevation: 5
        }}>
            <Text category='h5' style={[{
                color: 'white',
                fontWeight: 'bold',
                marginLeft: 10,
                marginBottom: 0,
                marginRight: 10
            }, GlobalStyles.h5]}>
                {title}
            </Text>
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


    const saveItem = async () => {
        //send item to redux store
        let _id = await nanoid();
        dispatch(batchActions([
            clothingAddedToCloset({
                ...clothingPieceInProgress,
                _id: _id
            }),
            pushAttributesToAttributedClothing(tags, _id, clothingPieceInProgress.clothingType, 'taggedClothing'),
            pushAttributesToAttributedClothing(colors, _id, clothingPieceInProgress.clothingType, 'coloredClothing')
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
            <ScrollView
            bounces={false}
            >
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
                                    GlobalStyles.shadowLight]}>
                                    
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
                    </View>
                    <View>
                        <Text style={
                            [GlobalStyles.colorMain, GlobalStyles.h3, {fontWeight: 'bold'}]
                        }>
                            {clothingPieceInProgress.clothingName + 'asdasdasd'}
                        </Text>
                    </View>
                    <FinalizeDescription title={'Type'} 
                    value={`${clothingPieceInProgress.clothingType} (${clothingPieceInProgress.pieceType})`}/>
                    {/* <Divider style={{margin: 5}} /> */}

                    <FinalizeDescription title={'Name'} value={clothingPieceInProgress.clothingName}/>
                    {/* <Divider style={{margin: 5}} /> */}

                    <FinalizeDescription title={'Brand'} value={clothingPieceInProgress.brandName[0]}/>
                    {/* <Divider style={{margin: 5}} /> */}

                    <FinalizeDescription title={'Description'} value={clothingPieceInProgress.description}/>
                    {/* <Divider style={{margin: 5}} /> */}

                    <FinalizeDescription title={'Size'} value={clothingPieceInProgress.size}/>
                    {/* <Divider style={{margin: 5}} /> */}

                    <FinalizeDescription title={'Color'} value={clothingPieceInProgress.color}/>
                    {/* <Divider style={{margin: 5}} /> */}
                    
                    <FinalizeDescription title={'Price'} value={clothingPieceInProgress.price}/>
                    {/* <Divider style={{margin: 5}} /> */}

                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                        alignItems:'center',
                        margin: 5
                    }}>
                        {tags.map((item, index) => (
                            <IndividualTag title={item} />
                        ))}
                    </View>
                </View>
            </ScrollView>
            <FinalizeButton 
            onPressFunc={() => 
            saveItem()} disabledHook={false}
            
            />
        </View>
    )
}