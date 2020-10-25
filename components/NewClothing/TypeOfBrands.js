import React, {useState, useEffect} from 'react'
import { TouchableOpacity, ScrollView, StyleSheet, View, Image, Text, TextInput } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native'
import { TopNav } from '../GlobalComponents/TopNav'
import { useSelector, useDispatch } from 'react-redux'
import { NextButton } from './NextButton'
import { ScreenHeader } from '../GlobalComponents/ScreenHeader'
import { clothingInProgressAttributeAdded } from '../../redux/reducers/closetSlice'
import { Ionicons } from '@expo/vector-icons';



const testBrandArray = [
    'Comme Des Garcons', 
    'Ader Error', 
    'Supreme',
    'Burberry',
    'Bape',
    'Undefeated',
    'Nike',
'XDDD']




export const TypeOfBrands = () => {

    const [searchInput, setSearchInput] = useState('');
    
    const [ brandsArrayState, setBrandsArrayState] = useState(brandsArray)

    // this shoudl be an array of arrays...?
    const [selectedBrandsArray, setSelectedBrandsArray] = useState([]);
    const navigation = useNavigation();

    console.log(brandsArray)

    const dispatch = useDispatch();


    // this is an array of arrays. Keep that in mind.
    const brandsArray = useSelector(state => state.closet.brandsArray)


    const renderBrandStrip = ({item}) => {
        console.log(item);
        console.log('selectedBrandsArray: ');
        console.log(selectedBrandsArray);

        //we use the first nickname in the brand array
        item = item[0];

        if (!item.toLowerCase().includes(searchInput)){
            return <View></View>
        }
        return (
            <TouchableOpacity 
            onPress={() =>  !selectedBrandsArray.find(searchItem => searchItem.toLowerCase() === item.toLowerCase()) ? setSelectedBrandsArray([...selectedBrandsArray, item]) 
                : setSelectedBrandsArray(selectedBrandsArray.filter(searchItem => searchItem.toLowerCase() !== item.toLowerCase()))}
            style={selectedBrandsArray.find(searchItem => searchItem.toLowerCase() === item.toLowerCase()) ? [styles.TOBasic, styles.TOSelected] : styles.TOBasic}>
                    <Text category='h5' status='basic' 
                    style={selectedBrandsArray.find(searchItem => searchItem.toLowerCase() === item.toLowerCase()) ? 
                        styles.TextSelected : styles.TextUnselected}>
                        {item}
                    </Text>
                    <Ionicons name="md-checkmark-circle" size={32} color="green" />
                    {/* <Icon style={{marginRight: 5, marginLeft: 5}} width='30' height='30' fill='white' name='checkmark-outline'/> */}
            </TouchableOpacity>
        )
    }

    

    return (
        <View style={{flex: 1}}>
            <TopNav title={'Select Brands'} exitDestination={'CLOSETSCREEN'}/>
            <View>
                <ScreenHeader title={'Select Brands'}/>
                {/* <Divider /> */}
                <TextInput
                    style={{
                        borderRadius: 5,
                        margin: 15,
                        width: 'auto'
                    }}
                    value={searchInput}
                    placeholder='Search brands'
                    onChangeText={nextValue => setSearchInput(nextValue.toLowerCase())}
                    status='basic'
                    textStyle={{fontWeight: 'bold'}}
                    >
                </TextInput>
            </View>
            <Text>RIP BRAND STRIP</Text>
            {/* <List 
                    style={{maxHeight: '100%', width: '100%'}}
                    data={brandsArray}
                    renderItem={renderBrandStrip} />  */}
            
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
        flexDirection: 'row',
        width: 'auto', 
        height: 40, 
        marginLeft: 10,
        marginRight: 10,
        marginTop: 2,
        marginBottom: 2, 
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