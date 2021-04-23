import 'react-native-gesture-handler';

import React, {useState, useEffect, useRef} from 'react';
import type {ReactNode} from 'react';

import {AppState} from 'react-native';

import {MyNavigationContainer} from '../components/WrapperScreen/MyNavigationContainer';
import {ProtectedComponent} from '../components/WrapperScreen/ProtectedComponent';

import * as LocalAuthentication from 'expo-local-authentication';

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
            appState.current === 'active' &&
            (nextAppState === 'inactive' || nextAppState === 'background')
        ) {
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

    return allowed ? (
        <MyNavigationContainer />
    ) : (
        <ProtectedComponent fingerprintAuthenticate={fingerprintAuthenticate} />
    );
};

export default App;
