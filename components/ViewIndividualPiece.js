import React, { useState, useRef } from 'react'
import { 
    Image, 
    ScrollView, 
    Text, 
    View, 
    Dimensions,
    Alert,
    Vibration,
    Animated
} from 'react-native'
import { useSelector, useDispatch} from 'react-redux' 
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


import { TopNav, TopNavScreenHeader } from './GlobalComponents/TopNav'
import { ScreenHeader } from './GlobalComponents/ScreenHeader'
import GlobalStyles from './GlobalComponents/GlobalStyles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { HeartIcon, EditIcon, DeleteIcon, ShareIcon, CheckIcon, XIcon } from './GlobalComponents/GlobalIcons'
import { Children } from 'react'
import { itemFavoriteToggled, clothingDeletedFromCloset } from '../redux/reducers/closetSlice'
import { useNavigation } from '@react-navigation/native'
import { YesNoModal } from './GlobalComponents/GlobalModals'

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

const IndividualTag = ({tag}) => {
    return (
        <View style={[{
            width: 'auto',
            height: 'auto',
            borderRadius: 5,
            paddingLeft: 5,
            paddingRight: 5,
            margin: 5,
            elevation: 3
        }, GlobalStyles.bgColorMain]} >
            <Text  status='control' style={[{fontWeight: 'bold', color: 'white', margin: 5}, GlobalStyles.h4]}>
                {tag.toUpperCase()}
            </Text>
        </View>
    )
}

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

const ThreeAttributeHeader = ({pieceType, brandsLength, price, description, color}) => {
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
                    {`${color}`}
                </Text>
                <Text style={[{fontWeight: 'bold', marginLeft: 5, marginRight: 5}, GlobalStyles.h3, GlobalStyles.lighterHint]}>•</Text>
                <Text style={[GlobalStyles.h5, {fontWeight: 'bold'}]}>
                    {`$${price}`} 
                </Text>
            </View>
            <View style={{
                width: 'auto',
                marginLeft: 10,
                marginRight: 10,
                marginTop: 0,
                marginBottom: 10
            }}>
                <Text style={[GlobalStyles.lighterHint, GlobalStyles.h5]}>
                    {description && description !== '' ? description : 'No description.'}
                </Text>
            </View>
        </View>
    )
}

const BrandTags = ({brandsArray}) => {
    //const brandsArray = ['Supreme', 'Guess', 'American Eagle', 'Nike', 'Jordan', 'Please', 'Change', ]
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
                    {brandsArray.map(tag => <IndividualTags title={tag}/>)}
                </View>
            </View>
        </View>
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
                    {tagsArray.map(tag => (
                        <IndividualTags title={tag}/>
                    ))}
                </View>
            </View>
        </View>
    )
}


export const ViewIndividualPiece = ({ route }) => {

    const [modalVisible, setModalVisible] = useState(false);

    // we pass in the item we clicked on so we can display stats XDDDD
    const { item } = route.params;
    // console.log('item')
    // console.log(item)

    let src

    //temp image
    if (item.images.length !== 0){
        src = {uri: item.images[0]}
    } else {
        src = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' }
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
                            borderRadius: 5
                        }}>
                            <Image ref={image} //I think this is useless here, delete later
                                source={src} 
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
            
            <YesNoModal modalVisible={modalVisible} setModalVisible={setModalVisible} onPressFunc={() => ConfirmDelete()}/>
            

            <ThreeAttributeHeader brandsLength={item.brandName.length} price={item.price} pieceType={'t-shirt'} color={item.color}/>
            
            <View style={{
                marginLeft: 10,
                marginTop: -10,
            }}>
                <Text style={
                    [GlobalStyles.h6, {fontWeight :'bold'}]
                }>
                    {`${item.timesWorn && item.timesWorn !== 0 ? `Worn ${item.timesWorn}x` : 'Never worn. Try it on!'}`}
                </Text>
            </View>
            
            <ClothingTags tagsArray={item.tags}/>
            <BrandTags brandsArray={item.brandName}/>
            {/* <ScrollView style={{
                
                zIndex: 0
            }} 
            //scrollEventThrottle={scrollEventThrottleValue}
            //onScroll={handleScroll}
            >
                    <ItemStats item={item}/>
                    <ItemTags item={item}/>

                    <View style={{height: 50}}></View>

                    
            </ScrollView> */}
            
            
            
        </View>
    )
}