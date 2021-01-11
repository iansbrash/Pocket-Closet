import React, { useState } from 'react'
import { 
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import { TopNavScreenHeader } from '../GlobalComponents/TopNav'
import GlobalStyles from '../GlobalComponents/GlobalStyles'
import {PlusIcon} from '../GlobalComponents/GlobalIcons'
import { useSelector, useDispatch } from 'react-redux'
// maybe ask a few questions before assigning randomly
// i.e. 
//      is it hot, warm, cool, or cold outside
//      do you want to stand out?
//      do you want to try something new?
//      do you want me to choose a random previous outfit?
//

/**
 *          Alternative
 *  Choose outfit components (check boxes)
 *  e.g.
 *      TOPS:
 *          T Shirt (check)
 *          Outerwear (check)
 *      Bottoms:
 *          Short pants
 *          Jeans
 *      Footwear
 *          Sneakers
 *          Dress Shoes
 *          Sandals (etc)
 *      Other
 *          Accessories (check)
 *      
 *      Choose Components and it fills in a random piece for each checked
 *  
 *      There should be a 'save default random config' button
 */
const PlusButton = ({onPressFunc}) => {
    return (
        <View style={{
            height: 'auto',
            width: '50%',
        }}>
            <TouchableOpacity style={[{
                width: 'auto',
                height: 50,
                margin: 5,
                borderRadius: 10,
                elevation: 5,
            }, GlobalStyles.shadowLight]}
            onPress={() => onPressFunc()}>
                <View style={{
                    height: 5,
                    width: '100%'
                }}>
                    <View 
                    style={[
                        GlobalStyles.bgColorMain, {
                        borderTopLeftRadius: 5, 
                        borderTopRightRadius: 5, 
                        height: 10, 
                        width: '100%',
                        position: 'absolute',
                        top: 0,
                        zIndex: 0
                    }]}></View>
                </View>
                <View style={[{
                    height: '100%',
                    width: '100%',
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor: 'white',
                    flexDirection: 'row'
                }]}>
                    <PlusIcon size={30} style={[GlobalStyles.colorMain]}/>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const TypeButton = ({type}) => {
    return (
        <View style={{
            height: 'auto',
            width: '50%',
        }}>
            <View style={[{
                width: 'auto',
                height: 50,
                margin: 5,
                borderRadius: 10,
                elevation: 5,
            }, GlobalStyles.shadowLight]}>
                <View style={{
                    height: 5,
                    width: '100%'
                }}>
                    <View 
                    style={[
                        GlobalStyles.bgColorMain, {
                        borderTopLeftRadius: 5, 
                        borderTopRightRadius: 5, 
                        height: 10, 
                        width: '100%',
                        position: 'absolute',
                        top: 0,
                        zIndex: 0
                    }]}></View>
                </View>
                <View style={[{
                    height: '100%',
                    width: '100%',
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor: 'white',
                    flexDirection: 'row'
                }]}>
                    <Text style={[
                        GlobalStyles.colorMain, GlobalStyles.h4, {fontWeight: 'bold'}
                    ]}>
                        {type}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const CompleteCategory = ({category, selectablesArray}) => {

    const [selected, setSelected] = useState([])

    return (
        <>
            <Text style={[
                GlobalStyles.h3, GlobalStyles.colorMain, { fontWeight: 'bold'}
            ]}>
                {category} 
            </Text>
            <View style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
                {
                    selected.map(pieceType => (
                        <TypeButton type={pieceType} />
                    ))
                }
                <PlusButton />

                
            </View>
        </>
    )
}

export const FromRandom = () => {


    const typesOfClothing = useSelector(state => state.closet.typesOfClothing)

    return (
        <View style={{
            backgroundColor: 'white',
            flex: 1
        }}>
            <TopNavScreenHeader title={'From Random'} exitDestination={'HOMESCREEN'}/>
            {/* Tops, Bottoms, Footwear, Other, etc */}
            
                <View style={{
                    margin: 10,
                    flex: 1
                }}>
                    {
                        Object.keys(typesOfClothing).map(
                            key => (
                                <CompleteCategory category={key} key={key} selectablesArray={typesOfClothing[key]}/>
                            )
                        )
                    }
                </View>
        </View>
    )
}

