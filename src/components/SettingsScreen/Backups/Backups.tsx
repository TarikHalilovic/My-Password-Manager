import React from 'react';
import {View, Text, StyleSheet, Pressable, ToastAndroid} from 'react-native';

import * as RNFS from 'react-native-fs';
import {MMKVService} from '../../../service/MMKVService';

import {MyDialog} from '../../general/MyDialog';

export const Backups = () => {
    const [isDialogExportVisible, setIsDialogExportVisible] = React.useState(
        false,
    );
    const [isDialogImportVisible, setIsDialogImportVisible] = React.useState(
        false,
    );

    const createBackupDirAsync = async () => {
        const dirs = await RNFS.readdir(RNFS.ExternalDirectoryPath);
        if (!dirs.includes('backups')) {
            await RNFS.mkdir(RNFS.ExternalDirectoryPath + '/backups');
        }
    };
    const exportBackup = async () => {
        try {
            // Get all entries from storage
            const resultAsObjectArray = await MMKVService.getAllEntriesAsync();
            if (resultAsObjectArray.length == 0) {
                ToastAndroid.show(
                    'Error. No entries to backup',
                    ToastAndroid.LONG,
                );
                return;
            }

            // check if backup directory exists and create it if it doesnt
            // const dirs = await RNFS.readdir(RNFS.ExternalDirectoryPath);
            // if (!dirs.includes('backups')) {
            //     await RNFS.mkdir(RNFS.ExternalDirectoryPath + '/backups');
            // }
            const _createBackupDir = createBackupDirAsync();

            const jsonedResult = JSON.stringify(resultAsObjectArray);

            // name backup file; stored at ExternalDirectoryPath/backups
            // TODO: this could overwrite file so find something better; or make user pick file properly; or check against file names in dir
            const fileName = `${Array(16)
                .fill('abcdefghijklmnopqrstuvwxyz0123456789')
                .map(function (x) {
                    return x[Math.floor(Math.random() * x.length)];
                })
                .join('')}.json`;

            await _createBackupDir;
            await RNFS.writeFile(
                RNFS.ExternalDirectoryPath + `/backups/${fileName}`,
                jsonedResult,
                'utf8',
            );

            ToastAndroid.show(
                `Backup saved at /android/data/com.mypwmanager/files/backups/${fileName}`,
                2500,
            );
        } catch (err) {
            ToastAndroid.show(`Error: ${err}`, ToastAndroid.LONG);
        }
    };

    const importBackup = async () => {
        try {
            // check if any backups located at ../backups
            const dirs = await RNFS.readdir(RNFS.ExternalDirectoryPath);
            if (!dirs.includes('backups')) {
                ToastAndroid.show(
                    `Backups folder does not exist`,
                    ToastAndroid.LONG,
                );
                return;
            }

            // get all backup files
            const filesInBackupFolder = await RNFS.readdir(
                `${RNFS.ExternalDirectoryPath}/backups`,
            );
            const backupFiles = filesInBackupFolder.filter(file =>
                file.endsWith('.json'),
            );
            for (let i = 0; i < backupFiles.length; i++) {
                const content = await RNFS.readFile(
                    RNFS.ExternalDirectoryPath + `/backups/${backupFiles[i]}`,
                );
                const parsedContent = JSON.parse(content);
                await MMKVService.restoreFromBackupFileAsync(parsedContent);
            }

            ToastAndroid.show('Backup restored', 2500);
        } catch (err) {
            ToastAndroid.show(`Error: ${err}`, ToastAndroid.LONG);
        }
    };

    return (
        <View style={styles.container}>
            <MyDialog
                showDialog={isDialogExportVisible}
                setShowDialog={setIsDialogExportVisible}
                title="WARNING"
                description="Backups are exported without encryption. Do you wish to continue?"
                buttonConfigs={[
                    {
                        label: 'Cancel',
                        onPress: () => {
                            setIsDialogExportVisible(false);
                        },
                    },
                    {
                        label: 'OK',
                        onPress: () => {
                            exportBackup();
                            setIsDialogExportVisible(false);
                        },
                    },
                ]}
            />
            <MyDialog
                showDialog={isDialogImportVisible}
                setShowDialog={setIsDialogImportVisible}
                title="WARNING"
                description="Import will attempt to restore ALL backup files located at /android/data/mypwmanager/files ! Are you sure you want to continue? (No entries will be deleted)"
                buttonConfigs={[
                    {
                        label: 'Cancel',
                        onPress: () => {
                            setIsDialogImportVisible(false);
                        },
                    },
                    {
                        label: 'OK',
                        onPress: () => {
                            importBackup();
                            setIsDialogImportVisible(false);
                        },
                    },
                ]}
            />
            <Pressable
                style={({pressed}) => [
                    {
                        backgroundColor: pressed ? '#667069' : 'black',
                    },
                    styles.wrapperCustom,
                ]}
                onPress={() => setIsDialogExportVisible(true)}
            >
                <Text style={styles.menuOptionsText}>Export</Text>
            </Pressable>
            <Pressable
                style={({pressed}) => [
                    {
                        backgroundColor: pressed ? '#667069' : 'black',
                    },
                    styles.wrapperCustom,
                ]}
                onPress={() => setIsDialogImportVisible(true)}
            >
                <Text style={styles.menuOptionsText}>Import</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 10,
    },
    menuOptionsText: {
        color: 'white',
        fontSize: 18,
    },
    wrapperCustom: {
        borderRadius: 8,
        padding: 14,
    },
});
