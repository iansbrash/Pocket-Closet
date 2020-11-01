import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux'
import store  from './redux/store'
import { persistStore } from 'redux-persist'
import { AppNavigator } from './components/TabNavigator';
import 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react'

let persistor = persistStore(store);

export default function App() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Provider store={store}>
          <PersistGate persistor={persistor}>
                <AppNavigator/>
            </PersistGate>
        </Provider>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
