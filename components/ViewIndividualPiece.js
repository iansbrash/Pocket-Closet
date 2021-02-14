import React, { useState, useRef } from 'react'
import { 
    Image, 
    ScrollView, 
    Text, 
    View, 
    Dimensions,
    Vibration,
    Animated,
    Pressable,
    FlatList
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux' 
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { TopNavScreenHeader } from './GlobalComponents/TopNav'
import GlobalStyles from './GlobalComponents/GlobalStyles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { 
    HeartIcon, 
    ArchiveIcon, 
    DeleteIcon,
    CancelIcon 
} from './GlobalComponents/GlobalIcons'
import { 
    itemFavoriteToggled, 
    clothingDeletedFromCloset,//we used this action to delete previously. now trying the below function which bundles actions
    itemArchiveToggled
} from '../redux/reducers/closetSlice'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { YesNoModal, ImageScrollModal } from './GlobalComponents/GlobalModals'
import { TogglableDrawer } from './GlobalComponents/GlobalDrawers'
import { 
    makeMediumImage, 
    makeMediumSmallImage, 
    deleteClothingFromCloset 
} from './GlobalFunctions/ImgurResize'
import { useEffect } from 'react/cjs/react.development';
import * as Haptics from 'expo-haptics';

import * as ImageManipulator from 'expo-image-manipulator';

const windowWidth = Dimensions.get('window').width;
//edit these instead of numbers in handleScroll
const maxImageHeight = windowWidth - 20; //accounts for margins
const minImageHieght = maxImageHeight / 2;
const desiredIconSizeTwo = 60;




const TopButtonsStyleTwo = ({item, setModalVisible}) => {


    const [isFavorited, setIsFavorited] = useState(item.favorite)
    const [isArchived, setIsArchived] = useState(item.archive)

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
    

    
    
    const ToggleArchive = () => {
        //this is structured differently than itemFavoriteToggled lol
        dispatch(itemArchiveToggled(item._id, item.clothingType))
        setIsArchived(!isArchived)
    }

    const DeleteOutfitButtonPressed = () => {
        Vibration.vibrate(400)
        setModalVisible(true)
        console.log("in deltetOutfitButtonPressed")
    }


    const IndividualThirdButton = ({title, icon, onPressFunc, disabled}) => {
        return (
            <View style={{
                height: '33.3%',
                width: '100%'
            }}>
                <TouchableOpacity
                onPress={() => onPressFunc()}
                disabled={disabled}>
                    <View style={[{
                        margin: 5,
                        height: 'auto',
                        width: 'auto',
                        borderRadius: 5,
                        backgroundColor: 'white'
                    }, disabled ? null : GlobalStyles.shadowLightest]}>
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
                                }, GlobalStyles.h4, disabled ? GlobalStyles.lighterHint : GlobalStyles.colorMain]}>
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
                    title={isFavorited ? 'Unfavorite' : 'Favorite'} 
                    icon={<HeartIcon 
                        style={[isArchived ? GlobalStyles.lighterHint : (isFavorited ? {color: 'red'} : GlobalStyles.colorMain)]} 
                        size={35} />}
                    onPressFunc={() => ToggleFavorite()}
                    disabled={isArchived}/>
                <IndividualThirdButton 
                    title={isArchived ? 'Unarchive' : 'Archive'} 
                    icon={<ArchiveIcon style={[GlobalStyles.colorMain]} 
                    size={35} />}
                    onPressFunc={() => ToggleArchive()}/>
                <IndividualThirdButton 
                    title={'Delete'} 
                    icon={<DeleteIcon style={[isArchived ? GlobalStyles.lighterHint : GlobalStyles.colorMain]} 
                    size={35} />}
                    onPressFunc={() => DeleteOutfitButtonPressed()}
                    disabled={isArchived}/>
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
                    {description && description !== '' ? description : 'No description.'}
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
                {/* <Text style={[GlobalStyles.h5, {fontWeight: 'bold'}]}>
                    {`${color ? color : 'no color'}`}
                </Text> */}
                {/* <Text style={[{fontWeight: 'bold', marginLeft: 5, marginRight: 5}, GlobalStyles.h3, GlobalStyles.lighterHint]}>•</Text> */}
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

export const BrandTags = ({brandsArray}) => {

    const navigation = useNavigation();

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
                        {brandsArray.map(tag => <IndividualTags key={tag} title={tag}/>)}
                    </View>
                </View>
            </View>
        </TogglableDrawer>
        
    )
}

export const ClothingTags = React.memo(({tagsArray}) => {

    //const tagsArray = ['Temp', 'Tags', 'Go', 'Here', 'Please', 'Replace']

    const navigation = useNavigation()

    // testing plz delete 
    if (tagsArray.length === 0) console.log('i aint pushing nun now')//tagsArray.push('i pushed this tag for sanity')

    const IndividualTags = ({title}) => {
        return (
            <Pressable
            onPressIn={() => navigation.navigate("VIEWINDIVIDUALTAG", {tag: title, type: 'clothing'})}>
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
            </Pressable>
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
                            <IndividualTags key={tag} title={tag}/>
                        ))}
                    </View>
                </View>
            </View>
        </TogglableDrawer>
    )
})

const ColorTags = React.memo(({colorArray}) => {

    //const tagsArray = ['Temp', 'Tags', 'Go', 'Here', 'Please', 'Replace']

    const navigation = useNavigation()

    // testing plz delete 
    if (colorArray.length === 0) console.log('i aint pushing nun now')//tagsArray.push('i pushed this tag for sanity')

    const IndividualTags = ({title}) => {
        return (
            <View style={[{
                margin: 3,
                borderRadius: 6,
            }, GlobalStyles.bgColorMain,]}>
                <Pressable
                onPressIn={() => console.log('plz add functionality')}>
                    <View style={[{
                        width: 'auto',
                        padding: 3,
                        height: 'auto',
                        justifyContent: 'center',
                        alignItems:'center',
                        borderRadius: 5,
                    }, GlobalStyles.shadowLight,{backgroundColor: title.toLowerCase()}]}>
                        <Text style={[
                            {fontWeight: 'bold'}, 
                            GlobalStyles.h6, 
                            title.toLowerCase() === 'white' ? GlobalStyles.colorMain : {color: 'white'}]}>
                            {title}
                        </Text>
                    </View>
                </Pressable>
            </View>
            
        )
    }

    return (
        <TogglableDrawer minHeight={33}>
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
                        {colorArray.map(color => (
                            <IndividualTags key={color} title={color}/>
                        ))}
                    </View>
                </View>
            </View>
        </TogglableDrawer>
    )
})

const ClothingIcon = React.memo(({outfitObject}) => {

    const navigation = useNavigation();

    if (!outfitObject){
        return (
            <View style={{
                width: 150, // might just have to do this
                height: 'auto',
            }}>
                <TouchableOpacity
                onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
                    <View style={[{
                        margin: 5,
                        height: 'auto',
                        width: 'auto',
                        borderRadius: 5,
                        backgroundColor: 'white',
                    }, GlobalStyles.shadowLight]}>
                        <View style={{
                            height: 5,
                            width: '100%',
                            zIndex: 0
                        }}>
                            <View 
                            style={[
                                GlobalStyles.bgColorMain, 
                                {width: '100%', 
                                position: 'absolute',
                                height: 10,
                                top: 0,
                                borderTopLeftRadius: 5, 
                                borderTopRightRadius: 5
                                }]}></View>
                        </View>
                        
                        <View style={{
                            paddingTop: 5,
                            paddingLeft: 5,
                            paddingRight: 5,
                            marginBottom: 5,
                            width: 'auto',
                            height: 'auto',
                            zIndex: 1,
                            backgroundColor: 'white'
                        }}>
                            <View 
                            style={[{
                                width: '100%', 
                                aspectRatio: 1, 
                                borderRadius: 5,
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }, GlobalStyles.shadowLightest]}>
                                <CancelIcon style={{color: '#ededed'}} size={70}/>
                            </View>
                        </View>
                        <View style={{marginTop: -5, marginLeft: 5, marginBottom: 5, marginRight: 5}}>
                            <View style={{
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}>
                                <Text 
                                numberOfLines={1}
                                style={[{fontWeight: 'bold'}, GlobalStyles.h6]}>
                                    {'??/??/????'}
                                </Text>
                            </View>
                            <View style={{
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}>
                                <Text style={GlobalStyles.h7}>{`Outfit deleted :(`}</Text>
                                {/* <Text style={[{fontWeight: 'bold'}, GlobalStyles.hint]}>•</Text>
                                <Text style={GlobalStyles.h7}>{`${3} brands`}</Text> */}
                            </View>
                        </View>
                        <View style={{
                            position: 'absolute',
                            bottom: 5,
                            right: 5
                        }}>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const [fitpic, setFitpic] = useState(outfitObject.fitpic)

    


    // Compresses the image so no lag during scrolling. very nice
    useEffect(() => {

        // console.log(`about to log fitpic`)
        console.log(`typeof outfitObject.fitpic.fitpic: ${typeof outfitObject.fitpic.fitpic}`)

        const toCall = async () => {
            if (outfitObject.fitpic.type === 'local' && outfitObject.fitpic.fitpic) {
                const manipResult = await ImageManipulator.manipulateAsync(
                    // image.localUri || image.uri
                    outfitObject.fitpic.fitpic,
                    [{ resize: {width: 200} }],
                    { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
                );
        
                setFitpic({fitpic: manipResult.uri, type: 'local'})
            }
        }

        toCall()
    }, [])

    console.log(`ClothingIcon with outfitObject _id of ${outfitObject._id} being re-rendered.`)

    return (
        <View style={{
            width: 150, // might just have to do this
            height: 'auto',
        }}>
            <TouchableOpacity
            onPress={() => navigation.push('VIEWINDIVIDUALOUTFIT', {item: outfitObject})}>
                <View style={[{
                    margin: 5,
                    height: 'auto',
                    width: 'auto',
                    borderRadius: 5,
                    backgroundColor: 'white',
                }, GlobalStyles.shadowLight]}>
                    <View style={{
                        height: 5,
                        width: '100%',
                        zIndex: 0
                    }}>
                        <View 
                        style={[
                            GlobalStyles.bgColorMain, 
                            {width: '100%', 
                            position: 'absolute',
                            height: 10,
                            top: 0,
                            borderTopLeftRadius: 5, 
                            borderTopRightRadius: 5
                            }]}></View>
                    </View>
                    
                    <View style={{
                        paddingTop: 5,
                        paddingLeft: 5,
                        paddingRight: 5,
                        marginBottom: 5,
                        width: 'auto',
                        height: 'auto',
                        zIndex: 1,
                        backgroundColor: 'white'
                    }}>
                        <Image source={
                            (fitpic &&
                                fitpic.fitpic !== '') ? 
                                (fitpic.type === 'imgur' ? 
                                    {uri: makeMediumSmallImage(fitpic.fitpic)} : 
                                    {uri: fitpic.fitpic}
                                ) 
                            : dummySrc}
                            
                            style={{width: '100%', aspectRatio: 1, borderRadius: 5}}/>
                    </View>
                    <View style={{marginTop: -5, marginLeft: 5, marginBottom: 5, marginRight: 5}}>
                        <View style={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                            <Text 
                            numberOfLines={1}
                            style={[{fontWeight: 'bold'}, GlobalStyles.h6]}>
                                {`${new Date(outfitObject.date).toLocaleString('en-GB').substr(0, 10)}`}
                            </Text>
                            {
                                outfitObject.favorite ?  
                                    <HeartIcon size={20} style={{color: 'red'}}/> : null
                            }
                        </View>
                        <View style={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                            <Text style={GlobalStyles.h7}>{`${3} pieces`}</Text>
                            <Text style={[{fontWeight: 'bold'}, GlobalStyles.hint]}>•</Text>
                            <Text style={GlobalStyles.h7}>{`${3} brands`}</Text>
                        </View>
                    </View>
                    <View style={{
                        position: 'absolute',
                        bottom: 5,
                        right: 5
                    }}>
                        {/* <HeartIcon style={{color: clothingObject.favorite ? 'red' : 'black'}} size={20}/> */}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}, (prevProps, nextProps) => prevProps.key == nextProps.key)


//we need to fetch / store the list of outfits this clothing is in somehow
//wow. this is incredible. React.memo
const OutfitScroll = React.memo(({outfitsWornIn}, props) => {
    const outfitsArray = useSelector(state => state.outfits.outfitsArray)


    return (
        <View style={[{width: '100%'}, props.style]}>


            <FlatList 
                data={outfitsWornIn}
                keyExtractor={outfitId => outfitId}
                renderItem={(item, index) => 
                    <ClothingIcon outfitObject={outfitsArray.find(outfitObj => outfitObj._id === item.item)} />
                }
                horizontal={true}

                getItemLayout={(data, index) => (
                    {length: 150, offset: 150 * index, index}
                )} //width is 150
                showsHorizontalScrollIndicator={false}
                initialNumToRender={3}
                />
            {/* <ScrollView
            style={{height: 'auto', paddingTop: 5, paddingBottom: 5}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            > */}
                {/* {
                // outfitsWornIn ? 
                outfitsWornIn.map(outfitId => (
                    
                    <ClothingIcon key={outfitId} outfitObject={outfitsArray.find(outfitObj => outfitObj._id === outfitId)} />
                )) 
                    // : null
                } */}
            {/* </ScrollView> */}
        </View>
    )
}, (prevProps, nextProps) =>  
        prevProps.outfitsWornIn == nextProps.outfitsWornIn
)


export const ViewIndividualPiece = ({ route }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [imageModal, setImageModal] = useState(false)


    //thought this would prevent re rendering
    const [item, setItem] = useState(route.params.item);

    
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
            return () => {
                setIsFocused(false)

            // Do something when the screen is unfocused
            // Useful for cleanup functions
            };
        }, [])
    );

    let src

    if (item.images.images.length === 0 || item.images.type === ''){
        src = {uri: 'https://randomuser.me/api/portraits/men/1.jpg'}
    } else if (item.images.type === 'imgur'){
        src = {uri: makeMediumImage(item.images.images[0])}
    } else if (item.images.type === 'local'){
        src = {uri: item.images.images[0]}
    } else {
        console.log('this wasn`t supposed to happen...')
    }

    const image = useRef(null)


    const [imageHeight, setImageHeight] = useState(350);

 

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const ConfirmDelete = () => {
        setModalVisible(false)
        // dispatch(clothingDeletedFromCloset(_id))

        deleteClothingFromCloset(item._id, item.clothingType, item.tags, item.color, item.brandName, item.pieceType)
        navigation.navigate('CLOSETSCREEN')
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
                        }}>
                            <View style={{
                                width: '100%',
                                aspectRatio: 1
                            }}>
                                <Pressable
                                onPress={() => setImageModal(true)}
                                >
                                    <Image //ref={image} //I think this is useless here, delete later
                                        source={src}
                                        style={[{
                                            width: '100%',//'imageHeight',
                                            aspectRatio: 1,
                                            borderRadius: 5
                                        },]} 
                                    />
                                </Pressable>
                            </View>
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
                imageType={item.images.type}
                imageArray={item.images.images}
            />

            <GestureRecognizer
            onSwipeUp={state => onSwipeUp()}
            onSwipeDown={state => onSwipeDown()}
            >

                <ThreeAttributeHeader 
                    brandsLength={item.brandName.length} 
                    price={item.price} 
                    pieceType={item.pieceType} 
                    color={item.color}
                    description={item.description}/>
                
                <View style={{
                    marginLeft: 20,
                }}>
                    {/* <Text style={
                        [GlobalStyles.h6, {fontWeight :'bold'}]
                    }>
                        {`${item.timesWorn && item.timesWorn !== 0 ? `Worn ${item.timesWorn}x` : 'Never worn'}`}
                    </Text> */}
                </View>
                
                <ColorTags colorArray={item.color}/>
                <ClothingTags tagsArray={item.tags}/>
                <BrandTags brandsArray={item.brandName}/>
            </GestureRecognizer>

            <View style={{
                backgroundColor: 'white',
                width: '100%',
                height: 300
            }}>
                <View style={{
                marginLeft: 10,
                // marginTop: 20,
                }}>
                    <Text style={
                        [GlobalStyles.h4, {fontWeight :'bold'}]
                    }>
                        {`${item.timesWorn && item.timesWorn !== 0 ? `Worn ${item.timesWorn}x` : 'Never worn. Try it on!'}`}
                    </Text>
                </View>
                {/* Need to pass array of all outfitObj that include this piece to this component eventually */}
                {/* {isFocused ?  */}
                    <OutfitScroll 
                        outfitsWornIn={item.outfitsWornIn} 
                        // style={{display: isFocused ? 'flex' : 'none'}}
                    /> 
                 {/* : null} */}
            </View>
            
            
            
        </View>
    )
}