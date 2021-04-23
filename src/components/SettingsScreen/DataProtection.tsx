import React, {useState} from 'react';
import {View, Switch, StyleSheet, Text, ToastAndroid} from 'react-native';

import {ChooseProtectionTypeModal} from './ChooseProtectionTypeModal';

export const DataProtection = () => {
    // use stored value later
    const [isProtectionEnabled, setIsProtectionEnabled] = useState(false);
    const [
        isProtectionTypeModalVisible,
        setIsProtectionTypeModalVisible,
    ] = useState(false);
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.menuOptionView}>
                    <View style={styles.insideMenuViewLeft}>
                        <Text style={styles.menuOptionsText}>
                            Data encryption
                        </Text>
                    </View>
                    <View style={styles.insideMenuViewRight}>
                        <Switch
                            trackColor={{false: '#767577', true: '#81b0ff'}}
                            thumbColor={true ? '#1e6deb' : '#f4f3f4'}
                            onValueChange={() => {
                                ToastAndroid.show(
                                    'Data encryption is always enabled.',
                                    1500,
                                );
                            }}
                            value={true}
                        />
                    </View>
                </View>
                <View style={styles.menuOptionView}>
                    <View style={styles.insideMenuViewLeft}>
                        <Text style={styles.menuOptionsText}>
                            Password protection
                        </Text>
                    </View>
                    <View style={styles.insideMenuViewRight}>
                        <Switch
                            trackColor={{false: '#767577', true: '#81b0ff'}}
                            thumbColor={
                                isProtectionEnabled ? '#1e6deb' : '#f4f3f4'
                            }
                            onValueChange={() => {
                                //setIsProtectionEnabled(!isProtectionEnabled);
                                if (!isProtectionEnabled) {
                                    setIsProtectionTypeModalVisible(true);
                                }
                            }}
                            value={isProtectionEnabled}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.modalContainer}>
                {isProtectionTypeModalVisible ? (
                    <ChooseProtectionTypeModal
                        isProtectionEnabled={isProtectionEnabled}
                        setIsProtectionEnabled={setIsProtectionEnabled}
                        isProtectionTypeModalVisible={
                            isProtectionTypeModalVisible
                        }
                        setIsProtectionTypeModalVisible={
                            setIsProtectionTypeModalVisible
                        }
                    />
                ) : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 10,
    },
    contentContainer: {
        flex: 1,
    },
    menuOptionView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    insideMenuViewLeft: {
        justifyContent: 'flex-start',
        flex: 0.7,
    },
    insideMenuViewRight: {
        justifyContent: 'flex-end',
    },
    menuOptionsText: {
        color: 'white',
        fontSize: 18,
    },
    modalContainer: {
        backgroundColor: '#0f0f0f',
        justifyContent: 'flex-end',
    },
});
