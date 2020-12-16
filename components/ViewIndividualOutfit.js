import React, { useState, useRef, useEffect, useCallback } from 'react'
import { 
    Image, 
    ScrollView, 
    Text, 
    View, 
    Dimensions,
    Vibration,
    Animated,
    Pressable
} from 'react-native'
import { useSelector, useDispatch} from 'react-redux' 
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { TopNavScreenHeader } from './GlobalComponents/TopNav'
import GlobalStyles from './GlobalComponents/GlobalStyles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { 
    HeartIcon, 
    EditIcon, 
    DeleteIcon, 
    BagIcon,
    ShirtIcon,
    LegIcon,
    ShoeIcon,
    ArchiveIcon
 } from './GlobalComponents/GlobalIcons'
import { itemFavoriteToggled, clothingDeletedFromCloset } from '../redux/reducers/closetSlice'
import { outfitDeletedFromOutfits, outfitFavoriteToggled } from '../redux/reducers/outfitsSlice'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { YesNoModal, ImageScrollModal } from './GlobalComponents/GlobalModals'
import { TogglableDrawer } from './GlobalComponents/GlobalDrawers'
import { makeSmallImage, makeMediumImage, makeMediumSmallImage } from './GlobalFunctions/ImgurResize'

const windowWidth = Dimensions.get('window').width;
//edit these instead of numbers in handleScroll
const maxImageHeight = windowWidth - 20; //accounts for margins
const minImageHieght = maxImageHeight / 2;
const desiredIconSizeTwo = 60;






const DisplayClothingTypeFour = React.memo(({fetchedOutfitObject, outfitObject}) => {

    // outfitObject = {outfitArr: {
    //     topsArray: [], bottomsArray: [], footwearArray: [], otherArray: []
    // }}

    const typesArray = useSelector(state => Object.keys(state.closet.typesOfClothing))

    //ok. this works.
    // const [type, setType] = useState(
    //     outfitObject.outfitArr.topsArray.length !== 0 ? 'tops' :
    //         (outfitObject.outfitArr.bottomsArray.length !== 0 ? 'bottoms' : 
    //             (outfitObject.outfitArr.footwearArray.length !== 0 ? 'footwear' : 'other'))
    // );
    const [type, setType] = useState(
        outfitObject.outfitArr.topsArray.length !== 0 ? 'tops' :
            (outfitObject.outfitArr.bottomsArray.length !== 0 ? 'bottoms' : 
                (outfitObject.outfitArr.footwearArray.length !== 0 ? 'footwear' : 'other'))
    );
    
    const dummySrc = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' }

    console.log(fetchedOutfitObject)
    // const topsArray = useSelector(state => state.closet.closetObject.topsArray);
    // const bottomsArray = useSelector(state => state.closet.closetObject.bottomsArray);
    // const footwearArray = useSelector(state => state.closet.closetObject.footwearArray);
    // const otherArray = useSelector(state => state.closet.closetObject.otherArray);
    const navigation = useNavigation();


    // //this works... NOT. wtf
    // useFocusEffect(
    //     // let keys = Object.keys(fetchedOutfitObject.outfitArr)
    //     useCallback(() => {

    //         const toReturn = () => {
    //             let keys = ['tops', 'bottoms', 'footwear', 'other']

    //             console.log(keys)
                
    //             for (let i = 0; i < keys.length; i++){
    //                 if (fetchedOutfitObject.outfitArr[`${keys[i]}Array`].length !== 0){
    //                     setType(keys[i])
    //                     break;
    //                 }
    //             }
    //         }

    //         return () => toReturn()
            
    //     }, [])
    // )
    

    // I just realized that when we store the outfit, it is then constant, and doesn't change when we favorite/edit desciriptn... etc
    const ScrollClothingList = () => {
        return (
            <View style={{width: '100%'}}>
                <ScrollView
                style={{height: 'auto', paddingTop: 5, paddingBottom: 5}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                >
                        {fetchedOutfitObject.outfitArr[`${type}Array`].map(clothingObject => (
                            <ClothingIcon clothingObject={clothingObject}/>
                        ))}
                </ScrollView>
            </View>
        )
    }

    const ClothingIcon = ({clothingObject}) => {


        return (
            <View style={{
                width: 150, // might just have to do this
                height: 'auto',
            }}>
                <TouchableOpacity
                onPress={() => navigation.push('VIEWINDIVIDUALPIECE', {item: clothingObject})}>
                    <View style={[{
                        margin: 5,
                        height: 'auto',
                        width: 'auto',
                        borderRadius: 5,
                        backgroundColor: 'white',
                    }, GlobalStyles.shadowLight]}>
                        <View style={[GlobalStyles.bgColorMain, {width: '100%', borderTopLeftRadius: 5, borderTopRightRadius: 5, height: 5}]}></View>
                        <View style={{
                            margin: 5,
                            width: 'auto',
                            height: 'auto'
                        }}>
                            <Image source={clothingObject.images.images.length !== 0 ? (
                                clothingObject.images.type === 'imgur' ?
                                    {uri: makeMediumSmallImage(clothingObject.images.images[0])} :
                                    {uri: clothingObject.images.images[0]}
                                )
                                : dummySrc} 
                                style={{width: '100%', aspectRatio: 1, borderRadius: 5}}/>
                        </View>
                        <View style={{marginLeft: 5, marginBottom: 5}}>
                            <Text 
                            numberOfLines={1}
                            style={[{fontWeight: 'bold'}, GlobalStyles.h7]}>
                                {clothingObject.clothingName}
                                </Text>
                            <Text style={GlobalStyles.h7}>{clothingObject.pieceType}</Text>
                        </View>
                        <View style={{
                            position: 'absolute',
                            bottom: 5,
                            right: 5,
                            flexDirection: 'row'
                        }}>
                            {clothingObject.archive ? <ArchiveIcon style={GlobalStyles.lighterHint} size={18}/> : null}
                            {clothingObject.favorite ? <HeartIcon style={{color: 'red', marginLeft: 2}} size={18}/> : null}
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }


    const TypesDrawer = ({clothingType, icon, disabled}) => {
        return (
            <View style={{
                width: '25%',
                height: 'auto',
                marginTop: 10,
            }}> 
                <TouchableOpacity
                onPress={() => setType(clothingType)}
                disabled={disabled}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View>
                            {icon}
                            {disabled ? <View style={{
                                position: 'absolute',
                                height: '100%',
                                aspectRatio: 1,
                            }}>
                                <View style={{
                                    marginLeft: 12,
                                    transform: [{ rotate: '45deg'}],
                                    height: '100%',
                                    width: 5,
                                    backgroundColor: '#e6e6e6',
                                    borderWidth: 1,
                                    borderColor: 'white',
                                    borderStyle: 'solid'
                                }}>

                                </View>
                            </View> : null}
                        </View>
                        <View style={[{height: 5, width: '100%', marginTop: 5}, type === clothingType ? GlobalStyles.bgColorMain : {backgroundColor: 'white'}]}></View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
            <View style={{
                justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
            }}>
                <TypesDrawer 
                    disabled={fetchedOutfitObject.outfitArr.topsArray.length === 0}
                    clothingType={'tops'} 
                    icon={<ShirtIcon size={30} 
                        style={fetchedOutfitObject.outfitArr.topsArray.length !== 0 ? 
                            (type === 'tops' ? GlobalStyles.colorMain : {color: 'lightgray'}) : {color: '#ededed'}}/>}/>
                <TypesDrawer 
                    disabled={fetchedOutfitObject.outfitArr.bottomsArray.length === 0}
                    clothingType={'bottoms'}
                    icon={<LegIcon size={30} 
                        style={fetchedOutfitObject.outfitArr.bottomsArray.length !== 0 ? 
                            (type === 'bottoms' ? GlobalStyles.colorMain : {color: 'lightgray'}) : {color: '#ededed'}}/>}/>
                <TypesDrawer 
                    disabled={fetchedOutfitObject.outfitArr.footwearArray.length === 0}
                    clothingType={'footwear'}
                    icon={<ShoeIcon size={30} 
                        style={fetchedOutfitObject.outfitArr.footwearArray.length !== 0  ?
                            (type === 'footwear' ? GlobalStyles.colorMain : {color: 'lightgray'}) : {color: '#ededed'}}/>}/>
                <TypesDrawer 
                    disabled={fetchedOutfitObject.outfitArr.otherArray.length === 0}
                    clothingType={'other'}
                    icon={<BagIcon size={30} 
                        style={fetchedOutfitObject.outfitArr.otherArray.length !== 0 ? 
                            (type === 'other' ? GlobalStyles.colorMain : {color: 'lightgray'}) : {color: '#ededed'}}/>}/>
            </View>
            <View style={{
                width: '100%'
            }}>
                <ScrollClothingList />
            </View>
            
        </View>
    )
} )

const OutfitDescription = ({fetchedOutfitObject, brandsLength, colorsLength}) => {



    const {footwearArray, bottomsArray, topsArray, otherArray} = fetchedOutfitObject.outfitArr;
    const piecesLength = footwearArray.length + 
    bottomsArray.length + 
    topsArray.length + 
    otherArray.length;

    const OutfitDesc = () => {
        return (
            <View style={{
                width: 'auto',
                height: 'auto',
                marginLeft: 10,
                marginRight: 10,
                marginTop: 0,
                marginBottom: 10,
            }}>
                <Text style={[GlobalStyles.lighterHint, GlobalStyles.h5,]}>
                    {fetchedOutfitObject.description && fetchedOutfitObject.description !== '' ? fetchedOutfitObject.description : 'No description.'}
                </Text>
            </View>
        )
    }

    return (
        <View style={{
            width: '100%',
            height: 'auto',
            marginTop: -5
        }}>
            <View style={{
                width: 'auto',
                justifyContent: 'center',
                alignItems:'center',
                flexDirection: 'row'
            }}>
                <Text style={[GlobalStyles.h5, {fontWeight: 'bold'}]}>
                    {`${piecesLength} piece${piecesLength !== 1 ? 's' : ''}`}</Text>
                <Text style={[{fontWeight: 'bold', marginLeft: 5, marginRight: 5}, GlobalStyles.h3, GlobalStyles.lighterHint]}>•</Text>
                <Text style={[GlobalStyles.h5, {fontWeight: 'bold'}]}>{`${brandsLength} brand${brandsLength !== 1 ? 's' : ''}`}</Text>
                <Text style={[{fontWeight: 'bold', marginLeft: 5, marginRight: 5}, GlobalStyles.h3, GlobalStyles.lighterHint]}>•</Text>

                <Text style={[GlobalStyles.h5, {fontWeight: 'bold'}]}>{`${colorsLength} color${colorsLength !== 1 ? 's' : ''}`}</Text>
            </View>
            <TogglableDrawer minHeight={60}>
                <OutfitDesc />
            </TogglableDrawer>
        </View>
    )
}

const OutfitTags = ({fetchedOutfitObject}) => {

    const tagsArray = ['Temp', 'Tags', 'Go', 'Here', 'Please', 'Replace']


    // testing plz delete 
    // if (fetchedOutfitObject.tags.length === 0) {
    //     fetchedOutfitObject.tags.push('i pushed this tag for sanity')
    //     fetchedOutfitObject.tags.push('sanity2')
    //     fetchedOutfitObject.tags.push('SANNY 3')

    // }

    const IndividualTags = ({title}) => {
        return (
            <View style={[{
                width: 'auto',
                padding: 3,
                margin: 3,
                height: 'auto',
                justifyContent: 'center',
                alignItems:'center',
                borderRadius: 5,
            }, GlobalStyles.shadowLight, GlobalStyles.bgColorMain]}>
                <Text style={[{fontWeight: 'bold', color: 'white'}, GlobalStyles.h6, ]}>{title}</Text>
            </View>
        )
    }

    return (
        <TogglableDrawer minHeight={35}>
            <View style={{width: '100%', height: 'auto'}}>
                <View style={{
                    marginLeft: 2,
                    marginRight: 2,
                    width: 'auto'
                }}>
                    <View style={{
                        width: '100%',
                        height: 'auto',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexWrap: 'wrap'
                    }}>
                        {fetchedOutfitObject.tags.map(tag => (
                            <IndividualTags key={tag} title={tag}/>
                        ))}
                    </View>
                </View>
            </View> 
        </TogglableDrawer>
        
    )
}

const BrandTags = ({fetchedOutfitObject, brandsSet}) => {



    const IndividualTags = ({title}) => {
        return (
            <View style={[{
                width: 'auto',
                padding: 5,
                margin: 5,
                height: 'auto',
                justifyContent: 'center',
                alignItems:'center',
                borderRadius: 5,
                backgroundColor: 'white'
            }, GlobalStyles.shadowLight, ]}>
                <Text style={[{fontWeight: 'bold',}, GlobalStyles.h5, GlobalStyles.colorMain ]}>{title}</Text>
            </View>
        )
    }

    return (
        <TogglableDrawer minHeight={88}>
            {[...brandsSet].map(tag => <IndividualTags key={tag} title={tag}/>)}
        </TogglableDrawer>   
    )
}



const TopButtonsStyleTwo = ({outfitObject, setModalVisible}) => {


    // the outfitObject is going to be the original
    // i.e. the arrays are filled with IDs, not clothingObjects
    const [isFavorited, setIsFavorited] = useState(outfitObject.favorite)
    const dispatch = useDispatch();
    const navigation = useNavigation();


    const ToggleFavorite = () => {
        setIsFavorited(!isFavorited)
        dispatch(outfitFavoriteToggled(outfitObject._id))

    }

    const EditOutfit = () => {

    }

    const DeleteOutfitButtonPressed = () => {
        Vibration.vibrate(400)
        setModalVisible(true)
        console.log("in deltetOutfitButtonPressed")
    }


    const IndividualThirdButton = ({title, icon, onPressFunc}) => {
        return (
            <View style={{
                height: '33.3%',
                width: '100%'
            }}>
                <TouchableOpacity
                onPress={() => onPressFunc()}>
                    <View style={[{
                        margin: 5,
                        height: 'auto',
                        width: 'auto',
                        borderRadius: 5,
                        backgroundColor: 'white'
                    }, GlobalStyles.shadowLightest]}>
                        <View style={{
                            height: '100%',
                            width: '100%',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <View style={{
                                height: '100%',
                                aspectRatio: 1,
                                marginLeft: 5,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                {icon}
                            </View>
                            <View style={{
                                marginRight: 10
                            }}>  
                                <Text style={[{
                                    fontWeight: 'bold'
                                }, GlobalStyles.h4]}>
                                    {title}
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={{
            width: 'auto',
        }}>
            <View style={{
                width: '100%',
                aspectRatio: 1,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <IndividualThirdButton 
                    title={'Favorite'} 
                    icon={<HeartIcon 
                        style={[isFavorited ? {color: 'red'} : GlobalStyles.colorMain]} 
                        size={35} />}
                    onPressFunc={() => ToggleFavorite()}/>
                <IndividualThirdButton 
                    title={'Edit'} 
                    icon={<EditIcon style={[GlobalStyles.colorMain]} 
                    size={35} />}
                    onPressFunc={() => null}/>
                <IndividualThirdButton 
                    title={'Delete'} 
                    icon={<DeleteIcon style={[GlobalStyles.colorMain]} 
                    size={35} />}
                    onPressFunc={() => DeleteOutfitButtonPressed()}/>
            </View>
        </View>
    )
}


export const ViewIndividualOutfit = ({ route }) => {
    
    const [modalVisible, setModalVisible] = useState(false);
    const [imageModal, setImageModal] = useState(false);
    //const [previouslyIterated, setPreviouslyIterated] = useState(false)

    // we pass in the item we clicked on so we can display stats XDDDD
    // dont think this is the problem to the readonly property problem
    const closetObject = useSelector(state => state.closet.closetObject);

    //we are just sweeping a problem under the rug here... was initially const but we sometimes edit it
    //i.e. we change fitpic to the dummy src if we don't have an imgur url there for convenience
    //so we don't need any logic to chcek if the fitpic is empty when we load it into the <Image />
    let outfitObject = route.params.item;

    //creating only the outfitArr as a hook should hopefully make it 
    //easier to add the full clothingObjects to the fetchedOutfitObject
    const [outfitArr, setOutfitArr] = useState({
        topsArray: [],
        bottomsArray: [],
        footwearArray: [],
        otherArray: []
    })

    // this is so fked... definitely causes re renders in each componenet bc not a useState hook
    let fetchedOutfitObject = {
        date: outfitObject.date,
        fitpic: outfitObject.fitpic && outfitObject.fitpic !== '' ? outfitObject.fitpic : null,
        tags: outfitObject.tags ? outfitObject.tags : [],
        _id: outfitObject._id,
        description: outfitObject.description,
        outfitArr: outfitArr //this is the hook we just made
    };
    //what if we made a hook for each property... and just combined them in the end
    const [date, setDate] = useState(outfitObject.date)
    const [fitpic, setFitpic] = useState(outfitObject.fitpic && outfitObject.fitpic !== '' ? outfitObject.fitpic : null)
    const [tags, setTags] = useState(outfitObject.tags ? outfitObject.tags : [])
    const [_id, set_Id] = useState(outfitObject._id)
    const [description, setDescription] = useState(outfitObject.description)



    // console.log('ok we just instantiated the fetchedOO')
    // console.log(fetchedOutfitObject)
    const [brandsSet, setBrandsSet] = useState(new Set())
    const [colorsSet, setColorsSet] = useState(new Set())


    //trying to replace let fetchedoutfitobject
    const [fetchedOutfitObjectHook, setFetchedOutfitObjectHook] = useState({
        _id: '213',
        description: 'no',
        fitpic: {
            fitpic: '',
            type: ''
        },
        date: '1234123',
        tags: [],
        outfitArr: {
            topsArray: [],
            bottomsArray: [],
            footwearArray: [],
            otherArray: []
        }
    })


    //this prevents screens that are in the navigation stack from updating, even when blurred
    //without this, visiting multiple outfits / clothing pieces consecutively though their
    //respective ViewIndividual_____ screens, then updating the redux state (i.e. favoriting)
    //causes each screen in the stack to rerender, sometimes casuing a stack overflow and completely
    //crashing the phone / emulator
    const [isFocused, setIsFocused] = useState(true)
    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused

            setIsFocused(true)

            //resets outfitArr hook in case we refresh(dev) or update items (i.e. favorite, delete)
            setOutfitArr(null)
            let tempOutfitArr = {
                topsArray: [],
                bottomsArray: [],
                footwearArray: [],
                otherArray: []
            }

            let fetchedOutfitObject = {
                date: outfitObject.date,
                fitpic: outfitObject.fitpic ? outfitObject.fitpic : 'https://randomuser.me/api/portraits/men/1.jpg',
                tags: outfitObject.tags ? outfitObject.tags : [],
                outfitArr: tempOutfitArr ///outfitArr //this is the hook we just made
            };
            
            //populates fetchedOutfitObject's outfitArr
            //i.e. it fills the arrays with clothingObjects, not _id's
            const outfitArrKeys = Object.keys(fetchedOutfitObject.outfitArr)
            for (let i = 0; i < outfitArrKeys.length; i++){
                for (let k = 0; k < outfitObject.outfitArr[outfitArrKeys[i]].length; k++){
                    let toAddClothingObject = closetObject[outfitArrKeys[i]].find(clothingObject =>
                        clothingObject._id === outfitObject.outfitArr[outfitArrKeys[i]][k])
                    let newArray = tempOutfitArr[outfitArrKeys[i]];
                    newArray.push(toAddClothingObject)
                }
            }

            //gets the set of Brands... and the colors
            const fetchedOutfitObjectOutfitArrKeys = Object.keys(fetchedOutfitObject.outfitArr)

            //these used to be const... but we're adding to then... might be the solution to readonly problem
            let nonStateBrandsSet = new Set();
            let nonStateColorsSet = new Set();
            for (let i = 3; i >= 0; i--){
                for (let k = 0; k < fetchedOutfitObject.outfitArr[fetchedOutfitObjectOutfitArrKeys[i]].length; k++){
                    //console.log(`'xd' iteration ${k}`)
                    if (fetchedOutfitObject.outfitArr[fetchedOutfitObjectOutfitArrKeys[i]][k].color &&
                        fetchedOutfitObject.outfitArr[fetchedOutfitObjectOutfitArrKeys[i]][k].color !== ''){
                        nonStateColorsSet.add(fetchedOutfitObject.outfitArr[fetchedOutfitObjectOutfitArrKeys[i]][k].color)
                    }
                    if (fetchedOutfitObject.outfitArr[fetchedOutfitObjectOutfitArrKeys[i]][k].brandName && fetchedOutfitObject.outfitArr[fetchedOutfitObjectOutfitArrKeys[i]][k].brandName.length != 0){
                        nonStateBrandsSet.add(fetchedOutfitObject.outfitArr[fetchedOutfitObjectOutfitArrKeys[i]][k].brandName[0])
                    }
                }
            }
            setFetchedOutfitObjectHook({
                _id: outfitObject._id,
                date: outfitObject.date,
                description: outfitObject.description,
                fitpic: outfitObject.fitpic,
                tags: outfitObject.tags,
                outfitArr: tempOutfitArr

            })
            setOutfitArr(tempOutfitArr)
            setBrandsSet(nonStateBrandsSet)
            setColorsSet(nonStateColorsSet)

            return () => {
                setIsFocused(false)

            // Do something when the screen is unfocused
            // Useful for cleanup functions
            };
        }, [])
    );


    
    // this is unneccesarily called every time something re renders... XD
    // wow i think i fixed it
    // // 12/16: I feel like this should be useFocusEffect
    // useEffect(() => {
    //     //resets outfitArr hook in case we refresh(dev) or update items (i.e. favorite, delete)
    //     setOutfitArr(null)
    //     let tempOutfitArr = {
    //         topsArray: new Array(),
    //         bottomsArray: new Array(),
    //         footwearArray: new Array(),
    //         otherArray: new Array()
    //     }

    //     fetchedOutfitObject = {
    //         date: outfitObject.date,
    //         fitpic: outfitObject.fitpic ? outfitObject.fitpic : 'https://randomuser.me/api/portraits/men/1.jpg',
    //         tags: outfitObject.tags ? outfitObject.tags : [],
    //         outfitArr: tempOutfitArr ///outfitArr //this is the hook we just made
    //     };
        
    //     //populates fetchedOutfitObject's outfitArr
    //     //i.e. it fills the arrays with clothingObjects, not _id's
    //     const outfitArrKeys = Object.keys(fetchedOutfitObject.outfitArr)
    //     for (let i = 0; i < outfitArrKeys.length; i++){
    //         for (let k = 0; k < outfitObject.outfitArr[outfitArrKeys[i]].length; k++){
    //             let toAddClothingObject = closetObject[outfitArrKeys[i]].find(clothingObject =>
    //                 clothingObject._id === outfitObject.outfitArr[outfitArrKeys[i]][k])
    //             let newArray = tempOutfitArr[outfitArrKeys[i]];
    //             newArray.push(toAddClothingObject)
    //         }
    //     }

    //     //gets the set of Brands... and the colors
    //     const fetchedOutfitObjectOutfitArrKeys = Object.keys(fetchedOutfitObject.outfitArr)

    //     //these used to be const... but we're adding to then... might be the solution to readonly problem
    //     let nonStateBrandsSet = new Set();
    //     let nonStateColorsSet = new Set();
    //     for (let i = 3; i >= 0; i--){
    //         for (let k = 0; k < fetchedOutfitObject.outfitArr[fetchedOutfitObjectOutfitArrKeys[i]].length; k++){
    //             //console.log(`'xd' iteration ${k}`)
    //             if (fetchedOutfitObject.outfitArr[fetchedOutfitObjectOutfitArrKeys[i]][k].color &&
    //                 fetchedOutfitObject.outfitArr[fetchedOutfitObjectOutfitArrKeys[i]][k].color !== ''){
    //                 nonStateColorsSet.add(fetchedOutfitObject.outfitArr[fetchedOutfitObjectOutfitArrKeys[i]][k].color)
    //             }
    //             if (fetchedOutfitObject.outfitArr[fetchedOutfitObjectOutfitArrKeys[i]][k].brandName && fetchedOutfitObject.outfitArr[fetchedOutfitObjectOutfitArrKeys[i]][k].brandName.length != 0){
    //                 nonStateBrandsSet.add(fetchedOutfitObject.outfitArr[fetchedOutfitObjectOutfitArrKeys[i]][k].brandName[0])
    //             }
    //         }
    //     }
    //     setOutfitArr(tempOutfitArr)
    //     setBrandsSet(nonStateBrandsSet)
    //     setColorsSet(nonStateColorsSet)
    // }, [closetObject])


    
    
    

    
    // hook whether image is small
    const [imageIsSmall, setImageIsSmall] = useState(false)

    // value we use to animate the Animated.View
    const [imageWidth] = useState(new Animated.Value(1))
    

    const dummySrc = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' }
    

    // const image = useRef(null) //might be useless
    const navigation = useNavigation();
    const dispatch = useDispatch();

    //called when confirming delete on modal
    const ConfirmDelete = () => {
        console.log("Delete confirmed")
        setModalVisible(false)
        //dispatch(clothingDeletedFromCloset({...item}))
        dispatch(outfitDeletedFromOutfits(outfitObject._id))
        navigation.navigate('CLOSETSCREEN')
    }

   
    //makes image small
    const onSwipeUp = (gestureState) => {
        setImageIsSmall(true);
        Animated.timing(imageWidth, {
            toValue: Number(false),
            duration: 250,
            useNativeDriver: false
        }).start();
    }
    //makes image big
    const onSwipeDown = (gestureState) => {
        setImageIsSmall(false);
        Animated.timing(imageWidth, {
            toValue: Number(true),
            duration: 250,
            useNativeDriver: false
        }).start();
    }

    

    return (
        <View 
        style={{flex: 1, backgroundColor: 'white'}}>
            <TopNavScreenHeader title={new Date(outfitObject.date).toDateString()} exitDestination={'CLOSETSCREEN'}/>
            
            {/* Modal that shows when we want to delete the outfit... in progress */}
            <YesNoModal 
                title={'Delete Outfit?'}
                modalVisible={modalVisible} 
                setModalVisible={setModalVisible} 
                onPressFunc={() => ConfirmDelete()}/>
            <ImageScrollModal 
                modalVisible={imageModal}
                setModalVisible={setImageModal}
                title={'Title XD'}
                imageArray={[outfitObject.fitpic.fitpic]}/>
            
            
            {/* GestureRecognizers allow us to swipe up/down to make the fitpic image big/small */}
            <GestureRecognizer
            onSwipeUp={state => onSwipeUp()}
            onSwipeDown={state => onSwipeDown()}
            >
            
                {/* This is the image, wrapped in an Animated.View to make it big/small */}
                <View style={{
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    margin: 5
                }}>
                    <Animated.View style={{
                        width: imageWidth.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['50%', '100%']
                        })
                    }}>
                        <View style={[{
                            margin: 5,
                            width: 'auto',
                            borderRadius: 5
                        }, GlobalStyles.shadowLightest]}>
                        
                            <Pressable
                            onPress={() => setImageModal(true)}>
                                <Image //ref={image} //I think this is useless here, delete later
                                    source={outfitObject.fitpic !== ''
                                            && outfitObject.fitpic.fitpic !== '' ? (
                                                outfitObject.fitpic.type === 'imgur' ?
                                                {uri: makeMediumImage(outfitObject.fitpic.fitpic)} 
                                                : {uri: outfitObject.fitpic.fitpic}
                                            ) : dummySrc} 
                                    style={[{
                                        width: '100%',//'imageHeight',
                                        aspectRatio: 1,
                                        borderRadius: 5
                                    },]} 
                                />
                            </Pressable>
                            
                            
                        </View>
                    </Animated.View>
                    <Animated.View style={{
                        width: imageWidth.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['50%', '100%']
                        })
                    }}>
                        <TopButtonsStyleTwo outfitObject={outfitObject} setModalVisible={setModalVisible}/>
                    </Animated.View>
                </View>
                    
            </GestureRecognizer>

            {/* GestureRecognizers allow us to swipe up/down to make the fitpic image big/small */}
            <GestureRecognizer
            onSwipeUp={state => onSwipeUp()}
            onSwipeDown={state => onSwipeDown()}
            >
                <OutfitDescription 
                    fetchedOutfitObject={fetchedOutfitObject} 
                    brandsLength={brandsSet.size}
                    colorsLength={colorsSet.size}/>
            </GestureRecognizer>

            {/* GestureRecognizers allow us to swipe up/down to make the fitpic image big/small */}
            <GestureRecognizer
            onSwipeUp={state => onSwipeUp()}
            onSwipeDown={state => onSwipeDown()}
            >
                <OutfitTags fetchedOutfitObject={fetchedOutfitObject}/>
            </GestureRecognizer>

            {/* GestureRecognizers allow us to swipe up/down to make the fitpic image big/small */}
            <GestureRecognizer
            onSwipeUp={state => onSwipeUp()}
            onSwipeDown={state => onSwipeDown()}
            >
                <BrandTags fetchedOutfitObject={fetchedOutfitObject} brandsSet={brandsSet}/>
            </GestureRecognizer>


            {/* This is the 4 drawers, and the icons that show underneath them */}
            {isFocused ? 
                <DisplayClothingTypeFour 
                    //fetchedOutfitObject={fetchedOutfitObject} //can replace this with an object containing all the hooks i made?
                    // fetchedOutfitObject={{_id, description, fitpic, date, tags, outfitArr}}
                    fetchedOutfitObject={fetchedOutfitObjectHook}
                    outfitObject={route.params.item} /> //this might cause errors, because when navigating backwards, sometimes route.params isn't available
                    //dont think the below is causing re renders
                    
                    : null}
        </View>
    )
}