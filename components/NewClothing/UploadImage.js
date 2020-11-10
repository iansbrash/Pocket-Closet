import React, {useState, useEffect} from 'react'
import { 
    TouchableOpacity, 
    StyleSheet, 
    ScrollView, 
    View, 
    Image, 
    Text,
    ActivityIndicator } from 'react-native'
// import ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { TopNavScreenHeader } from '../GlobalComponents/TopNav'
import { NextButton } from './NextButton'
import { MediumButton } from '../GlobalComponents/GlobalButtons'
import { PlusIcon } from '../GlobalComponents/GlobalIcons'
import GlobalStyles from '../GlobalComponents/GlobalStyles'
import { clothingInProgressAttributeAdded } from '../../redux/reducers/closetSlice'
import { Dimensions } from 'react-native';
import { useDispatch } from 'react-redux'
import { clothingInProgressCleansed } from '../../redux/reducers/closetSlice'



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

    for (let i = 0; i < fileData.length; i++){
        try {
            const response = await axios.post('https://api.imgur.com/3/upload', 
                {
                        //image is in base64 format
                    image: fileData[0],
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
            setImgurUrl([...imgurUrl, response.data.data.link])
            console.log('jut sent imgur url. here it is')
            console.log(imgurUrl);
            //setFileUri([...fileUri, response.data.data.link])

        } catch(err) {
            console.error(err);
        }
    }
    // })
    
    
}


export const UploadImage = () => {
    const [fileUri, setFileUri] = useState([])
    const [fileData, setFileData] = useState([]);
    const [imgurUrl, setImgurUrl] = useState([]);
    const [imageHeight, setImageHeight] = useState(1);
    const [imageWidth, setImageWidth] = useState(1);
    const [awaitingResponse, setAwaitingResponse] = useState(false)
    const [uploadSuccess, setUploadSuccess] = useState(false)
    var scaledWidth, scaledHeight;

    
    useEffect(() => {
        scaledWidth = ((imageWidth * (windowWidth/imageWidth) * 0.9));
        scaledHeight = (imageWidth * (windowWidth/imageWidth) * 0.9) * (windowHeight/windowWidth);
    }, [imageHeight, imageWidth])

    const navigation = useNavigation();
    const dispatch = useDispatch();
    let src = { uri: imgurUrl }

    useEffect(() => {
        console.log("In useEffect()");
        console.log(imgurUrl);
    }, [imgurUrl])


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


    const pickImage = async () => {
        // let result = await ImagePicker.launchImageLibraryAsync({
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
          base64: true
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setFileUri([...fileUri, result.uri]);
          setFileData([...fileData, result.base64])
        //   console.log('fileData:');
        //   console.log(fileData)
        }
      };

    const pushImages = () => {
        console.log(imgurUrl)
        dispatch(clothingInProgressAttributeAdded({images: imgurUrl}))
    }

    const sendRequestAndWait = async () => {
        setAwaitingResponse(true)
        await sendRequest(fileData, setImgurUrl, setImageHeight, setImageWidth, imgurUrl)
        setAwaitingResponse(false)
        setUploadSuccess(true)
    }
    
    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <TopNavScreenHeader title={'Upload Image'} exitDestination={'CLOSETSCREEN'} extraFunc={
                () => dispatch(clothingInProgressCleansed())
            } />
            
            <View style={{
                margin: 10,
                flex: 1
            }}>
                <MediumButton 
                    title={`Choose Images (${3 - fileUri.length} left)`}
                    onPressFunc={pickImage}
                    disabled={fileUri.length === 3}
                    icon={<PlusIcon style={{marginRight: 15, marginLeft: 5, color: fileUri.length === 3 ? 'lightgray' : 'black'}} name="plus" size={30} 
                    />}/>

                
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        aspectRatio: 1
                    }}>
                        <ScrollView
                        horizontal={true}
                        style={{margin: -10}}
                        contentContainerStyle={{
                            width: `${fileUri.length * 100}%`,
                            height: 'auto'
                        }}
                        >
                            {fileUri.map((uri, index) => (
                                <View style={[{
                                    height: '100%', 
                                    aspectRatio: 1, 
                                    borderRadius: 5,
                                    width: `${100/fileUri.length}%`,
                                    justifyContent: 'center',
                                    alignItems: 'center',}, 
                                    GlobalStyles.shadowLight]}>
                                    
                                    <Image style={{
                                    width: '90%',
                                    aspectRatio: 1,
                                    borderRadius: 5,
                                    // height: imageHeight * (windowHeight / imageHeight),
                                    // width: imageWidth * (windowWidth / imageWidth)
                                    }} source={{ uri: uri }}/> 
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                    <MediumButton 
                        title={awaitingResponse ? 'Uploading...' : `Upload to Imgur`}
                        onPressFunc={async () => sendRequestAndWait()}
                        disabled={fileUri.length === 0 || awaitingResponse || uploadSuccess}
                        icon={imgurUrl.length === 0 || !awaitingResponse ? 
                        <PlusIcon style={{marginRight: 15, marginLeft: 5, 
                            color: imgurUrl.length !== 0 || fileUri.length === 3 || awaitingResponse ? 'lightgray' : 'black'}} name="plus" size={30} 
                    /> : 
                    <View style={{marginRight: 15}}><ActivityIndicator size="small" color="lightgray"/></View>}/>
                    <Text category='h3' style={{
                        fontWeight: 'bold'
                    }}>{imgurUrl}</Text>
            </View>
            <NextButton 
            navpath={'FINALIZECLOTHING'} 
            disabledHook={false}
            extraFunc={() => pushImages()}/>
            <View style={{
                    width: '100%',
                    height: 'auto'
                }}>
            </View>
        </View>
    )

}