import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, StatusBar, Platform} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {MainScreen} from '../MainScreen/MainScreen';
import {AddEditEntry} from '../AddEditScreen/AddEditEntry';
import {Settings} from '../SettingsScreen/Settings';
import {DataProtection} from '../SettingsScreen/DataProtection/DataProtection';
import {Backups} from '../SettingsScreen/Backups/Backups';

import Icon from 'react-native-vector-icons/FontAwesome';

import {MMKVService} from '../../service/MMKVService';

const Stack = createStackNavigator();

export const MyNavigationContainer = () => {
    const [isReady, setIsReady] = useState(false);
    const [initialState, setInitialState] = useState<any>();

    useEffect(() => {
        const restoreState = () => {
            try {
                if (Platform.OS !== 'web') {
                    const savedState = MMKVService.getNavigationState();
                    if (savedState) {
                        setInitialState(savedState);
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
            onStateChange={state => {
                let stateCopy = null;
                if (state.routes != null) {
                    for (let i = 0; i < state.routes.length; i++) {
                        if (state.routes[i].name == 'MainScreen') {
                            stateCopy = Object.assign({}, state);
                            // Delete params on MainScreen because
                            //   addEditEntry runs if there is Entry object in params
                            // AddEdit function shouldnt run when returning from inactive
                            // Cloning state is expensive workaround tho
                            delete stateCopy.routes[i].params;
                            break;
                        }
                    }
                }
                if (stateCopy != null) {
                    MMKVService.setNavigationState(stateCopy);
                } else {
                    MMKVService.setNavigationState(state);
                }
            }}
        >
            <SafeAreaView style={styles.container}>
                <StatusBar />
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {backgroundColor: 'black'},
                        animationEnabled: false,
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
