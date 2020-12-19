import React, {useState, useRef, useEffect} from 'react'
import { 
    TouchableOpacity, 
    ScrollView, 
    StyleSheet, 
    View, 
    Image, 
    Text, 
    TextInput,
    Animated,
    FlatList,
    Pressable,
    Vibration
} from 'react-native'
import ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native'
import { TopNavScreenHeader } from '../GlobalComponents/TopNav'
import { useSelector, useDispatch } from 'react-redux'
import { NextButton } from './NextButton'
import { ScreenHeader } from '../GlobalComponents/ScreenHeader'
import { 
    clothingInProgressAttributeAdded,
    brandAdded,
    brandDeleted } from '../../redux/reducers/closetSlice'
import { CheckIcon, PlusIcon } from '../GlobalComponents/GlobalIcons'
import GlobalStyles from '../GlobalComponents/GlobalStyles'
import { TextInputModal, YesNoModal } from '../GlobalComponents/GlobalModals'
import { clothingInProgressCleansed } from '../../redux/reducers/closetSlice'





const testBrandArray = [
    'Comme Des Garcons', 
    'Ader Error', 
    'Supreme',
    'Burberry',
    'Bape',
    'Undefeated',
    'Nike',
'XDDD']


const TestSearchInput = ({searchInput, setSearchInput, setNewBrandInputModal}) => {
    
    const [inputLength] = useState(new Animated.Value(1))
    const searchInputRef = useRef(null);

    const onBlur = () => {
        Animated.timing(inputLength, {
            toValue: 1,
            duration: 250
        }).start();
    }

    const onFocus = () => {
        Animated.timing(inputLength, {
            toValue: 0,
            duration: 250
        }).start();
    }
    
    return (
        <View style={{
            marginLeft: 10,
            marginRight: 10,
            marginTop: 5
        }}>
            <Animated.View 
            style={{
                width: inputLength.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['84%', '100%']
                }),
                flexDirection: 'row',
                alignItems: 'center',
                position: 'relative'}}>
                <TextInput 
                    style={{ 
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 40, 
                        width: '100%',
                        borderRadius: 5,
                        //fontWeight: 'bold',
                        fontSize: 15,
                        paddingLeft: 25,
                        backgroundColor: '#f2f2f2',
                        elevation: 10,
                        zIndex: 2
                    }}
                    ref={searchInputRef}
                    placeholder={`Search clothing!`}
                    onFocus={() => onFocus()}
                    onBlur={() => onBlur()}
                    // inlineImageLeft='search40x40'
                    //inlineImagePadding={5} // might have to be in curly braces?
                    selectTextOnFocus={true}
                    placeholderTextColor="#9e9e9e"  //random ass color
                    onChangeText={text => setSearchInput(text)}
                    value={searchInput}
                />
                <Pressable style={{
                    height: 30,
                    aspectRatio: 1,
                    position: 'absolute',
                    backgroundColor: '#e8e8e8',
                    borderRadius: 5,
                    margin: 5,
                    top: 0,
                    right: 0,
                    zIndex: 3,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onPress={() => setNewBrandInputModal(true)}
                hitSlop={10}>
                    <PlusIcon size={25} style={GlobalStyles.colorMain}/>
                </Pressable>
                    <Animated.View 
                    style={{
                        opacity: inputLength.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 0]
                        }),
                        zIndex: 1,
                        margin: 10,
                        
                    }}>
                        <TouchableOpacity style={{
                            height: 'auto',
                            width: 'auto',
                            alignItems: 'center'
                        }}
                        onPress={() => searchInputRef.current.blur()}>
                            
                            <Text style={{ fontWeight: 'bold'}}>Cancel</Text>
                        </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        </View>
        
    )
}

export const TypeOfBrands = () => {

    const [searchInput, setSearchInput] = useState('');
    
    const [ brandsArrayState, setBrandsArrayState] = useState(brandsArray)

    // this shoudl be an array of arrays...?
    const [selectedBrandsArray, setSelectedBrandsArray] = useState([]);
    const navigation = useNavigation();
    const [newBrandInput, setNewBrandInput] = useState('')
    const [newBrandInputModal, setNewBrandInputModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [toDelete, setToDelete] = useState('')

    // console.log(brandsArray)

    const dispatch = useDispatch();


    // this is an array of arrays. Keep that in mind.
    const brandsArray = useSelector(state => state.closet.brandsArray)

    const DispatchAddNewBrand = () => {
        // TODO: Make a multi-select so we can have brand laternate names
        dispatch(brandAdded({newBrandArray: [newBrandInput]}));
        setNewBrandInput('')
        setNewBrandInputModal(false)
    }

    const onLongPressDelete = (item) => {
        Vibration.vibrate(400)
        setToDelete(item)
        setDeleteModal(true)
    }

    const DispatchDeleteBrand = () => {
        dispatch(brandDeleted({
            brandArrayToRemove: [toDelete]
        }))
        setToDelete('')
        setDeleteModal(false)
    }

    
    const IndividualBrand = ({item}) => {
        // console.log(item);
        // console.log('selectedBrandsArray: ');
        // console.log(selectedBrandsArray);


        const [brandSelected, setSelected] = useState(false);
        const [toggle, setToggle] = useState(true);

        //we use the first nickname in the brand array
        item = item[0];

        /** There might be a '' brand stuck in limbo.. i had to cleanse it with this */
        if (item === '' || !item || !item.toLowerCase().includes(searchInput)){
            return null
        }
        let inSelectedBrands = selectedBrandsArray.find(searchItem => searchItem.toLowerCase() === item.toLowerCase())
        


        
            return (

                // This is so fucking inefficient. What I should instead do is just have a
                //selected/notselected state for each button, which toggles the color
                //and when clicked, it either adds/removes itself from the selectedbrandsarray
                
                <TouchableOpacity 
            onPress={() =>  !selectedBrandsArray.find(searchItem => searchItem.toLowerCase() === item.toLowerCase()) ? setSelectedBrandsArray([...selectedBrandsArray, item]) 
                : setSelectedBrandsArray(selectedBrandsArray.filter(searchItem => searchItem.toLowerCase() !== item.toLowerCase()))}
            style={inSelectedBrands ? 
                [styles.TOBasic, styles.TOSelected, GlobalStyles.shadowLight] : 
                [styles.TOBasic, GlobalStyles.shadowLight]}
                onLongPress={() => onLongPressDelete(item)}
                >
                    {/* Bar */}
                    <View style={{
                        height: 5,
                        width: '100%',
                        zIndex: 0,
                    }}>
                        <View style={[{
                            borderTopLeftRadius: 5, 
                            borderTopRightRadius: 5, 
                            height: 10, 
                            position: 'absolute',
                            width: '100%'
                        }, inSelectedBrands ? {backgroundColor: 'white'} : GlobalStyles.bgColorMain]}></View>
                    </View>
                    
                    <View style={[{
                        zIndex: 1,
                        height: 45, 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        flexDirection: 'row', 
                        width: '100%',
                        borderBottomLeftRadius: 5,
                        borderBottomRightRadius: 5},
                        inSelectedBrands ? 
                            [GlobalStyles.bgColorMain] : 
                            [{backgroundColor: 'white'}]]}>
                        <Text category='h5' status='basic' 
                        style={inSelectedBrands ? 
                            [styles.TextSelected, GlobalStyles.h5] : [styles.TextUnselected, GlobalStyles.h5]}>
                            {item}
                        </Text>
                        <CheckIcon size={32} style={{color: 'white', marginRight: 10}} />
                    </View>
                    
                    
                    {/* <Icon style={{marginRight: 5, marginLeft: 5}} width='30' height='30' fill='white' name='checkmark-outline'/> */}
            </TouchableOpacity>
            )
    }
        
        

    
    

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <TopNavScreenHeader title={'Select Brands'} exitDestination={'CLOSETSCREEN'}
            extraFunc={() => dispatch(clothingInProgressCleansed())}/>
            
            <View style={{marginTop: 10, marginBottom: 10}}>
                <TestSearchInput searchInput={searchInput} setSearchInput={setSearchInput} setNewBrandInputModal={setNewBrandInputModal}/>
            </View>
            <TextInputModal 
                setModalVisible={setNewBrandInputModal}
                modalVisible={newBrandInputModal}
                onPressFunc={() => DispatchAddNewBrand()}
                title={'Add new brand'}
                searchInput={newBrandInput}
                setSearchInput={setNewBrandInput}
            />
            <YesNoModal 
                setModalVisible={setDeleteModal}
                modalVisible={deleteModal}
                onPressFunc={() => DispatchDeleteBrand()}
                title={`Remove ${toDelete}?`}
            />

            
            <FlatList 
                style={{maxHeight: '100%', width: '100%'}}
                data={brandsArray}
                renderItem={item => <IndividualBrand {...item}/>}
                keyExtractor={item => item[0]}
            /> 
            
            <NextButton 
            navpath={"ITEMDESCRIPTION"} 
            disabledHook={false}
            extraFunc={dispatch(clothingInProgressAttributeAdded({
                brandName: selectedBrandsArray,
            }))}/>
        </View>
    )
}


const styles = StyleSheet.create({
    aTOBasic: {
        width: 'auto', 
        height: 40, 
        marginLeft: 10,
        marginRight: 10,
        marginTop: 2,
        marginBottom: 2, 
        borderRadius: 5, 
        elevation: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    TOSelected: {
        // backgroundColor: 'black'
    },
    TOBasic: {
        elevation: 1,
        justifyContent: 'space-between',
        alignItems:'center',
        // backgroundColor: 'white',
        flexDirection: 'column',
        width: 'auto', 
        height: 50, 
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5, 
        borderRadius: 5
    },
    TextUnselected: {
        fontWeight: 'bold',
        marginLeft: 10
    },
    TextSelected: {
        fontWeight: 'bold',
        marginLeft: 10,
        color: 'white'
    }
})