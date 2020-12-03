import React from 'react'
import { View } from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

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

export const ShoeIcon = (props) => {
    return (
        <MaterialCommunityIcons style={props.style} name="shoe-formal" size={props.size}/>
    )
}

export const ShirtIcon = (props) => {
    return (
        <MaterialCommunityIcons style={props.style} name="tshirt-crew" size={props.size}/>
    )
}

export const LegIcon = (props) => {
    return (
        <MaterialCommunityIcons style={props.style} name="seat-legroom-normal" size={props.size}/>
    )
}

export const BagIcon = (props) => {
    return (
        <MaterialCommunityIcons style={props.style} name="bag-personal" size={props.size}/>
    )
}

export const ArrowBack = (props) => {
    return (
        <Ionicons style={props.style} name="ios-arrow-back" size={props.size}/>
    )
}

export const MdClose = (props) => {
    return (
        <Ionicons style={props.style} name="md-close" size={props.size}/>
    )
}

export const EyeIcon = (props) => {
    return (
        <Feather style={props.style} name="eye" size={props.size} />
    )
}

export const PhotoLibraryIcon = (props) => {
    return (
        <MaterialIcons style={props.style} name="photo-library" size={props.size} />
    )
}

export const CameraIcon = (props) => {
    return (
        <MaterialIcons style={props.style} name="camera-alt" size={props.size} />
    )
}

export const StatsIcon = (props) => {
    return (
        <Ionicons style={props.style} name="md-stats" size={props.size}/>
    )
}