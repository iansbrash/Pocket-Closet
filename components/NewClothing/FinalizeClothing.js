import React, {useState, useEffect} from 'react'
import { TouchableOpacity, ScrollView, StyleSheet,Text, } from 'react-native'
import ImagePicker from 'react-native-image-picker';

import { View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TopNav } from '../GlobalComponents/TopNav'
import { useSelector, useDispatch } from 'react-redux'
import { FinalizeButton } from './NextButton'
import { ScreenHeader } from '../GlobalComponents/ScreenHeader'
import { clothingAddedToCloset } from '../../redux/reducers/closetSlice'

const FinalizeDescription = ({title, value}) => {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 30

        }}>
            <Text category='h5'   style={{
                width: 'auto',
                fontWeight: 'bold'

            }}>
                {title}: 
            </Text>
            <Text category='h5' style={value ? {width: 'auto'} : {width: 'auto', color: 'gray'}}>
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
            <Text category='h5' status='control' style={{
                margin: 10
            }}>
                {title}
            </Text>
        </View>
    )
}


export const FinalizeClothing = () => {

    let src = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' }
    const navigation = useNavigation();

    // this fucking works bby
    const clothingPieceInProgress = useSelector(state => state.closet.clothingPieceInProgress)

    const dispatch = useDispatch();


    // i assumwe we're using hooks here bc we can delete tags in the finalize screen
    const [tags, setTags] = useState(clothingPieceInProgress.tags)


    const saveItem = () => {
        //send item to redux store
        dispatch(clothingAddedToCloset(clothingPieceInProgress))
        navigation.navigate('CLOSETSCREEN');
        //alternatively have  a'success' page like when u create an outfit
        
    }
    
    if (true) return null;

    return (
        <View style={{flex: 1}}>
            <TopNav title={'Finalize'} exitDestination={"CLOSETSCREEN"}/>
            <ScrollView>
                <ScreenHeader title={'Finalize Clothing'}/>
                
                <View style={{
                    flex: 1,
                    margin: 10
                }}>
                    
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
                    {/* <Divider style={{margin: 5}}/> */}
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                        <Image source={src} style={{
                            width: '80%',
                            aspectRatio: 1,
                            borderRadius: 5
                        }}/>
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