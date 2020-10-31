import React, {useState, useEffect} from 'react'
import { 
    TouchableOpacity, 
    ScrollView, 
    StyleSheet, 
    View, 
    Text } from 'react-native'
import ImagePicker from 'react-native-image-picker';

import { useNavigation } from '@react-navigation/native'
import { TopNavScreenHeader } from '../GlobalComponents/TopNav'
import { useSelector, useDispatch } from 'react-redux'
import { NextButton } from './NextButton'
import { ScreenHeader } from '../GlobalComponents/ScreenHeader'
import { clothingInProgressAttributeAdded } from '../../redux/reducers/closetSlice'
import GlobalStyles from '../GlobalComponents/GlobalStyles';






export const TypeOfClothing = () => {

    const [typeSelected, setTypeSelected] = useState('');
    const [specificSelected, setSpecificSelected] = useState('');

    const typesOfClothingObject = useSelector(state => state.closet.typesOfClothing);
    const typesOfClothingArray = Object.keys(typesOfClothingObject);
    const [nextDisabled, setNextDisabled] = useState(true)

    const navigation = useNavigation();
    const dispatch = useDispatch();

    // why the FUCK do i have to do this
    const [daArray, setDaArray] = useState([])

    const TypeOfButtonFunction = (title) => {
        setDaArray(typesOfClothingObject[title.toLowerCase()]);
        setTypeSelected(title);
        setNextDisabled(true)
    }

    const SpecificTypeFunction = (title) => {
        setNextDisabled(false)
        setSpecificSelected(title)

    }

    const SpecificTypeOfButton = ({title, key}) => {

        return (
            <View style={{
                height: 'auto',
                width: '50%',
            }} key={key}>
                <TouchableOpacity style={[{
                    width: 'auto',
                    height: 50,
                    margin: 5,
                    borderRadius: 10,
                    elevation: 5,
                }, GlobalStyles.shadowLight]}
                onPress={() => SpecificTypeFunction(title)}>

                    <View style={[specificSelected === title ? {backgroundColor: 'white'} : GlobalStyles.bgColorMain, 
                        {borderTopLeftRadius: 5, borderTopRightRadius: 5, height: 5, width: '100%'}]}></View>

                    <View style={specificSelected === title ?
                        [styles.button, styles.buttonActive] : [styles.button]}>
                        <Text style={specificSelected === title ?
                        [styles.activeText, GlobalStyles.h4] : [styles.boldText, GlobalStyles.h4]}>
                            {title}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const TypeOfButton = ({title, key}) => {
        return (
            <View style={{
                height: 'auto',
                width: '50%',
            }} key={key}>
                <TouchableOpacity style={[{
                    width: 'auto',
                    height: 50,
                    margin: 5,
                    borderRadius: 10,
                    elevation: 5,
                }, GlobalStyles.shadowLight]}
                onPress={() => TypeOfButtonFunction(title)}>

                    <View style={[typeSelected === title ? {backgroundColor: 'white'} : GlobalStyles.bgColorMain, 
                        {borderTopLeftRadius: 5, borderTopRightRadius: 5, height: 5, width: '100%'}]}></View>

                    <View style={typeSelected === title ?
                        [styles.button, styles.buttonActive] : [styles.button]}>
                        <Text style={typeSelected === title ?
                        [styles.activeText, GlobalStyles.h4] : [styles.boldText, GlobalStyles.h4]}>
                            {title}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <TopNavScreenHeader exitDestination={'CLOSETSCREEN'} title={'New Clothing Piece'} /> 
            <ScrollView style={{marginBottom: 10}}>
            {/* <ScreenHeader title={'Type of Clothing'}/> */}
            {/* <Divider /> */}
                <View style={{
                    margin: 5,
                    width: 'auto',
                    height: 'auto',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}>
                    
                    {typesOfClothingArray.map(item => (
                        <TypeOfButton title={item.charAt(0).toUpperCase() + item.slice(1)}/>
                    ))}
                </View>
                <View style={{height: 30}}></View> 
                {typeSelected !== '' ? <ScreenHeader title={typeSelected.toUpperCase()}/> : null}
                <View style={{
                    margin: 5,
                    paddingBottom: 20,
                    width: 'auto',
                    height: 'auto',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}>
                    {daArray.map(item => (
                        <SpecificTypeOfButton title={item} key={item}/>
                    ))}
                </View>
                
                
            </ScrollView>
            <NextButton 
            navpath={'SIZEOFCLOTHING'} 
            disabledHook={nextDisabled} 
            extraFunc={dispatch(clothingInProgressAttributeAdded({
                clothingType: typeSelected,
                pieceType: specificSelected
            }))}/>
        </View>
    )
}

const styles = StyleSheet.create({
    boldText: {
        fontWeight: 'bold'
    },
    activeText: {
        fontWeight: 'bold',
        color: 'white'
    },
    button: {
        height: '100%',
        width: '100%',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'white'
    },
    buttonActive: {
        backgroundColor: 'black',
        borderColor: 'black',
        borderWidth: 1,
        elevation: 20
    },
    buttonInactive: {
        backgroundColor: 'white'
    },
    TOBasic: {
        height: 70,
        width: 70,
        margin: 20,
        borderRadius: 5,
        backgroundColor: '#3366ff',
        justifyContent: 'center',
        alignItems:'center',
    },
})