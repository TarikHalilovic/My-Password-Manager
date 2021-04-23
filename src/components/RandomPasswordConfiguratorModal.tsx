import React from 'react';
import {Modal, View, Text, Button, StyleSheet} from 'react-native';
import {Slider, CheckBox} from 'react-native-elements';

export const RandomPasswordConfiguratorModal = ({
    visible,
    includeSpecialChars,
    includeNumbers,
    includeCapitalLetters,
    passwordLength,
    setVisible,
    setIncludeSpecialChars,
    setIncludeNumbers,
    setIncludeCapitalLetters,
    setPasswordLength,
}) => {
    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.flexRowView}>
                        <View style={styles.flexFullView}>
                            <Slider
                                maximumValue={55}
                                minimumValue={4}
                                step={1}
                                value={passwordLength}
                                onValueChange={value =>
                                    setPasswordLength(value)
                                }
                            />
                        </View>
                    </View>
                    <Text style={{marginBottom: 20}}>
                        Password length: {passwordLength}
                    </Text>
                    <View style={styles.flexRowView}>
                        <View style={styles.flexFullView}>
                            <CheckBox
                                title="Include numbers"
                                checked={includeNumbers}
                                onPress={() =>
                                    setIncludeNumbers(
                                        (includeNumbers: boolean) =>
                                            !includeNumbers,
                                    )
                                }
                                checkedColor="red"
                            />
                        </View>
                    </View>
                    <View style={styles.flexRowView}>
                        <View style={styles.flexFullView}>
                            <CheckBox
                                title="Include capital letters"
                                checked={includeCapitalLetters}
                                onPress={() =>
                                    setIncludeCapitalLetters(
                                        !includeCapitalLetters,
                                    )
                                }
                                checkedColor="red"
                            />
                        </View>
                    </View>
                    <View style={styles.flexRowView}>
                        <View style={styles.flexFullView}>
                            <CheckBox
                                title="Include special characters"
                                checked={includeSpecialChars}
                                onPress={() =>
                                    setIncludeSpecialChars(!includeSpecialChars)
                                }
                                checkedColor="red"
                            />
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 15}}>
                        <View style={styles.flexFullView}>
                            <Button
                                title="OK"
                                onPress={() => setVisible(false)}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        marginTop: 10,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    flexRowView: {
        flexDirection: 'row',
    },
    flexFullView: {
        flex: 1,
    },
});
