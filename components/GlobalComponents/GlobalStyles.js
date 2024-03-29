import { StyleSheet } from 'react-native'


const GlobalStyles = StyleSheet.create({
    bgColorMain: {
        backgroundColor: '#09122b'
    },
    colorMain: {
        color: '#09122b'
    },
    shadowLight: {
        shadowColor: 'black',
        shadowRadius: 3,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.3,
        elevation: 5
    },
    shadowHeavy: {
        shadowColor: 'black',
        shadowRadius: 5,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.5,
        elevation: 10
    },
    shadowLightest: {
        shadowColor: 'black',
        shadowRadius: 3,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.1,
        elevation: 5
    },
    h1: {
        fontSize: 32
    },
    h2: {
        fontSize: 29
    },
    h3: {
        fontSize: 26
    },
    h4: {
        fontSize: 23,
    },
    h5: {
        fontSize: 20
    },
    h6: {
        fontSize: 17
    },
    h7: {
        fontSize: 14
    },
    h8: {
        fontSize: 11
    },
    hint: {
        color: '#a2a6b0' //random ass color
    },
    lighterHint: {
        color: '#c9c9c9'
    },
    bgHint: {
        backgroundColor: 'lightgray'
    },
    bgLighterHint: {
        backgroundColor: '#c9c9c9'
    },
    favorite: {
        color: '#ff4040'
    },
    bgFavorite: {
        backgroundColor: '#ff4040'
    }


})

export default GlobalStyles;