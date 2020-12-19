import React, {useState, useEffect} from 'react'
import { 
    TouchableOpacity, 
    ScrollView, 
    StyleSheet, 
    View, 
    Text,
    Vibration } from 'react-native'
import ImagePicker from 'react-native-image-picker';

import { useNavigation } from '@react-navigation/native'
import { TopNavScreenHeader } from '../GlobalComponents/TopNav'
import { useSelector, useDispatch } from 'react-redux'
import { NextButton } from './NextButton'
import { ScreenHeader } from '../GlobalComponents/ScreenHeader'
import { 
    clothingInProgressAttributeAdded,
    typesOfClothingSpecificTypeAdded,
    typesOfClothingSpecificTypeDeleted } from '../../redux/reducers/closetSlice'
import GlobalStyles from '../GlobalComponents/GlobalStyles';
import { PlusIcon } from '../GlobalComponents/GlobalIcons'
import { TextInputModal, YesNoModal } from '../GlobalComponents/GlobalModals'
import { clothingInProgressCleansed } from '../../redux/reducers/closetSlice'






export const TypeOfClothing = () => {

    const [typeSelected, setTypeSelected] = useState('');
    const [specificSelected, setSpecificSelected] = useState('');

    const typesOfClothingObject = useSelector(state => state.closet.typesOfClothing);
    const [typesOfClothingArray, setTypesOfClothingArray] = useState(Object.keys(typesOfClothingObject));
    const [nextDisabled, setNextDisabled] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [searchInput,setSearchInput] = useState('')

    const [deleteModal, setDeleteModal] = useState(false)

    const navigation = useNavigation();
    const dispatch = useDispatch();


    const TypeOfButtonFunction = (title) => {
        setTypeSelected(title);
        setNextDisabled(true)
    }

    const SpecificTypeFunction = (title) => {
        setNextDisabled(false)
        setSpecificSelected(title)

    }

    const deleteModalFunction = (title) => {
        Vibration.vibrate(400)
        setSpecificSelected(title);
        setDeleteModal(true)
    }

    const AddNewCategory = () => {
        setModalVisible(false)
        //newSpecificType
        //clothingType
        dispatch(typesOfClothingSpecificTypeAdded({
            clothingType: typeSelected.toLowerCase(),
            newSpecificType: searchInput
        }))
        setSearchInput('')
    }

    const deleteCategory = (clothingType, categoryToDelete) => {
        dispatch(typesOfClothingSpecificTypeDeleted(
            {clothingType: clothingType.toLowerCase(),
            specificTypeToDelete: categoryToDelete}))
        setDeleteModal(false)
    }

    const SpecificTypeOfButton = ({title}) => {

        return (
            <View style={{
                height: 'auto',
                width: '50%',
            }}>
                <TouchableOpacity style={[{
                    width: 'auto',
                    height: 50,
                    margin: 5,
                    borderRadius: 10,
                    elevation: 5,
                }, GlobalStyles.shadowLight]}
                delayLongPress={500}
                onPress={() => SpecificTypeFunction(title)}
                onLongPress={() => deleteModalFunction(title)}
                >
                    
                    <View style={{
                        height: 5,
                        width: '100%'
                    }}>
                        <View style={[specificSelected === title ? {backgroundColor: 'white'} : GlobalStyles.bgColorMain, 
                        {borderTopLeftRadius: 5, 
                        borderTopRightRadius: 5, 
                        height: 10, 
                        width: '100%',
                        position: 'absolute',
                        top: 0,
                        zIndex: 0}]}></View>
                    </View>
                    

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

    const TypeOfButton = ({title}) => {
        return (
            <View style={{
                height: 'auto',
                width: '50%',
            }}>
                <TouchableOpacity style={[{
                    width: 'auto',
                    height: 50,
                    margin: 5,
                    borderRadius: 10,
                    elevation: 5,
                }, GlobalStyles.shadowLight]}
                onPress={() => TypeOfButtonFunction(title)}>

                    <View style={{
                        height: 5,
                        width: '100%'
                    }}>
                        <View style={[typeSelected === title ? {backgroundColor: 'white'} : GlobalStyles.bgColorMain, 
                        {borderTopLeftRadius: 5, 
                        borderTopRightRadius: 5, 
                        height: 10, 
                        width: '100%',
                        position: 'absolute',
                        top: 0,
                        zIndex: 0}]}></View>
                    </View>
                    

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

    const AddNewCategoryButton = ({arrayName, onPressFunc}) => {
        return (
            <View style={{
                height: 'auto',
                width: '50%',
            }}>
                <TouchableOpacity style={[{
                    width: 'auto',
                    height: 50,
                    margin: 5,
                    borderRadius: 10,
                    elevation: 5,
                }, GlobalStyles.shadowLight]}
                onPress={() => onPressFunc()}>

                    <View style={{
                        height: 5,
                        width: '100%'
                    }}>
                        <View 
                        style={[GlobalStyles.bgColorMain, 
                            {borderTopLeftRadius: 5, 
                                borderTopRightRadius: 5, 
                                height: 10, 
                                width: '100%',
                                position: 'absolute',
                                top: 0,
                                zIndex: 0}]}></View>
                    </View>
                    

                    <View style={[styles.button, {justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}]}>
                        <Text style={[styles.boldText, GlobalStyles.h4]}>
                            {/* {'New Type'} */}
                        </Text>
                        <PlusIcon size={30} style={[ GlobalStyles.colorMain]}/>
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
            <TopNavScreenHeader exitDestination={'CLOSETSCREEN'} title={'New Clothing Piece'} 
            extraFunc={() => dispatch(clothingInProgressCleansed())}/> 
            <TextInputModal 
                title={'Add New Category'}
                modalVisible={modalVisible} 
                setModalVisible={setModalVisible} 
                onPressFunc={() => AddNewCategory()}
                searchInput={searchInput}
                setSearchInput={setSearchInput}/>

            <YesNoModal 
                title={`Delete ${specificSelected}`}
                modalVisible={deleteModal}
                setModalVisible={setDeleteModal}
                onPressFunc={() => deleteCategory(typeSelected, specificSelected)}/>
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
                        <TypeOfButton key={item} title={item.charAt(0).toUpperCase() + item.slice(1)}/>
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
                    {typeSelected !== '' ? typesOfClothingObject[typeSelected.toLowerCase()].map(item => (
                        <SpecificTypeOfButton key={item} title={item}/>
                    )) : null}
                    {typeSelected !== '' ? <AddNewCategoryButton arrayName={'type'} onPressFunc={() => setModalVisible(true)}/> : null}
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