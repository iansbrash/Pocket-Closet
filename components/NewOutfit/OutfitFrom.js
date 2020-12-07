import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, TouchableOpacity,
    Text, } from 'react-native'
import { TopNav, TopNavScreenHeader } from '../GlobalComponents/TopNav'
import { ScreenHeader } from '../GlobalComponents/ScreenHeader'
import GlobalStyles from '../GlobalComponents/GlobalStyles'
import { Entypo } from '@expo/vector-icons'; 
import { PlusIcon } from '../GlobalComponents/GlobalIcons'
import { MediumButton } from '../GlobalComponents/GlobalButtons'
import { outfitInProgressCleansed } from '../../redux/reducers/outfitsSlice'
import { useDispatch } from 'react-redux'


export const OutfitFrom = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    return (
        <View style={{
            flex: 1, 
            backgroundColor: 'white',
            }}>
            {/* <TopNav title={'New Outfit'} exitDestination={'HOMESCREEN'}/> */}
            {/* <ScreenHeader  title={'New Outfrom From...'}/> */}
            <TopNavScreenHeader title={'New Outfit From...'} exitDestination={'HOMESCREEN'} extraFunc={() => dispatch(outfitInProgressCleansed())}/>
            <View style={{
                height: 'auto',
                width: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <MediumButton title={'Scratch'} icon={
                    <PlusIcon size={30} style={[GlobalStyles.colorMain, {marginRight: 10}]}/>
                } onPressFunc={() => navigation.navigate('FROMSCRATCH')}/>

                <MediumButton title={'Favorites'} icon={
                    <PlusIcon size={30} style={[GlobalStyles.colorMain, {marginRight: 10}]}/>
                } onPressFunc={() => navigation.navigate('FROMFAVORITES')}/>

                <MediumButton title={'Tags'} icon={
                    <PlusIcon size={30} style={[GlobalStyles.colorMain, {marginRight: 10}]}/>
                } onPressFunc={() => navigation.navigate('FROMTAGS')}/>

                <MediumButton title={'History'} icon={
                    <PlusIcon size={30} style={[GlobalStyles.colorMain, {marginRight: 10}]}/>
                } onPressFunc={() => navigation.navigate('FROMHISTORY')}/>

                <MediumButton title={'Random'} icon={
                    <PlusIcon size={30} style={[GlobalStyles.colorMain, {marginRight: 10}]}/>
                } onPressFunc={() => navigation.navigate('FROMRANDOM')}/>

            </View>
            
        </View>
    )
}
