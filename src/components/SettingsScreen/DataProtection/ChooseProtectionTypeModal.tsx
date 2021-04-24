import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, StyleSheet, ToastAndroid} from 'react-native';
import {MMKVService} from '../../../service/MMKVService';
import {ProtectionType} from '../../../helpers/ProtectionType';
import * as LocalAuthentication from 'expo-local-authentication';
import {SetPasswordDialog} from './SetPasswordDialog';

export const ChooseProtectionTypeModal = ({
    setIsProtectionEnabled,
    setIsProtectionTypeModalVisible,
}) => {
    const [hasFingerprintEnrolled, setHasFingerprintEnrolled] = useState(null);
    const [showPasswordDialog, setShowPasswordDialog] = useState(false);

    useEffect(() => {
        LocalAuthentication.isEnrolledAsync().then(r => {
            setHasFingerprintEnrolled(r);
        });
    }, []);

    // hasFingerprintEnrolled check serves as isReady check for displaying component
    if (hasFingerprintEnrolled == null) {
        return null;
    }

    async function setProtection(protectionType: ProtectionType) {
        let success = false;
        if (protectionType == ProtectionType.DISABLED) {
            setIsProtectionEnabled(false);
            success = true;
        } else {
            if (
                protectionType == ProtectionType.FINGERPRINT &&
                hasFingerprintEnrolled
            ) {
                setIsProtectionEnabled(true);
                success = true;
            } else if (protectionType == ProtectionType.PASSWORD) {
                setShowPasswordDialog(true);
            }
        }
        if (success) {
            await MMKVService.setProtectionTypeAsync(protectionType);
            setIsProtectionTypeModalVisible(false);
            ToastAndroid.show(
                'Changes will be applied when app restarts.',
                2000,
            );
        }
    }

    async function setPasswordProtectionAsync(newPassword: string) {
        setShowPasswordDialog(false);
        await MMKVService.setProtectionTypeAsync(ProtectionType.PASSWORD);
        await MMKVService.setPasswordAsync(newPassword);
        setIsProtectionEnabled(true);
        setIsProtectionTypeModalVisible(false);
        ToastAndroid.show('Changes will be applied when app restarts.', 2000);
    }

    return (
        <View>
            <SetPasswordDialog
                showDialog={showPasswordDialog}
                setShowDialog={setShowPasswordDialog}
                setPasswordProtectionAsync={setPasswordProtectionAsync}
                setIsProtectionTypeModalVisible={
                    setIsProtectionTypeModalVisible
                }
            />
            <Pressable
                style={({pressed}) => [
                    styles.customButton,
                    {
                        backgroundColor: pressed ? '#2e2d2d' : '#0f0f0f',
                    },
                ]}
                onPress={() => {
                    setIsProtectionTypeModalVisible(false);
                }}
            >
                <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable
                style={({pressed}) => [
                    styles.customButton,
                    {
                        backgroundColor: pressed ? '#2e2d2d' : '#0f0f0f',
                    },
                ]}
                onPress={() => {
                    setProtection(ProtectionType.DISABLED);
                }}
            >
                <Text style={styles.buttonText}>None</Text>
            </Pressable>
            <Pressable
                style={({pressed}) => [
                    styles.customButton,
                    {
                        backgroundColor: pressed ? '#2e2d2d' : '#0f0f0f',
                    },
                ]}
                onPress={() => {
                    setProtection(ProtectionType.PASSWORD);
                }}
            >
                <Text style={styles.buttonText}>Password</Text>
            </Pressable>
            {hasFingerprintEnrolled ? (
                <Pressable
                    style={({pressed}) => [
                        styles.customButton,
                        {
                            backgroundColor: pressed ? '#2e2d2d' : '#0f0f0f',
                        },
                    ]}
                    onPress={() => {
                        setProtection(ProtectionType.FINGERPRINT);
                    }}
                >
                    <Text style={styles.buttonText}>Fingerprint</Text>
                </Pressable>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    customButton: {
        padding: 15,
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
    },
});
