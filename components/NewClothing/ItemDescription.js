import React, {useState, useEffect} from 'react'
import { 
    TouchableOpacity, 
    ScrollView, 
    StyleSheet,
    TextInput,
    Text, } from 'react-native'
import { View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TopNav } from '../GlobalComponents/TopNav'
import { useSelector } from 'react-redux'
import { NextButton } from './NextButton'
import { ScreenHeader } from '../GlobalComponents/ScreenHeader'
import { useDispatch } from 'react-redux' 
import { clothingInProgressAttributeAdded } from '../../redux/reducers/closetSlice'

const IndividualTag = ({title, deleteFunc}) => {
    return (
        <View style={{
            width: 'auto',
            height: 30,
            margin: 5,
            borderRadius: 5,
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'black',
            flexDirection: 'row',
            elevation: 5
        }}>
            <Text category='h5' status='control' style={{
                margin: 10
            }}>
                {title}
            </Text>
            <TouchableOpacity
            onPress={() => deleteFunc(title)}
            style={{height: 25, width: 25, justifyContent: 'center', alignItems: 'center'}}>
            {/* <Icon 
                style={{marginRight: 5, marginLeft: -10}} 
                width='20' height='20' fill='white' name='close-outline'/> */}
                 <Ionicons name="md-checkmark-circle" size={32} color="green" />
            </TouchableOpacity>
        </View>
    )
}

const DescriptionComponent = ({title, placeholder, hookValue, hookFunc}) => {

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: 30

        }}>
            <Text category='h5'   style={{
                width: 'auto',
                marginRight: -7,
                fontWeight: 'bold'

            }}>{title}: </Text>
            <View style={{
                width: 'auto',
                marginTop: -4,
                justifyContent: 'center',
                justifyContent: 'center'
            }}>
                <TextInput style={{
                    borderColor: 'white',
                    backgroundColor: 'white',
                    width: '100%',
                    height: '100%',
                }}
                value={hookValue}
                onChangeText={nextValue => hookFunc(nextValue)}
                textStyle={{marginLeft: -7}}
                placeholder={placeholder} />
            </View>
        </View>
    )
}


export const ItemDescription = () => {


    const [tagsInput, setTagsInput] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [colorInput, setColorInput] = useState('');
    const [priceInput, setPriceInput] = useState('');
    const [tagsArray, setTagsArray] = useState(['item']);

    const dispatch = useDispatch();


    const navigation = useNavigation();

    const deleteTag = (title) => {
        console.log(`Trying to delete ${title} from the state`)
        setTagsArray(tagsArray.filter(item => item !== title));
    }


    const tagsChange = newValue => {
        // end of tag detected
        if (newValue[newValue.length - 1] === ','){
            console.log("Found a fuckin comma")
            let tagNameToAdd = newValue.substring(0, newValue.length - 1);
            setTagsArray([...tagsArray, tagNameToAdd]);
            console.log(tagsArray);
            setTagsInput('');
        } else {
            setTagsInput(newValue);
        }
    }

    return (
        <View style={{flex: 1}}>
            <TopNav title={'Enter Description'} exitDestination={'CLOSETSCREEN'}/>
            <ScrollView style={{marginBottom: 10}}>
                <ScreenHeader title={'Enter Description'}/>
                {/* <Divider /> */}
                <View style={{
                    flex: 1,
                    margin: 10,
                }}>
                    <DescriptionComponent 
                        title={'Name'} 
                        placeholder={'SS17 Tie-Dye Shirt'}
                        hookFunc={setNameInput}
                        hookVaue={nameInput}/>
                    {/* <Divider style={{margin: 5}}/> */}



                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        height: 60

                    }}>
                        <Text category='h5'   style={{
                            width: 'auto',
                            marginRight: -7,
                            fontWeight: 'bold'

                        }}>
                            {'Description'}: 
                        </Text>
                        <View style={{
                            width: 'auto',
                            marginTop: -4,
                            justifyContent: 'center',
                        }}>
                            <TextInput style={{
                                borderColor: 'white',
                                backgroundColor: 'white',
                                width: '100%',
                                height: '100%',
                            }}
                            value={descriptionInput}
                            onChangeText={nextValue => setDescriptionInput(nextValue)}
                            textStyle={{marginLeft: -12}}
                            placeholder={'Bought on Grailed 11/17/2019'} />
                        </View>
                    </View>



                    {/* <Divider style={{margin: 5}}/> */}

                    <DescriptionComponent 
                        title={'Color'} 
                        placeholder={'Multi (make this a selection)'}
                        hookFunc={setColorInput}
                        hookVaue={colorInput}/>
                    {/* <Divider style={{margin: 5}}/> */}
                    <DescriptionComponent 
                        title={'Price'} 
                        placeholder={'$79'}
                        hookFunc={setPriceInput}
                        hookVaue={priceInput}/>

                    {/* <Divider style={{margin: 5}}/> */}

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        height: 30

                    }}>
                        <Text category='h5'   style={{
                            width: 'auto',
                            marginRight: -7,
                            fontWeight: 'bold'

                        }}>Tags: </Text>
                        <View style={{
                            width: 'auto',
                            marginTop: -4,
                            justifyContent: 'center',
                            justifyContent: 'center'
                        }}>
                            <TextInput style={{
                                borderColor: 'white',
                                backgroundColor: 'white',
                                width: '100%',
                                height: '100%',
                            }}
                            value={tagsInput}
                            onChangeText={nextValue => tagsChange(nextValue)}
                            textStyle={{marginLeft: -7}}
                            placeholder={'Seperate tags with a comma'} />
                        </View>
                    </View>

                    {/* <Divider style={{margin: 5}}/> */}

                    {/** Tags */}
                    <View style={{
                        width: '100%',
                        height: 'auto',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        {tagsArray.map((item, index) => (
                            <IndividualTag title={item} deleteFunc={deleteTag}/>
                        ))}
                    </View>

                </View>
                
            </ScrollView>
            <NextButton navpath={"UPLOADIMAGE"} 
            disabledHook={nameInput === ''} 
            extraFunc={dispatch(clothingInProgressAttributeAdded({
                clothingName: nameInput,
                color: colorInput,
                description: descriptionInput,
                price: priceInput,
                tags: tagsArray
            }))}/> 
        </View>
    )
}