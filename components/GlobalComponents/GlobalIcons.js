import React from 'react'
import { View } from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


export const LeftIcon = (props) => {
    return (
        <Feather style={props.style} name="arrow-left" size={props.size} />
    )
}

export const RightIcon = (props) => {
    return (
        <Feather style={props.style} name="arrow-right" size={props.size} />
    )
}

export const ExitIcon = (props) => {
    return (
        <Entypo style={props.style} name="cross" size={props.size} />
    )
}

export const PlusIcon = (props) => {
    return (
        <Entypo style={props.style} name="plus" size={props.size}/>
    )
}

export const CheckIcon = (props) => {
    return (
        <Feather style={props.style} name="check" size={props.size} />
    )
}

export const XIcon = (props) => {
    return (
        <Feather style={props.style} name="x" size={props.size} />
    )
}

export const HomeIcon = (props) => {
    return (
        <Entypo style={props.style} name="home" size={props.size}/>
    )
}

export const CalendarIcon = (props) => {
    return (
        <Entypo style={props.style} name="calendar" size={props.size}/>
    )
}

export const HangerIcon = (props) => {
    return (
        <MaterialCommunityIcons style={props.style} name="hanger" size={props.size}/>
    )
}

export const HeartIcon = (props) => {
    return (
        <Entypo style={props.style} name="heart" size={props.size}/>
    )
}

export const EditIcon = (props) => {
    return (
        <Feather style={props.style} name="edit" size={props.size} />
    )
}

export const DeleteIcon = (props) => {
    return (
        <MaterialIcons style={props.style} name="delete" size={props.size} />
    )
}

export const ShareIcon = (props) => {
    return (
        <Feather style={props.style} name="share" size={props.size} />
    )
}