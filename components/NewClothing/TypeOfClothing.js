import React, {useState, useEffect} from 'react'
import { TouchableOpacity, ScrollView, StyleSheet, View, Text } from 'react-native'
import ImagePicker from 'react-native-image-picker';

import { useNavigation } from '@react-navigation/native'
import { TopNav } from '../GlobalComponents/TopNav'
import { useSelector, useDispatch } from 'react-redux'
import { NextButton } from './NextButton'
import { ScreenHeader } from '../GlobalComponents/ScreenHeader'
import { clothingInProgressAttributeAdded } from '../../redux/reducers/closetSlice'






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
                height: 50,
                width: '50%'
            }} key={key}>
                <TouchableOpacity style={{
                    width: 'auto',
                    height: 'auto',
                    margin: 5,
                    borderRadius: 5,
                    elevation: 5
                }}>
                    {/* <Button style={specificSelected === title ? 
                        [styles.button, styles.buttonActive] : [styles.button]}
                    onPress={() => SpecificTypeFunction(title)}
                    status='control'>
                        <Text category='h5' style={specificSelected === title ?
                        [styles.activeText] : [styles.boldText]}>
                            {title}
                        </Text>
                    </Button> */}
                </TouchableOpacity>
            </View>
        )
    }

    const TypeOfButton = ({title, key}) => {
        return (
            <View style={{
                height: 50,
                width: '50%'
            }} key={key}>
                <TouchableOpacity style={{
                    width: 'auto',
                    height: 'auto',
                    margin: 5,
                    borderRadius: 5,
                    elevation: 5
                }}>
                    {/* <Button style={typeSelected === title ?
                        [styles.button, styles.buttonActive] : [styles.button]}
                    onPress={() => TypeOfButtonFunction(title)}
                    accessoryLeft={ExitIcon}
                    status='control'>
                        <Text category='h5' style={typeSelected === title ?
                        [styles.activeText] : [styles.boldText]}>
                            {title}
                        </Text>
                    </Button> */}
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{
            flex: 1
        }}>
            <TopNav exitDestination={'CLOSETSCREEN'} title={'New Clothing Piece'} /> 
            <ScrollView style={{marginBottom: 10}}>
            <ScreenHeader title={'Type of Clothing'}/>
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
                <ScreenHeader title={typeSelected.toUpperCase()}/>
                {/* <Divider /> */}
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
            {/* <View style={{
                width: '100%',
                height: 'auto'
            }}>
                <Divider />
                <Button style={{
                    width: 'auto',
                    height: 50,
                    borderRadius: 5,
                    marginRight: 30,
                    marginLeft: 30,
                    marginBottom: 10,
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onPress={() => navigation.navigate("SIZEOFCLOTHING", {
                    typeSelected, specificSelected
                })}
                disabled={nextDisabled}>
                    <Text category='h3' status='control' style={{fontWeight: 'bold'}}>NEXT</Text>
                </Button>
            </View> */}
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
        borderRadius: 5,
        justifyContent:'flex-start',
        alignItems:'center'
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