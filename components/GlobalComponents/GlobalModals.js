import React, {useState, useEffect} from 'react'
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Animated
} from 'react-native'
import GlobalStyles from './GlobalStyles'
import { CheckIcon, XIcon } from './GlobalIcons'
import { BlurView } from 'expo-blur';

export const YesNoModal = ({setModalVisible, modalVisible, onPressFunc, title}) => {

    const [viewBlur] = useState(new Animated.Value(0))

    const onShow = () => {
        Animated.timing(viewBlur, {
            toValue: 1,
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
            toValue: 1,
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