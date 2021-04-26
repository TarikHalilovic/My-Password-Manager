import React from 'react';
import Dialog from 'react-native-dialog';

export const MyDialog = ({
    showDialog,
    setShowDialog,
    title,
    description,
    buttonConfigs,
}) => {
    return (
        <Dialog.Container
            visible={showDialog}
            onBackdropPress={() => setShowDialog(false)}
        >
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description>{description}</Dialog.Description>
            {buttonConfigs.map(
                (buttonConfig: {label: string; onPress: any}, key: number) => {
                    return (
                        <Dialog.Button
                            label={buttonConfig.label}
                            onPress={buttonConfig.onPress}
                            key={key}
                        />
                    );
                },
            )}
        </Dialog.Container>
    );
};
