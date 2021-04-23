import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {MainScreen} from '../MainScreen/MainScreen';
import {AddEditEntry} from '../AddEditScreen/AddEditEntry';
import {Settings} from '../SettingsScreen/Settings';
import {DataProtection} from '../SettingsScreen/DataProtection';
import {Backups} from '../SettingsScreen/Backups';

import Icon from 'react-native-vector-icons/FontAwesome';

import {Linking, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

const Stack = createStackNavigator();

export const MyNavigationContainer = () => {
    const [isReady, setIsReady] = useState(false);
    const [initialState, setInitialState] = useState();

    useEffect(() => {
        const restoreState = async () => {
            try {
                const initialUrl = await Linking.getInitialURL();

                if (Platform.OS !== 'web' && initialUrl == null) {
                    // Only restore state if there's no deep link and we're not on web
                    const savedStateString = await AsyncStorage.getItem(
                        PERSISTENCE_KEY,
                    );
                    const state = savedStateString
                        ? JSON.parse(savedStateString)
                        : undefined;

                    if (state !== undefined) {
                        setInitialState(state);
                    }
                }
            } finally {
                setIsReady(true);
            }
        };

        if (!isReady) {
            restoreState();
        }
    }, [isReady]);
    if (!isReady) {
        return null;
    }

    return (
        <NavigationContainer
            initialState={initialState}
            onStateChange={state =>
                AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
            }
        >
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
