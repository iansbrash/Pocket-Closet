import React, {useState, useEffect} from 'react'
import { 
    ScrollView, 
    View, 
    Image, 
    Text,
    ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { TopNavScreenHeader } from '../GlobalComponents/TopNav'
import { NextButton } from '../NewClothing/NextButton'
import { MediumButton } from '../GlobalComponents/GlobalButtons'
import { PlusIcon } from '../GlobalComponents/GlobalIcons'
import GlobalStyles from '../GlobalComponents/GlobalStyles'
import { Dimensions } from 'react-native';
import { useDispatch } from 'react-redux'
import { outfitInProgressCleansed } from '../../redux/reducers/closetSlice'
import { outfitInProgressFitpicAdded } from '../../redux/reducers/outfitsSlice'




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
const sendRequest = async (fileData, setImgurUrl, imgurUrl) => {

    let clientId = '4d7a801cbb3f79c';

    console.log("About to send request to Imgur API");

    // THIS FUCKING WORKS

    
    try {
        const response = await axios.post('https://api.imgur.com/3/upload', 
            {
                //image is in base64 format
                image: fileData,
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
        console.log("HERE's the link (hopefully)");
        console.log(response.data.data.link) // this works!!!!

        //we aren't working with arrays, so just completely override imgurUrl
        setImgurUrl(response.data.data.link)
        console.log('jut sent imgur url. here it is')
        console.log(imgurUrl);
    } catch(err) {
        console.error(err);
    }
    
    
}


export const UploadFitpic = () => {
    //we aren't working with arrays here (only 1 fitpic per outfit)
    const [fileUri, setFileUri] = useState('')
    const [fileData, setFileData] = useState('');
    const [imgurUrl, setImgurUrl] = useState('');

    const [awaitingResponse, setAwaitingResponse] = useState(false)
    const [uploadSuccess, setUploadSuccess] = useState(false)

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
            //not working witha arrays (unlike UploadImage)
            setFileUri(result.uri);
            setFileData(result.base64)
        }
      };

    // we only need a single image, so we don't need to work with arrays
    const pushImages = () => {
        console.log(`pushing images... imgurUrl: ${imgurUrl}`)
        //dispatch to redux store to store fitpic
        //dispatch(clothingInProgressAttributeAdded({images: imgurUrl}))
        dispatch(outfitInProgressFitpicAdded(imgurUrl));
    }

    const sendRequestAndWait = async () => {
        setAwaitingResponse(true)
        await sendRequest(fileData, setImgurUrl, imgurUrl)
        setAwaitingResponse(false)
        setUploadSuccess(true)
    }
    
    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <TopNavScreenHeader title={'Upload Fitpic'} exitDestination={'HOMESCREEN'} extraFunc={
                () => dispatch(outfitInProgressCleansed())
            } />
            
            <View style={{
                margin: 10,
                flex: 1
            }}>
                <MediumButton 
                    title={`Choose Images (${fileUri === '' ? 1 : 0} left)`}
                    onPressFunc={pickImage}
                    disabled={fileUri !== ''}
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
                            width: `100%`,
                            height: 'auto'
                        }}
                        >
                            {fileUri !== '' ? 
                                <View style={[{
                                    height: '100%', 
                                    aspectRatio: 1, 
                                    borderRadius: 5,
                                    width: `100%`,
                                    justifyContent: 'center',
                                    alignItems: 'center',}, 
                                    GlobalStyles.shadowLight]}>
                                    
                                    <Image style={{
                                    width: '90%',
                                    aspectRatio: 1,
                                    borderRadius: 5,
                                    }} source={{ uri: fileUri }}/> 
                                </View>
                            : null }
                        </ScrollView>
                    </View>
                    <MediumButton 
                        title={awaitingResponse ? 'Uploading...' : `Upload to Imgur`}
                        onPressFunc={async () => sendRequestAndWait()}
                        disabled={fileUri === '' || awaitingResponse || uploadSuccess}
                        icon={imgurUrl === '' || !awaitingResponse ? 
                        <PlusIcon style={{marginRight: 15, marginLeft: 5, 
                            color: imgurUrl !== '' || fileUri !== '' || awaitingResponse ? 'lightgray' : 'black'}} name="plus" size={30} 
                    /> : 
                    <View style={{marginRight: 15}}><ActivityIndicator size="small" color="lightgray"/></View>}/>
                    <Text category='h3' style={{
                        fontWeight: 'bold'
                    }}>{imgurUrl}</Text>
            </View>
            <NextButton 
            navpath={'FINALIZEOUTFIT'} 
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