import React, {useState} from 'react';
import {View, Switch, StyleSheet, Text, ToastAndroid} from 'react-native';

export const DataProtection = () => {
    // use stored value later
    const [isProtectionEnabled, setIsProtectionEnabled] = useState(false);
    return (
        <View style={styles.container}>
            <View style={styles.menuOptionView}>
                <View style={styles.insideMenuViewLeft}>
                    <Text style={styles.menuOptionsText}>Data encryption</Text>
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
                        thumbColor={isProtectionEnabled ? '#1e6deb' : '#f4f3f4'}
                        onValueChange={() =>
                            setIsProtectionEnabled(!isProtectionEnabled)
                        }
                        value={isProtectionEnabled}
                    />
                </View>
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
});
