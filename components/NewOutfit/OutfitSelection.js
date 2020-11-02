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
import { useSelector, useDispatch } from 'react-redux'
import { 
    outfitInProgressItemAdded,
    outfitInProgressItemDeleted
 } from '../../redux/reducers/outfitsSlice'
import { TopNavScreenHeader } from '../GlobalComponents/TopNav'
import { ScreenHeader } from '../GlobalComponents/ScreenHeader'
import { PlusButton } from './PlusButton'
import GlobalStyles from '../GlobalComponents/GlobalStyles'
import { PlusIcon, XIcon } from '../GlobalComponents/GlobalIcons'
import { outfitInProgressCleansed } from '../../redux/reducers/outfitsSlice'


var TopsArray = [];


const ClothingAddedIcon = (props) => {

    const item = props.item;

   

    let src = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' }
    

    const dispatch = useDispatch();
    const deleteSelf = () => {
        dispatch(outfitInProgressItemDeleted({...item}));
    }

    return (
        <View style={{
            height: 150,
            width: '100%',
            marginTop: 5,
            marginBottom: 5
        }}>
            <View style={[{
                width: 'auto',
                marginLeft: 10,
                marginRight: 10,
                marginTop: 5,
                marginBottom: 5,
                height: 'auto',
                backgroundColor: 'white',
                borderRadius: 10
            }, GlobalStyles.shadowLight]}>
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
                            <View style={[{
                                    height: 110, //why the fuck does this happen. why does this shit not align. fuck this
                                    aspectRatio: 1,
                                    borderRadius: 10,
                                    marginLeft: 10,
                                    marginBottom: 10,
                                    borderRadius: 10,
                                }, GlobalStyles.shadowLight]}> 
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
                                    <Text category='h4' 
                                    style={[{fontWeight: 'bold', marginLeft: 15, flexShrink: 1}, GlobalStyles.h4]}
                                    >{item.clothingName}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    flexShrink: 1
                                }}>
                                    <Text category='h5' appearance='hint' 
                                    style={[{fontWeight: 'bold', marginLeft: 15, marginTop: -5, flexShrink: 1}, 
                                    GlobalStyles.h5, GlobalStyles.hint]}
                                    >{item.brandName[0]}</Text>
                                </View>
                                
                            </View>
                            
                        </View>
                        <View style={{width: '15%', justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity
                            onPress={() => deleteSelf()}
                            >
                                <XIcon style={[{marginRight: 15, marginLeft: 5}, GlobalStyles.colorMain]} size={30} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            
        </View>
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
                  outputRange: [5, -60]  // Edit this to change absolute position of textinput
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
                position: 'relative',
            }}>
                <TouchableOpacity style={{width: 'auto', height: 'auto'}}
                            onPress={() => addToArray(item)}>
                <View style={[{
                    width: 'auto',
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 5,
                    marginBottom: 5,
                    height: 'auto',
                    backgroundColor: 'white',
                    borderRadius: 10
                }, GlobalStyles.shadowLight]}>
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
                            <Text category='h4' 
                            style={[{fontWeight: 'bold', marginLeft: 15}, GlobalStyles.h4]}>{item.clothingName}</Text>
                            
                                {/* <Icon  width='30' height='30' fill='black' name={'plus'}/> */}
                                <PlusIcon size={30} style={GlobalStyles.colorMain} style={{marginRight: 10}}/>
                            
                        </View>
                    </View>
                </View>
                </TouchableOpacity>
                
            </View>
        )
    }
    return (
        <View 
        style={{flex: 1, 
            backgroundColor: 'white'}}>
            <TopNavScreenHeader title={topNavTitle} 
            exitDestination={'HOMESCREEN'} 
            extraFunc={() => dispatch(outfitInProgressCleansed())}/>
            <View style={{position: 'relative'}}>
                {/* <ScreenHeader title={topNavTitle}/> */}
                <DropDownViewTest 
                style={{
                    width: '100%', 
                    height: 'auto', 
                    position: 'absolute', 
                    
                    zIndex: 0,
                }} 
                hookValue={modalVisible}>
                    <TestSearchInput searchInput={searchInput} setSearchInput={setSearchInput}/>
                </DropDownViewTest>
                <FadeInViewTestTwo 
                style={{
                    width: '100%', 
                    marginTop: 55
                    }} hookValue={modalVisible}>
                    <FlatList 
                        data={ClosetArray.filter(item => item.clothingName.toLowerCase().includes(searchInput.toLowerCase()))}
                        renderItem={renderItem}
                        />
                </FadeInViewTestTwo>
            </View>
            <View style={{
                height: 'auto',
                position: 'absolute',
                top: 60, //originally 115 // originally 90 (TopNavScreenHeader edit)
                bottom: 0
            }} //the below solves issue on IOS where the added clothing blocks touches
            pointerEvents={modalVisible ? 'none' : 'auto'}> 
                <FadeInViewTest 
                style={{
                    flex: 1,
                    width: '100%',
                    height: '100%'
                }}  //this is some FUCKY ASS CODE
                hookValue={modalVisible}>
                        <FlatList style={{maxHeight: '100%'}}
                            data={OutfitArray}
                            renderItem={(item) => (<ClothingAddedIcon {...item}/>)}/>
                </FadeInViewTest>
            </View>
            <PlusButton disabledHook={false} onPressFunc={() => setModalVisible(!modalVisible)}/>
        </View>
    )
}

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