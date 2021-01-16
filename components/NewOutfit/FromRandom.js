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
import { TypeSelectionModal } from '../GlobalComponents/GlobalModals'

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
const PlusButton = ({onPressFunc, category}) => {
    return (
        <View style={{
            height: 'auto',
            width: '50%',
        }}>
            <TouchableOpacity style={[{
                width: 'auto',
                height: 'auto',
                margin: 5,
                borderRadius: 10,
                elevation: 5,
            }, GlobalStyles.shadowLight]}
            onPress={() => onPressFunc()}>
                <View style={{
                    height: 'auto',
                }}>
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
                        height: 40,
                        width: '100%',
                        borderBottomLeftRadius: 5,
                        borderBottomRightRadius: 5,
                        justifyContent:'space-between',
                        alignItems:'center',
                        backgroundColor: 'white',
                        flexDirection: 'row'
                    }]}>
                        <Text style={[
                            GlobalStyles.h3, GlobalStyles.colorMain, { fontWeight: 'bold', marginLeft: 10},
                        ]}>
                            {category.substr(0, 1).toUpperCase() + category.substr(1, category.length)} 
                        </Text>
                        <PlusIcon size={30} style={[
                            GlobalStyles.colorMain, 
                            {marginRight: 5}
                        ]}/>
                    </View>
                </View>
                
            </TouchableOpacity>
        </View>
    )
}

const Divider = () => {
    return (
        <View style={[{
            width: 'auto',
            height: 1,
            margin: 5
        }]}>
            <View style={[
                GlobalStyles.bgHint,
                {width: '100%', height: '100%'}
            ]}>

            </View>
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
                    height: 40,
                    width: '100%',
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor: 'white',
                    flexDirection: 'row',
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

const CompleteCategory = ({category, selectablesArray, setModalVisible, setSelectedType}) => {

    // const [selected, setSelected] = useState([])

    // const [selected, setSelected] = useState(selectablesArray)


    const onPressFunc = () => {
        setSelectedType(category)
        setModalVisible(true)
    }

    return (
            
            <View style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
            }}>
                {
                    selectablesArray.map((pieceType, index) => (
                        <TypeButton 
                            type={pieceType}
                            key={pieceType} 
                        />
                    ))
                }
                
                <PlusButton 
                    category={category}
                    onPressFunc={onPressFunc}
                />

            </View>
            
    )
}

export const FromRandom = () => {


    const typesOfClothing = useSelector(state => state.closet.typesOfClothing)

    const [modalVisible, setModalVisible] = useState(false)
    const [selectedType, setSelectedType] = useState('')

    // This structure constrasts our usual use of 'topsArray', 'bottomsArray', etc... should change?
    const [selectablesObject, setSelectablesObject] = useState({
        tops: [],
        bottoms: [],
        footwear: [],
        other: []
    })

    return (
        <View style={{
            backgroundColor: 'white',
            flex: 1
        }}>
            <TopNavScreenHeader title={'From Random'} exitDestination={'HOMESCREEN'}/>

            {/* Self-explanatory */}
            <TypeSelectionModal 
                setModalVisible={setModalVisible} 
                modalVisible={modalVisible} 
                onPressFunc={() => null} 
                title={selectedType.substr(0, 1).toUpperCase() + selectedType.substr(1, selectedType.length)} 
                typesArray={selectedType === '' ? [] : typesOfClothing[selectedType]}
                setSelectablesObject={setSelectablesObject}
                selectablesObject={selectablesObject}
                selectedType={selectedType}
            />

            {/* Tops, Bottoms, Footwear, Other, etc */}
                <View style={{
                    margin: 10,
                    flex: 1
                }}>
                    {
                        Object.keys(typesOfClothing).map(
                            (key, index) => (
                                <View key={index}>
                                    <CompleteCategory 
                                        category={key} 
                                        // key={index} 
                                        // selectablesArray={typesOfClothing[key]}
                                        selectablesArray={selectablesObject[key]}
                                        setModalVisible={setModalVisible}
                                        setSelectedType={setSelectedType}
                                    />
                                    <Divider/>     
                                </View>
                            )
                        )
                    }
                </View>
        </View>
    )
}

