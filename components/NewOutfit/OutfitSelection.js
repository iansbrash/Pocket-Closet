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
import { PlusIcon, XIcon, CheckIcon } from '../GlobalComponents/GlobalIcons'
import { outfitInProgressCleansed } from '../../redux/reducers/outfitsSlice'

import { ClosetSearch } from '../ClosetScreen/NewClosetScreen'
import { RenderSingleLineClosetItem } from '../ClosetScreen/ClosetList'
import { ListEmptyComponent } from '../ClosetScreen/ListEmptyComponent'

const ClothingAddedIcon = (props) => {

    const item = props.item;

    let src;

    if (item.images.images.length !== 0){
        src = {uri: item.images.images[0]}
    } else {
        src = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' }
    }
    

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
    const [fadeAnim] = useState(useRef(new Animated.Value(!props.hookValue ? 1 : 0)).current)

    useEffect(() => {
        Animated.timing(
            fadeAnim, {
                toValue: props.hookValue ? 0 : 1,
                duration: 250,
                useNativeDriver: false
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
    const [fadeAnim] = useState(useRef(new Animated.Value(!props.hookValue ? 1 : 0)).current)

    useEffect(() => {
        Animated.timing(
            fadeAnim, {
                toValue: props.hookValue ? 0 : 1,
                duration: 250,
                useNativeDriver: false
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
    const [fadeAnim] = useState(useRef(new Animated.Value(!props.hookValue ? 0 : 1)).current)

    useEffect(() => {
        Animated.timing(
            fadeAnim, {
                toValue: props.hookValue ? 1 : 0,
                duration: 250,
                useNativeDriver: false
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
    const [modalVisible, setModalVisible] = useState(true);
    const { topNavTitle , arrayName} = route.params;
    const OutfitArray = useSelector(state => state.outfits.outfitInProgress.outfitArr[arrayName])

    console.log(`arrayName: ${arrayName}`)
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
                    borderRadius: 10,
                }, GlobalStyles.shadowLight]}>
                    <View style={{
                        height: '100%',
                        width: '100%',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                    >
                        <View style={{
                            height: 10,
                            width: '100%',
                        }}>
                            <View 
                            style={[{
                                position: 'absolute',
                                top: 0,
                                width: '100%',
                                height: 20, 
                                borderTopLeftRadius: 10, 
                                borderTopRightRadius: 10, 
                            }, GlobalStyles.bgColorMain]}>
                            </View>
                        </View>
                        
                        <View style={{
                            height: 55,
                            width: '100%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                            zIndex: 1,
                            backgroundColor: 'white',
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10
                        }}>
                            <Text category='h4' 
                            numberOfLines={1}
                            style={[
                                {fontWeight: 'bold', 
                                marginLeft: 15,
                                maxWidth: 290}, GlobalStyles.h4]}>{item.clothingName}
                            </Text>
                            {
                                OutfitArray.includes(item) ?
                                    <CheckIcon size={30} style={GlobalStyles.colorMain} style={{marginRight: 10}}/> : 
                                    <PlusIcon size={30} style={GlobalStyles.colorMain} style={{marginRight: 10}}/>
                            }
                        </View>
                    </View>
                </View>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View 
        style={{
            flex: 1, 
            backgroundColor: 'white'
        }}>
            <TopNavScreenHeader title={topNavTitle} 
            exitDestination={'HOMESCREEN'} 
            extraFunc={() => dispatch(outfitInProgressCleansed())}/>
            <View style={{position: 'relative'}}>
                <DropDownViewTest 
                style={{
                    width: '100%', 
                    height: 'auto', 
                    position: 'absolute', 
                    zIndex: 0,
                }} 
                hookValue={modalVisible}>
                    <ClosetSearch searchInput={searchInput} setSearchInput={setSearchInput} notClosetSearch={true}/>
                </DropDownViewTest>
                <FadeInViewTestTwo 
                style={{
                    width: '100%', 
                    marginTop: 55
                }} 
                hookValue={modalVisible}>
                    <FlatList 
                        data={ClosetArray.filter(item => !item.archive).filter(item => item.clothingName.toLowerCase().includes(searchInput.toLowerCase()))}
                        keyExtractor={item => item._id.toString()}
                        renderItem={renderItem}
                        ListEmptyComponent={
                            <ListEmptyComponent text={`No ${topNavTitle}`}/>
                        }
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
                            //choose
                            // renderItem={(item) => (<ClothingAddedIcon {...item}/>)}
                            renderItem={(item) => (<RenderSingleLineClosetItem {...item}/>)}
                            
                            keyExtractor={item => item._id.toString()}
                            />
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