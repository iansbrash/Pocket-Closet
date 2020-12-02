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





const SelectClothingButton = ({title, navpath, iconName, defaultChecked, navprops}) => {

    const navigation = useNavigation();
    const [checked, setChecked] = useState(defaultChecked);

    
    
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
                <TouchableOpacity style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
                activeOpacity={0.5}
                disabled={!checked} 
                onPress={() => navigation.navigate(navpath, navprops)}>
                    <View 
                        style={checked ? styles.barActive : styles.barInactive}></View>
                    <View style={{
                        height: 'auto',
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginTop: 8
                    }}>
                        <View style={{
                            justifyContent: 'flex-start',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity
                            style={checked ? styles.checkboxActive : styles.checkbox}
                            onPress={() => setChecked(!checked)}>
                                {/* <Icon width='25' height='25' fill='white' name={'checkmark-outline'}/> */}
                                <CheckIcon size={25} style={{color: 'white'}}/>
                            </TouchableOpacity>
                            <Text category='h4' style={[checked ? styles.textActive : styles.textInactive, GlobalStyles.h4]}>{title}</Text>
                            <Text appearace='hint' style={[{fontWeight: 'bold', marginLeft: 10, marginTop: 2}, GlobalStyles.h6, GlobalStyles.hint]}>
                                {(checked && numOfItems !== 0) ? `(${numOfItems} item${numOfItems === 1 ? '' : 's'})` : ''}
                            </Text>
                        </View>
                        
                        {/* <Icon style={{marginRight: 15, marginLeft: 5}} width='30' height='30' fill={checked ? 'black' : '#6c7280'} name={iconName}/> */}
                        <PlusIcon size={30} style={{marginRight: 15, marginLeft: 5, color: checked ? '#09122b' : '#6c7280'}}/>
                    </View>
                </TouchableOpacity>
            </View>
            
        </View>
        
    )
}


//Taken from previous screen, could potentially create a fit-all button
//So that I don't have to waste space making copies with small
//changes to them (i.e. this)
const SelectOutfitButton = ({ title, navTitle, icon, defaultChecked, navProps }) => {
    const navigation = useNavigation();

    const [checked, setChecked] = useState(defaultChecked);

    return (
        <View style={{width: '50%',
        justifyContent: 'center',
        alignItems: 'center',}}
        level='1'>
            <View style={{
                width: '95%',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 5,
                borderRadius: 10,
                elevation: 10
            }}
            level='4'>
                <View style={{
                    margin: 5
                }}level='4'
                >
                    <Text>Checkbox go ehre XD</Text>
                    {/* <CheckBox
                        status='primary'
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                        >
                            <Text category='h5'
                                style={{fontWeight: 'bold'}}>{title.toUpperCase()}</Text>
                    </CheckBox> */}
                </View>
                <View
                style={{width: '100%', 
                aspectRatio: 1,
                justifyContent: 'center',
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10}}
                level='3'>
                    {/* <Button accessoryLeft={icon}
                    style={{
                        //cant do elevation: 10, here...fucks up the disabled btn
                    height: '90%',
                    margin: 10,
                    flex: 1,
                    borderRadius: 10}}
                    onPress={() => navigation.navigate('OUTFITSELECTION', navProps)}
                    disabled={!checked}>     
                    </Button> */}
                </View>
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
        height: 10, 
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10, 
        backgroundColor: '#09122b',
        width: '100%'
    },
    barInactive: {
        backgroundColor: '#6c7280',
        height: 10, 
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10, 
        width: '100%'
    },
    textActive: {
        fontWeight: 'bold',
        color: '#09122b'
    }, textInactive: {
        fontWeight: 'bold',
        color: '#b7bcc7'
    },
})