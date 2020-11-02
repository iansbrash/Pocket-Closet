import React from 'react'
import  { 
    Image,
    View,
    TouchableOpacity,
    FlatList,
    Text,
    ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { outfitCreatedFromHome, outfitInProgressItemDeleted } from '../../redux/reducers/outfitsSlice'

import { useNavigation } from '@react-navigation/native'
import { TopNavScreenHeader } from '../GlobalComponents/TopNav'
import { ScreenHeader, MiniScreenHeader } from '../GlobalComponents/ScreenHeader'
import { FinalizeButton } from '../NewClothing/NextButton'
import GlobalStyles from '../GlobalComponents/GlobalStyles'
import { XIcon } from '../GlobalComponents/GlobalIcons'
import { MediumButton } from '../GlobalComponents/GlobalButtons'
import { outfitInProgressCleansed } from '../../redux/reducers/outfitsSlice'




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
    
    
    const FinalizeClicked = () => {

        dispatch(outfitCreatedFromHome(outfitInProgress))
        navigation.navigate("FINALIZESUCCESS")
    }

    const testArray = [];

    var arrayOfTempObjectValues = Object.values(outfitInProgress)
    console.log(arrayOfTempObjectValues)

    // console.log(arrayOfTempObjectValues);

    return (

        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
           <TopNavScreenHeader title={'Finalize Outfit'} exitDestination={'HOMESCREEN'} extraFunc={() => dispatch(outfitInProgressCleansed())}/>
           {/* <ScreenHeader title={'Finalize Outfit'}/> */}
            <View style={{
                flex: 1
            }}>
                <ScrollView style={{padding: 10}}>

                    {Object.keys(outfitInProgress).map(key => ( 
                        outfitInProgress[key].length !== 0 ?
                        <View>
                            <MiniScreenHeader 
                            title={outfitInProgress[key][0].clothingType.charAt(0).toUpperCase() 
                                + outfitInProgress[key][0].clothingType.slice(1)}/>
                            <FlatList 
                            data={outfitInProgress[key]}
                            renderItem={item => (
                                
                            <MediumButton 
                                title={item.item.clothingName}
                                onPressFunc={null}
                                buttonFunc={() => dispatch(outfitInProgressItemDeleted(item.item))}
                                icon={<XIcon size={30} style={[{marginRight: 10}, GlobalStyles.colorMain]}/>}/>)}/>
                        </View> : null
                    ))}
                </ScrollView>
                

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