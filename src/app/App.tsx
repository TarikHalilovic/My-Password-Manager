import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';
import type {ReactNode} from 'react';

import { StyleSheet, SafeAreaView, StatusBar, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { MainScreen } from '../components/MainScreen';
import { AddEditEntry } from '../components/AddEditEntry';

import * as LocalAuthentication from 'expo-local-authentication';

const Stack = createStackNavigator();

const App: () => ReactNode = () => {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    LocalAuthentication.isEnrolledAsync().then(r => {
      if(!r){
        setAllowed(true);
      }
      else{
        LocalAuthentication.authenticateAsync(
          {
            promptMessage: "Please authenticate"
          }
        ).then(r => {
          setAllowed(r.success);
        });
      }
    });
  }, []);

  

  return allowed ? (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <Stack.Navigator
          screenOptions={{ 
            headerStyle: { backgroundColor: 'black' }
          }}
        >
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ title: 'Pw Manager', headerTintColor:'white' }}
          />
          <Stack.Screen 
            name="AddEditEntry"
            component={AddEditEntry}
            options={{ title: 'Add/Edit Entry', headerTintColor:'white' }}
          />
      </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  ) :
  (
    <View style={styles.unauthorized}>
      <Text style={styles.unauthorizedLabel}>Not authorized.</Text>
    </View>
  )
  ;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  unauthorized: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
  },
  unauthorizedLabel: {
    fontSize: 18,
    color: '#fff',
  },
});

export default App;
