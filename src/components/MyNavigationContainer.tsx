import React from 'react';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {MainScreen} from '../components/MainScreen';
import {AddEditEntry} from '../components/AddEditEntry';
import {Settings} from '../components/Settings';
import {DataProtection} from '../components/DataProtection';
import {Backups} from '../components/Backups';

import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();

export const MyNavigationContainer = () => {
    return (
        <NavigationContainer>
            <SafeAreaView style={styles.container}>
                <StatusBar />
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {backgroundColor: 'black'},
                    }}
                >
                    <Stack.Screen
                        name="MainScreen"
                        component={MainScreen}
                        options={({navigation}) => ({
                            title: 'Pw Manager',
                            headerTintColor: 'white',
                            headerRight: () => (
                                <Icon.Button
                                    name="cog"
                                    backgroundColor="#000"
                                    onPress={() =>
                                        navigation.navigate('Settings')
                                    }
                                ></Icon.Button>
                            ),
                        })}
                    />
                    <Stack.Screen
                        name="AddEditEntry"
                        component={AddEditEntry}
                        options={{
                            title: 'Add/Edit Entry',
                            headerTintColor: 'white',
                        }}
                    />
                    <Stack.Screen
                        name="Settings"
                        component={Settings}
                        options={{
                            title: 'Settings',
                            headerTintColor: 'white',
                        }}
                    />
                    <Stack.Screen
                        name="DataProtection"
                        component={DataProtection}
                        options={{
                            title: 'Data protection',
                            headerTintColor: 'white',
                        }}
                    />
                    <Stack.Screen
                        name="Backups"
                        component={Backups}
                        options={{
                            title: 'Backups',
                            headerTintColor: 'white',
                        }}
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
