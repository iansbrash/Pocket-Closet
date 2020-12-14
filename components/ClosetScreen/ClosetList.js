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
import { HeartIcon, ArchiveIcon } from '../GlobalComponents/GlobalIcons'
import { makeSmallImage } from '../GlobalFunctions/ImgurResize'



// used as render method for FlatList in ClosetListOneCol
export const RenderSingleLineClosetItem = ({item}) => {

    let src;

    if (item.images.type === '' || item.images.images.length === 0){
        //very important function
        src = { uri: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100 % 100 + 1)}.jpg` } //default replacement image
    } else if (item.images.type === 'imgur'){
        src = {uri: makeSmallImage(item.images.images[0])}
    } else {
        src = {uri: item.images.images[0]}
    }
    

    const navigation = useNavigation();

    


    return (
        <View style={{
            height: 120,
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
            onPress={() => navigation.navigate('VIEWINDIVIDUALPIECE', {item: item})}> 
                <View style={{
                    height: 'auto',
                    width: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <View 
                    style={{
                        height: 10, 
                        borderTopLeftRadius: 10, 
                        borderTopRightRadius: 10, 
                        backgroundColor: '#09122b',
                        width: '100%'}}></View>
                    <View style={{
                        height: 100,
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                        <View style={{
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            flexDirection: 'row',
                            height: '100%',
                            width: '85%'

                        }}>
                            <View style={[{
                                    height: 'auto', 
                                    aspectRatio: 1,
                                    borderRadius: 10,
                                    marginLeft: 5, //was 10
                                    marginTop: 5, //was 10
                                    marginBottom: 5, //was 10
                                    borderRadius: 10,
                                }, GlobalStyles.shadowLight]}> 
                                <Image source={src} style={{height: '100%', aspectRatio: 1, borderRadius: 10}} />
                            </View>
                            <View style={{
                                height: '85%',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                }}>
                                    <Text category='h4' 
                                    numberOfLines={1}
                                    style={[{
                                        fontWeight: 'bold', 
                                        marginLeft: 10, 
                                        maxWidth: 250,
                                        lineHeight: 20,}, GlobalStyles.h5]}
                                    >{item.clothingName}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'column',
                                    flexWrap: 'wrap',

                                }}>
                                    {item.brandName.slice(0, 4).map((brand, index) => (
                                        <View key={brand}>
                                            <Text category='h5' appearance='hint' 
                                            style={[{fontWeight: 'bold', marginLeft: 10, marginTop: -5, flexShrink: 1}, 
                                            GlobalStyles.h6, GlobalStyles.hint]}
                                            >{`${brand}${index === 3 && item.brandName.length > 4 ? '...' : ''}`}</Text>
                                        </View>
                                        )
                                    )}
                                </View>
                            </View>
                        </View>
                        {/* This is going to be the heart at the bottom */}
                        <View style={{
                            position: 'absolute',
                            bottom: 5,
                            right: 5,
                            flexDirection: 'row'
                        }}>
                            {
                                item.archive ? <ArchiveIcon size={20} style={[{margin: 2}, GlobalStyles.lighterHint]}/> : null
                            }
                            {
                                item.favorite ? <HeartIcon size={20} style={{color: '#ff4040', margin: 2}}/> : null
                            }
                            
                        </View>
                        <View style={{width: '15%', justifyContent: 'center', alignItems: 'center'}}>
                            {/* This accounts for 15% of the right of the card lmaoooo spaghetti */}
                        </View>
                    </View>
                </View> 
            </TouchableOpacity>
        </View>
    )
}



export const ClosetList = ({searchInput, filtersEnabled, heartToggleChecked}) => {
    const closetObject = useSelector(state => state.closet.closetObject);
    const closetObjectKeys = Object.keys(closetObject);

    const navigation = useNavigation();
    let src = { uri: 'https://randomuser.me/api/portraits/men/1.jpg' }
    // Renders all the clothing under the search bar.
    // called by the <List /> 

    const combinedArrays = [
        ...closetObject.topsArray, 
        ...closetObject.bottomsArray, 
        ...closetObject.footwearArray, 
        ...closetObject.otherArray //was accessories
    ]
    return (

        <View style={{
            width: '100%',
            height: '100%'
        }}>
            
            <FlatList
            data={combinedArrays.filter((item, index) => 
                (
                    item.clothingName.toLowerCase().includes(searchInput.toLowerCase()) ||
                    item.brandName.find(name => name.toLowerCase().includes(searchInput.toLowerCase()))
                ) && (!filtersEnabled ? true : (
                        (heartToggleChecked ? item.favorite : true)
                        && (true) //you can chain filters after this true.
                    )  //this might be a little innefficent.\ xdddd
                )
            )}
            keyExtractor={obj => obj._id.toString()}
            renderItem={object => <RenderSingleLineClosetItem {...object}/>
            /** HOW THE FUCK DOES THE ABOVE WORK... WTF */}
            />
            
        </View>
    )
}