import React, { useState } from 'react'
import { Image, ScrollView, Text, View  } from 'react-native'
import { useSelector, useDispatch as dispatchRedux } from 'react-redux' 

import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native'







// const BackIcon = (props) => (
//     <Icon {...props} name='arrow-back'/>
// );

// const ExitIcon = (props) => (
//     <Icon {...props} name='close-outline'/>
// )



const UtilBar = ({item}) => {

    const [isFavorited, setIsFavorited] = useState(item.favorite);

    


    return (
        <View style={{
            width: '100%',
            height: 'auto',
            flexDirection: 'row',
            justfyContent: 'space-between',
            alignItems: 'center'

        }}>
            <View style={{
                margin: 10,
            }}>
                <View>
                    <Text>Button was here XD</Text>
                </View>
                
            </View>

        </View>   
    )
}

const Stat = ({stat, value}) => {


    if (!value) { return null}

    return (
        <View style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <View style={{
                height: 40,
                marginTop: 5,
                marginRight: 10,
                marginLeft: 10,
                marginBottom: 10,
                borderRadius: 10,
                elevation: 5,
                justifyContent: 'center',
                alignItems: 'flex-start',
                backgroundColor: '#37373b',
                width: 'auto'
                
            }}>
                <Text status='control' category='h5' style={{
                    fontWeight: 'bold',
                    marginLeft: 10,
                    marginRight: 10
                }}>{stat}</Text>
            </View>
            <View style={{
                height: 40,
                marginTop: 5,
                marginRight: 10,
                marginLeft: 10,
                marginBottom: 10,
                borderRadius: 10,
                elevation: 5,
                justifyContent: 'center',
                alignItems: 'flex-start',
                backgroundColor: '#37373b',
                width: 'auto'
                
            }}>
                <Text status='control' category='h5' style={{
                    fontWeight: 'bold',
                    marginLeft: 10,
                    marginRight: 10
                }}>{value}</Text>
            </View>
        </View>
    )
}

const ItemStats = ({item}) => {


    const timesWorn = item.timesWorn;

    return (
        <View style={{
            width: '100%',
            height: 'auto',
            marginTop: 5
        }} level='2'>
            <Stat stat={"TYPE"} value={
                item.pieceType ? item.pieceType : item.clothingType} />
            <Stat stat={"BRAND"} value={item.brandName[0]} />
            <Stat stat={"TIMES WORN"} value={item.timesWorn} />
            <Stat stat={"PRICE"} value={
                item.price
            } />


            
        </View>
    )
}

const IndividualTag = ({tag}) => {
    return (
        <View style={{
            width: 'auto',
            height: 'auto',
            borderRadius: 10,
            backgroundColor: '#3d9bff',
            paddingLeft: 5,
            paddingRight: 5,
            margin: 5,
            elevation: 3
        }} >
            <Text category="h6" status='control' style={{fontWeight: 'bold'}}>
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
            margin: 5
        }}>
            {item.tags.map((tag) => (
                <IndividualTag tag={tag}/>
            ))}
        </View>
    )
}


export const ViewIndividualPiece = ({ route, navigation }) => {

    // we pass in the item we clicked on so we can display stats XDDDD
    const { item } = route.params;

    //temp image
    let src = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' }

    return (
        <View 
        style={{flex: 1}}>
            {/* <TopNavigation alignment='center' title={item.clothingName} 
            accessoryLeft={BackAction}
            accessoryRight={ExitAction}/> */}
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    margin: 10
                }}>
                    <ScrollView>
                        <View
                            style={{
                                width: '100%',
                                aspectRatio: 1.3,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    height: '95%',
                                    aspectRatio: 1,
                                    elevation: 5,
                                    borderRadius: 10
                                }}>
                                    <Image source={src} style={{
                                        height: '100%',
                                        width: '100%',
                                        borderRadius: 10
                                    }} />
                                </View>
                        </View>
                        <UtilBar item={item}/>
                        {/* <Divider /> */}
                        <View style={{
                            width: '100%',
                            height: 'auto'
                        }}>
                            <ItemStats item={item}/>
                        </View>
                        
                        <View style={{
                            width: '100%',
                            height: 'auto'
                        }}>
                            <ItemTags item={item} />
                        </View>
                        

                    </ScrollView>
            </View>
        </View>
    )
}