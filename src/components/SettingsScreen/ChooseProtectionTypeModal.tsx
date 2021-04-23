import React from 'react';

import {View, Text, Pressable, StyleSheet} from 'react-native';

export const ChooseProtectionTypeModal = ({
    isProtectionEnabled,
    setIsProtectionEnabled,
    isProtectionTypeModalVisible,
    setIsProtectionTypeModalVisible,
}) => {
    return (
        <View>
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
                <Text style={styles.buttonText}>Password</Text>
            </Pressable>
            <Pressable
                style={({pressed}) => [
                    styles.customButton,
                    {
                        backgroundColor: pressed ? '#2e2d2d' : '#0f0f0f',
                    },
                ]}
            >
                <Text style={styles.buttonText}>PIN Code</Text>
            </Pressable>
            <Pressable
                style={({pressed}) => [
                    styles.customButton,
                    {
                        backgroundColor: pressed ? '#2e2d2d' : '#0f0f0f',
                    },
                ]}
            >
                <Text style={styles.buttonText}>Fingerprint</Text>
            </Pressable>
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
