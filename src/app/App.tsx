import 'react-native-gesture-handler';

import React from 'react';
import type {ReactNode} from 'react';

import { StyleSheet, SafeAreaView, StatusBar  } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { MainScreen } from '../components/MainScreen';
import { AddEditEntry } from '../components/AddEditEntry';

const Stack = createStackNavigator();

const App: () => ReactNode = () => {
  return (
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
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
});

export default App;
