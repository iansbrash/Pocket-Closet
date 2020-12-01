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
import { TopNavScreenHeader } from '../GlobalComponents/TopNav'
import { NextButton } from './NextButton'
import { MediumButton, MediumCheckButton } from '../GlobalComponents/GlobalButtons'
import { PlusIcon, CameraIcon, PhotoLibraryIcon } from '../GlobalComponents/GlobalIcons'
import GlobalStyles from '../GlobalComponents/GlobalStyles'
import { clothingInProgressAttributeAdded } from '../../redux/reducers/closetSlice'
import { Dimensions } from 'react-native';
import { useDispatch } from 'react-redux'
import { clothingInProgressCleansed } from '../../redux/reducers/closetSlice'
import { DescriptionModal } from '../GlobalComponents/GlobalModals'
import { GlobalUpload } from '../GlobalComponents/GlobalUpload'


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
const sendRequest = async (fileData, setImgurUrl, setImageHeight, setImageWidth, imgurUrl) => {

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


export const UploadImage = () => {
    const [fileUri, setFileUri] = useState([])
    // const [fileData, setFileData] = useState([]);
    const [imgurUrl, setImgurUrl] = useState([]);
    // const [imageHeight, setImageHeight] = useState(1);
    // const [imageWidth, setImageWidth] = useState(1);
    // const [awaitingResponse, setAwaitingResponse] = useState(false)
    // const [uploadSuccess, setUploadSuccess] = useState(false)
    // const [uploadTypeDropdown, setUploadTypeDropdown] = useState(false)

    // const [dropdownPosition] = useState(new Animated.Value(0))
    // const [descriptionModal, setDescriptionModal] = useState(false)

    const [checked, setChecked] = useState(false)

    const [nextFunction, setNextFunction] = useState(() => () => null)

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
    let src = { uri: imgurUrl }

    


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

    const pushImages = () => {
        console.log('pushImages called...')
        console.log(imgurUrl)
        dispatch(clothingInProgressAttributeAdded(
            {
                images: 
                fileUri.length !== 0 ? (
                    checked ? {
                        images: imgurUrl,
                        type: 'imgur'
                    } : {
                        images: fileUri,
                        type: 'local'
                    })
                : {
                    images: imgurUrl,
                    type: ''
                }
            }
        )) //{images: imgurUrl}
    }

    const sendRequestAndWait = async () => {
        setAwaitingResponse(true)
        await sendRequest(fileData, setImgurUrl, setImageHeight, setImageWidth, imgurUrl)
        setAwaitingResponse(false)
        setUploadSuccess(true)
    }

    const launchAndPull = (type) => {
        pullUp();
        pickImage(type);
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <TopNavScreenHeader title={'Upload Image'} exitDestination={'CLOSETSCREEN'} extraFunc={
                () => dispatch(clothingInProgressCleansed())
            } />
            
            <GlobalUpload 
                fileUri={fileUri} setFileUri={setFileUri}
                imgurUrl={imgurUrl} setImgurUrl={setImgurUrl}
                checked={checked} setChecked={setChecked}
                maxUploadAmount={3}/>
            <NextButton 
                navpath={'FINALIZECLOTHING'} 
                disabledHook={false}
                extraFunc={() => pushImages()}
            />
        </View>
    )

}