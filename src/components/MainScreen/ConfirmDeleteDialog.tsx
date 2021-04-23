import React from 'react';
import Dialog from 'react-native-dialog';

export const ConfirmDeleteDialog = ({
    showDialog,
    rowId,
    deleteEntry,
    setShowDialog,
}) => {
    return (
        <Dialog.Container
            visible={showDialog}
            onBackdropPress={() => setShowDialog(false)}
        >
            <Dialog.Title>Confirm</Dialog.Title>
            <Dialog.Description>
                Do you want to delete this entry?
            </Dialog.Description>
            <Dialog.Button
                label="Cancel"
                onPress={() => setShowDialog(false)}
            />
            <Dialog.Button
                label="Delete"
                onPress={() => {
                    setShowDialog(false);
                    deleteEntry(rowId);
                }}
            />
        </Dialog.Container>
    );
};
