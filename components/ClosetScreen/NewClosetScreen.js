import React, { useState, useRef, useEffect } from 'react'
import { 
    TouchableHighlight,
    StyleSheet,
    View,
    TextInput,
    Animated,
    Text,
    Pressable
  } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GlobalStyles from '../GlobalComponents/GlobalStyles'
import { PlusIcon } from '../GlobalComponents/GlobalIcons'
import { OutfitList } from './OutfitList'
import { ClosetList } from './ClosetList'
import { useSelector } from 'react-redux'



const ClosetOutfitsToggle = ({closetIsActive, setClosetIsActive }) => {
    return (
        <View style={{
            width: '100%', 
            height: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',}}>
            <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() => setClosetIsActive(true)}
                style={{
                    width: '50%',
                    height: 40,
                    justifyContent: 'center',
                }}>
                <View style={{
                    width: '100%', 
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                        <View style={styles.JACenter}>
                            <Text category='h6' style={closetIsActive ? styles.activeTab : styles.inactiveTab}>Closet</Text>
                        </View>
                        
                        {/* <Icon fill="#00c3ff" height='30' width='30' name="book-open-outline"/> */}
                        <View style={closetIsActive ? styles.activeBar : styles.inactiveBar}>
                        </View>
                </View>
            </TouchableHighlight>
            <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() => setClosetIsActive(false)}
                style={{
                    width: '50%',
                    height: 40,
                    justifyContent: 'center',
                }}>
                <View style={{
                    width: '100%', 
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                        <View style={styles.JACenter}>
                            <Text category='h6' style={!closetIsActive ? styles.activeTab : styles.inactiveTab}>Outfits</Text>
                        </View>
                        <View style={!closetIsActive ? styles.activeBar : styles.inactiveBar}>
                        </View>
                </View>
            </TouchableHighlight>
        </View>
    )
}

const ClosetSearch = ({searchInput, setSearchInput}) => {

    const navigation = useNavigation();
    const [inputLength] = useState(new Animated.Value(1))
    const searchInputRef = useRef(null);


    const onBlur = () => {
        Animated.timing(inputLength, {
            toValue: 1,
            duration: 250,
            useNativeDriver: false
        }).start();
    }

    const onFocus = () => {
        Animated.timing(inputLength, {
            toValue: 0,
            duration: 250,
            useNativeDriver: false
        }).start();
    }

    return (
        // <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "position"}>
            <View style={{
            height: 50,
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
        }}>
            <View style={{
                margin: 10,
                height: 'auto',
                width: 'auto'
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
                            onPress={() => navigation.navigate('NEWCLOTHING')}
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
            </View>
    )
}


export const NewClosetScreen = () => {

    let src = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' }

    const outfitsArray = useSelector(state => state.outfits.outfitsArray);

    const [searchInput, setSearchInput] = useState('')

    /** All of these hooks are for the filters modal */
    const [modalVisible, setModalVisible] = useState(false);
    const [heartToggleChecked, setHeartToggleChecked] = useState(false)
    // const [wornSelectedIndex, setWornSelectedIndex] = useState(new IndexPath(0))
    // const [typeSelectedIndex, setTypeSelectedIndex] = useState(new IndexPath(0));
    // const [colorSelectedIndex, setColorSelectedIndex] = useState(new IndexPath(0));
    const [filtersEnabled, setFiltersEnabled] = useState(false);
    const [closetIsActive, setClosetIsActive] = useState(true);

    // Lets our <Select> in filters display the name of the option, not the index
    // We need to eventually fetch this data from our redux store so we don't
    // Have to manually program the values into these arrays / options
    // This is indeed a little buggy lol
    const wornSelectData = ['Recently', 'Not Recently', 'Never']
    const typeSelectData = ['Bottoms', 'Tops', 'Footwear', 'Other']
    const colorSelectData= ['Red', 'Green', 'Blue', 'Multi']
    // const wornDisplayValue = wornSelectData[wornSelectedIndex.row];
    // const typeDisplayValue = typeSelectData[typeSelectedIndex.row];
    // const colorDisplayValue = colorSelectData[colorSelectedIndex.row];

    const navigation = useNavigation();

    const resetFilters = () => {

        setFiltersEnabled(false);

        // Reset favorites
        setHeartToggleChecked(false);

        // //Reset worn params
        // setWornSelectedIndex(0);

        // //Reset type params
        // setTypeSelectedIndex(0);

        // //Reset colors params
        // setColorSelectedIndex(0)
    }

    const heartClicked = () => {
        setFiltersEnabled(true);
        setHeartToggleChecked(!heartToggleChecked);
    }

    const outfitListOnClick = (outfitObject) => {
        navigation.navigate("VIEWINDIVIDUALOUTFIT", {item: outfitObject})
    }


    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'white'
        }}>
            
            <View 
            status='primary'
            style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                paddingTop: 10
            }}>
                <View 
                style={{
                    height: 'auto',
                    width: '100%',
                    borderRadius: 10,
                }}>
                    <ClosetSearch searchInput={searchInput} setSearchInput={setSearchInput}/>
                    {/** This is going to be the clothing/outfits toggle */}
                    <View style={{height: 10}}></View>
                    <ClosetOutfitsToggle closetIsActive={closetIsActive} setClosetIsActive={setClosetIsActive} />
                </View>
                <View style={{flex: 1}}>
                    <View 
                            style={{
                                height: '100%', }}>
                            {closetIsActive ? <ClosetList  //can change between ClosetListOneCol and TwoCol
                                        searchInput={searchInput}
                                        filtersEnabled={filtersEnabled}
                                        heartToggleChecked={heartToggleChecked}/>
                                    : <OutfitList 
                                        outfitsArray={outfitsArray}
                                        onClickFunc={outfitListOnClick}/>
                                }
                                {/* <ShittyModal /> currently doesnt work we need to rework */}
                        </View>
                </View>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    activeTab: {
        color: '#09122b', //#0daaff
        fontWeight: 'bold',
        width: '100%',
        height: '90%',
        paddingTop: 5,
    },
    inactiveTab: {
        color: '#c9c9c9',
        width: '100%',
        height: '90%',
        paddingTop: 5,
    },
    JACenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeBar: {
        width: '100%', 
        height: '10%',
        backgroundColor: '#09122b' //#0daaff
    },
    inactiveBar: {
        width: '100%', 
        height: '10%',
    }
})