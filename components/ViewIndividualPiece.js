import React, { useState, useRef } from 'react'
import { 
    Image, 
    ScrollView, 
    Text, 
    View, 
    Dimensions,
    Modal  ,
    Alert
} from 'react-native'
import { useSelector, useDispatch} from 'react-redux' 


import { TopNav, TopNavScreenHeader } from './GlobalComponents/TopNav'
import { ScreenHeader } from './GlobalComponents/ScreenHeader'
import GlobalStyles from './GlobalComponents/GlobalStyles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { HeartIcon, EditIcon, DeleteIcon, ShareIcon, CheckIcon, XIcon } from './GlobalComponents/GlobalIcons'
import { Children } from 'react'
import { itemFavoriteToggled, clothingDeletedFromCloset } from '../redux/reducers/closetSlice'
import { useNavigation } from '@react-navigation/native'

const windowWidth = Dimensions.get('window').width;
//edit these instead of numbers in handleScroll
const maxImageHeight = windowWidth - 20; //accounts for margins
const minImageHieght = maxImageHeight / 2;
const desiredIconSize = 40;
const desiredIconSizeTwo = 60;




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




const ButtonsStyleOne = ({imageHeight}) => {
    const FavoriteButton = ({imageHeight}) => {
        return (
            <TouchableOpacity style={[{
                aspectRatio: 1,
                height: '90%',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white'
            }, GlobalStyles.shadowLight]}>
                <HeartIcon 
                size={(imageHeight * desiredIconSize) / minImageHieght}
                style={GlobalStyles.colorMain}/>
            </TouchableOpacity>
        )
    }
    
    const EditButton = ({imageHeight}) => {
        return (
            <TouchableOpacity style={[{
                aspectRatio: 1,
                height: '90%',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white'
            }, GlobalStyles.shadowLight]}>
                <EditIcon 
                size={(imageHeight * desiredIconSize) / minImageHieght}
                style={GlobalStyles.colorMain}/>
            </TouchableOpacity>
        )
    }
    
    const DeleteButton = ({imageHeight}) => {
        return (
            <TouchableOpacity style={[{
                aspectRatio: 1,
                height: '90%',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white'
            }, GlobalStyles.shadowLight]}>
                <DeleteIcon 
                size={(imageHeight * desiredIconSize) / minImageHieght}
                style={GlobalStyles.colorMain}/>
            </TouchableOpacity>
        )
    }

    return (
        <View style={[{
            borderRadius: 10,
            backgroundColor: 'white',
            justifyContent: 'space-evenly',
            flex: 1,
            opacity: 1 - (imageHeight - minImageHieght) / minImageHieght
        }, GlobalStyles.shadowLight]}>
            <View style={{
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexDirection: 'row',
                height: '30%',
                width: '100%',
                
            }}> 
                <FavoriteButton imageHeight={imageHeight}/>
                <EditButton imageHeight={imageHeight}/>
                <DeleteButton imageHeight={imageHeight}/>
            </View>
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

const DeleteModal = ({setModalVisible, modalVisible, item}) => {


    const navigation = useNavigation();
    const dispatch = useDispatch();

    const ConfirmDelete = () => {
        setModalVisible(false)
        dispatch(clothingDeletedFromCloset({...item}))
        navigation.navigate('CLOSETSCREEN')
    }


    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
          <View style={{
              top: 300,
              justifyContent: 'center', alignItems: 'center'}}>
                  <View style={[{
                      justifyContent: 'center', 
                      alignItems: 'center',
                      flexDirection: 'column',
                      width: '75%',
                      height: 'auto',
                      borderRadius: 10,

                  }, GlobalStyles.shadowLight]}>
                          <View 
                          style={[{
                            height: 10, 
                            borderTopLeftRadius: 10, 
                            borderTopRightRadius: 10,
                            width: '100%'
                        }, GlobalStyles.bgColorMain]}></View>
                        <View style={[
                      {
                          height: 'auto', 
                          width: '100%',
                          backgroundColor: 'white',
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          alignItems: 'center'}]}>
                              <View style={{
                                  justifyContent: 'center',alignItems: 'flex-start',
                              }}>
                                <Text style={[GlobalStyles.h5, GlobalStyles.colorMain,
                                    {fontWeight: 'bold', margin: 15}]}>
                                    Are you sure?
                                </Text>
                              </View>
                              
                              <View style={{
                                    width: '100%',
                                    justifyContent: 'space-between',
                                    alignItems: 'center', 
                                    flexDirection: 'row',
                                }}>
                                    <View style={{width: '50%'}}>
                                        <TouchableOpacity style={{
                                        // borderColor: 'lightgray',
                                        // borderTopWidth: 1,
                                        // borderRightWidth: 1,
                                        // borderBottomLeftRadius: 10,
                                        width: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                        }}
                                        onPress={() => setModalVisible(false)}>
                                            <XIcon size={40} style={GlobalStyles.colorMain}/>
                                    </TouchableOpacity>
                                    </View>
                                    <View style={{width: '50%'}}>
                                        <TouchableOpacity style={{
                                        // borderColor: 'lightgray',
                                        // borderTopWidth: 1,
                                        // borderLeftWidth: 1,
                                        // borderBottomRightRadius: 10,
                                        width: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                        }}
                                        onPress={() => ConfirmDelete()}>
                                            {/* <Text style={[GlobalStyles.h3, {fontWeight: 'bold'}]}>Yes</Text> */}
                                            <CheckIcon size={40} style={GlobalStyles.colorMain}/>
                                    </TouchableOpacity>
                                    </View>
                              </View>
                        
                  </View>
                  </View>
          </View>
      </Modal>
    )
}

export const ViewIndividualPiece = ({ route, navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);

    // we pass in the item we clicked on so we can display stats XDDDD
    const { item } = route.params;
    console.log('item')
    console.log(item)

    let src

    //temp image
    if (item.images.length !== 0){
        src = {uri: item.images[0]}
    } else {
        let src = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' }
    }

    const image = useRef(null)

    const [imageHeight, setImageHeight] = useState(350);


    

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

    return (
        <View 
        style={{flex: 1, backgroundColor: 'white'}}>
            {/* <TopNav title={item.clothingName} exitDestination={'CLOSETSCREEN'}/> */}
            {/* <ScreenHeader title={item.clothingName}/> */}
            <TopNavScreenHeader title={item.clothingName} exitDestination={'CLOSETSCREEN'}/>
            
            <View style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                position: 'relative',
                width: '100%',
                flexDirection: 'column',
                zIndex: 2
            }}>
                <View style={[{
                height: 'auto',
                position: 'absolute',
                width: 'auto',
                margin: 10,
                flexDirection: 'row'}, 
                GlobalStyles.shadowLight]} >
                    <Image ref={image} 
                    source={src} 
                    style={{
                        height: imageHeight,
                        
                        aspectRatio: 1,
                        borderRadius: 10
                    }} />
                    <View style={{
                        height: imageHeight,
                        aspectRatio: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    >
                        <ButtonsStyleTwo imageHeight={imageHeight} item={item} setModalVisible={setModalVisible}/>
                    </View>
                </View>
                <View 
                style={[{ // This is the divider between the image and text... yee yee ass code
                    height: 1, 
                    width: '100%', 
                    top: imageHeight + 20}
                    , GlobalStyles.bgHint]}></View>
            </View>
            
            <View style={{height: minImageHieght + 20}}></View>
            
            <DeleteModal modalVisible={modalVisible} setModalVisible={setModalVisible} item={item}/>
            
            
            <ScrollView style={{
                flex: 1,
                zIndex: 0
            }} 
            scrollEventThrottle={10}
            onScroll={handleScroll} /** Tentative... this shit is probably so innefficient */>
                    {/* DONT DELETE THIS */}
                    <View style={{height: 180}} ></View>
                    {/* DONT DELETE THIS */}
                    <ItemStats item={item}/>
                    <ItemTags item={item}/>

                    
            </ScrollView>
            
            
            
        </View>
    )
}