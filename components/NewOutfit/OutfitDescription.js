import React, {useState, useEffect, useRef} from 'react'
import { 
    TouchableOpacity, 
    TextInput,
    Text,
    Animated,
    Pressable, 
    View, 
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TopNavScreenHeader } from '../GlobalComponents/TopNav'
import { useSelector } from 'react-redux'
import { NextButton } from '../NewClothing/NextButton'
import { ScreenHeader } from '../GlobalComponents/ScreenHeader'
import { useDispatch } from 'react-redux' 
import { outfitInProgressAttributeAdded, outfitInProgressCleansed } from '../../redux/reducers/outfitsSlice'
import GlobalStyles from '../GlobalComponents/GlobalStyles'
import { XIcon, CheckIcon } from '../GlobalComponents/GlobalIcons'
import { BrandTags } from '../ViewIndividualPiece'


const IndividualDescription = ({
        title, numLines, placeholder, thisRef, 
        nextFocusRef, index, setIndex, specialOnCheck, 
        multiline, textInput, setTextInput, keyboardType,
        isPrice}) => {

    const [checkPos] = useState(new Animated.Value(1))

    const onBlur = () => {
        Animated.timing(checkPos, {
            toValue: 1,
            duration: 250,
            useNativeDriver: false
        }).start();

        if (specialOnCheck) {
            specialOnCheck()
        }
    }

    const onFocus = () => {
        setIndex(index)
        console.log(index)
        Animated.timing(checkPos, {
            toValue: 0,
            duration: 250,
            useNativeDriver: false
        }).start();
    }

    const onCheck = () => {
        thisRef.current.blur()
        
        //focus next input
        if (nextFocusRef){
            nextFocusRef.current.focus()
            setIndex(index + 1);
        } 
    }

    return (
        <View style={{
            margin: 10,
            width: 'auto',
            height: 'auto'
        }}>
            <Animated.View style={{
                borderRadius: 5,
                width: 'auto',
                padding: 10,
                shadowRadius: 3,
                backgroundColor: 'white',
                shadowOffset: {
                    width: checkPos,
                    height: checkPos
                },
                shadowOpacity: checkPos.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 0]
                }),
                elevation: checkPos.interpolate({
                    inputRange: [0, 1],
                    outputRange: [10, 0]
                })

            }}>
                <Pressable
                onPressIn={() => thisRef.current.focus()}
                >
                    <View style={{
                        width: '100%',
                    }}>
                        <Text style={[GlobalStyles.h2, {fontWeight: 'bold'}]}>
                            {title}
                        </Text>
                        <View style={{
                            width: '100%',
                            flexDirection: 'row'
                        }}>
                            <Animated.View style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                zIndex: 3,
                                transform: [{
                                    translateX: checkPos.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 60]  // Edit this to change absolute position of textinput
                                    }),
                                }]
                            }}>
                                <Pressable
                                    onPressIn={() => onCheck()}
                                    hitSlop={10}
                                >
                                    <CheckIcon size={35} style={[GlobalStyles.colorMain]}/>
                                </Pressable>
                            </Animated.View>
                            {isPrice ? 
                            <>
                                <Text style={[GlobalStyles.h4, GlobalStyles.hint, {marginTop: 3}]}>$</Text>
                            </>
                            : null}
                            <TextInput style={[{
                                borderColor: 'white',
                                backgroundColor: 'white',
                                height: 'auto',
                                width: 'auto',
                                marginTop: 3,
                            }, GlobalStyles.h4]}
                            onFocus={() => onFocus()}
                            onBlur={() => onBlur()}
                            multiline={multiline}
                            ref={thisRef}
                            value={textInput}
                            onChangeText={nextValue => setTextInput(nextValue)}
                            textStyle={{marginLeft: -12}}
                            placeholder={placeholder}
                            keyboardType={keyboardType ? keyboardType : 'default'} />
                        </View>
                    </View>
                </Pressable>
            </Animated.View>
        </View>
    )
}

const IndividualTag = ({title, deleteFunc}) => {
    return (
        <View style={{
            width: 'auto',
            height: 30,
            margin: 5,
            borderRadius: 5,
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'black',
            flexDirection: 'row',
            elevation: 5
        }}>
            <Text category='h5' style={[{
                color: 'white',
                fontWeight: 'bold',
                marginLeft: 10,
                marginBottom: 0
            }, GlobalStyles.h5]}>
                {title}
            </Text>
            <TouchableOpacity
            onPress={() => deleteFunc(title)}
            style={{height: 25, width: 25, justifyContent: 'center', alignItems: 'center'}}>
                <XIcon size={20} style={{color: 'white'}}/>
            </TouchableOpacity>
        </View>
    )
}

const OutfitStats = () => {


    // outfitInProgress.outfitArr is not _ids yet. We can easily combine the brands together in a set.
    const outfitInProgress = useSelector(state => state.outfits.outfitInProgress)
    const [brands, setBrands] = useState([])
    const [colors, setColors] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalPieces, setTotalPieces] = useState(0)

    // This seems to work
    useEffect(() => {
        let { outfitArr } = outfitInProgress
        let brandSet = new Set();
        let colorSet = new Set();
        let totalPrice = 0;
        let totalPieces = 0;
        Object.keys(outfitArr).forEach(key => {
            outfitArr[key].forEach(clothingObject => {
                clothingObject.brandName.forEach(brand => {
                    brandSet.add(brand);
                });
                clothingObject.color.forEach(col => {
                    colorSet.add(col);
                });
                totalPrice += clothingObject.price === '' ? 0 : parseInt(clothingObject.price);
                totalPieces++;
            })
        })

        // Spread out set into array. Nice.
        setColors([...colorSet])
        setBrands([...brandSet])
        setTotalPieces(totalPieces);
        setTotalPrice(totalPrice)
    }, [])

    const NumOfBrandsPiecesColorsPrice = () => {

        const Bullet = () => (
            <Text style={[{fontWeight: 'bold', marginLeft: 5, marginRight: 5}, GlobalStyles.h3, GlobalStyles.lighterHint]}>•</Text>
        )

        const NiceText = ({text}) => (
            <Text style={[GlobalStyles.h5, {fontWeight: 'bold'}]}>
                    {text}
            </Text>
        )

        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <NiceText text={`${brands.length} Brand${brands.length != 1 ? 's' : ''}`}/>
                <Bullet />
                <NiceText text={`${colors.length} Color${colors.length != 1 ? 's' : ''}`}/>
                <Bullet />
                <NiceText text={`${totalPieces} Piece${totalPieces != 1 ? 's' : ''}`}/>
                <Bullet />
                <NiceText text={`$${totalPrice}`}/>
            </View>
        )
    }

    return (
        <View>
            
            <NumOfBrandsPiecesColorsPrice />
            <BrandTags brandsArray={brands}/>
        </View>
    )
}

export const OutfitDescription = () => {

    // const nameRef = useRef(null)
    const descriptionRef = useRef(null)
    // const colorRef = useRef(null)
    // const priceRef = useRef(null)
    const tagsRef = useRef(null)

    const dispatch = useDispatch()

    // const [nameInput, setNameInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    // const [colorInput, setColorInput] = useState('');
    // const [priceInput, setPriceInput] = useState('');
    const [tagsInput, setTagsInput] = useState('');
    const [tagsArray, setTagsArray] = useState([]);

    const [index, setIndex] = useState(0);
    const [scrollPos] = useState(new Animated.Value(0))

    useEffect(() => {
        Animated.timing(scrollPos, {
            toValue: index > 1 ? -1 * (index - 1) * 112 : 0,
            duration: 250,
            useNativeDriver: false
        }).start();
    }, [index])

    useEffect(() => {
        descriptionRef.current.focus();
    }, [])

    const tagsChange = newValue => {
        // end of tag detected
        if (newValue[newValue.length - 1] === ','){
            console.log("Found a fuckin comma")
            let tagNameToAdd = newValue.substring(0, newValue.length - 1);
            if (!tagsArray.includes(tagNameToAdd) && tagNameToAdd !== ''){
                setTagsArray([...tagsArray, tagNameToAdd]);
            }
            console.log(tagsArray);
            setTagsInput('');
        } else {
            setTagsInput(newValue);
        }
    }

    const deleteTag = (title) => {
        console.log(`Trying to delete ${title} from the state`)
        setTagsArray(tagsArray.filter(item => item !== title));
    }



    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <TopNavScreenHeader title={'Enter Description'} exitDestination={'HOMESCREEN'}
            extraFunc={() => dispatch(outfitInProgressCleansed())}/>
            <View style={{
                width: '100%'
            }}>
                <Animated.View
                style={{
                    transform: [{
                        translateY: scrollPos,
                    }]
                }}>
                    {/* This is going to be each individual input + title */}
                    <IndividualDescription 
                        title={'Description'} 
                        placeholder={'Bought on Grailed 11/17/2019'} 
                        thisRef={descriptionRef} 
                        nextFocusRef={tagsRef}
                        setIndex={setIndex}
                        multiline={false}
                        index={0}
                        textInput={descriptionInput}
                        setTextInput={setDescriptionInput}
                    />
                    <IndividualDescription 
                        title={'Tags'} 
                        placeholder={'Seperate tags with commas'} 
                        setIndex={setIndex}
                        multiline={false}
                        index={1}
                        thisRef={tagsRef} 
                        specialOnCheck={() => setIndex(0)}
                        textInput={tagsInput}
                        setTextInput={tagsChange}
                    />
                    {/** Tags */}
                    <View style={{
                        width: '100%',
                        height: 'auto',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        {tagsArray.map((item, index) => (
                            <IndividualTag title={item} key={item} deleteFunc={deleteTag}/>
                        ))}
                    </View>
                    
                </Animated.View>
                <OutfitStats />
            </View>
            <NextButton 
            navpath={"UPLOADFITPIC"} 
            disabledHook={false} 
            extraFunc={() => dispatch(outfitInProgressAttributeAdded({
                // clothingName: nameInput,
                // color: colorInput,
                description: descriptionInput,
                // price: priceInput,
                tags: tagsArray
            }))}/> 
        </View>
    )
}