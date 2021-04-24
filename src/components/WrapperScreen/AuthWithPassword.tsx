import React from 'react';
import {
    View,
    Pressable,
    TextInput,
    StyleSheet,
    Text,
    Modal,
} from 'react-native';

export const AuthWithPassword = ({
    password,
    isVisible,
    setAllowed,
    setIsVisible,
}) => {
    const [pwEntry, setPwEntry] = React.useState('');
    const [error, setError] = React.useState('');
    return isVisible ? (
        <Modal visible={true} animationType="slide" transparent={true}>
            <View style={styles.container}>
                <TextInput
                    secureTextEntry={true}
                    placeholder="Password"
                    placeholderTextColor="#8a6e6d"
                    style={styles.inputStyle}
                    value={pwEntry}
                    onChangeText={val => setPwEntry(val)}
                />
                <Text style={styles.errorStyle}>{error}</Text>
                <Pressable
                    style={({pressed}) => [
                        styles.customButton,
                        {
                            backgroundColor: pressed ? '#2e2d2d' : '#0f0f0f',
                        },
                    ]}
                    onPress={() => {
                        if (pwEntry.length == 0) {
                            setError('Please enter password');
                        } else if (pwEntry != password) {
                            setError('Invalid password');
                        } else {
                            setPwEntry('');
                            setAllowed(true);
                            setIsVisible(false);
                        }
                    }}
                >
                    <Text style={styles.buttonText}>ENTER</Text>
                </Pressable>
            </View>
        </Modal>
    ) : null;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    customButton: {
        padding: 15,
        width: '90%',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },
    errorStyle: {
        marginBottom: 15,
        color: 'red',
        fontSize: 16,
    },
    inputStyle: {
        borderBottomWidth: 0,
        color: 'white',
        marginBottom: 25,
        width: 300,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#0f0f0f',
        fontSize: 18,
        textAlign: 'center',
    },
});
