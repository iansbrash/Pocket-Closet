import React from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    FlatList
} from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import GlobalStyles from '../GlobalComponents/GlobalStyles'
import { HeartIcon } from '../GlobalComponents/GlobalIcons'
import { makeSmallImage, makeMediumImage } from '../GlobalFunctions/ImgurResize'


/** An outfit is an object
 *  that contains 4 arrays
 *  topsArray, bottomsArray, footwearArray, otherArray */
// onClickFunc looks like:   function (outfitObject) { ... }
export const OutfitList = ({outfitsArray, onClickFunc}) => {

    //temp
    let src = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' }

    // const outfitsArray = useSelector(state => state.outfits.outfitsArray);
    const closetObject = useSelector(state => state.closet.closetObject);

    // console.log('closet object:')
    // console.log(closetObject)

    /** An outfit is an object
     *  that contains 4 arrays
     *  topsArray, bottomsArray, footwearArray, otherArray */
    function RenderOutfit ({item})  {

        // let src;

        // if (!item.images || item.images.length === 0){
        //     //very important function
        //     src = { uri: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100 % 100 + 1)}.jpg` } //default replacement image
        // } else {
        //     src = {uri: item.images[0]}
        // }

        //wtf... so apparently item contains a date object, then an outfitArr object (with the arrays)

        

        let outfitArray = item.outfitArr;

        // console.log(item)


        // console.log(item);


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


        //this used to be const but we are pushing to it
        let imageArrayFromIds = [];
        let dummySrc = {
            type: '',
            images: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100 % 100 + 1)}.jpg`
        }


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
                    imageArrayFromIds.push(dummySrc)

                } else if (temp.images.images.length === 0){
                    imageArrayFromIds.push(dummySrc)
                } else {
                    imageArrayFromIds.push({
                        type: temp.images.type,
                        images: temp.images.images[0]
                    })
                }
                
                if (imageArrayFromIds.length >= combinedClothingItemsArray.length){
                    break;
                }
            }
        }

        // console.log(combinedClothingItemsArray)
        

        const navigation = useNavigation();


        return (
            <View style={{
                height: 200, //origLength > 4 ? 200 : 115, //was 120
                width: '100%',
            }}>
                <TouchableOpacity style={[{
                    width: 'auto',
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 5,
                    marginBottom: 5,
                    height: 'auto',
                    backgroundColor: 'white',
                    borderRadius: 10
                }, GlobalStyles.shadowLight]}
                activeOpacity={0.5}
                onPress={() => onClickFunc(item)
                //navigation.navigate("VIEWINDIVIDUALOUTFIT", {item: item}
                }> 
                    <View style={{
                        height: 'auto',
                        width: '100%',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}>
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
                        <View 
                        style={{
                            height: 10, 
                            borderTopLeftRadius: 10, 
                            borderTopRightRadius: 10, 
                            backgroundColor: '#09122b',
                            width: '100%'}}></View>
                        <View style={{
                            //height: 180, //origLength > 4 ? 180 : 95,
                            width: '100%',
                            height: 'auto',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}>
                            <View style={{
                                justifyContent: 'flex-start',
                                alignItems: 'left',
                                flexDirection: 'row',
                                height: 'auto',
                                width: '100%',
                                flexWrap: 'wrap',

                            }}>
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
                                        {combinedClothingItemsArray.map((clothingObject, index) => (
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
                                                    <Image  
                                                        key={index}
                                                        source={
                                                            imageArrayFromIds[index].type === 'imgur' ? 
                                                            {uri: makeSmallImage(imageArrayFromIds[index].images)} :
                                                            {uri: imageArrayFromIds[index].images} 
                                                            // dummySrc.images

                                                        } 
                                                        style={{height: '100%', aspectRatio: 1, borderRadius: 10}} />
                                                </View>
                                            </View>
                                            )
                                        )}
                                        {needsCrop ? (
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
                                                        {/* <PlusIcon size={45} style={GlobalStyles.colorMain}/> */}
                                                        <Text style={[GlobalStyles.h3, {fontWeight: 'bold'}]}>
                                                            {`+${origLength - 3}`}
                                                        </Text>
                                                </View>
                                        </View>
                                        ) : null}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View> 
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{
            width: '100%',
            height: 'auto'
        }}>
            
            <FlatList
                data={outfitsArray}
                renderItem={(object, index) => <RenderOutfit  {...object} />}
                keyExtractor={(obj, index) => obj._id.toString()} //obj._id.. not all obj has _id rn

                // Below are possible optimizations
                removeClippedSubviews={true} // TEMP
                getItemLayout={(data, index) => (
                    {length: 200, offset: 200 * index, index}
                )}
                initialNumToRender={3}
            />
            
        </View>
    )
}