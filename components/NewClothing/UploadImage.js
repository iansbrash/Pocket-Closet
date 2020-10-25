import React, {useState, useEffect} from 'react'
import { TouchableOpacity, StyleSheet, ScrollView, View, Image, Text, } from 'react-native'
import {ImagePicker} from 'react-native-image-picker';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { TopNav } from '../GlobalComponents/TopNav'
import { NextButton } from './NextButton'
import { ScreenHeader } from '../GlobalComponents/ScreenHeader'

import { Dimensions } from 'react-native';
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
const sendRequest = async ({fileData, setImgurUrl, setImageHeight, setImageWidth}) => {

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
        console.log(response)
        console.log("HERE's the link (hopefully)");
        console.log(response.data.data.link) // this works!!!!
        console.log("height: " + response.data.data.height) // height + width works as well
        console.log("width: " + response.data.data.width)
        setImageHeight(response.data.data.height);
        setImageWidth(response.data.data.width);
        setImgurUrl(response.data.data.link)
    } catch {
        console.error(err);
    }
    
}


export const UploadImage = () => {
    const [fileUri, setFileUri] = useState()
    const [fileData, setFileData] = useState('');
    const [imgurUrl, setImgurUrl] = useState('');
    const [imageHeight, setImageHeight] = useState(1);
    const [imageWidth, setImageWidth] = useState(1);
    var scaledWidth, scaledHeight;

    if (true) return null; //TEMPPERM

    useEffect(() => {
        scaledWidth = ((imageWidth * (windowWidth/imageWidth) * 0.9));
        scaledHeight = (imageWidth * (windowWidth/imageWidth) * 0.9) * (windowHeight/windowWidth);
    }, [imageHeight, imageWidth])

    const navigation = useNavigation();
    let src = { uri: imgurUrl }

    useEffect(() => {
        console.log("In useEffect()");
        console.log(imgurUrl);
    }, [imgurUrl])

    const chooseImage = () => {
        let options = {
            title: 'Select Avatar', 
            cameraType: 'front',
            mediaType: 'photo' ,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        }
    
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
    
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } 
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } 
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } 
            else {
                setFileUri(response.uri) //update state to update Image
                setFileData(response.data);
            }
        });
    }

    
    return (
        <View style={{
            flex: 1
        }}>
            <TopNav title={'Upload Image'} exitDestination={'CLOSETSCREEN'} />
            <ScreenHeader title={'Upload Image'}/>
            {/* <Divider /> */}
            <View style={{
                margin: 10,
                flex: 1
            }}>
                <TouchableOpacity 
                style={{
                    elevation: 5,
                    justifyContent: 'center',
                    alignItems:'center',
                    backgroundColor: 'white',
                    width: 'auto', 
                    height: 40, 
                    margin: 5,
                    borderRadius: 5
                }}
                onPress={chooseImage}>
                    
                    <Text category='h6' style={{fontWeight: 'bold'}}>
                        {'Choose File'}
                    </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={{
                    //backgroundColor: 'powderblue',
                    width: '100%',
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    elevation: 5
                }}>
                    <Button
                     onPress={chooseImage}
                     status='control'
                     style={{height: '100%',
                            width: '100%',
                            borderRadius: 5}}>
                                <Text 
                                category='h5' 
                                status='basic'
                                style={{
                                    fontWeight: 'bold'
                                }}>
                                    Upload Image
                                </Text>

                    </Button>
                    
                </TouchableOpacity> */}
                {/* <Divider style={{margin: 20}}/> */}
                {/* <TouchableOpacity style={{
                    backgroundColor: 'powderblue',
                    width: '100%',
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    elevation: 10
                    
                }} onPress={() => (sendRequest({fileData, setImgurUrl, setImageHeight, setImageWidth}))}>
                    <Text 
                    category='h2' 
                    status='control'
                    style={{
                        fontWeight: 'bold'
                    }}>Send Request</Text>
                </TouchableOpacity> */}
                <ScrollView style={{height:'auto'}}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: 'auto',
                    }}>
                        <Image style={{
                                paddingTop: 20,
                                paddingBottom: 20,
                                height: imageHeight * (windowHeight / imageHeight),
                                width: imageWidth * (windowWidth / imageWidth)
                            }} source={{ uri: imgurUrl }}/>
                        <Text category='h3' style={{
                            fontWeight: 'bold'
                        }}>{imgurUrl}</Text>
                    </View>
                </ScrollView>
            </View>
            <NextButton navpath={'FINALIZECLOTHING'} disabledHook={false}/>
            <View style={{
                    width: '100%',
                    height: 'auto'
                }}>
                    {/* <Button style={{
                        width: 'auto',
                        height: 50,
                        borderRadius: 5,
                        marginRight: 30,
                        marginLeft: 30,
                        marginBottom: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                onPress={() => imgurUrl ? sendRequest({fileData, setImgurUrl, setImageHeight, setImageWidth}) :  navigation.navigate("FINALIZECLOTHING")}
                    disabled={fileData === ''}  
                    >
                        <Text category='h3' status='control' style={{fontWeight: 'bold'}}>{imgurUrl === '' ? 'Upload Image' : 'NEXT'}</Text>
                    </Button> */}
                </View>
        </View>
    )

}