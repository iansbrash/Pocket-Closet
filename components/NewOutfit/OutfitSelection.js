import React, { useRef, useState, useEffect } from 'react'
import { 
    Image,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Animated,
    TextInput,
    FlatList,
    Text, } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'
import { outfitInProgressItemAdded } from '../../redux/reducers/outfitsSlice'
import { TopNav } from '../GlobalComponents/TopNav'
import { ScreenHeader } from '../GlobalComponents/ScreenHeader'
import { PlusButton } from './PlusButton'

var TopsArray = [];







const AddClothingButton = ({title, hookFunc}) => {

    return (
        <View style={{
            height: 150,
            width: '100%',
            marginTop: 5,
            marginBottom: 5
        }}>
            <View style={{
                width: 'auto',
                marginLeft: 10,
                marginRight: 10,
                marginTop: 5,
                marginBottom: 5,
                height: 'auto',
                backgroundColor: 'white',
                elevation: 10,
                borderRadius: 10
            }}>
                <TouchableOpacity style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
                onPress={() => hookFunc(true)}
                >
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
                        <Text category='h4' style={{fontWeight: 'bold', marginLeft: 15}}>{title}</Text>
                        {/* <Icon style={{marginRight: 15, marginLeft: 5}} width='30' height='30' fill='black' name={'plus'}/> */}
                        <Ionicons name="md-checkmark-circle" size={32} color="green" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const ClothingAddedIcon = ({item}) => {

    let src = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' }
    


    return (
        <View style={{
            height: 150,
            width: '100%',
            marginTop: 5,
            marginBottom: 5
        }}>
            <View style={{
                width: 'auto',
                marginLeft: 10,
                marginRight: 10,
                marginTop: 5,
                marginBottom: 5,
                height: 'auto',
                backgroundColor: 'white',
                elevation: 10,
                borderRadius: 10
            }}>
                <View style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <View 
                    style={{
                        height: 10, 
                        borderTopLeftRadius: 10, 
                        borderTopRightRadius: 10, 
                        backgroundColor: '#09122b',
                        width: '100%'}}></View>
                    <View style={{
                        height: 140,
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                        <View style={{
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            flexDirection: 'row',
                            height: '100%',
                            width: '85%'

                        }}>
                            <View style={{
                                    height: 110, //why the fuck does this happen. why does this shit not align. fuck this
                                    aspectRatio: 1,
                                    borderRadius: 10,
                                    marginLeft: 10,
                                    marginBottom: 10,
                                    borderRadius: 10,
                                    elevation: 10
                                }}> 
                                <Image source={src} style={{height: '100%', aspectRatio: 1, borderRadius: 10}} />
                            </View>
                            <View style={{
                                height: 110,
                                marginBottom: 10,
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                flexShrink: 1
                                
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    flexShrink: 1
                                }}>
                                    <Text category='h4' style={{fontWeight: 'bold', marginLeft: 15, flexShrink: 1}}>{item.clothingName}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    flexShrink: 1
                                }}>
                                    <Text category='h5' appearance='hint' style={{fontWeight: 'bold', marginLeft: 15, marginTop: -10, flexShrink: 1}}>{item.brandName[0]}</Text>
                                </View>
                                
                            </View>
                            
                        </View>
                        <View style={{width: '15%', justifyContent: 'center', alignItems: 'center'}}>
                            {/* <Icon style={{marginRight: 15, marginLeft: 5}} width='30' height='30' fill='black' name={'plus'}/> */}
                            <Ionicons name="md-checkmark-circle" size={32} color="green" />
                        </View>
                    </View>
                </View>
            </View>
            
        </View>
    )
}



const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current

    React.useEffect(() => {
        
        Animated.timing(
            fadeAnim, {
                toValue: props.hookFunc ? 0 : 1,
                duration: 300
            }
        ).start();

    },[props.hookFunc]) 

    return (
        <Animated.View                 // Special animatable View
          style={{
            ...props.style,
            opacity: fadeAnim,         // Bind opacity to animated value
          }}
        >
          {props.children}
        </Animated.View>
    );
}

const DropDownView = (props) => {
    const [dropAnim] = useState(useRef(new Animated.Value(props.hookValue ? 0: 100)).current)


    useEffect(() => {
        console.log(`New hook value: ${props.hookValue}`)
        Animated.timing(dropAnim, {
                toValue: props.hookValue ? 0: 100,
                duration: 500,
                useNativeDriver: true
            }
        )
    }, [props.hookValue])
    return (
        <Animated.View                 
          style={{
            ...props.style,
            position: 'absolute',
            top: dropAnim,         
          }}
        >
          {props.children}
        </Animated.View>
    )
}

const DropDownViewTest = (props) => {
    const [fadeAnim] = useState(useRef(new Animated.Value(props.hookValue ? 1 : 0)).current)

    useEffect(() => {
        Animated.timing(
            fadeAnim, {
                toValue: props.hookValue ? 0 : 1,
                duration: 250,
                useNativeDriver: true
            }
        ).start();
    }, [props.hookValue])
        

    return (
        <Animated.View                 // Special animatable View
          style={{
            ...props.style,
            transform: [{
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [60, 0]  // 0 : 150, 0.5 : 75, 1 : 0
                }),
              }]      // Bind opacity to animated value
          }}
        >
          {props.children}
        </Animated.View>
    );
}

const FadeInViewTest = (props) => {
    const [fadeAnim] = useState(useRef(new Animated.Value(props.hookValue ? 1 : 0)).current)

    useEffect(() => {
        Animated.timing(
            fadeAnim, {
                toValue: props.hookValue ? 0 : 1,
                duration: 250,
                useNativeDriver: true
            }
        ).start();
    }, [props.hookValue])
        

    return (
        <Animated.View                 // Special animatable View
        pointerEvents={props.hookValue ? 'none' : 'auto'}  
        style={{
            ...props.style,
            opacity: fadeAnim,  
            transform: [{
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [60, 0]  // 0 : 150, 0.5 : 75, 1 : 0
                }),
              }]        // Bind opacity to animated value
          }}
        >
          {props.children}
        </Animated.View>
    );
}

const FadeInViewTestTwo = (props) => {
    const [fadeAnim] = useState(useRef(new Animated.Value(props.hookValue ? 0 : 1)).current)

    useEffect(() => {
        Animated.timing(
            fadeAnim, {
                toValue: props.hookValue ? 1 : 0,
                duration: 250,
                useNativeDriver: true
            }
        ).start();
    }, [props.hookValue])
        

    return (
        <Animated.View                 // Special animatable View
            pointerEvents={props.hookValue ? 'auto' : 'none'}
          style={{
            ...props.style,
            opacity: fadeAnim,  
            transform: [{
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [60, 0]  // 0 : 150, 0.5 : 75, 1 : 0
                }),
              }]        // Bind opacity to animated value
          }}
        >
          {props.children}
        </Animated.View>
    );
}

export const OutfitSelection = ({ route, navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { topNavTitle , arrayName} = route.params;
    const OutfitArray = useSelector(state => state.outfits.outfitInProgress[arrayName])

    const ClosetArray = useSelector(state => state.closet.closetObject[arrayName])
    const [searchInput, setSearchInput] = useState('');

    console.log(ClosetArray)

    const dispatch = useDispatch();

    const addToArray = (item) => {

        console.log(`Item:`)
        console.log(item)

        //use arrayname as itemType in action dispatch

        dispatch(outfitInProgressItemAdded(item, arrayName));

        // TopsArray.push(item);
        setSearchInput('');
    }

    
    const renderItem = ({item}) => {
        return (
            <View style={{
                height: 75,
                width: '100%',
                marginTop: 5,
                marginBottom: 5,
                position: 'relative'
            }}>
                <TouchableOpacity style={{width: 'auto', height: 'auto'}}
                            onPress={() => addToArray(item)}>
                <View style={{
                    width: 'auto',
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 5,
                    marginBottom: 5,
                    height: 'auto',
                    backgroundColor: 'white',
                    elevation: 10,
                    borderRadius: 10
                }}>
                    <View style={{
                        height: '100%',
                        width: '100%',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                    >
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
                            <Text category='h4' style={{fontWeight: 'bold', marginLeft: 15}}>{item.clothingName}</Text>
                            
                                {/* <Icon  width='30' height='30' fill='black' name={'plus'}/> */}
                                <Ionicons name="md-checkmark-circle" size={32} color="green" />
                            
                        </View>
                    </View>
                </View>
                </TouchableOpacity>
                
            </View>
        )
    }

    return (
        <View 
        style={{flex: 1}}>
            <TopNav title={topNavTitle} exitDestination={'HOMESCREEN'}/>
            <View style={{position: 'relative', }}>
                <ScreenHeader title={topNavTitle}/>
                <DropDownViewTest 
                style={{
                    width: '100%', 
                    height: 'auto', 
                    position: 'absolute', 
                    zIndex: 0,
                }} 
                hookValue={modalVisible}>
                    <View style={{
                        margin: 10,
                        width: 'auto',
                        height: 45,
                        borderRadius: 5,
                        elevation: 10,
                        backgroundColor: 'white'
                    }}>
                        <View style={{
                            width: '100%',
                            backgroundColor: '#09122b',
                            height: 5,
                            borderTopRightRadius: 5,
                            borderTopLeftRadius: 5,
                        }}></View>
                        <TextInput 
                            placeholder={`Search clothing!`}
                            style={{ 
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 40, 
                                width: '100%',
                                borderColor: '#09122b', 
                                borderBottomRightRadius: 5,
                                borderBottomLeftRadius: 5,
                                borderWidth: 1,
                                fontWeight: 'bold',
                                fontSize: 15,
                            }}
                            // inlineImageLeft='search40x40'
                            //inlineImagePadding={5} // might have to be in curly braces?
                            selectTextOnFocus={true}
                            placeholderTextColor='#192442' //random ass color
                            onChangeText={text => setSearchInput(text)}
                            value={searchInput}
                        />
                    </View>
                </DropDownViewTest>
                <FadeInViewTestTwo 
                style={{
                    width: '100%', 
                    marginTop: 55
                    }} hookValue={modalVisible}>
                    <FlatList 
                        data={ClosetArray.filter(item => item.clothingName.includes(searchInput))}
                        renderItem={renderItem}
                        />
                </FadeInViewTestTwo>
            </View>
            <View style={{
                height: 'auto',
                position: 'absolute',
                top: 115,
                bottom: 0
            }}>
                <FadeInViewTest 
                style={{
                    flex: 1,
                    width: '100%',
                    height: '100%'
                }}  //this is some FUCKY ASS CODE
                hookValue={modalVisible}>
                        <FlatList style={{maxHeight: '100%'}}
                            data={OutfitArray}
                            renderItem={ClothingAddedIcon}/>
                </FadeInViewTest>
            </View>
            
            <PlusButton disabledHook={false} onPressFunc={() => setModalVisible(!modalVisible)}/>
        </View>
    )
}


const styles = StyleSheet.create({
    barActive: {
        height: 10, 
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10, 
        backgroundColor: '#09122b',
        width: '100%'
    },
    barInactive: {
        backgroundColor: '#6c7280',
        height: 10, 
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10, 
        width: '100%'
    },
    textActive: {
        fontWeight: 'bold',
        color: '#09122b'
    }, textInactive: {
        fontWeight: 'bold',
        color: '#b7bcc7'
    }
})