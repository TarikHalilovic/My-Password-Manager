import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import {RandomPasswordConfiguratorModal} from './RandomPasswordConfiguratorModal';

export const AddEditEntry = ({navigation, route}) => {
    const [visiblePwModal, setVisiblePwModal] = useState(false);
    const [includeSpecialCharsPw, setIncludeSpecialCharsPw] = useState(false);
    const [includeNumbersPw, setIncludeNumbersPw] = useState(true);
    const [includeCapitalLettersPw, setIncludeCapitalLettersPw] = useState(
        true,
    );
    const [lengthPw, setLengthPw] = useState(16);

    const [nameError, setNameError] = useState('');
    const [entry, setEntry] = useState(
        route.params?.row != undefined
            ? route.params.row
            : {
                  id: '0',
                  name: '',
                  username: '',
                  email: '',
                  pw: '',
              },
    );

    function validate() {
        if (entry.name == '') {
            setNameError('Service name/url must have value.');
            return false;
        } else {
            return true;
        }
    }

    function generateRandomPw(
        pwLength: number,
        useCapitalized: boolean,
        useSpecialChars: boolean,
        useNumbers: boolean,
    ) {
        // Not truly random
        // A bit expensive to set string 4 times
        let chars: string = 'abcdefghijklmnopqrstuvwxyz';
        if (useCapitalized) {
            chars = chars + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        if (useSpecialChars) {
            chars = chars + '!@-#$';
        }
        if (useNumbers) {
            chars = chars + '0123456789';
        }
        return Array(pwLength)
            .fill(chars)
            .map(function (x) {
                return x[Math.floor(Math.random() * x.length)];
            })
            .join('');
    }

    return (
        <View style={styles.container}>
            <RandomPasswordConfiguratorModal
                visible={visiblePwModal}
                includeSpecialChars={includeSpecialCharsPw}
                includeNumbers={includeNumbersPw}
                includeCapitalLetters={includeCapitalLettersPw}
                passwordLength={lengthPw}
                setVisible={setVisiblePwModal}
                setIncludeSpecialChars={setIncludeSpecialCharsPw}
                setIncludeNumbers={setIncludeNumbersPw}
                setIncludeCapitalLetters={setIncludeCapitalLettersPw}
                setPasswordLength={setLengthPw}
            />
            <View>
                <Text style={styles.formLabel}>
                    {entry.id == '0' ? 'New' : 'Edit'} Entry
                </Text>
            </View>
            <View>
                <TextInput
                    placeholder="Service name/url"
                    placeholderTextColor="#8a6e6d"
                    style={styles.inputStyle}
                    value={entry.name}
                    onChangeText={val =>
                        setEntry({
                            id: entry.id,
                            name: val,
                            username: entry.username,
                            email: entry.email,
                            pw: entry.pw,
                        })
                    }
                />
                <TextInput
                    placeholder="Username"
                    placeholderTextColor="#8a6e6d"
                    style={styles.inputStyle}
                    value={entry.username}
                    onChangeText={val =>
                        setEntry({
                            id: entry.id,
                            name: entry.name,
                            username: val,
                            email: entry.email,
                            pw: entry.pw,
                        })
                    }
                />
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#8a6e6d"
                    style={styles.inputStyle}
                    value={entry.email}
                    onChangeText={val =>
                        setEntry({
                            id: entry.id,
                            name: entry.name,
                            username: entry.username,
                            email: val,
                            pw: entry.pw,
                        })
                    }
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#8a6e6d"
                    style={styles.inputStyle}
                    value={entry.pw}
                    onChangeText={val =>
                        setEntry({
                            id: entry.id,
                            name: entry.name,
                            username: entry.username,
                            email: entry.email,
                            pw: val,
                        })
                    }
                />
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{nameError}</Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <View style={{marginRight: 5, flex: 0.6}}>
                        <Button
                            title="Generate Pw"
                            onPress={() => {
                                setEntry({
                                    id: entry.id,
                                    name: entry.name,
                                    username: entry.username,
                                    email: entry.email,
                                    pw: generateRandomPw(
                                        lengthPw,
                                        includeCapitalLettersPw,
                                        includeSpecialCharsPw,
                                        includeNumbersPw,
                                    ),
                                });
                            }}
                            color="#0225c2"
                        />
                    </View>
                    <View style={{justifyContent: 'flex-end', flex: 0.4}}>
                        <Button
                            title="Configure"
                            onPress={() => {
                                setVisiblePwModal(true);
                            }}
                        />
                    </View>
                </View>

                <View style={styles.submitButtonWrapper}>
                    <Button
                        title="Submit"
                        onPress={() => {
                            if (validate()) {
                                navigation.navigate('MainScreen', {entry});
                            }
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    formLabel: {
        fontSize: 17,
        color: '#fff',
        marginBottom: 20,
    },
    inputStyle: {
        color: 'black',
        marginBottom: 20,
        width: 300,
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 50,
        backgroundColor: '#DCDCDC',
    },
    errorText: {
        color: 'red',
    },
    errorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 7,
    },
    submitButtonWrapper: {
        marginTop: 10,
    },
});
