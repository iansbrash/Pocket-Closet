import React, {useState, useEffect} from 'react'
import { TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import { View, Image, Text, } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TopNav } from '../GlobalComponents/TopNav'
import { useDispatch } from 'react-redux'
import { NextButton } from './NextButton'
import { ScreenHeader } from '../GlobalComponents/ScreenHeader'
import { clothingInProgressAttributeAdded } from '../../redux/reducers/closetSlice'


const letterSizeArray = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
const numberSizeArray = [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39 ,40]



export const SizeOfClothing = () => {
    

    const [selectedSize, setSelectedSize] = useState('');

    const [isDisabled, setIsDisabled] = useState(true);

    const dispatch = useDispatch();


    


    const selectFunction = (size) => {
        setSelectedSize(size)
        setIsDisabled(false);
    }

    const CustomSizeButton = () => {
        return (
            <TouchableOpacity 
                style={styles.sizeButton}
                    onPress={() => console.log("Homie is trying to add custom size")}>
                    {/* <Button WHY THE FUCK DO I PUT A FUCKING BUTTON HERE???? AM I RETARDED
                    appearance='ghost'
                    style={{height: 'auto', width: 'auto', borderRadius: 5}}
                    accessoryLeft={PlusIcon}></Button> */}
            </TouchableOpacity>
        )
    }

    const SizeButton = ({size}) => {
        return (
            <TouchableOpacity 
                style={size === selectedSize ? [styles.sizeButton, styles.activeButton] : styles.sizeButton}
                    onPress={() => selectFunction(size)}>
                    <Text category='h6' style={size === selectedSize ? [styles.boldText, styles.activeText] : styles.boldText}>
                        {size}
                    </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{flex: 1}}>
            <TopNav title={'Selected Size'} exitDestination={"CLOSETSCREEN"}/>
            <ScrollView>
                <ScreenHeader title={'Select Size'}/>
                
                <View style={{
                    width: 'auto',
                    height: 'auto',
                    marginLeft: 20,
                    marginTop: 20,
                    marginBottom: -10
                }}>
                    <Text category='h6' style={{fontWeight: 'bold', color: '#404040'}}>Letter Sizing</Text>
                </View>
                
                <View style={{
                    width: 'auto',
                    margin: 10,
                    height: 'auto',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                }}>
                    {letterSizeArray.map(size => (
                        <SizeButton size={size}/>
                    ))}
                </View>
                <View style={{
                    width: 'auto',
                    height: 'auto',
                    marginLeft: 20,
                }}>
                    <Text category='h6' style={{fontWeight: 'bold', color: '#404040', marginBottom: -10}}>Number Sizing</Text>
                </View>
                <View style={{
                    width: 'auto',
                    margin: 10,
                    height: 'auto',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                }}>
                    {numberSizeArray.map(size => (
                        <SizeButton size={size}/>
                    ))}
                </View>
                <View style={{
                    width: 'auto',
                    height: 'auto',
                    marginLeft: 20,
                }}>
                    <Text category='h6' style={{fontWeight: 'bold', color: '#404040'}}>Custom Sizing</Text>
                </View>
                <View style={{
                    width: 'auto',
                    margin: 10,
                    height: 'auto',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                }}>
                    <CustomSizeButton />
                </View>

                
            </ScrollView>
            
            <NextButton navpath={'TYPEOFBRANDS'} disabledHook={isDisabled}
            extraFunc={dispatch(clothingInProgressAttributeAdded({
                size: selectedSize,
            }))}/>
        </View>
    )
}


const styles = StyleSheet.create({
    sizeButton: {
        elevation: 5,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: 'white',
        width: 60, 
        height: 40, 
        margin: 5,
        borderRadius: 5
    },
    activeButton: {
        backgroundColor: 'black'
    },
    boldText: {
        fontWeight: 'bold'
    },
    activeText: {
        color: 'white'
    }
})