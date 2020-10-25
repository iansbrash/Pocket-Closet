import React, {useEffect} from 'react'

import { useSelector } from 'react-redux'
import { Text, View  } from 'react-native'


export const HistoryScreen = () => {

    const now = new Date();
    

    const [effectLength, setEffectLength] = React.useState(0);
    const [date, setDate] = React.useState(new Date());
    //we need to make an array of dates from our outfitsArray
    //then parse them
    //then use javascript array .contains function to filter
    const outfitsArray = useSelector(state => state.outfits.outfitsArray);
    var applicableDates = [];
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    //testing
    applicableDates.push(yesterday.toDateString())
    applicableDates.push(tomorrow.toDateString());
    outfitsArray.forEach(outfitObj => {
        if (outfitObj.date) {
            applicableDates.push(outfitObj.date)
        }
    })

    //old effect hook i used that updated too late (bc its an effect lol)
    //setEffectLength(outfitsArray.filter(outObj =>
    //outObj.date === date.toDateString()).length)

    const filter = (date) => applicableDates.includes(date.toDateString()) //date.getDay() !== 0 && date.getDay() !== 6;


    // copied from UI kitten docs, not gonna bother
    // try and understanding this

    

    return (

        
        <View style={{
            flex: 1
        }}>
            <View style={{
                margin: 35
            }}>
                <View style={{
                    width: '100%',
                    height: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        width: 'auto',
                        height: 'auto',
                        elevation: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {/* <Calendar 
                            date={date}
                            filter={filter}
                            onSelect={nextDate => setDate(nextDate)}/> */}
                    </View>
                </View>
            </View>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10
            }}>
                <Text category='h6' style={{fontWeight: 'bold'}}>
                    {applicableDates.includes(date.toDateString()) ? 
                    `You wore ${effectLength ? effectLength : '0'} outfit${effectLength === 1 ? '' : 's'} on ${date.toDateString()}` : 
                    "You haven't recorded an outfit today!"}
                </Text>
            </View>
        </View>
    )
}