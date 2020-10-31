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


export const OutfitFrom = () => {

    const navigation = useNavigation();

    return (
        <View style={{
            flex: 1, 
            backgroundColor: 'white',
            }}>
            {/* <TopNav title={'New Outfit'} exitDestination={'HOMESCREEN'}/> */}
            {/* <ScreenHeader  title={'New Outfrom From...'}/> */}
            <TopNavScreenHeader title={'New Outfit From...'} exitDestination={'HOMESCREEN'} />
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
                <MediumButton title={'Saved'} icon={
                    <PlusIcon size={30} style={[GlobalStyles.colorMain, {marginRight: 10}]}/>
                } onPressFunc={() => navigation.navigate('FROMSCRATCH')}/>
                <MediumButton title={'History'} icon={
                    <PlusIcon size={30} style={[GlobalStyles.colorMain, {marginRight: 10}]}/>
                } onPressFunc={() => navigation.navigate('FROMSCRATCH')}/>
                <MediumButton title={'History'} icon={
                    <PlusIcon size={30} style={[GlobalStyles.colorMain, {marginRight: 10}]}/>
                } onPressFunc={() => navigation.navigate('FROMSCRATCH')}/>
            </View>
            
        </View>
    )
}
