// https://rnmmkv.vercel.app/#/

import MMKVStorage from 'react-native-mmkv-storage';
import {ProtectionType} from '../helpers/ProtectionType';

const key = {
    navigationKey: 'NAVIGATION_STATE',
    nextIdKey: 'NEXT_ID',
    protectionTypeKey: 'PROTECTION_TYPE',
    allEntriesKeyArrayKey: 'ALL_ENTRIES_KEY_ARRAY',
    passwordKey: 'PASSWORD',
};

const storage = new MMKVStorage.Loader()
    .withInstanceID('mymmkvinstance-1')
    .setProcessingMode(MMKVStorage.MODES.MULTI_PROCESS)
    .withEncryption()
    .initialize();

export const MMKVService = {
    getAllEntriesAsync,
    addEntryAsync,
    removeEntryAsync,
    editEntry,
    setProtectionTypeAsync,
    getProtectionTypeAsync,
    setPasswordAsync,
    getPasswordAsync,
    restoreFromBackupFileAsync,
    setNavigationState,
    getNavigationState,
};

function setNavigationState(navigationState: object) {
    storage.setMap(key.navigationKey, navigationState);
}
function getNavigationState() {
    return storage.getMap(key.navigationKey);
}

async function restoreFromBackupFileAsync(
    entries: Array<{
        id: string;
        name: string;
        username: string;
        pw: string;
        email: string;
    }>,
) {
    let cleanedEntries = [];
    let cleanedKeys = [];

    let nextKey = await storage.getIntAsync(key.nextIdKey);
    if (!nextKey) {
        nextKey = 1;
    }

    // prepare data for import
    entries.forEach(element => {
        const newKey = nextKey.toString();
        const newEntry = {
            id: newKey,
            name: element.name,
            username: element.username ? element.username : '',
            pw: element.pw ? element.pw : '',
            email: element.email ? element.email : '',
        };
        cleanedEntries.push(newEntry);
        cleanedKeys.push(newKey);
        nextKey += 1;
    });

    const currentlyStoredEntries = await getAllEntriesAsync();
    const currentlyStoredKeys = await storage.getArrayAsync(
        key.allEntriesKeyArrayKey,
    );

    if (currentlyStoredKeys == null || currentlyStoredEntries.length == 0) {
        await storage.setArrayAsync(key.allEntriesKeyArrayKey, cleanedKeys);
    } else {
        await storage.setArrayAsync(key.allEntriesKeyArrayKey, [
            ...currentlyStoredKeys,
            ...cleanedKeys,
        ]);
    }
    for (let i = 0; i < cleanedEntries.length; i++) {
        await storage.setMapAsync(cleanedEntries[i].id, cleanedEntries[i]);
    }

    await storage.setIntAsync(key.nextIdKey, nextKey);
}

async function setProtectionTypeAsync(protectionType: ProtectionType) {
    await storage.setIntAsync(key.protectionTypeKey, protectionType);
}

async function setPasswordAsync(password: string) {
    await storage.setStringAsync(key.passwordKey, password);
}

async function getProtectionTypeAsync() {
    return await storage.getIntAsync(key.protectionTypeKey);
}

async function getPasswordAsync() {
    return await storage.getStringAsync(key.passwordKey);
}

async function getAllEntriesAsync() {
    let data: Array<object> = [];

    let keys = await storage.getArrayAsync(key.allEntriesKeyArrayKey);
    if (keys != null) {
        keys.forEach(async (key: any) => {
            // TODO: GetMultiple doesnt work for now; add fix when fixed
            let item = await storage.getMapAsync(key);
            if (item != null) data.push(item);
        });
        return data;
    }

    return data;
}

function editEntry(entry: {id: string}) {
    storage.setMap(entry.id, entry);
}

async function addEntryAsync(entry: {id: string}) {
    let cleanKey: string;

    const entry_key = await storage.getIntAsync(key.nextIdKey);
    if (entry_key != null) {
        cleanKey = entry_key.toString();
        storage.setInt(key.nextIdKey, entry_key + 1);
    } else {
        cleanKey = '1';
        storage.setInt(key.nextIdKey, 2);
    }
    entry.id = cleanKey;
    storage.setMap(cleanKey, entry);

    storage.getArray(
        key.allEntriesKeyArrayKey,
        (err: any, result: Array<string>) => {
            if (err) return;
            if (result != null) {
                storage.setArray(key.allEntriesKeyArrayKey, [
                    ...result,
                    cleanKey,
                ]);
            } else {
                storage.setArray(key.allEntriesKeyArrayKey, [cleanKey]);
            }
        },
    );

    // after updating to mmkv 0.5.5 callbacks will be unavailable so use below
    // const currentKeys = storage.getArray(key.allEntriesKeyArrayKey);
    // if (currentKeys) {
    //     storage.setArray(key.allEntriesKeyArrayKey, [...currentKeys, cleanKey]);
    // } else {
    //     storage.setArray(key.allEntriesKeyArrayKey, [cleanKey]);
    // }

    return cleanKey;
}

async function removeEntryAsync(id: string) {
    const allKeys: Array<string> = await storage.getArrayAsync(
        key.allEntriesKeyArrayKey,
    );

    if (allKeys != null) {
        let newKeys: Array<string> = [];
        allKeys.forEach((key: string) => {
            if (key != id) {
                newKeys.push(key);
            }
        });
        await storage.setArrayAsync(key.allEntriesKeyArrayKey, newKeys);
    }

    return await storage.removeItem(id); // Always returns null?
}
