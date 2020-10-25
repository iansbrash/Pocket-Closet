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
    hint: {
        color: '#a2a6b0' //random ass color
    }

})

export default GlobalStyles;