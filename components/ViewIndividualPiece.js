import React, { useState, useRef } from 'react'
import { 
    Image, 
    ScrollView, 
    Text, 
    View, 
    Dimensions,
    Alert,
    Vibration,
    Animated,
    Pressable
} from 'react-native'
import { useSelector, useDispatch} from 'react-redux' 
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { TopNavScreenHeader } from './GlobalComponents/TopNav'
import GlobalStyles from './GlobalComponents/GlobalStyles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { HeartIcon, EditIcon, DeleteIcon, ShareIcon, CheckIcon, XIcon } from './GlobalComponents/GlobalIcons'
import { itemFavoriteToggled, clothingDeletedFromCloset } from '../redux/reducers/closetSlice'
import { useNavigation } from '@react-navigation/native'
import { YesNoModal, ImageScrollModal } from './GlobalComponents/GlobalModals'
import { TogglableDrawer } from './GlobalComponents/GlobalDrawers'
import { makeSmallImage, makeMediumImage } from './GlobalFunctions/ImgurResize'

const windowWidth = Dimensions.get('window').width;
//edit these instead of numbers in handleScroll
const maxImageHeight = windowWidth - 20; //accounts for margins
const minImageHieght = maxImageHeight / 2;
const desiredIconSizeTwo = 60;




const ButtonsStyleTwo = ({imageHeight, item, setModalVisible}) => {

    const [favorited, setFavorited] = useState(item.favorite)
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


const TopButtonsStyleTwo = ({item, setModalVisible}) => {


    const [isFavorited, setIsFavorited] = useState(item.favorite)
    const dispatch = useDispatch();
    const navigation = useNavigation();


    const ToggleFavorite = () => {
        setIsFavorited(!isFavorited)
        //toggles favorite
        dispatch(itemFavoriteToggled({
            clothingType: item.clothingType,
            _id: item._id
        }));
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
                        size={'35%'} />}
                    onPressFunc={() => ToggleFavorite()}/>
                <IndividualThirdButton 
                    title={'Edit'} 
                    icon={<EditIcon style={[GlobalStyles.colorMain]} size={'35%'} />}
                    onPressFunc={() => EditOutfit()}/>
                <IndividualThirdButton 
                    title={'Delete'} 
                    icon={<DeleteIcon style={[GlobalStyles.colorMain]} size={'35%'} />}
                    onPressFunc={() => DeleteOutfitButtonPressed()}/>
            </View>
        </View>
    )
}

const ThreeAttributeHeader = ({pieceType, brandsLength, price, description, color}) => {


    const ClothingDesc = () => {
        return (
            <View style={{
                width: 'auto',
                marginLeft: 10,
                marginRight: 10,
                marginTop: 0,
                marginBottom: 10
            }}>
                <Text style={[GlobalStyles.lighterHint, GlobalStyles.h5,]}>
                    {description && description !== '' ? description : 'No description. No description. No description. No description. No description. No description. No description.'}
                </Text> 
            </View>
           
        )
    }
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
                    {`${pieceType}`}
                </Text>
                <Text style={[{fontWeight: 'bold', marginLeft: 5, marginRight: 5}, GlobalStyles.h3, GlobalStyles.lighterHint]}>•</Text>
                {/* <Text style={[GlobalStyles.h5, {fontWeight: 'bold'}]}>
                    {`${brandsLength} brand${brandsLength !== 1 ? 's' : ''}`}
                </Text> */}
                <Text style={[GlobalStyles.h5, {fontWeight: 'bold'}]}>
                    {`${color ? color : 'no color'}`}
                </Text>
                <Text style={[{fontWeight: 'bold', marginLeft: 5, marginRight: 5}, GlobalStyles.h3, GlobalStyles.lighterHint]}>•</Text>
                <Text style={[GlobalStyles.h5, {fontWeight: 'bold'}]}>
                    {`$${price ? price : 0}`} 
                </Text>
            </View>
            <TogglableDrawer minHeight={60}>
                <ClothingDesc />
            </TogglableDrawer>
        </View>
    )
}

const BrandTags = ({brandsArray}) => {

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
            <View style={{width: '100%', height: 'auto'}}>
                <View style={{
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
                        {brandsArray.map(tag => <IndividualTags title={tag}/>)}
                    </View>
                </View>
            </View>
        </TogglableDrawer>
        
    )
}

const ClothingTags = ({tagsArray}) => {

    //const tagsArray = ['Temp', 'Tags', 'Go', 'Here', 'Please', 'Replace']


    // testing plz delete 
    if (tagsArray.length === 0) tagsArray.push('i pushed this tag for sanity')

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
                        {tagsArray.map(tag => (
                            <IndividualTags title={tag}/>
                        ))}
                    </View>
                </View>
            </View>
        </TogglableDrawer>
    )
}


export const ViewIndividualPiece = ({ route }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [imageModal, setImageModal] = useState(false)

    // we pass in the item we clicked on so we can display stats XDDDD
    const { item } = route.params;
    // console.log('item')
    // console.log(item)

    let src

    //temp image
    if (item.images.length !== 0){
        src = item.images[0]
    } else {
        src = null //'https://randomuser.me/api/portraits/men/1.jpg'
    }

    const image = useRef(null)

    const [imageHeight, setImageHeight] = useState(350);

 

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const ConfirmDelete = () => {
        setModalVisible(false)
        dispatch(clothingDeletedFromCloset({...item}))
        navigation.navigate('CLOSETSCREEN')
    }
    

    const handleScroll = (event) => {
        let numWereUsing = event.nativeEvent.contentOffset.y
        let toChangeHeight = maxImageHeight - (numWereUsing);
        if (toChangeHeight >= minImageHieght && toChangeHeight <= maxImageHeight){
            setImageHeight(toChangeHeight);
        }
        else if (toChangeHeight <= minImageHieght) {
            setImageHeight(minImageHieght)
        } else {
            setImageHeight(maxImageHeight)
        }
    }

    // hook whether image is small
    const [imageIsSmall, setImageIsSmall] = useState(false)

    // value we use to animate the Animated.View
    const [imageWidth] = useState(new Animated.Value(1))

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
            {/* <TopNav title={item.clothingName} exitDestination={'CLOSETSCREEN'}/> */}
            {/* <ScreenHeader title={item.clothingName}/> */}
            <TopNavScreenHeader title={item.clothingName} exitDestination={'CLOSETSCREEN'}/>
            
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
                            borderRadius: 5,
                            aspectRatio: 1
                        }}>
                            <Pressable
                            onPress={() => setImageModal(true)}
                            >
                                <Image //ref={image} //I think this is useless here, delete later
                                    source={src ? {uri: makeMediumImage(src)} : {uri: 'https://randomuser.me/api/portraits/men/1.jpg'}} 
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
                        <TopButtonsStyleTwo item={item} setModalVisible={setModalVisible}/>
                    </Animated.View>
                </View>
                    
            </GestureRecognizer>
            
            <YesNoModal modalVisible={modalVisible} setModalVisible={setModalVisible} onPressFunc={() => ConfirmDelete()}/>
            <ImageScrollModal 
                modalVisible={imageModal}
                setModalVisible={setImageModal}
                title={'Images'}
                imageArray={item.images}
            />

            <ThreeAttributeHeader brandsLength={item.brandName.length} price={item.price} pieceType={item.pieceType} color={item.color}/>
            
            <View style={{
                marginLeft: 10,
            }}>
                <Text style={
                    [GlobalStyles.h6, {fontWeight :'bold'}]
                }>
                    {`${item.timesWorn && item.timesWorn !== 0 ? `Worn ${item.timesWorn}x` : 'Never worn. Try it on!'}`}
                </Text>
            </View>
            
            <ClothingTags tagsArray={item.tags}/>
            <BrandTags brandsArray={item.brandName}/>
            <View style={{
                backgroundColor: 'white',
                width: '100%',
                height: 300
            }}>

            </View>
            
            
            
        </View>
    )
}