import React, {useState, useEffect} from 'react'
import { TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import { View, Image, Text, Vibration } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TopNavScreenHeader } from '../GlobalComponents/TopNav'
import { useDispatch, useSelector } from 'react-redux'
import { NextButton } from './NextButton'
import { ScreenHeader } from '../GlobalComponents/ScreenHeader'
import { clothingInProgressAttributeAdded, sizeAdded, sizeDeleted } from '../../redux/reducers/closetSlice'
import GlobalStyles from '../GlobalComponents/GlobalStyles'
import { PlusIcon } from '../GlobalComponents/GlobalIcons'
import { YesNoModal, TextInputModal } from '../GlobalComponents/GlobalModals'
import { clothingInProgressCleansed } from '../../redux/reducers/closetSlice'






export const SizeOfClothing = () => {
    

    const [selectedSize, setSelectedSize] = useState('');

    const [isDisabled, setIsDisabled] = useState(true);
    const [currentlyEditing, setCurrentlyEditing] = useState('')
    const [deleteModal, setDeleteModal] = useState(false)
    const [addNewModal, setAddNewModal] = useState(false)
    const [input, setInput] = useState('');

    const dispatch = useDispatch();

    

    const letterSizeArray = useSelector(state => state.closet.sizingObject.letter)
    const numberSizeArray = useSelector(state => state.closet.sizingObject.number)
    const otherSizeArray = useSelector(state => state.closet.sizingObject.other)



    const selectFunction = (size) => {
        setSelectedSize(size)
        setIsDisabled(false);
    }

    

    const SizeButton = ({size, parent}) => {
        return (
            <TouchableOpacity 
                style={size === selectedSize ? [styles.sizeButton, styles.activeButton, GlobalStyles.shadowLight] : 
                    [styles.sizeButton, GlobalStyles.shadowLight]}
                onPress={() => selectFunction(size)}
                onLongPress={() => sizeLongPress(size, parent)}>
                    <Text category='h6' style={size === selectedSize ? 
                        [styles.boldText, styles.activeText, GlobalStyles.shadowLight] : 
                        [styles.boldText]}>
                        {size}
                    </Text>
            </TouchableOpacity>
        )
    }

    

    const AddSizeButton = ({type, parent}) => {
        return (
            <TouchableOpacity 
                style={[styles.sizeButton, GlobalStyles.shadowLight]}
                    onPress={() => AddSizePressed(type, parent)}>
                    <PlusIcon size={20} style={GlobalStyles.colorMain} />
            </TouchableOpacity>
        )
    }
    const DeleteSize = () => {
        //we select the size we are deleting through another
        //function that is called on the TA's onLongPress
        
        dispatch(sizeDeleted({
            sizeToDelete: selectedSize,
            sizeType: currentlyEditing
        }))
        setDeleteModal(false);
    }

    const sizeLongPress = (size, parent) => {
        Vibration.vibrate(400)
        setSelectedSize(size)
        setDeleteModal(true)
        setCurrentlyEditing(parent)
    }

    // Called to bring modal up to add a new size
    const AddSizePressed = (type) => {
        setCurrentlyEditing(type);
        setAddNewModal(true)
    }

    //called to finalize the size and dispatch it for storage (when you press the check icon in the modal)
    const AddSize = () => {
        //input is the size we want to add
        dispatch(sizeAdded({sizeToAdd: input, sizeType: currentlyEditing}))
        setAddNewModal(false)
        setInput('')
    }

    return (
        <View style={{flex: 1, backgroundColor:'white'}}>
            <TopNavScreenHeader title={'Selected Size'} exitDestination={"CLOSETSCREEN"}
            extraFunc={() => dispatch(clothingInProgressCleansed())}/>
            <YesNoModal 
                setModalVisible={setDeleteModal} 
                modalVisible={deleteModal} 
                onPressFunc={() => DeleteSize()} 
                title={`Delete size ${selectedSize}?`}/>
            <TextInputModal 
                setModalVisible={setAddNewModal} 
                modalVisible={addNewModal} 
                onPressFunc={() => AddSize()} 
                title={`Add ${currentlyEditing} sizing`} 
                searchInput={input} 
                setSearchInput={setInput}/>
            <ScrollView>
                
                <View style={{
                    width: 'auto',
                    height: 'auto',
                    marginLeft: 20,
                    marginTop: 20,
                    marginBottom: -10
                }}>
                    <Text category='h6' 
                    style={[{fontWeight: 'bold'}, GlobalStyles.colorMain, GlobalStyles.h6]}
                    >Letter Sizing</Text>
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
                        <SizeButton size={size} key={size.toString()} parent={'letter'}/>
                    ))}
                    <AddSizeButton type={'letter'}/>
                </View>
                <View style={{
                    width: 'auto',
                    height: 'auto',
                    marginLeft: 20,
                }}>
                    <Text category='h6' 
                    style={[{fontWeight: 'bold'}, GlobalStyles.colorMain, GlobalStyles.h6]}
                    >Number Sizing</Text>
                </View>
                <View style={{
                    width: 'auto',
                    
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 10,
                    height: 'auto',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                }}>
                    {numberSizeArray.map(size => (
                        <SizeButton size={size} key={size.toString()} parent={'number'}/>
                    ))}
                    <AddSizeButton type={'number'}/>
                </View>
                <View style={{
                    width: 'auto',
                    height: 'auto',
                    marginLeft: 20,
                }}>
                    <Text category='h6' 
                    style={[{fontWeight: 'bold'}, GlobalStyles.colorMain, GlobalStyles.h6]}
                    >Other Sizing</Text>
                </View>
                <View style={{
                    width: 'auto',
                    height: 'auto',
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 10,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                }}>
                    {otherSizeArray.map(size => (
                        <SizeButton size={size} key={size.toString()} parent={'other'}/>
                    ))}
                    <AddSizeButton type={'other'} />
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