import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, TouchableOpacity,
    Text, } from 'react-native'
import { TopNav } from '../GlobalComponents/TopNav'
import { ScreenHeader } from '../GlobalComponents/ScreenHeader'
import GlobalStyles from '../GlobalComponents/GlobalStyles'
import { Entypo } from '@expo/vector-icons'; 
import { PlusIcon } from '../GlobalComponents/GlobalIcons'


const OutfitFromButton = ({title, navpath, iconName}) => {

    const navigation = useNavigation();

    return (
        <View style={{
            height: 75,
            width: '100%',
            marginTop: 5,
            marginBottom: 5,
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
                onPress={() => navigation.navigate(navpath)}>
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
                        <Text category='h4' style={[{fontWeight: 'bold', marginLeft: 15}, GlobalStyles.h4]}>{title}</Text>
                        <PlusIcon size={30} style={[GlobalStyles.colorMain, {marginRight: 10}]}/>
                    </View>
                </TouchableOpacity>
            </View>
            
        </View>
        
    )
}

export const OutfitFrom = ({ navigationXD }) => {


    return (
        <View style={{
            flex: 1, 
            backgroundColor: 'white',
            }}>
            <TopNav title={'New Outfit'} exitDestination={'HOMESCREEN'}/>
            <ScreenHeader title={'New Outfrom From...'}/>
            <View style={{
                height: 'auto',
                width: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <OutfitFromButton title={'Scratch'} iconName={'plus'} navpath={'FROMSCRATCH'}/>
                <OutfitFromButton title={'Saved'} iconName={'heart'}/>
                <OutfitFromButton title={'History'} iconName={'calendar'}/>
                <OutfitFromButton title={'Random'} iconName={'question-mark'}/>
            </View>
            
        </View>
    )
}


const styles = StyleSheet.create({
    
})