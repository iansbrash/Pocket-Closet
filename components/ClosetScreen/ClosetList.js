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
export const RenderSingleLineClosetItem = React.memo(({item, debugId}) => {

    console.log(`'rendering RenderSingleLineClosetItem with _id ${item._id}'`)

    if (!item){
        console.log('RenderSingleLineClosetItem was passed null as its item arguement.')
        debugId ? console.log(`debugId: ${debugId}`) : console.log(`No debugId provided`)
        return null;
    }

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
            onPress={() => navigation.push('VIEWINDIVIDUALPIECE', {item: item})}> 
                <View style={{
                    height: 'auto',
                    width: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>

                    {/* Option 1 for price */}
                    {/* <View style={[{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        height: 'auto',
                        borderRadius: 10,
                        width: 'auto',
                        zIndex: 1,
                        padding: 5,
                    }, GlobalStyles.bgColorMain]}>
                        <View>
                            <Text style={[
                                GlobalStyles.h5,
                                {color: 'white', fontWeight: 'bold'}
                            ]}>
                                {`$${item.price ? item.price : 0}`}
                            </Text>
                        </View>
                    </View> */}
                    {/* Option 2 for color */}
                    {item.color.length !== 0 ? 
                        <View style={[{
                            position: 'absolute',
                            top: 5,
                            right: 5, //orig 10, will look better when we fix borderRadius problem
                            height: 'auto',
                            width: 'auto',
                            zIndex: 2,}]}>
                            <View style={{
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                flexDirection: 'row',
                                borderColor: 'white',
                                borderWidth: 0.5,
                                borderStyle: 'solid',
                                backgroundColor: 'black' //maybe can be a question mark if we don't know the color
                            }}>
                                {item.color.slice(0, 4).map((col, index) => (
                                    <View style={{
                                        backgroundColor: col.toLowerCase(),
                                        height: 10,
                                        aspectRatio: 1,
                                        borderColor: 'white',
                                        borderWidth: 0.5,
                                        borderStyle: 'solid'
                                    }}
                                    key={col}></View>
                                ))}
                            </View>
                        </View>
                    : null }


                    <View style={{
                        height: 10,
                        width: '100%',
                        zIndex: 0
                    }}>
                        <View 
                        style={{
                            position: 'absolute',
                            top: 0,
                            height: 20,
                            borderTopLeftRadius: 10, 
                            borderTopRightRadius: 10, 
                            backgroundColor: '#09122b',
                            width: '100%'}}>
                        </View>
                    </View>
                    
                    <View style={{
                        height: 100,
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        zIndex: 1,
                        backgroundColor: 'white',
                        borderBottomRightRadius: 10,
                        borderBottomLeftRadius: 10
                    }}>
                        <View style={{
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            flexDirection: 'row',
                            height: '100%',
                            width: '100%'

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
                                    height: 35
                                }}>
                                    {item.brandName.slice(0, 2).map((brand, index) => (
                                        <View key={brand}>
                                            <Text category='h5'
                                            style={[{fontWeight: 'bold', marginLeft: 10, marginTop: -5, flexShrink: 1}, 
                                            GlobalStyles.h6, GlobalStyles.hint]}
                                            >{`${brand}${index === 1 && item.brandName.length > 2 ? '...' : ''}`}</Text>
                                        </View>
                                        )
                                    )}
                                </View>
                                {/* Colors under brand names */}
                                <View style={{
                                    height: 20,
                                    width: 'auto',
                                    marginTop: -5,
                                    marginLeft: 10,
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    flexDirection: 'row'
                                }}>
                                    <Text 
                                    numberOfLines={1}
                                    style={[
                                        GlobalStyles.lighterHint,
                                        GlobalStyles.h6,
                                        {fontWeight: 'bold', width: 180}
                                    ]}>
                                        {item.color.map((col, index) => <Text key={col}>{index === 0 ? col : ', ' + col}</Text>)}
                                    </Text>
                                </View>
                                {/* Tags under the colors */}
                                <View style={{
                                    height: 20,
                                    width: 'auto',
                                    marginTop: -5,
                                    marginLeft: 10,
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    flexDirection: 'row'
                                }}>
                                    <Text 
                                    numberOfLines={1}
                                    style={[
                                        GlobalStyles.lighterHint,
                                        GlobalStyles.h6,
                                        {fontWeight: 'bold', width: 200}
                                    ]}>{item.tags.join(', ')}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            position: 'absolute',
                            bottom: 5,
                            right: 5,
                            flexDirection: 'column'
                        }}>
                            {/* Price */}
                            <View style={{
                                justifyContent: 'flex-end',
                            }}>
                                <Text style={[
                                    GlobalStyles.h6,
                                    GlobalStyles.lighterHint,
                                    {fontWeight: 'bold'}
                                ]}>
                                    {`$${item.price ? 
                                        (item.price >= 10000 ? 
                                            item.price.toString().substring(0, item.price.toString().length - 3) + 'k' : 
                                            item.price
                                        )
                                    : 0}`}
                                </Text>
                            </View>
                            {/* Archive / Favorite icons */}
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                            }}>
                                {
                                    item.archive ? <ArchiveIcon size={20} style={[{
                                        marginTop: -3, marginBottom: 2, marginLeft: 2, marginRight: 2
                                    }, GlobalStyles.lighterHint]}/> : null
                                }
                                {
                                    item.favorite ? <HeartIcon size={20} style={{
                                        color: '#ff4040',
                                        marginTop: -3, marginBottom: 2, marginLeft: 2, marginRight: 2
                                    }}/> : null
                                }
                            </View>
                            
                        </View>
                    </View>
                </View> 
            </TouchableOpacity>
        </View>
    )
})



export const ClosetList = ({searchInput, filtersEnabled, heartToggleChecked}, props) => {
    console.log('ClosetList being re-rendered')

    const closetObject = useSelector(state => state.closet.closetObject);

    const navigation = useNavigation();
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
            height: '100%',
        }}
        >
            <FlatList
            data={combinedArrays.filter((item, index) => 
                (
                    // Name matches search
                    item.clothingName.toLowerCase().includes(searchInput.toLowerCase()) ||

                    // Brands match search
                    item.brandName.find(name => name.toLowerCase().includes(searchInput.toLowerCase())) ||

                    // Color match search
                    item.color.find(col => col.toLowerCase().includes(searchInput.toLowerCase())) ||

                    // Tags match search
                    item.tags.find(tag => tag.toLowerCase().includes(tag.toLowerCase())) ||

                    // search is 'favorite' 'heart' 'hearted' 'favorited'
                    (
                        // (searchInput.toLowerCase() === 'favorite' ||
                        // searchInput.toLowerCase() === 'favorited') &&
                        item.favorite
                    ) || 
                    false
                // ) && (!filtersEnabled ? true : (
                //         (heartToggleChecked ? item.favorite : true)
                //         && (true) //you can chain filters after this true.
                //     )  //this might be a little innefficent.\ xdddd
                )
            )}
            
            renderItem={object => <RenderSingleLineClosetItem {...object}/>}

            keyExtractor={obj => obj._id.toString()}
            ListEmptyComponent={<Text>Add some items! (change this)</Text>}
            showsVerticalScrollIndicator={false}

            // Below are possible optimizations
            // removeClippedSubviews={true} // TEMP
            getItemLayout={(data, index) => (
                {length: 120, offset: 120 * index, index}
            )}
            initialNumToRender={5}
            />
        </View>
    )
}