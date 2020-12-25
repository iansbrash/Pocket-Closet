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
const RenderOutfit = React.memo(({item, closetObject, onClickFunc}) => {
    console.log(`rerendering RenderOutfit with id ${item._id}`)

    // array of image objects: 
    //      {images: 'https://imgur.com/...', type: 'imgur'}
    const [imageArrayFromIdsHook, setImageArrayFromIdsHook] = useState([])

    // takes all _ids from topsArray, bottomsArray, etc, uses spread operator and combines them.
    // possibly don't have to do this in the useEffect hook?
    const [combinedClothingItemsArrayHook, setCombinedClothingItemsArrayHook] = useState([])
    
    // whether or not we have more than 4 _ids to work with
    const [needsCropHook, setNeedsCropHook] = useState(false)
    
    // original number of _ids we are working with
    const [origLengthHook, setOrigLengthHook] = useState(0)

    // leaving this comment here for fun
    // wow. i understand how hooks work now 4 months later. this was causing re rendering
    // const outfitsArray = useSelector(state => state.outfits.outfitsArray)

    useEffect(() => {

        //can't just run the code because of useEffect quirk
        const loadImages = async () => {
            //convenience
            let outfitArray = item.outfitArr;

            //this is now one big list of IDs
            let combinedClothingItemsArray = [
                ...outfitArray.topsArray,
                ...outfitArray.bottomsArray,
                ...outfitArray.footwearArray,
                ...outfitArray.otherArray
            ]
            
            //used for the '+#' icon
            const origLength = combinedClothingItemsArray.length 

            //used to check if we need the above icon
            const needsCrop = combinedClothingItemsArray.length > 4;

            //we only need to examine the first 3 _ids if we know we are dealing with
            //more than 4 clothingObjects
            if (needsCrop){
                combinedClothingItemsArray = combinedClothingItemsArray.slice(0, 3) // should only include the first 3 terms
            }

            //should replace this. we push this in case of an error.
            let dummySrc = {
                type: '',
                images: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100 % 100 + 1)}.jpg`
            }
    
            //temporary variable we use to update our state hook later
            let imageArrayFromIds = [];
    
            //we don't use combinedClothingItemsArray because we need the topsArray, bottomsArray (keys)
            //because we need to search our redux store for the clothingObjects that correspond to the _id
            //we're searching with
            for (const key of Object.keys(outfitArray)){

                //for each id in our outfits outfitArray
                for (const id of outfitArray[key]){

                    //attempt to find the corresponding clothingObject for our _id
                    const tempClothingObject = closetObject[key].find(clothingObj => clothingObj._id === id);

                    //if we couldn't find the clothingObject
                    if (!tempClothingObject){
                        console.log(`Cannot find clothingObject with id: ${id}`)
                    }

                    //if we find the clothingObject, but it has no images associated with it
                    else if (tempClothingObject.images.images.length === 0){
                        console.log('pushing dummysrc')
                        imageArrayFromIds.push(dummySrc)
                    } 

                    else {

                        //if it's an imgur image, just push it, because we can resize the image by appending
                        //the appropriate letter to the end of the url
                        if (tempClothingObject.images.type === 'imgur'){
                            imageArrayFromIds.push({
                                type: tempClothingObject.images.type,//temp.images.type,
                                images: tempClothingObject.images.images[0] //temp.images.images[0]
                            })
                        } 
                        
                        //we know it is local now. we need to resize it with expo image manipulator
                        else {
                            //expo image manipulator.
                            //scale down to 80x__ (preserve aspect ratio)
                            const manipResult = await ImageManipulator.manipulateAsync(
                                // image.localUri || image.uri
                                tempClothingObject.images.images[0],
                                [{ resize: {width: 80} }],
                                { compress: 0.75, format: ImageManipulator.SaveFormat.JPEG }
                            );

                            //push into imageArrayFromIds
                            //we know at this point it isn't an imgur image, so assuming 'local' is fine
                            imageArrayFromIds.push({
                                type: 'local', //temp.images.type,
                                images: manipResult.uri,  //temp.images.images[0]
                            })
                        }
                    }
                    
                    //if we push as many image objects into our imageArrayFromIds array as
                    //there are images to push, stop pushing (makes sense)
                    if (imageArrayFromIds.length >= combinedClothingItemsArray.length){
                        break;
                    }
                }
            }
    
            // array of all clothingObjects, without the usual divides with topsArray, bottomsArray, etc
            setCombinedClothingItemsArrayHook(combinedClothingItemsArray)

            // array of objects that look like {images: 'https://imgur.com/asdasd', type: 'imgur'}
            // yes, we say 'images' instead of 'image' even though it is a single link
            setImageArrayFromIdsHook(imageArrayFromIds)

            // whether we have more than 4 clothing pieces or not
            setNeedsCropHook(needsCrop)

            // original # of clothing items, so we can properly add the '+#' icon
            setOrigLengthHook(origLength)
        }

        // because we are using the async expo image manupulator, we need to first create the async function,
        // then call it (because we are in useEffect)
        // possible: use useFocusEffect with useCallback instead of useEffect
        loadImages();
        
        // when unloading
        return () => {
            console.log('blurred OutfitList')
        }
    }, [])


    const navigation = useNavigation();

    // The absolutely positioned date and heart badge and the top right
    // <3 11/12/13
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

    // The roughly 180x180 image of the outfit's fitpic on the left
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

    // roughly 80x80 image of an outfit's individual clothing pieces
    // mapped out in PieceView
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
            {imageArrayFromIdsHook[index] ? <Image  
                    key={index}
                    source={
                        imageArrayFromIdsHook[index].type === 'imgur' ? 
                        // Imgur
                            {uri: makeSmallImage(imageArrayFromIdsHook[index].images)} :
                        // Local
                            {uri: imageArrayFromIdsHook[index].images
                        }  
                    } 
                    style={{height: '100%', aspectRatio: 1, borderRadius: 10}} /> : null}
            </View>
        </View>
        )
    })

    // The 1-4 IndividualClothingImage icons mapped out into a 2x2 area
    // adds a '+#' icon if there are more than 4 clothing items
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
                    {/* Maps out the first 1-4 clothing images */}
                    {combinedClothingItemsArrayHook.map((clothingObject, index) => (
                        <IndividualClothingImage key={clothingObject._id} index={index}/>
                        )
                    )}
                    {/* Adds the  '+#' if needed */}
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
                                        {`+${origLengthHook - 3}`}
                                    </Text>
                            </View>
                    </View>
                    ) : null}
                </View>
            </View>
        )
    }, (prevProps, nextProps) => 
            prevProps.outfitArray == nextProps.outfitArray &&
            prevProps.favorite == nextProps.favorite) //memo equal function
    

    
    //RenderOutfit return
    return (
        <View style={{
            height: 200, 
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
                    
                    {/* Fitpic and PiecePreview */}
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
}, (prevProps, nextProps) => prevProps.item == nextProps.item) //memo equal function




/** An outfit is an object
 *  that contains 4 arrays
 *  topsArray, bottomsArray, footwearArray, otherArray */
// onClickFunc looks like:   function (outfitObject) { ... }
export const OutfitList = ({customFilter, onClickFunc}, props) => {
    console.log('OutfitList being re-rendered')

    const navigation = useNavigation()
    const outfitsArray = useSelector(state => state.outfits.outfitsArray);
    const closetObject = useSelector(state => state.closet.closetObject);

    
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
                
                keyExtractor={(obj, index) => obj._id.toString()} 
                showsVerticalScrollIndicator={false}

                // Below are possible optimizations
                removeClippedSubviews={false} // causes FlatList to sometimes not render until scrolled.. so we disabled
                getItemLayout={(data, index) => (
                    {length: 200, offset: 200 * index, index}
                )}
                initialNumToRender={3}
            />
        </View>
    )
}