import React from 'react'
import { useSelector } from 'react-redux'

import { useNavigation } from '@react-navigation/native'
import { View, Text, } from 'react-native'



// const ExitAction = () => {
//     const navigation = useNavigation();
//     return (
//         <TopNavigationAction icon={ExitIcon} onPress={() => navigation.navigate('HOMESCREEN')}/>
//     )
// }


export const FinalizeSuccess = ({ finalizedOutfit }) => {

    const outfitsArray = useSelector(state => state.outfits.outfitsArray)
    const navigation = useNavigation();

    if (true) return null;

    return (
        <View style={{
            flex: 1
        }}>
            <TopNavigation alignment='center' title='Success!' 
                accessoryRight={ExitAction}/>
            <View style={{
                margin: 10,
                flex: 1
            }}>
                <View style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text category='h1' style={{fontWeight: 'bold'}}>
                        Outfit #{outfitsArray.length}
                    </Text>
                    <View style={{
                        width: '100%', 
                        aspectRatio: 1,
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        <View style={{
                            width: '70%',
                            height: 'auto',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Button
                                style={{
                                    borderRadius: 125,
                                    width: 250,
                                    aspectRatio: 1,
                                }}
                                appearance='outline'
                                onPress={() => navigation.navigate("HOMESCREEN")}
                                status='success'
                                accessoryLeft={CheckIcon}
                            ></Button>
                        </View>
                    </View>
                </View>
            </View>
        </View>

    )
}