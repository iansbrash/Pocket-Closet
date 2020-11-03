import React, {useState} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet, TouchableOpacity, View, Keyboard, Text, } from 'react-native'
import { HomeScreenNew } from './HomeScreenNew'
import { 
    createStackNavigator, 
    CardStyleInterpolators 
} from '@react-navigation/stack'
import { FromScratch } from './NewOutfit/FromScratch'
import { OutfitSelection } from './NewOutfit/OutfitSelection'
import { NewClosetScreen } from './NewClosetScreen'
import { FinalizeOutfit } from './NewOutfit/FinalizeOutfit'
import { ViewIndividualPiece } from './ViewIndividualPiece'
import { FinalizeSuccess } from './NewOutfit/FinalizeSuccess'
import { HistoryScreen } from './HistoryScreen'
import { UploadImage } from './NewClothing/UploadImage'
import { TypeOfClothing } from './NewClothing/TypeOfClothing'
import { SizeOfClothing } from './NewClothing/SizeOfClothing'
import { TypeOfBrands } from './NewClothing/TypeOfBrands'
import { ItemDescription } from './NewClothing/ItemDescription'
import { FinalizeClothing } from './NewClothing/FinalizeClothing'
import { ViewIndividualOutfit } from './ViewIndividualOutfit'
import { OutfitFrom } from './NewOutfit/OutfitFrom'
import { HangerIcon, HomeIcon, CalendarIcon } from './GlobalComponents/GlobalIcons'

import GlobalStyles from './GlobalComponents/GlobalStyles'
// Destructuring React Navigator import
const BottomTab = createBottomTabNavigator();
const { Navigator, Screen } = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ClosetStack = createStackNavigator();
const HistoryStack = createStackNavigator();


// Creating react functions for each screen
// Currently:
// Home, closet, history



// const HomeIcon = (props) => (
//     <Icon {...props} name='home-outline'/>
// )
// const CalendarIcon = (props) => (
//     <Icon {...props} name='calendar-outline'/>
// )
// const ClosetIcon = (props) => (
//     <Icon {...props} name='grid-outline'/>
// )





const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',

    },
    text: {
        fontSize: 30,
        color: 'powderblue'
    }
})



const ClosetNav = () => {
    return (
        <ClosetStack.Navigator screenOptions={{
            headerShown: false,
            //This lets our navigator slide left to right on the closet screen
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}>
            <ClosetStack.Screen name="CLOSETSCREEN" component={NewClosetScreen}/>
            <ClosetStack.Screen name="VIEWINDIVIDUALPIECE" component={ViewIndividualPiece}/>
            <ClosetStack.Screen name="NEWCLOTHING" component={TypeOfClothing}/>
            <ClosetStack.Screen name="SIZEOFCLOTHING" component={SizeOfClothing}/>
            <ClosetStack.Screen name="TYPEOFBRANDS" component={TypeOfBrands}/>
            <ClosetStack.Screen name="ITEMDESCRIPTION" component={ItemDescription}/>
            <ClosetStack.Screen name="UPLOADIMAGE" component={UploadImage}/>
            <ClosetStack.Screen name="FINALIZECLOTHING" component={FinalizeClothing} />
            <ClosetStack.Screen name="VIEWINDIVIDUALOUTFIT" component={ViewIndividualOutfit} />
        </ClosetStack.Navigator>
    )
}

const HistoryNav = () => {
    return (
        <HistoryStack.Navigator screenOptions={{headerShown: false}}>
            <HistoryStack.Screen name="HISTORYSCREEN" component={HistoryScreen}/>
        </HistoryStack.Navigator>
    )
}

const HomeNav = () => {
    return (
        <HomeStack.Navigator 
        screenOptions={{headerShown: false}}>
            <HomeStack.Screen name="HOMESCREEN" component={HomeScreenNew} />
            <HomeStack.Screen name="RECORD" component={OutfitFrom} />
            <HomeStack.Screen name="FROMSCRATCH" component={FromScratch} />
            <HomeStack.Screen name="OUTFITSELECTION" component={OutfitSelection} />
            <HomeStack.Screen name="FINALIZEOUTFIT" component={FinalizeOutfit} />
            <HomeStack.Screen name="FINALIZESUCCESS" component={FinalizeSuccess} />
        </HomeStack.Navigator>
    )
}

// Notice destructuring of Navigator's props
// Which is navigation and state UI KITTEN BULLSHIT
// const BottomTabBar = ({navigation, state}) => {
//     return (
    
//         <BottomNavigation 
//         selectedIndex={state.index}
//         onSelect={index => navigation.navigate(state.routeNames[index])}>
//             <BottomNavigationTab icon={CalendarIcon} title='HISTORY' />
//             <BottomNavigationTab icon={HomeIcon} title='HOME'/>
//             <BottomNavigationTab icon={ClosetIcon} title='CLOSET' />
//         </BottomNavigation>
//     )
// }

const TabNavTwo = () => {
    return (
        <BottomTab.Navigator
        tabBarOptions={{
            keyboardHidesTabBar: true,
        }}
        tabBar={(props, i) => <TabNavTwoProp {...props} key={i}/>}
        >
            <Screen name='HISTORY'  component={HistoryNav}/>
            <Screen name='HOME'  component={HomeNav}/>
            <Screen name='CLOSET'  component={ClosetNav} />
        </BottomTab.Navigator>
    )
}

const TabNavTwoProp = ({ state, descriptors, navigation }) => {
    const focusedOptions = descriptors[state.routes[state.index].key].options;
  
    const [keyboardOpen, setKeyboardOpen] = useState(false);
   
   

    if (focusedOptions.tabBarVisible === false) {
      return null;
    }
  
    return (
      <View style={{ flexDirection: 'row' }}>


    {keyboardOpen ? null : (state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  

              const isFocused = state.index === index;
            let icon;
              
            switch (label) {
                case 'HISTORY':
                    icon = <CalendarIcon size={25} style={isFocused ? GlobalStyles.colorMain : GlobalStyles.hint} />
                    break;
                case 'HOME':
                    icon = <HomeIcon size={25} style={isFocused ? GlobalStyles.colorMain : GlobalStyles.hint}/>
                    break;    
                case 'CLOSET':
                    icon = <HangerIcon size={25} style={isFocused ? GlobalStyles.colorMain : GlobalStyles.hint}/>
                    break;
            }

          
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, 
                justifyContent: 'center', 
                alignItems: 'center', 
                flexDirection: 'column',
                backgroundColor: 'white'
                 }}
            >
                <View style={{height: 5, width: '100%', backgroundColor: isFocused ? '#09122b' : 'white'}}></View>
              
                {/* <Text style={{ color: isFocused ? '#09122b' : '#d3d7e0', fontWeight: 'bold', margin: 5,  backgroundColor: 'white'}}>
                    {label}
                </Text> */}
                <View style={{height: 5}}></View>
                {icon}
            </TouchableOpacity>
          );
        }))

        
        }
      </View>
    );
  }

const TabNavigator = () => {
    return (  
        <Navigator 
        tabBarOptions={{
            keyboardHidesTabBar: true,
        }}  tabBar={(props, i) => <BottomTabBar {...props} key={i}/>}>
            <Screen name='HISTORY'  component={HistoryNav}/>
            <Screen name='HOME'  component={HomeNav}/>
            <Screen name='CLOSET'  component={ClosetNav} />
        </Navigator> 
    )
}

// tabBarOptions={{
//     keyboardHidesTabBar: true,
// }} 


export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <TabNavTwo />
        </NavigationContainer>
    )
 
}



