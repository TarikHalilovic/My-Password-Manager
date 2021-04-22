import React from 'react';

import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export const ProtectedComponent = ({fingerprintAuthenticate}) => {
    return (
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
};
const styles = StyleSheet.create({
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
