import 'react-native-gesture-handler';

import React, {useState, useEffect, useRef} from 'react';
import type {ReactNode} from 'react';

import {
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    AppState,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {MainScreen} from '../components/MainScreen';
import {AddEditEntry} from '../components/AddEditEntry';

import * as LocalAuthentication from 'expo-local-authentication';

const Stack = createStackNavigator();

const App: () => ReactNode = () => {
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(
        AppState.currentState,
    );
    const [allowed, setAllowed] = useState(false);

    function fingerprintAuthenticate() {
        if (!allowed) {
            LocalAuthentication.isEnrolledAsync().then(r => {
                if (!r) {
                    setAllowed(true);
                } else {
                    LocalAuthentication.authenticateAsync({
                        promptMessage: 'Please authenticate',
                    }).then(r => {
                        setAllowed(r.success);
                    });
                }
            });
        }
    }

    const _handleAppStateChange = (nextAppState: any) => {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            //fingerprintAuthenticate();
        } else {
            setAllowed(false);
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
    };

    useEffect(() => {
        fingerprintAuthenticate();
        AppState.addEventListener('change', _handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', _handleAppStateChange);
        };
    }, []);

    const ifAllowed = (
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
                        options={{
                            title: 'Pw Manager',
                            headerTintColor: 'white',
                        }}
                    />
                    <Stack.Screen
                        name="AddEditEntry"
                        component={AddEditEntry}
                        options={{
                            title: 'Add/Edit Entry',
                            headerTintColor: 'white',
                        }}
                    />
                </Stack.Navigator>
            </SafeAreaView>
        </NavigationContainer>
    );
    const notNotAllowed = (
        <TouchableOpacity
            onPress={() => fingerprintAuthenticate()}
            style={styles.unauthorized}
        >
            <Text style={[styles.notAllowedLabels, styles.unauthorizedLabel]}>
                Not authorized
            </Text>
            <Text
                style={[styles.notAllowedLabels, styles.pressToAuthorizeLabel]}
            >
                Press to authorize
            </Text>
        </TouchableOpacity>
    );

    return allowed ? ifAllowed : notNotAllowed;
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
    notAllowedLabels: {
        color: '#fff',
    },
    unauthorizedLabel: {
        fontSize: 18,
    },
    pressToAuthorizeLabel: {
        fontSize: 15,
    },
});

export default App;
