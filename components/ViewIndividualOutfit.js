import React, { useState, useRef, useEffect } from 'react'
import { 
    Image, 
    ScrollView, 
    Text, 
    View, 
    Dimensions,
    Alert,
    Vibration,
    FlatList,
    Animated
} from 'react-native'
import { useSelector, useDispatch} from 'react-redux' 
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import { TopNav, TopNavScreenHeader } from './GlobalComponents/TopNav'
import { ScreenHeader } from './GlobalComponents/ScreenHeader'
import GlobalStyles from './GlobalComponents/GlobalStyles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { HeartIcon, EditIcon, DeleteIcon, ShareIcon, CheckIcon, XIcon,
    BagIcon,
    ShirtIcon,
    LegIcon,
    ShoeIcon } from './GlobalComponents/GlobalIcons'
import { Children } from 'react'
import { itemFavoriteToggled, clothingDeletedFromCloset } from '../redux/reducers/closetSlice'
import { useNavigation } from '@react-navigation/native'
import { YesNoModal } from './GlobalComponents/GlobalModals'
import { MiniScreenHeader } from './GlobalComponents/ScreenHeader'

const windowWidth = Dimensions.get('window').width;
//edit these instead of numbers in handleScroll
const maxImageHeight = windowWidth - 20; //accounts for margins
const minImageHieght = maxImageHeight / 2;
const desiredIconSize = 40;
const desiredIconSizeTwo = 60;
const scrollEventThrottleValue = 16;




const ItemStats = ({item}) => {


    //const timesWorn = item.timesWorn;

    const Stat = ({stat, value}) => {

        if (!value) value = 'N/A'

        return (
            <View style={{
                height: 'auto',
                width: '100%'
            }}>
                <View style={{
                    margin: 5,
                    width: 'auto',
                    height: 'auto',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                }}>
                    <Text style={[{fontWeight: 'bold'}, GlobalStyles.colorMain, GlobalStyles.h3, ]}>
                        {`${stat}: `}
                    </Text>
                    <Text style={GlobalStyles.hint, GlobalStyles.h4}>
                        {value}
                    </Text>
                </View>
            </View>
        )
    }

    const StatHolder = (props) => {
        return (
            <View style={{
                margin: 5,
                width: 'auto',
                height: 'auto',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}>
                <View 
                style={[{height: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10, width: '100%'}, GlobalStyles.bgColorMain]}></View>
                <View style={[{
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    width: '100%',
                    height:'auto',
                    backgroundColor: 'white'
                }, GlobalStyles.shadowLight]}>
                    {props.children}
                </View>
            </View>
        )
    }

    return (
        <View style={{
            width: '100%',
            height: 'auto',
        }}>
            <StatHolder>
                <Stat stat={"Name"} value={item.clothingName} />
                <Stat stat={"Type"} value={
                    item.pieceType ? item.pieceType : item.clothingType} />
                <Stat stat={"Color"} value={item.color} />
                <Stat stat={"Brands"} value={item.brandName[0]} />
                
                
                <Stat stat={"Description"} value={
                    item.description
                } />
            </StatHolder>  
            <View style={{height: 25}}></View>
            <StatHolder>
                <Stat stat={"Times Worn"} value={item.timesWorn} />
                <Stat stat={"Price"} value={
                    item.price
                } />
            </StatHolder> 
            <View style={{height: 25}}></View>
        </View>
    )
}

// const IndividualTag = ({tag}) => {
//     return (
//         <View style={[{
//             width: 'auto',
//             height: 'auto',
//             borderRadius: 5,
//             paddingLeft: 5,
//             paddingRight: 5,
//             margin: 5,
//             elevation: 3
//         }, GlobalStyles.bgColorMain]} >
//             <Text  status='control' style={[{fontWeight: 'bold', color: 'white', margin: 5}, GlobalStyles.h4]}>
//                 {tag.toUpperCase()}
//             </Text>
//         </View>
//     )
// }

const ItemTags = ({item}) => {

    if (!item.tags) { return null}

    return (
        <View style={{
            width: '100%',
            height: 'auto',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
            //margin: 5
        }}>
            {item.tags.map((tag) => (
                <IndividualTag tag={tag}/>
            ))}
        </View>
    )
}


const ButtonsStyleTwo = ({imageHeight, outfitObject, setModalVisible}) => {

    const [favorited, setFavorited] = useState(outfitObject.favorite)
    const dispatch = useDispatch();

    const FourButton = ({icon, onPressFunc}) => {
        return (
            <View style={{
                width: '50%',
                height: '50%',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View style={{margin: 5, height: 'auto', width: 'auto'}}>
                    <TouchableOpacity style={[{
                        aspectRatio: 1,
                        borderRadius: 10,
                        height: '100%',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white'
                    }, GlobalStyles.shadowLight]}
                    onPress={() => onPressFunc()}>
                        {icon}
                    </TouchableOpacity>
                </View>
            </View>
            
        )
    }

    const FavoriteFunc = () => {
        setFavorited(!favorited)
        //toggles favorite
        dispatch(itemFavoriteToggled({
            clothingType: item.clothingType,
            _id: item._id
        }));
    }
    const DeleteFunc = () => {
        Vibration.vibrate(400)
        setModalVisible(true);
    }
    const EditFunc = () => {

    }
    
    return (
        <View style={[{
            //backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            height: '100%',
            borderRadius: 10,
            width: '100%',
            opacity: 1 - (imageHeight - minImageHieght) / minImageHieght
        }, ]}>
            <FourButton 
            icon={<HeartIcon style={favorited ? {color: 'red'} : {color: 'black'}} size={(imageHeight * desiredIconSizeTwo) / minImageHieght}/>}
            onPressFunc={FavoriteFunc}/>

            <FourButton 
            icon={<EditIcon size={(imageHeight * desiredIconSizeTwo) / minImageHieght}/>}
            onPressFunc={EditFunc}/>

            <FourButton 
            icon={<ShareIcon size={(imageHeight * desiredIconSizeTwo) / minImageHieght}/>}
            onPressFunc={null}/>

            <FourButton 
            icon={<DeleteIcon size={(imageHeight * desiredIconSizeTwo) / minImageHieght}/>}
            onPressFunc={DeleteFunc}/>


        </View>
    )
}

const ClothingDisplayStyleOne = ({outfitObject}) => {

    const dummySrc = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' }
    const navigation = useNavigation();

    return (
        
        <View>
            {Object.keys(outfitObject.outfitArr).map(key => (
                outfitObject.outfitArr[key].length !== 0 ?
                <View style={{
                    width: '100%'
                }}>
                    <View 
                        style={{
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                            width: 'auto',
                            margin: 5
                        }}>
                            <View style={[{
                                position: 'absolute',
                                width: 'auto',
                                height: 'auto',
                                borderRadius: 10,
                                top: 0,
                                right: 0,
                                zIndex: 3,
                                padding: 5
                            }, GlobalStyles.bgColorMain]}>
                                <Text style={[{color: 'white', fontWeight: 'bold'}, GlobalStyles.h5]}>
                                    {outfitObject.outfitArr[key][0].clothingType}
                                </Text>
                            </View>
                            
                        {outfitObject.outfitArr[key].map(clothingObject => (
                            <View style={{
                                width: '33.3%',
                                aspectRatio: 1
                            }}>
                                <View style={{
                                    height: '100%',
                                    width: '100%'
                                }}>
                                    <View style={[{
                                        flex: 1, // IS THIS BEST PRACTICE??? IS THIS SPAGHETTI CODE???
                                        margin: 5,
                                        borderRadius: 10,
                                        backgroundColor: 'white'
                                    }, GlobalStyles.shadowLight]}>
                                        <TouchableOpacity
                                        onPress={() => navigation.navigate("VIEWINDIVIDUALPIECE", {item: clothingObject})}>
                                            <Image source={
                                                clothingObject.images.length !== 0 ?
                                                {uri: clothingObject.images[0]} :
                                                dummySrc}
                                            style={{height: '100%', width: '100%', borderRadius: 10}}/>
                                        </TouchableOpacity>
                                        
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
                
                : null
            ))}

        </View>
            
        
    )
}

const DisplayClothingTypeTwo = ({outfitObject}) => {

    const navigation = useNavigation();
    const dummySrc = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' }
    const combinedClothingArray = [
        ...outfitObject.outfitArr.topsArray,
        ...outfitObject.outfitArr.bottomsArray,
        ...outfitObject.outfitArr.footwearArray,
        ...outfitObject.outfitArr.otherArray
    ]

    const renderItem = ({item}) => {
        const clothingObject = item;
        return (
            <View style={{
                width: '33.3%',
                aspectRatio: 1
            }}>
                <View style={{
                    height: '100%',
                    width: '100%'
                }}>
                    <View style={[{
                        flex: 1, // IS THIS BEST PRACTICE??? IS THIS SPAGHETTI CODE???
                        margin: 5,
                        borderRadius: 10,
                        backgroundColor: 'white'
                    }, GlobalStyles.shadowLight]}>
                        <TouchableOpacity
                        onPress={() => navigation.navigate("VIEWINDIVIDUALPIECE", {item: clothingObject})}>
                            <Image source={
                                clothingObject.images.length !== 0 ?
                                {uri: clothingObject.images[0]} :
                                dummySrc}
                            style={{height: '100%', width: '100%', borderRadius: 10}}/>
                        </TouchableOpacity>
                        
                    </View>
                </View>
            </View>
        )
    }


    return (
        <View style={{
            width: '100%',
        }}>
            <View 
                style={{
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    width: 'auto',
                    aspectRatio: 1.50
                }}>
                    <View style={[{
                        position: 'absolute',
                        width: 'auto',
                        height: 'auto',
                        borderRadius: 10,
                        top: 0,
                        right: 0,
                        zIndex: 3,
                        padding: 5
                    }, GlobalStyles.bgColorMain]}>
                        <Text style={[{color: 'white', fontWeight: 'bold'}, GlobalStyles.h5]}>
                            {'asd'}
                        </Text>
                    </View>
                    <ScrollView
                    style={{
                        height: '100%',
                        padding: 5
                    }}
                    horizontal={true}>
                        <View style={{
                            height: '100%',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            flexWrap: 'wrap',
                            flexDirection: 'column',
                            width: '100%'
                        }}>
                            {combinedClothingArray.map(clothingObject => (
                                <View style={{
                                    //width: '33.3%',
                                    height: '50%',
                                    aspectRatio: 1,
                                    
                                    backgroundColor: 'pink'
                                }}>
                                    <View style={{
                                        aspectRatio: 1,
                                    }}>
                                        <View style={[{
                                            flex: 1, // IS THIS BEST PRACTICE??? IS THIS SPAGHETTI CODE???
                                            margin: 5,
                                            borderRadius: 10,
                                            backgroundColor: 'white'
                                        }, GlobalStyles.shadowLight]}>
                                            <TouchableOpacity
                                            onPress={() => navigation.navigate("VIEWINDIVIDUALPIECE", {item: clothingObject})}>
                                                <Image source={
                                                    clothingObject.images.length !== 0 ?
                                                    {uri: clothingObject.images[0]} :
                                                    dummySrc}
                                                style={{height: '100%', width: '100%', borderRadius: 10}}/>
                                            </TouchableOpacity>
                                            
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                    
                    

                    
            </View>
        </View>
    )
}


const DisplayClothingTypeThree = ({outfitObject}) => {


    const [type, setType] = useState('')

    const ChooseClothingTypeButton = ({clothingType}) => {

        const isSelected = type === clothingType;

        return (
            <TouchableOpacity style={[{
                margin: 5,
                width: 'auto',
                height: 'auto',
                borderRadius: 5,
                // borderWidth: 1,
                // borderColor: 'black',
                // borderStyle: 'solid'
            }, GlobalStyles.shadowLight, isSelected ? GlobalStyles.bgColorMain : {backgroundColor: 'white'}]}
            onPress={() => setType(clothingType)}>
                <View style={[{width: '100%', height: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5}, isSelected ? {backgroundColor: 'white'} : GlobalStyles.bgColorMain]}></View>
                <Text style={[isSelected ? {color: 'white'} : GlobalStyles.colorMain, GlobalStyles.h5, {fontWeight: 'bold', padding: 5}]}>
                    {clothingType}
                </Text>
            </TouchableOpacity >
        )
    }

    return (
        <View style={{width: '100%'}}>
            <Text style={[GlobalStyles.h3, {fontWeight: 'bold', marginLeft: 5}]}>Tap to view</Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems:'center',
                height: 'auto',
                width: '100%'
            }}>
                <ChooseClothingTypeButton clothingType={'tops'}/>
                <ChooseClothingTypeButton clothingType={'bottoms'}/>
                <ChooseClothingTypeButton clothingType={'footwear'}/>
                <ChooseClothingTypeButton clothingType={'other'}/>
            </View>
            

        </View>
    )
}

const DisplayClothingTypeFour = ({outfitObject, icon}) => {
    const typesArray = useSelector(state => Object.keys(state.closet.typesOfClothing))
    const [type, setType] = useState('tops');
    const dummySrc = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' }

    // const topsArray = useSelector(state => state.closet.closetObject.topsArray);
    // const bottomsArray = useSelector(state => state.closet.closetObject.bottomsArray);
    // const footwearArray = useSelector(state => state.closet.closetObject.footwearArray);
    // const otherArray = useSelector(state => state.closet.closetObject.otherArray);
    const closetObject = useSelector(state => state.closet.closetObject)
    const navigation = useNavigation();

    //this is an array of all the IDs... not so useful
    // const combinedClothingArray = [
    //     ...outfitObject.outfitArr.topsArray,
    //     ...outfitObject.outfitArr.bottomsArray,
    //     ...outfitObject.outfitArr.footwearArray,
    //     ...outfitObject.outfitArr.otherArray
    // ]

    



    // I just realized that when we store the outfit, it is then constant, and doesn't change when we favorite/edit desciriptn... etc
    const ScrollClothingList = () => {
        return (
            <View style={{width: '100%'}}>
                <ScrollView
                style={{height: 'auto', paddingTop: 5, paddingBottom: 5}}
                horizontal={true}>
                    
                        {outfitObject.outfitArr[`${type}Array`].map(id => (
                            <ClothingIcon clothingObject={closetObject[`${type}Array`].find(
                                clothingObject => clothingObject._id === id
                            )}/>
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
                onPress={() => navigation.navigate('VIEWINDIVIDUALPIECE', {item: clothingObject})}>
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
                            <Image source={typeof clothingObject.images === 'object' && clothingObject.images.length !== 0 ? 
                                {uri: clothingObject.images[0]} : dummySrc} style={{width: '100%', aspectRatio: 1, borderRadius: 5}}/>
                        </View>
                        <View style={{marginLeft: 5, marginBottom: 5}}>
                            <Text style={[{fontWeight: 'bold'}, GlobalStyles.h7]}>{clothingObject.clothingName}</Text>
                            <Text style={GlobalStyles.h7}>{clothingObject.pieceType}</Text>
                        </View>
                        <View style={{
                            position: 'absolute',
                            bottom: 5,
                            right: 5
                        }}>
                            <HeartIcon style={{color: clothingObject.favorite ? 'red' : 'black'}} size={20}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }


    const TypesDrawer = ({clothingType, icon}) => {
        return (
            <View style={{
                width: '25%',
                height: 'auto',
                marginTop: 10,
            }}> 
                <TouchableOpacity
                onPress={() => setType(clothingType)}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View>
                            {icon}
                        </View>
                        <View style={[{height: 5, width: '100%', marginTop: 5}, type === clothingType ? GlobalStyles.bgColorMain : {backgroundColor: 'white'}]}></View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <View style={{
                justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
            }}>
                <TypesDrawer clothingType={'tops'} 
                    icon={<ShirtIcon size={30} style={type === 'tops' ? GlobalStyles.colorMain : {color: 'lightgray'}}/>}/>
                <TypesDrawer clothingType={'bottoms'}
                    icon={<LegIcon size={30} style={type === 'bottoms' ? GlobalStyles.colorMain : {color: 'lightgray'}}/>}/>
                <TypesDrawer clothingType={'footwear'}
                    icon={<ShoeIcon size={30} style={type === 'footwear' ? GlobalStyles.colorMain : {color: 'lightgray'}}/>}/>
                <TypesDrawer clothingType={'other'}
                    icon={<BagIcon size={30} style={type === 'other' ? GlobalStyles.colorMain : {color: 'lightgray'}}/>}/>
            </View>
            <View style={{
                width: '100%'
            }}>
                <ScrollClothingList />
            </View>
            
        </View>
    )
} 

const OutfitDescription = ({fetchedOutfitObject, brandsLength, colorsLength}) => {
    const {footwearArray, bottomsArray, topsArray, otherArray} = fetchedOutfitObject.outfitArr;
    const piecesLength = footwearArray.length + 
    bottomsArray.length + 
    topsArray.length + 
    otherArray.length;
    return (
        <View style={{
            width: '100%',
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
            <View style={{
                width: 'auto',
                marginLeft: 10,
                marginRight: 10,
                marginTop: 0,
                marginBottom: 10
            }}>
                <Text style={[GlobalStyles.lighterHint, GlobalStyles.h5]}>
                    {`The user's description goes here. If they said anything about the outfit, it'll be under the initial stats.`}
                </Text>
            </View>
        </View>
    )
}

const OutfitTags = ({fetchedOutfitObject}) => {

    const tagsArray = ['Temp', 'Tags', 'Go', 'Here', 'Please', 'Replace']


    // testing plz delete 
    if (fetchedOutfitObject.tags.length === 0) fetchedOutfitObject.tags.push('i pushed this tag for sanity')

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
        <View style={{width: '100%', height: 'auto'}}>
            <View style={{
                marginLeft: 10,
                marginRight: 10,
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
                        <IndividualTags title={tag}/>
                    ))}
                </View>
            </View>
        </View>
    )
}

const BrandTags = ({fetchedOutfitObject, brandsSet}) => {
    const brandsArray = ['Supreme', 'Guess', 'American Eagle', 'Nike', 'Jordan', 'Please', 'Change', ]
    //const [brandsSet, setBrandsSet] = useState(new Set())

    //const nonStateSet = new Set();

    // called to create the set. stops re rendering
    //const fetchedOutfitObjectOutfitArrKeys = Object.keys(fetchedOutfitObject.outfitArr)
    
        
    //console.log(`nonStateSet.size: ${nonStateSet.size}`)


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
        <View style={{width: '100%', height: 'auto'}}>
            <View style={{
                marginLeft: 10,
                marginRight: 10,
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
                    {[...brandsSet].map(tag => <IndividualTags title={tag}/>)}
                </View>
            </View>
        </View>
    )
}

export const ViewIndividualOutfit = ({ route }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [previouslyIterated, setPreviouslyIterated] = useState(false)

    // we pass in the item we clicked on so we can display stats XDDDD
    const closetObject = useSelector(state => state.closet.closetObject);
    const outfitObject = route.params.item;

    //creating only the outfitArr as a hook should hopefully make it 
    //easier to add the full clothingObjects to the fetchedOutfitObject
    const [outfitArr, setOutfitArr] = useState({
        topsArray: [],
        bottomsArray: [],
        footwearArray: [],
        otherArray: []
    })
    const fetchedOutfitObject = {
        date: outfitObject.date,
        fitpic: outfitObject.fitpic ? outfitObject.fitpic : null,
        tags: outfitObject.tags ? outfitObject.tags : [],
        outfitArr: outfitArr //this is the hook we just made
    };
    console.log('ok we just instantiated the fetchedOO')
    console.log(fetchedOutfitObject)
    const [brandsSet, setBrandsSet] = useState(new Set())
    const [colorsSet, setColorsSet] = useState(new Set())

    

    // this is unneccesarily called every time something re renders... XD
    useEffect(() => {
        console.log("In useEffect")

        //stops accidental repopulation of fetchedOutfitArray leading to duplicates
        //this tends to happen when React Native hot refreshes when I'm working on it
        if (!previouslyIterated){
            setPreviouslyIterated(true)
            // replaces fitpic image with stock image if it doesn't exist
            if (!outfitObject.fitpic || outfitObject.fitpic === ''){
                outfitObject.fitpic = 'https://randomuser.me/api/portraits/men/1.jpg'
            } 


            //populates fetchedOutfitObject's outfitArr
            //i.e. it fills the arrays with clothingObjects, not _id's
            const outfitArrKeys = Object.keys(fetchedOutfitObject.outfitArr)
            for (let i = 0; i < outfitArrKeys.length; i++){
                // console.log('WHAT THE FUCKKKKKKKKKKKKK')
                for (let k = 0; k < outfitObject.outfitArr[outfitArrKeys[i]].length; k++){
                    // console.log('boutta set')
                    // console.log(fetchedOutfitObject)
                    console.log('asd')
                    let toAddClothingObject = closetObject[outfitArrKeys[i]].find(clothingObject =>
                        clothingObject._id === outfitObject.outfitArr[outfitArrKeys[i]][k])
                    let newArray = outfitArr[outfitArrKeys[i]];
                    newArray.push(toAddClothingObject)
                    setOutfitArr({
                        ...outfitArr,
                        [outfitArrKeys[i]]: newArray
                    })
                    console.log(outfitArr);
                }
            }
            console.log(fetchedOutfitObject.outfitArr.topsArray)

            //gets the set of Brands... and the colors
            const fetchedOutfitObjectOutfitArrKeys = Object.keys(fetchedOutfitObject.outfitArr)
            const nonStateBrandsSet = new Set();
            const nonStateColorsSet = new Set();
            for (let i = 3; i >= 0; i--){
                console.log('big XD')
                console.log(fetchedOutfitObjectOutfitArrKeys)
                console.log(fetchedOutfitObject.outfitArr)

                for (let k = 0; k < fetchedOutfitObject.outfitArr[fetchedOutfitObjectOutfitArrKeys[i]].length; k++){
                    console.log(`'xd' iteration ${k}`)

                    console.log('fetchedOutfitObject.outfitArr[fetchedOutfitObjectOutfitArrKeys[i]][k]:')
                    console.log(fetchedOutfitObject.outfitArr[fetchedOutfitObjectOutfitArrKeys[i]][k])

                    console.log(`Color: ${fetchedOutfitObject.outfitArr[fetchedOutfitObjectOutfitArrKeys[i]][k].color}`)
                    if (fetchedOutfitObject.outfitArr[fetchedOutfitObjectOutfitArrKeys[i]][k].color &&
                        fetchedOutfitObject.outfitArr[fetchedOutfitObjectOutfitArrKeys[i]][k].color !== ''){
                        nonStateColorsSet.add(fetchedOutfitObject.outfitArr[fetchedOutfitObjectOutfitArrKeys[i]][k].color)
                    }
                    if (fetchedOutfitObject.outfitArr[fetchedOutfitObjectOutfitArrKeys[i]][k].brandName && fetchedOutfitObject.outfitArr[fetchedOutfitObjectOutfitArrKeys[i]][k].brandName.length != 0){
                        console.log("boutt aadd")
                        nonStateBrandsSet.add(fetchedOutfitObject.outfitArr[fetchedOutfitObjectOutfitArrKeys[i]][k].brandName[0])
                    }
                }
            }
            setBrandsSet(nonStateBrandsSet)
            setColorsSet(nonStateColorsSet)
        } else {
            console.log("Already iterated, not gonna bother executing the body of useEffect")
        }

        
    }, [])
    

    console.log("ok we looped thru")
    console.log(fetchedOutfitObject)
    console.log(Math.random)


    // hook whether image is small
    const [imageIsSmall, setImageIsSmall] = useState(false)

    // value we use to animate the Animated.View
    const [imageWidth] = useState(new Animated.Value(1))
    
    

    const dummySrc = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' }
    

    

    const image = useRef(null) //might be useless
    const navigation = useNavigation();
    const dispatch = useDispatch();

    //called when confirming delete on modal. in progress still, no functionality
    const ConfirmDelete = () => {
        setModalVisible(false)
        //dispatch(clothingDeletedFromCloset({...item}))
        navigation.navigate('CLOSETSCREEN')
    }

   
    //makes image small
    const onSwipeUp = (gestureState) => {
        setImageIsSmall(true);
        Animated.timing(imageWidth, {
            toValue: Number(false),
            duration: 250
        }).start();
    }
    //makes image big
    const onSwipeDown = (gestureState) => {
        setImageIsSmall(false);
        Animated.timing(imageWidth, {
            toValue: Number(true),
            duration: 250
        }).start();
    }

    
    

    return (
        <View 
        style={{flex: 1, backgroundColor: 'white'}}>
            <TopNavScreenHeader title={outfitObject.date} exitDestination={'CLOSETSCREEN'}/>
            
            {/* Modal that shows when we want to delete the outfit... in progress */}
            <YesNoModal modalVisible={modalVisible} setModalVisible={setModalVisible} onPressFunc={() => ConfirmDelete()}/>
            
            
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
                        <View style={{
                            margin: 5,
                            width: 'auto',
                            borderRadius: 5
                        }}>
                            <Image ref={image} //I think this is useless here, delete later
                                source={{uri: outfitObject.fitpic}} 
                                style={{
                                    width: '100%',//'imageHeight',
                                    aspectRatio: 1,
                                    borderRadius: 5
                                }} />
                        </View>
                    </Animated.View>
                    <Animated.View style={{
                        width: imageWidth.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['50%', '100%']
                        })
                    }}>
                        <View style={{
                            margin: 5,
                            width: 'auto',
                            borderRadius: 5
                        }}>
                            <View style={{
                                width: '100%',
                                height: 'auto',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View 
                                style={[{
                                    width: '50%', 
                                    aspectRatio: 1, 
                                    backgroundColor: '#f2f2f2',
                                    borderRadius: 5}]}></View>
                                <View 
                                style={[{
                                    width: '50%', 
                                    aspectRatio: 1, 
                                }]}>
                                    <View style={[{
                                        width: 'auto',
                                        height: 'auto',
                                        marginLeft: 5,
                                        marginBottom: 5,
                                        borderRadius: 5,
                                        backgroundColor: '#f2f2f2'
                                    }]}>
                                        <View style={{
                                            height: '100%',
                                            width: '100%'
                                        }}>

                                        </View>
                                    </View>
                                </View>
                                <View 
                                style={[{
                                    width: '50%', 
                                    aspectRatio: 1, 
                                }]}>
                                    <View style={[{
                                        width: 'auto',
                                        height: 'auto',
                                        marginTop: 5,
                                        marginRight: 5,
                                        borderRadius: 5,
                                        borderColor: 'black',
                                        borderWidth: 1,
                                        borderStyle: 'solid',
                                    }]}>
                                        <View style={{
                                            height: '100%',
                                            width: '100%'
                                        }}>

                                        </View>
                                    </View>
                                </View>
                                <View 
                                style={[{
                                    width: '50%', 
                                    aspectRatio: 1, 
                                    borderColor: '#f2f2f2',
                                    borderWidth: 1,
                                    borderStyle: 'solid',
                                    borderRadius: 5}]}></View>
                                
                            </View>
                        </View>
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
            <DisplayClothingTypeFour outfitObject={outfitObject}/>
        </View>
    )
}