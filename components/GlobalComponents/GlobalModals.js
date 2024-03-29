import React, {useState, useEffect} from 'react'
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Animated,
    ScrollView,
    Image,
} from 'react-native'
import GlobalStyles from './GlobalStyles'
import { CheckIcon, XIcon } from './GlobalIcons'
import { BlurView } from 'expo-blur';
import {makeHugeImage, makeLargeImage} from '../GlobalFunctions/ImgurResize'
import { useSelector } from 'react-redux'

export const YesNoModal = ({setModalVisible, modalVisible, onPressFunc, title}) => {

    const [viewBlur] = useState(new Animated.Value(0))

    const onShow = () => {
        Animated.timing(viewBlur, {
            toValue: .95,
            duration: 250,
            useNativeDriver: true
        }).start();
    }

    const onDismiss = () => {
        Animated.timing(viewBlur, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true
        }).start();
    }

    useEffect(() => {
        if (modalVisible){
            onShow()
        } else {
            onDismiss()
        }
    },[modalVisible])

    return (
        <Animated.View style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: viewBlur,
            zIndex: 2
        }}
        pointerEvents={'none'}>
        <BlurView 
        intensity={100} style={{
            height: '100%',
            width: '100%'
        }}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
          <View style={{
              flex: 1,
              justifyContent: 'center', alignItems: 'center'}}>
                  <View style={[{
                      justifyContent: 'center', 
                      alignItems: 'center',
                      flexDirection: 'column',
                      width: '75%',
                      height: 'auto',
                      borderRadius: 10,

                  }, GlobalStyles.shadowLight]}>
                        {/* The Bar */}
                        <View style={{
                            height: 10,
                            width: '100%'
                        }}>
                        <View 
                            style={[{
                                position: 'absolute',
                                zIndex: 0,
                                height: 20, 
                                borderTopLeftRadius: 10, 
                                borderTopRightRadius: 10,
                                width: '100%'
                            }, GlobalStyles.bgColorMain]}></View>
                        </View>
                        <View style={[
                      {
                          height: 'auto', 
                          width: '100%',
                          backgroundColor: 'white',
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          alignItems: 'center'}]}>
                              <View style={{
                                  justifyContent: 'center',alignItems: 'flex-start',
                              }}>
                                <Text style={[GlobalStyles.h5, GlobalStyles.colorMain,
                                    {fontWeight: 'bold', margin: 15}]}>
                                    {title ? title : 'Are you sure?'}
                                </Text>
                              </View>
                              
                              <View style={{
                                    width: '100%',
                                    justifyContent: 'space-between',
                                    alignItems: 'center', 
                                    flexDirection: 'row',
                                }}>
                                    <View style={{width: '50%'}}>
                                        <TouchableOpacity style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                        }}
                                        onPress={() => setModalVisible(false)}>
                                            <XIcon size={40} style={GlobalStyles.colorMain}/>
                                    </TouchableOpacity>
                                    </View>
                                    <View style={{width: '50%'}}>
                                        <TouchableOpacity style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                        }}
                                        onPress={() => onPressFunc()}>
                                            <CheckIcon size={40} style={GlobalStyles.colorMain}/>
                                    </TouchableOpacity>
                                    </View>
                              </View>
                        
                  </View>
                  </View>
          </View>
      </Modal>
      </BlurView>
      </Animated.View>
    )
}

export const TextInputModal = ({setModalVisible, modalVisible, onPressFunc, title, searchInput, setSearchInput}) => {

    const [viewBlur] = useState(new Animated.Value(0))

    const onShow = () => {
        Animated.timing(viewBlur, {
            toValue: .95,
            duration: 250,
            useNativeDriver: true
        }).start();
    }

    const onDismiss = () => {
        Animated.timing(viewBlur, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true
        }).start();
    }

    useEffect(() => {
        if (modalVisible){
            onShow()
        } else {
            onDismiss()
        }
    },[modalVisible])



    return (
        <Animated.View style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: viewBlur,
            zIndex: 2
        }}
        pointerEvents={'none'}>
        <BlurView 
        intensity={100} style={{
            height: '100%',
            width: '100%'
        }}>

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
        // onShow={() => onShow()}
        // onDismiss={() => onDismiss()}
        >
          <View style={{
              top: 300,
              justifyContent: 'center', alignItems: 'center'}}>
                  <View style={[{
                      justifyContent: 'center', 
                      alignItems: 'center',
                      flexDirection: 'column',
                      width: '75%',
                      height: 'auto',
                      borderRadius: 10,

                  }, GlobalStyles.shadowLight]}>
                      {/* The Bar */}
                      <View style={{
                          height: 10,
                          width: '100%'
                      }}>
                        <View 
                            style={[{
                                position: 'absolute',
                                zIndex: 0,
                                height: 20, 
                                borderTopLeftRadius: 10, 
                                borderTopRightRadius: 10,
                                width: '100%'
                            }, GlobalStyles.bgColorMain]}></View>
                      </View>
                        
                        <View style={[
                      {
                          height: 'auto', 
                          width: '100%',
                          backgroundColor: 'white',
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          alignItems: 'center'}]}>
                              <View style={{
                                  justifyContent: 'center',alignItems: 'flex-start',
                              }}>
                                {/* <Text style={[GlobalStyles.h5, GlobalStyles.colorMain,
                                    {fontWeight: 'bold', margin: 15}]}>
                                    {title}
                                </Text> */}
                              </View>
                              <View style={{
                                  width: '100%'
                              }}>
                                  <View style={{
                                      width: 'auto',
                                      margin: 10
                                  }}>
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
                                        // ref={searchInputRef}
                                        placeholder={title}
                                        // onFocus={() => onFocus()}
                                        // onBlur={() => onBlur()}
                                        // inlineImageLeft='search40x40'
                                        //inlineImagePadding={5} // might have to be in curly braces?
                                        selectTextOnFocus={true}
                                        placeholderTextColor="#9e9e9e"  //random ass color
                                        onChangeText={text => setSearchInput(text)}
                                        value={searchInput}
                                        />
                                  </View>
                              </View>
                              
                              <View style={{
                                    width: '100%',
                                    justifyContent: 'space-between',
                                    alignItems: 'center', 
                                    flexDirection: 'row',
                                }}>
                                    <View style={{width: '50%'}}>
                                        <TouchableOpacity style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                        }}
                                        onPress={() => setModalVisible(false)}>
                                            <XIcon size={40} style={GlobalStyles.colorMain}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{width: '50%'}}>
                                        <TouchableOpacity style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                        }}
                                        onPress={() => onPressFunc()}>
                                            <CheckIcon size={40} style={GlobalStyles.colorMain}/>
                                    </TouchableOpacity>
                                    </View>
                              </View>
                        
                  </View>
                  </View>
          </View>
      </Modal>
      </BlurView>
      </Animated.View>
    )
}

export const ImageScrollModal = ({setModalVisible, modalVisible, imageArray, imageType}) => {
    const [viewBlur] = useState(new Animated.Value(0))

    const onShow = () => {
        Animated.timing(viewBlur, {
            toValue: .95,
            duration: 250,
            useNativeDriver: true
        }).start();
    }

    const onDismiss = () => {
        Animated.timing(viewBlur, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true
        }).start();
    }

    useEffect(() => {
        if (modalVisible){
            onShow()
        } else {
            onDismiss()
        }
    },[modalVisible])

    return (
        <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
            Alert.alert("Modal has been closed.");
        }}
        >
          <View style={{
              flex: 1,
              backgroundColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',}}>
                  
                    <View style={{
                        position: 'absolute',
                        top: 40,
                        left: 0,
                        right: 0,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                        <TouchableOpacity style={{
                            marginLeft: 10
                        }}>
                            {/* <XIcon size={40} style={{backgroundColor: 'white'}}/> */}
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            marginRight: 10
                        }}
                        onPress={() => setModalVisible(false)}>
                            <XIcon size={40} style={{color: 'white'}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width: '100%',
                        marginTop: 75
                    }}>
                        <ScrollView
                        contentContainerStyle={{
                            width: `${imageArray.length * 100}%`,
                            height: 'auto'
                        }}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        decelerationRate="fast"
                        pagingEnabled
                        >
                            {imageArray.map((imageUrl, index) => (
                                <View style={{
                                    width: `${100/imageArray.length}%`,
                                    height: '90%'
                                }}
                                key={index}>
                                    <Image 
                                    source={{uri: imageType === 'imgur' ? makeHugeImage(imageUrl) : imageUrl}} 
                                    resizeMode={'contain'} //this is exactly what i needed
                                    style={{
                                        width: `100%`,
                                        height: '100%'
                                    }}/>
                                </View>
                                
                            ))}
                        </ScrollView>
                    </View>
                    
          </View>
      </Modal>
    )
}


export const DescriptionModal = ({setModalVisible, modalVisible, children}) => {

    const [viewBlur] = useState(new Animated.Value(0))

    const onShow = () => {
        Animated.timing(viewBlur, {
            toValue: .95,
            duration: 250,
            useNativeDriver: true
        }).start();
    }

    const onDismiss = () => {
        Animated.timing(viewBlur, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true
        }).start();
    }

    useEffect(() => {
        if (modalVisible){
            onShow()
        } else {
            onDismiss()
        }
    },[modalVisible])

    return (
        <Animated.View style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: viewBlur,
            zIndex: 2
        }}
        pointerEvents={'none'}>
        <BlurView 
        intensity={100} style={{
            height: '100%',
            width: '100%'
        }}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
          <View style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center', alignItems: 'center'}}>
                  <View style={[{
                      justifyContent: 'center', 
                      alignItems: 'center',
                      flexDirection: 'column',
                      width: '75%',
                      height: 'auto',
                      borderRadius: 10,

                  }, GlobalStyles.shadowLight]}>
                          <View 
                          style={[{
                            height: 10, 
                            borderTopLeftRadius: 10, 
                            borderTopRightRadius: 10,
                            width: '100%'
                        }, GlobalStyles.bgColorMain]}></View>
                        <View style={[
                      {
                          height: 'auto', 
                          width: '100%',
                          backgroundColor: 'white',
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          alignItems: 'center'}]}>
                              <View style={{
                                  justifyContent: 'center',alignItems: 'flex-start',
                              }}>
                                {children}
                              </View>
                              
                              <View style={{
                                    width: '100%',
                                    justifyContent: 'space-between',
                                    alignItems: 'center', 
                                    flexDirection: 'row',
                                }}>
                                    <View style={{width: '100%'}}>
                                        <TouchableOpacity style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                        }}
                                        onPress={() => setModalVisible(false)}>
                                            <CheckIcon size={40} style={GlobalStyles.colorMain}/>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </BlurView>
        </Animated.View>
    )
}

export const TypeSelectionModal = ({
    setModalVisible, modalVisible, onPressFunc, 
    title, typesArray, setSelectablesObject, 
    selectedType, selectablesObject}) => {

    const [viewBlur] = useState(new Animated.Value(0))

    const SingleType = React.memo((type) => {


        const [isSelected, setIsSelected] = useState(false)

        // const typesOfClothingWorn = useSelector(state => state.closet.typesOfClothingWorn) 


        const isDisabled = useSelector(state => !state.closet.typesOfClothingWorn[selectedType][type.type])


        const onPress = () => {
            selectablesObject[selectedType].includes(type.type) ?
                setSelectablesObject({
                    ...selectablesObject, 
                    [selectedType]: 
                        selectablesObject[selectedType].filter(ty => ty !== type.type)}) 
                : 
                setSelectablesObject({...selectablesObject, 
                    [selectedType]: 
                        [...selectablesObject[selectedType], type.type]})
            setIsSelected(true)
            console.log(`isSelected: ${isSelected}`)
        }


        return (
            <View style={{
                width: '80%'
            }}>
                <TouchableOpacity
                onPress={() => onPress()}
                disabled={isDisabled}
                >
                    <View style={{
                        margin: 5,
                        width: 'auto'
                    }}>
                        <View style={[{
                            width: '100%',
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }, isDisabled ? null : GlobalStyles.shadowLight,
                        selectablesObject[selectedType].includes(type.type) ? GlobalStyles.bgColorMain : {backgroundColor: 'white'},
                    ]}>
                            <Text style={[
                                GlobalStyles.h4,
                                isDisabled ? GlobalStyles.lighterHint : (selectablesObject[selectedType].includes(type.type) ? {color: 'white'} : GlobalStyles.colorMain),
                                isDisabled ? null : {fontWeight: 'bold'},
                                {margin: 5}
                            ]}>
                                {/* Why the hell i have to do this */}
                                {type.type}
                            </Text>
                        </View>
                    </View> 
                </TouchableOpacity>
            </View>
        )
    })

    const onShow = () => {
        Animated.timing(viewBlur, {
            toValue: .95,
            duration: 250,
            useNativeDriver: true
        }).start();
    }

    const onDismiss = () => {
        Animated.timing(viewBlur, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true
        }).start();
    }

    useEffect(() => {
        if (modalVisible){
            onShow()
        } else {
            onDismiss()
        }
    },[modalVisible])

    return (
        <Animated.View style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: viewBlur,
            zIndex: 2
        }}
        pointerEvents={'none'}>
            <BlurView 
            intensity={100} style={{
                height: '100%',
                width: '100%'
            }}>
                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center', alignItems: 'center'}}>
                    <View style={[{
                        justifyContent: 'center', 
                        alignItems: 'center',
                        flexDirection: 'column',
                        width: '75%',
                        height: 'auto',
                        borderRadius: 10,

                    }, GlobalStyles.shadowLight]}>
                        {/* The Bar */}
                        <View style={{
                            height: 10,
                            width: '100%'
                        }}>
                        <View 
                            style={[{
                                position: 'absolute',
                                zIndex: 0,
                                height: 20, 
                                borderTopLeftRadius: 10, 
                                borderTopRightRadius: 10,
                                width: '100%'
                            }, GlobalStyles.bgColorMain]}></View>
                        </View>
                        <View style={[{
                            height: 'auto', 
                            width: '100%',
                            backgroundColor: 'white',
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }]}>

                            {/* The title */}
                            <View style={{
                                justifyContent: 'center',alignItems: 'flex-start',
                            }}>
                                <Text style={[GlobalStyles.h2, GlobalStyles.colorMain,
                                    {fontWeight: 'bold', margin: 5}]}>
                                    {title ? title : 'Are you sure?'}
                                </Text>
                            </View>

                            {/* Lists of togglable types */}
                            <View style={{
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                flexDirection: 'column',
                                width: '100%'
                            }}>
                                {typesArray.map(type => (
                                    <SingleType type={type} key={type}/>
                                ))}
                            </View>
                            
                            <View style={{
                                    width: '100%',
                                    justifyContent: 'space-between',
                                    alignItems: 'center', 
                                    flexDirection: 'row',
                                }}>
                                <View style={{width: '100%'}}>
                                    <TouchableOpacity style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    onPress={() => setModalVisible(false)}>
                                        <CheckIcon size={40} style={GlobalStyles.colorMain}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </BlurView>
      </Animated.View>
    )
}