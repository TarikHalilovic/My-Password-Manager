import React, {useState} from 'react';
import Dialog from 'react-native-dialog';

export const SetPasswordDialog = ({
    showDialog,
    setShowDialog,
    setPasswordProtectionAsync,
    setIsProtectionTypeModalVisible,
}) => {
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordReenter, setPasswordReenter] = useState('');
    return (
        <Dialog.Container
            visible={showDialog}
            onBackdropPress={() => setShowDialog(false)}
        >
            <Dialog.Title>Set password</Dialog.Title>
            <Dialog.Description>{error}</Dialog.Description>
            <Dialog.Input
                secureTextEntry={true}
                label={'Password'}
                value={password}
                onChangeText={val => {
                    setPassword(val);
                }}
            ></Dialog.Input>
            <Dialog.Input
                secureTextEntry={true}
                label={'Reenter password'}
                value={passwordReenter}
                onChangeText={val => {
                    setPasswordReenter(val);
                }}
            ></Dialog.Input>
            <Dialog.Button
                label="Cancel"
                onPress={() => {
                    setShowDialog(false);
                    setIsProtectionTypeModalVisible(false);
                }}
            />
            <Dialog.Button
                label="Submit"
                onPress={() => {
                    if (password == passwordReenter) {
                        if (password.length < 4) {
                            setError('Minimum password length is 4 characters');
                        } else {
                            setPasswordProtectionAsync(password);
                            setShowDialog(false);
                        }
                    } else {
                        setError('Passwords do not match');
                    }
                }}
            />
        </Dialog.Container>
    );
};
