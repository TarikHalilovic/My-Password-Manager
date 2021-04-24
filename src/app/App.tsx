import 'react-native-gesture-handler';

import React, {useState, useEffect, useRef} from 'react';
import type {ReactNode} from 'react';
import {AppState, View} from 'react-native';

import {MyNavigationContainer} from '../components/WrapperScreen/MyNavigationContainer';
import {ProtectedComponent} from '../components/WrapperScreen/ProtectedComponent';
import {AuthWithPassword} from '../components/WrapperScreen/AuthWithPassword';

import * as LocalAuthentication from 'expo-local-authentication';

import {MMKVService} from '../service/MMKVService';
import {ProtectionType} from '../helpers/ProtectionType';

const App: () => ReactNode = () => {
    const appState = useRef(AppState.currentState);
    const [_, setAppStateVisible] = useState(AppState.currentState);
    const [allowed, setAllowed] = useState(false);
    const [protectionType, setProtectionType] = useState(null);
    const [password, setPassword] = useState(null);
    const [isPasswordLockVisible, setIsPasswordLockVisible] = useState(false);

    function fingerprintAuthenticate() {
        LocalAuthentication.authenticateAsync({
            promptMessage: 'Please authenticate',
        }).then(r => {
            setAllowed(r.success);
        });
    }

    function passwordAuthenticate() {
        setIsPasswordLockVisible(true);
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
        MMKVService.getProtectionTypeAsync().then(r => {
            setProtectionType(r);
            if (r == ProtectionType.PASSWORD) {
                MMKVService.getPasswordAsync().then(rPw => {
                    setPassword(rPw);
                });
                passwordAuthenticate();
            } else if (r == ProtectionType.FINGERPRINT) {
                fingerprintAuthenticate();
            } else {
                setAllowed(true);
            }
        });
        AppState.addEventListener('change', _handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', _handleAppStateChange);
        };
    }, []);

    if (protectionType == null) {
        return null;
    }

    if (!allowed && protectionType == ProtectionType.DISABLED) {
        setAllowed(true);
    }

    function authenticate() {
        if (protectionType == null) return;
        else if (protectionType == ProtectionType.PASSWORD) {
            passwordAuthenticate();
        } else if (protectionType == ProtectionType.FINGERPRINT) {
            fingerprintAuthenticate();
        } else if (protectionType == ProtectionType.DISABLED) {
            setAllowed(true);
        }
    }

    return (
        <View style={{flex: 1}}>
            <AuthWithPassword
                password={password}
                isVisible={isPasswordLockVisible}
                setIsVisible={setIsPasswordLockVisible}
                setAllowed={setAllowed}
            />
            {allowed ? (
                <MyNavigationContainer />
            ) : (
                <ProtectedComponent authenticate={authenticate} />
            )}
        </View>
    );
};

export default App;
