import React, { useState, useEffect } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { 
    View, 
    TouchableOpacity, 
    StyleSheet,
    Pressable,
    Text, } from 'react-native'
import { TopNav, TopNavScreenHeader } from '../GlobalComponents/TopNav'
import { ScreenHeader } from '../GlobalComponents/ScreenHeader'
import { useSelector, useDispatch } from 'react-redux'
import { NextButton } from '../NewClothing/NextButton'
import { Ionicons } from '@expo/vector-icons';
import { CheckIcon, PlusIcon } from '../GlobalComponents/GlobalIcons'
import GlobalStyles from '../GlobalComponents/GlobalStyles'
import { outfitInProgressCleansed } from '../../redux/reducers/outfitsSlice'

import { MediumCheckButton } from '../GlobalComponents/GlobalButtons'





const SelectClothingButton = ({title, navpath, iconName, defaultChecked, navprops}) => {

    const navigation = useNavigation();
    const [checked, setChecked] = useState(defaultChecked);
    const [pressed, setPressed] = useState(false)

    
    
    const clothingArray = useSelector(state => state.outfits.outfitInProgress.outfitArr[title.toLowerCase() + 'Array'])
    const numOfItems = clothingArray.length;

//temp, useSelector to find number of items
   

    return (
        <View style={{
            height: 75,
            width: '100%',
            marginTop: 5,
            marginBottom: 5
        }}>
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
                <Pressable 
                style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'column',
                    opacity: pressed ? 0.5 : 1.0
                }}
                disabled={!checked}
                onPress={() => navigation.navigate(navpath, navprops)}
                onPressIn={() => setPressed(true)}
                onPressOut={() => setPressed(false)}>
                    <View style={{
                        height: 10,
                        width: '100%',
                        zIndex: 0,
                    }}>
                        <View style={[{
                            position: 'absolute',
                            top: 0,
                            width: '100%',
                            left: 0,
                            borderRadius: 10,
                            height: 20,
                            zIndex: 0,
                        }, !checked ? styles.barInactive : styles.barActive]}>
                        </View>
                    </View>
                    
                    <View style={{
                        height: 45,
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        zIndex: 1,
                        backgroundColor: 'white',
                    }}>
                        <View style={{
                            height: '100%', 
                            justifyContent: 'flex-start',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Pressable
                            hitSlop={20}
                            style={checked ? styles.checkboxActive : styles.checkbox}
                            onPress={() => setChecked(!checked)}>
                                {/* <Icon width='25' height='25' fill='white' name={'checkmark-outline'}/> */}
                                <CheckIcon size={25} style={{color: 'white'}}/>
                            </Pressable>
                            <Text category='h4' style={[checked ? styles.textActive : styles.textInactive, GlobalStyles.h4]}>{title}</Text>
                            <Text appearace='hint' style={[{fontWeight: 'bold', marginLeft: 10, marginTop: 2}, GlobalStyles.h6, GlobalStyles.hint]}>
                                {(checked && numOfItems !== 0) ? `(${numOfItems} item${numOfItems === 1 ? '' : 's'})` : ''}
                            </Text>
                        </View>
                        
                        {/* <Icon style={{marginRight: 15, marginLeft: 5}} width='30' height='30' fill={checked ? 'black' : '#6c7280'} name={iconName}/> */}
                        <PlusIcon size={30} style={{marginRight: 15, marginLeft: 5, color: checked ? '#09122b' : '#6c7280'}}/>
                    </View>
                </Pressable>
            </View>
            
        </View>
        
    )
}

export const FromScratch = () => {

    const navigation = useNavigation();
    const closetObject = useSelector(state => state.closet.closetObject);
    const closetObjectKeys = Object.keys(closetObject);
    const dispatch = useDispatch();

    return (
        <View 
        style={{flex: 1, backgroundColor: 'white'}}>
            <TopNavScreenHeader title={'Select Clothing'} exitDestination={'HOMESCREEN'} 
            extraFunc={() => dispatch(outfitInProgressCleansed())}/>
            <View style={{
                height: 'auto',
                width: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {/* <MediumCheckButton 
                    title={'Tops'} 
                    onPressFunc={() => navigation.navigate('OUTFITSELECTION', {
                        topNavTitle: 'Tops',
                        arrayName: 'topsArray'})} 
                    isFromScratch={true}
                    defaultScratchChecked={false}
                /> */}
                
                <SelectClothingButton 
                title={'Tops'} 
                iconName={'plus'}
                defaultChecked={true}
                navpath={'OUTFITSELECTION'}
                navprops={{
                    topNavTitle: 'Tops',
                    arrayName: 'topsArray'}}/>
                <SelectClothingButton 
                title={'Bottoms'} 
                iconName={'plus'}
                defaultChecked={true}
                navpath={'OUTFITSELECTION'}
                navprops={{
                    topNavTitle: 'Bottoms',
                    arrayName: 'bottomsArray'}}/>
                <SelectClothingButton 
                title={'Footwear'} 
                iconName={'plus'}
                defaultChecked={true}
                navpath={'OUTFITSELECTION'}
                navprops={{
                    topNavTitle: 'Footwear',
                    arrayName: 'footwearArray'}}/>
                <SelectClothingButton 
                title={'Other'} 
                iconName={'plus'}
                defaultChecked={false}
                navpath={'OUTFITSELECTION'}
                navprops={{
                    topNavTitle: 'Other',
                    arrayName: 'otherArray'}}/>
            </View>
            <NextButton disabledHook={false} navpath={'OUTFITDESCRIPTION'} />

        </View>
    )
}

const styles = StyleSheet.create({
    checkboxActive: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 5,
        backgroundColor: '#09122b',
        borderWidth: 1,
        borderColor: '#09122b'
    },
    checkbox: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#6c7280'
    },
    barActive: {
        // height: 10, 
        // borderTopLeftRadius: 10, 
        // borderTopRightRadius: 10, 
        backgroundColor: '#09122b',
        // width: '100%'
    },
    barInactive: {
        backgroundColor: '#6c7280',
        // height: 10, 
        // borderTopLeftRadius: 10, 
        // borderTopRightRadius: 10, 
        // width: '100%'
    },
    textActive: {
        fontWeight: 'bold',
        color: '#09122b'
    }, textInactive: {
        fontWeight: 'bold',
        color: '#b7bcc7'
    },
})