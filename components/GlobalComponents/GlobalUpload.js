import React, {useState, useEffect} from 'react'
import { 
    TouchableOpacity, 
    StyleSheet, 
    ScrollView, 
    View, 
    Image, 
    Text,
    ActivityIndicator,
    Animated } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { TopNavScreenHeader } from './TopNav'
import { NextButton } from '../NewClothing/NextButton'
import { MediumButton, MediumCheckButton } from './GlobalButtons'
import { PlusIcon, CameraIcon, PhotoLibraryIcon } from './GlobalIcons'
import GlobalStyles from './GlobalStyles'
import { clothingInProgressAttributeAdded } from '../../redux/reducers/closetSlice'
import { Dimensions } from 'react-native';
import { useDispatch } from 'react-redux'
import { clothingInProgressCleansed } from '../../redux/reducers/closetSlice'
import { DescriptionModal } from './GlobalModals'



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// to scale image down to fit these dimensions...
// image width * (windowWidth / imageWidht) * scaleFactor


//What we need in our request body
    // AUTHORIZATION
    //   Token: <token>
    // HEADERS:
    //  AUTHORIZATION: 'Client-ID {{clientId}}'
    //BODY
    //  image -- here, it is our fileURI
    //  type (file, base64, URL)
    //  name (auto, dont worry)
    //  title
    //  description
const sendRequest = async (fileData, setImgurUrl) => {

    let clientId = '4d7a801cbb3f79c';

    console.log("About to send request to Imgur API");

    // THIS FUCKING WORKS
    // fileData.forEach((base64data, index) => {
    
    let nonStateImgurUrlArray = [];

    for (let i = 0; i < fileData.length; i++){
        try {
            const response = await axios.post('https://api.imgur.com/3/upload', 
                {
                        //image is in base64 format
                    image: fileData[i],
                    type: 'base64', 
                    //name: 'API Test',
                    //title: 'Plz',
                    //description: 'Pocket Closet'
                },
                {
                    headers: {
                        Authorization: `Client-ID ${clientId}`
                }
            });
            // console.log(response)
            console.log("HERE's the link (hopefully)");
            console.log(response.data.data.link) // this works!!!!
            // console.log("height: " + response.data.data.height) // height + width works as well
            // console.log("width: " + response.data.data.width)
            // setImageHeight(response.data.data.height);
            // setImageWidth(response.data.data.width);
            // setImgurUrl([...imgurUrl, response.data.data.link])
            // console.log('jut sent imgur url. here it is')
            // console.log(imgurUrl);
            // console.log("this is the updated array")
            // console.log(imgurUrl)
            //setFileUri([...fileUri, response.data.data.link])

            nonStateImgurUrlArray.push(response.data.data.link)

        } catch(err) {
            console.error(err);
        }
    }

    setImgurUrl(nonStateImgurUrlArray);
    // })
    
    
}


export const GlobalUpload = (
    {imgurUrl, setImgurUrl,
    fileUri, setFileUri, 
    checked, setChecked,
    maxUploadAmount}
    // {setNextFunction}
    ) => {

    // passed in as arguements
    // const [fileUri, setFileUri] = useState([])
    // const [imgurUrl, setImgurUrl] = useState([]);
    // const [checked, setChecked] = useState(false)

    //gray area
    const [fileData, setFileData] = useState([]);

    //definitely only need to be local to component
    const [awaitingResponse, setAwaitingResponse] = useState(false)
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [uploadTypeDropdown, setUploadTypeDropdown] = useState(false)

    //definitely only need to be local to component
    const [dropdownPosition] = useState(new Animated.Value(0))
    const [descriptionModal, setDescriptionModal] = useState(false)


    const toggleDropDown = () => {
        uploadTypeDropdown ? pullUp() : dropDown()
    }

    const dropDown = () => {
        setUploadTypeDropdown(true)
        Animated.timing(dropdownPosition, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true
        }).start();
    }

    const pullUp = () => {
        setUploadTypeDropdown(false)
        Animated.timing(dropdownPosition, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true
        }).start();
    }

    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            //const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            const { status } = await ImagePicker.requestCameraPermissionsAsync();

            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);


    const pickImage = async (type) => {
        // let result = await ImagePicker.launchImageLibraryAsync({
        let result;
        if (type === 'camera'){
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: false,
                aspect: [4, 3],
                quality: 1,
                base64: true
              });
        } else if (type === 'library'){
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true, //why do i do this lmao
                aspect: [4, 3],
                quality: 1,
                base64: true
              });
        }
        
    
        console.log(result);
    
        if (!result.cancelled) {
          setFileUri([...fileUri, result.uri]);
          setFileData([...fileData, result.base64])
        }
      };

    // const pushImages = () => {
    //     console.log('pushImages called...')
    //     console.log(imgurUrl)
    //     dispatch(clothingInProgressAttributeAdded(
    //         {
    //             images: 
    //             fileUri.length !== 0 ? (
    //                 checked ? {
    //                     images: imgurUrl,
    //                     type: 'imgur'
    //                 } : {
    //                     images: fileUri,
    //                     type: 'local'
    //                 })
    //             : {
    //                 images: imgurUrl,
    //                 type: ''
    //             }
    //         }
    //     )) //{images: imgurUrl}
    // }


    const sendRequestAndWait = async () => {
        setAwaitingResponse(true)
        await sendRequest(fileData, setImgurUrl)
        setAwaitingResponse(false)
        setUploadSuccess(true)
    }

    const launchAndPull = (type) => {
        pullUp();
        pickImage(type);
    }

    return (
        <View style={{
            margin: 10,
            flex: 1
        }}>
            <MediumButton 
                title={`Choose asdImages (${maxUploadAmount - fileUri.length} left)`}
                onPressFunc={() => toggleDropDown()}
                disabled={fileUri.length === maxUploadAmount}
                icon={<PlusIcon style={{marginRight: 15, marginLeft: 5, color: fileUri.length === maxUploadAmount ? 'lightgray' : 'black'}} name="plus" size={30} 
                />}
            />
            <Animated.View style={{
                position: 'absolute',
                width: '100%',
                height: 60,
                zIndex: -1,
                transform: [{
                    translateY: dropdownPosition.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 45]  // Edit this to change absolute position of textinput
                    }),
                    }]
            }}>
                <View style={{
                    margin: 10,
                    height: 'auto',
                    width: 'auto'
                }}>
                    <View style={[{
                        marginTop: 10,
                        height: '100%',
                        width: '100%',
                        backgroundColor: 'white',
                        borderBottomRightRadius: 10,
                        borderBottomLeftRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }, GlobalStyles.shadowLight]}>
                            <TouchableOpacity style={{
                                height: '100%',
                                width: '50%',
                                zIndex: 1
                            }}
                            onPress={() => launchAndPull('camera')}>
                                <View style={{
                                    marginTop: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row'
                                }}>
                                    <Text style={[{
                                        fontWeight: 'bold',
                                        marginRight: 5,
                                    }, GlobalStyles.h4]}>
                                        Camera
                                    </Text>
                                    <CameraIcon size={30} style={GlobalStyles.colorMain}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                height: '100%',
                                width: '50%',
                                zIndex: 1
                            }}
                            onPress={() => launchAndPull('library')}>
                                <View style={{
                                    marginTop: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row'
                                }}>
                                    <Text style={[{
                                        fontWeight: 'bold',
                                        marginRight: 5,
                                    }, GlobalStyles.h4]}>
                                        Library
                                    </Text>
                                    <PhotoLibraryIcon size={30} style={GlobalStyles.colorMain}/>
                                </View>
                            </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                aspectRatio: 1,
                zIndex: -2
            }}>
                <ScrollView
                horizontal={true}
                style={{margin: -10}}
                contentContainerStyle={{
                    width: `${fileUri.length * 100}%`,
                    height: 'auto'
                }}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                >
                    {fileUri.map((uri, index) => (
                        <View style={[{
                            height: '100%', 
                            aspectRatio: 1, 
                            borderRadius: 5,
                            width: `${100/fileUri.length}%`,
                            justifyContent: 'center',
                            alignItems: 'center',}, 
                            GlobalStyles.shadowLight]}
                            key={index}>
                            
                            <Image style={{
                            width: '90%',
                            aspectRatio: 1,
                            borderRadius: 5,
                            }} source={{ uri: uri }}/> 
                        </View>
                    ))}
                </ScrollView>
            </View>
            {fileUri.length !== 0 ?
            <>
                <MediumCheckButton 
                    checked={checked}
                    setChecked={setChecked}
                    title={awaitingResponse ? 'Uploading...' : `Upload to Imgur`}
                    onPressFunc={async () => sendRequestAndWait()}
                    disabled={fileUri.length === 0 || awaitingResponse || uploadSuccess}
                    icon={!awaitingResponse ? 
                    <PlusIcon style={{marginRight: 15, marginLeft: 5, 
                        color: imgurUrl.length !== 0 || fileUri.length === maxUploadAmount || awaitingResponse ? 'lightgray' : 'black'}} name="plus" size={30} 
                    /> : 
                    <View style={{marginRight: 15}}><ActivityIndicator size="small" color="lightgray"/></View>}
                />
                <View style={[{
                    height: 30, 
                    aspectRatio: 1, 
                    borderRadius: 5, 
                    borderColor: 'lightgray', 
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    marginLeft: 10
                }]}>
                    <TouchableOpacity
                    onPress={() => setDescriptionModal(true)}
                    >
                        <Text style={[{fontWeight: 'bold', color: 'lightgray'}, GlobalStyles.h5]}>
                            ?
                        </Text>
                    </TouchableOpacity>
                </View>
            </> : null}
            <DescriptionModal setModalVisible={setDescriptionModal} modalVisible={descriptionModal}>
                <View style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: '100%'
                }}>
                    <Text 
                        style={[GlobalStyles.h5, {fontWeight: 'bold', margin: 5}]}>
                        Imgur vs Local
                    </Text>
                    <View style={{
                        width: 'auto',
                        justifyContent: 'flex-start',
                        margin: 5
                    }}>
                        <Text style={[
                            GlobalStyles.h6,
                        ]}>
                            {/* You have the option to either upload images of your clothing to Imgur (and not take up space
                            on your device), or just use your device's storage to store these images. */}
                            You can either upload to Imgur or use your device's storage.
                        </Text>
                        <Text style={[
                            GlobalStyles.h6,
                            {marginTop: 10}
                        ]}>
                            Uploading to Imgur takes a few seconds, but lets you delete the photos you took after (if you want).
                        </Text>
                        <Text style={[
                            GlobalStyles.h6,
                            {marginTop: 10}
                        ]}>
                            Local storage takes up your devices memory, but lets you skip the Imgur upload process (a few seconds).
                        </Text>
                        <Text style={[
                            GlobalStyles.h6,
                            {marginTop: 10}
                        ]}>
                            Keep in mind uploading to Imgur will use your data, so please connect to WiFi instead.
                        </Text>
                    </View>
                    
                </View>
            </DescriptionModal>
        {/* <NextButton 
        navpath={'FINALIZECLOTHING'} 
        disabledHook={false}
        extraFunc={() => pushImages()}/> */}
        </View>
    )

}