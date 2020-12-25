import React, {
    useCallback,
    useState
} from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    FlatList
} from 'react-native'
import { useSelector,  } from 'react-redux'
import store from '../../redux/store'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import GlobalStyles from '../GlobalComponents/GlobalStyles'
import { HeartIcon } from '../GlobalComponents/GlobalIcons'
import { makeSmallImage, makeMediumImage } from '../GlobalFunctions/ImgurResize'
import { useEffect } from 'react/cjs/react.development'



import ImageResizer from 'react-native-image-resizer';
import * as ImageManipulator from 'expo-image-manipulator';
/** An outfit is an object
 *  that contains 4 arrays
 *  topsArray, bottomsArray, footwearArray, otherArray 
 *  in the outfitArr property, and also contains
 *  description, date, tags, favorite, in the base properties */
const RenderOutfit = React.memo(({item, closetObject, onClickFunc
}) => {
    //we shouldnt need to check for change in the closetObject...
    //because on clothingObject deletion, we also track down the _id in it's corresponding
    //outfitObjects and delete it's _id from its outfitArr
    console.log(`rerendering RenderOutfit with id ${item._id}`)

    // const closetObject = useSelector(state => state.closet.closetObject);



    const [imageArrayFromIdsHook, setImageArrayFromIdsHook] = useState([])
    const [combinedClothingItemsArrayHook, setCombinedClothingItemsArrayHook] = useState([])
    const [needsCropHook, setNeedsCropHook] = useState(false)

    // wow. i understand how hooks work now 4 months later. this was causing re rendering
    // const outfitsArray = useSelector(state => state.outfits.outfitsArray)


    // This causes the re-renders. Need to figure out how to circumnavigate this
    // const closetObject = useSelector(state => state.closet.closetObject)


    


    //need to put all this spaghettin into here
    //combinedClothingItemsArray
    //imageArrayFromIds


    // const ClothingItemCollection = ({
    //     outfitArray,
    //     setCombinedClothingItemsArrayHook, 
    //     setImageArrayFromIdsHook, 
    //     setNeedsCropHook
    // }) => {
    //     return (

    //     )
    // }

            // return <View><Text>wtf</Text></View>

    useEffect(() => {


        //RenderOutfit relies on a useSelector hook to update

        // console.log('useEffect triggering')

        const loadImages = async () => {
            let outfitArray = item.outfitArr;

            //this is now one big list of IDs
            let combinedClothingItemsArray = [
                ...outfitArray.topsArray,
                ...outfitArray.bottomsArray,
                ...outfitArray.footwearArray,
                ...outfitArray.otherArray
            ]
            const origLength = combinedClothingItemsArray.length 
            const needsCrop = combinedClothingItemsArray.length > 4;
            if (needsCrop){
                combinedClothingItemsArray = combinedClothingItemsArray.slice(0, 3) // should only include the first 3 terms
            }
            let dummySrc = {
                type: '',
                images: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100 % 100 + 1)}.jpg`
            }
    
            //this used to be const but we are pushing to it
            let imageArrayFromIds = [];
    
            //what is this spaghettii...
            //this should definitely be in some sort of hook...
            for (const key of Object.keys(outfitArray)){
                for (const id of outfitArray[key]){
                    //the clothingObject we find using the ID
                    const temp = closetObject[key].find(clothingObj => clothingObj._id === id);
                    if (!temp){
                        console.log(`Cannot find clothingObject with id: ${id}`)
                    }
                    else if (Array.isArray(temp.images)){
                        console.log('pushing dummysrc')
                        imageArrayFromIds.push(dummySrc)
    
                    } else if (temp.images.images.length === 0){
                        console.log('pushing dummysrc')
                        imageArrayFromIds.push(dummySrc)
                    } else {
    
                        console.log('in createdResizedImage asdasd')
                        // if (true) {
                        //     imageArrayFromIds.push({
                        //         type: temp.images.type,
                        //         images: temp.images.images[0]
                        //     })
                        // }
                        // else 
                        if (temp.images.type === 'imgur'){
                            console.log('in first if')
                            imageArrayFromIds.push({
                                type: temp.images.type,//temp.images.type,
                                images: temp.images.images[0] //temp.images.images[0]
                            })
                        } else {
                            console.log('in second if')
                            console.log(temp.images.images[0])
    
                            const manipResult = await ImageManipulator.manipulateAsync(
                                // image.localUri || image.uri
                                temp.images.images[0],
                                [{ resize: {width: 80} }],
                                { compress: 0.75, format: ImageManipulator.SaveFormat.JPEG }
                            );
                            imageArrayFromIds.push({
                                type: 'local',//temp.images.type,
                                images: manipResult.uri //temp.images.images[0]
                            })
    
                            /**
                            ImageResizer.createResizedImage(
                                // temp.images.images[0], 100, 100, 'JPEG', 50, 0, null
                                temp.images.images[0], 100, 100, 'JPEG', 100, 0, undefined, false, //{ mode, onlyScaleDown }
                                
                                )
                                .then(response => {
                                    
                                    // imageArrayFromIds.push({
                                    //     type: 'local',//temp.images.type,
                                    //     images: response.path //temp.images.images[0]
                                    // })
                                    imageArrayFromIds = [...imageArrayFromIds, {
                                        type: 'local',//temp.images.type,
                                        images: response.path //temp.images.images[0]
                                    }]
                                    // response.uri
                                    // response.uri is the URI of the new image that can now be displayed, uploaded...
                                    // response.path is the path of the new image
                                    // response.name is the name of the new image with the extension
                                    // response.size is the size of the new image
                                }).catch(err => {
                                    // console.log('wtf')
                                    console.log(err)
                            })  */
                        }
                        
    
    
                        // imageArrayFromIds.push({
                        //     type: temp.images.type,
                        //     images: temp.images.images[0]
                        // })
                    }
                    
                    if (imageArrayFromIds.length >= combinedClothingItemsArray.length){
                        break;
                    }
                }
            }
    
            setCombinedClothingItemsArrayHook(combinedClothingItemsArray)
            setImageArrayFromIdsHook(imageArrayFromIds)
            setNeedsCropHook(needsCrop)
    
        }

        loadImages();

        

        // when unloading
        return () => {
            console.log('blurred OutfitList')
        }
    }, [])


    

    // console.log(combinedClothingItemsArray)
    // return (
    //     <View>
    //         <Text>{item._id}</Text>
    //     </View>
    // )
    

    const navigation = useNavigation();

    
    const OutfitDateFavoriteBadge = React.memo(({item}) => {
        return (
            <View style={[{
                position: 'absolute',
                width: 'auto',
                height: 'auto',
                borderRadius: 10,
                top: 0,
                right: 0,
                zIndex: 3,
                padding: 5,
                flexDirection: 'row'
            }, GlobalStyles.bgColorMain]}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {
                        item.favorite ? <HeartIcon size={22} style={{color: '#ff4040', marginRight: 2}}/> : null
                    }
                </View>
                <Text style={[{color: 'white', fontWeight: 'bold'}, GlobalStyles.h5]}>
                    {`${new Date(item.date).toLocaleString('en-GB').substr(0, 10)}`}
                </Text>
            </View>
        )
    })

    const OutfitFitpic = React.memo(({item}) => {
        return (
            <View style={{
                width: '50%',
                height: 'auto'}}>
                <View style={{
                    width: 'auto',
                    marginLeft: 10,
                    marginTop: 10,
                    marginBottom: 10,
                    height: 'auto'
                }}>
                    <View style={[{
                        marginRight: 5,
                        width: 'auto',
                        aspectRatio: 1,
                        backgroundColor: 'white',
                        borderRadius: 10
                    }, GlobalStyles.shadowLight]}>
                        <Image source={item.fitpic !== '' && item.fitpic.fitpic !== '' ? (item.fitpic.type === 'imgur' ?
                        { uri: makeMediumImage(item.fitpic.fitpic)} : {uri: item.fitpic.fitpic}) : null}
                            style={{height: '100%', width: '100%', borderRadius: 10}}/>
                    </View>
                </View>
            </View>
        )
    })

    const IndividualClothingImage = React.memo(({index}) => {
        return (
            <View style={[{
                width: '50%', 
                aspectRatio: 1,
            }]} 
            key={index}> 
            <View style={[{
                margin: 5,
                width: 'auto',
                height: 'auto',
                borderRadius: 10,
                backgroundColor: 'white'
            }, GlobalStyles.shadowLight]}
            key={index}>
            {  imageArrayFromIdsHook[index] ?  <Image  
                    key={index}
                    source={
                        imageArrayFromIdsHook[index].type === 'imgur' ? 
                        // Imgur
                            {uri: makeSmallImage(imageArrayFromIdsHook[index].images)} :
                        // Local
                            {uri: imageArrayFromIdsHook[index].images
                                
                                    // .catch(err => {
                                    //     // Oops, something went wrong. Check that the filename is correct and
                                    //     // inspect err to get more details.
                                    // })
                            }  //imageArrayFromIdsHook[index].images
                                
                                
                                

                    } 
                    style={{height: '100%', aspectRatio: 1, borderRadius: 10}} /> : null}
            </View>
        </View>
        )
    })


    const PiecePreview = React.memo(({outfitArray}) => {
        return (
            <View style={{
                width: '50%',
            }}>
                <View style={{
                    marginTop: 5,
                    marginRight: 5,
                    marginBottom: 5,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center'
                }}>
                    {combinedClothingItemsArrayHook.map((clothingObject, index) => (
                        <IndividualClothingImage key={clothingObject._id} index={index}/>
                        )
                    )}
                    {needsCropHook ? (
                        <View style={[{
                            height: 'auto', 
                            aspectRatio: 1,
                            borderRadius: 10,
                            margin: 5,
                            borderRadius: 10,
                            backgroundColor: 'white'
                        }, GlobalStyles.shadowLight]}> 
                            <View 
                            style={{
                                height: 75, 
                                aspectRatio: 1, 
                                borderRadius: 10, 
                                justifyContent: 'center',
                                alignItems: 'center'}} >
                                    <Text style={[GlobalStyles.h3, {fontWeight: 'bold'}]}>
                                        {`+${origLength - 3}`}
                                    </Text>
                            </View>
                    </View>
                    ) : null}
                </View>
            </View>
        )
    }, (prevProps, nextProps) => 
            prevProps.outfitArray == nextProps.outfitArray &&
            prevProps.favorite == nextProps.favorite)
    


    return (
        <View style={{
            height: 200, //origLength > 4 ? 200 : 115, //was 120
            width: '100%',
            borderRadius: 10
        }}>
            <TouchableOpacity style={[{
                width: 'auto',
                marginLeft: 10,
                marginRight: 10,
                marginTop: 5,
                marginBottom: 5,
                height: 'auto',
            }, GlobalStyles.shadowLight]}
            activeOpacity={0.5}
            onPress={() => onClickFunc(item)
            }> 
                <View style={{
                    height: 'auto',
                    width: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'column',
                borderRadius: 10

                }}>
                    {/* Date and Favorite */}
                    <OutfitDateFavoriteBadge item={item}/>

                    {/* Black Cap */}
                    <View style={{
                        height: 10,
                        width: '100%',
                        zIndex: 0,

                    }}>
                        <View 
                        style={[{
                            position: 'absolute',
                            top: 0,
                            height: 20,
                            borderTopLeftRadius: 10, 
                            borderTopRightRadius: 10, 
                            width: '100%'}, 
                            GlobalStyles.bgColorMain]}>
                        </View>
                    </View>
                    
                    <View style={{
                        //height: 180, //origLength > 4 ? 180 : 95,
                        width: '100%',
                        height: 'auto',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        zIndex: 1,
                        borderBottomRightRadius: 10,
                        borderBottomLeftRadius: 10,

                    }}>
                        <View style={{
                            justifyContent: 'flex-start',
                            alignItems: 'left',
                            flexDirection: 'row',
                            height: 'auto',
                            width: '100%',
                            flexWrap: 'wrap',

                        }}>
                            {/* Fitpic */}
                            <OutfitFitpic item={item}/>
                            
                            {/* The images of the pieces in the outfit */}
                            <PiecePreview outfitArray={item.outfitArr}/>

                            {/* Might need to replace the above with something less image intensive. Causes tons of lag. */}
                            {/* 
                                Options:
                                    Description
                                    # of brands
                                    # of colors
                                    Price of outfit
                                    # times worn
                                    tags
                                    brands
                            */}
                        </View>
                    </View>
                </View> 
            </TouchableOpacity>
        </View>
    )
}, (prevProps, nextProps) => prevProps.item == nextProps.item
    )




/** An outfit is an object
 *  that contains 4 arrays
 *  topsArray, bottomsArray, footwearArray, otherArray */
// onClickFunc looks like:   function (outfitObject) { ... }
export const OutfitList = ({customFilter, onClickFunc}, props) => {

    console.log('OutfitList being re-rendered')

    const navigation = useNavigation()

    
    //temp
    let src = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' }

    const outfitsArray = useSelector(state => state.outfits.outfitsArray);

    // const outfitsArray = useSelector(state => state.outfits.outfitsArray);
    const closetObject = useSelector(state => state.closet.closetObject);



    // const [closetObject, setClosetObject] = useState(store.getState().closet.closetObject)

    // useFocusEffect(
    //     useCallback(() => {
    //         console.log('focusing OutfitList')
    //         setClosetObject(store.getState().closet.closetObject)

    //         return () => {
    //             console.log('blurring OutfitList')
    //         }
    //     }, [])
    // )

    
    return (
        <View style={{
            width: '100%',
            height: '100%'
        }}>
            
            <FlatList
                data={customFilter ? customFilter(outfitsArray) : outfitsArray}

                renderItem={(object, index) => (
                    <RenderOutfit {...object} closetObject={closetObject} onClickFunc={onClickFunc}
                    />
                )}
                // renderItem={(object, index) => <RenderOutfit  item={object} />}
                
                keyExtractor={(obj, index) => obj._id.toString()} //obj._id.. not all obj has _id rn
                showsVerticalScrollIndicator={false}
                // Below are possible optimizations
                removeClippedSubviews={false} // TEMP
                getItemLayout={(data, index) => (
                    {length: 200, offset: 200 * index, index}
                )}
                initialNumToRender={3}
            />
            {/* {outfitsArray.map((item, i) => (
                <>
                    <RenderOutfit item={item} key={i}/>
                </>
            ))} */}
            
        </View>
    )
}