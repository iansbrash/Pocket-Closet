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
    FlatList } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native'
import { TopNavScreenHeader } from '../GlobalComponents/TopNav'
import { useSelector, useDispatch } from 'react-redux'
import { NextButton } from './NextButton'
import { ScreenHeader } from '../GlobalComponents/ScreenHeader'
import { clothingInProgressAttributeAdded } from '../../redux/reducers/closetSlice'
import { CheckIcon } from '../GlobalComponents/GlobalIcons'
import GlobalStyles from '../GlobalComponents/GlobalStyles'



const testBrandArray = [
    'Comme Des Garcons', 
    'Ader Error', 
    'Supreme',
    'Burberry',
    'Bape',
    'Undefeated',
    'Nike',
'XDDD']


const TestSearchInput = ({searchInput, setSearchInput}) => {
    
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
                alignItems: 'center'}}>
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

    // console.log(brandsArray)

    const dispatch = useDispatch();


    // this is an array of arrays. Keep that in mind.
    const brandsArray = useSelector(state => state.closet.brandsArray)

    
    const IndividualBrand = ({item}) => {
        // console.log(item);
        // console.log('selectedBrandsArray: ');
        // console.log(selectedBrandsArray);


        const [brandSelected, setSelected] = useState(false);
        const [toggle, setToggle] = useState(true);

        //we use the first nickname in the brand array
        item = item[0];

        if (!item.toLowerCase().includes(searchInput)){
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
                >
                    <View style={[{
                        borderTopLeftRadius: 5, borderTopRightRadius: 5, height: 5, width: '100%'
                    }, inSelectedBrands ? {backgroundColor: 'white'} :GlobalStyles.bgColorMain]}></View>
                    <View style={{
                        height: 45, 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        flexDirection: 'row', 
                        width: '100%'}}>
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
            <TopNavScreenHeader title={'Select Brands'} exitDestination={'CLOSETSCREEN'}/>
            
            <View style={{marginTop: 10, marginBottom: 10}}>
                <TestSearchInput searchInput={searchInput} setSearchInput={setSearchInput}/>
            </View>
            
            <FlatList 
                    style={{maxHeight: '100%', width: '100%'}}
                    data={brandsArray}
                    renderItem={item => <IndividualBrand {...item}/>}
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
        backgroundColor: 'black'
    },
    TOBasic: {
        elevation: 1,
        justifyContent: 'space-between',
        alignItems:'center',
        backgroundColor: 'white',
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