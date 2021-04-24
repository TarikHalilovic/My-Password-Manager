// https://rnmmkv.vercel.app/#/

import MMKVStorage from 'react-native-mmkv-storage';
import {ProtectionType} from '../helpers/ProtectionType';

const storage = new MMKVStorage.Loader()
    .withInstanceID('mymkkvinstance-1')
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
};

async function setProtectionTypeAsync(protectionType: ProtectionType) {
    await storage.setIntAsync('protectionType', protectionType);
}

async function setPasswordAsync(password: string) {
    await storage.setStringAsync('password', password);
}

async function getProtectionTypeAsync() {
    return await storage.getIntAsync('protectionType');
}

async function getPasswordAsync() {
    return await storage.getStringAsync('password');
}

async function getAllEntriesAsync() {
    let data: Array<object> = [];

    let keys = await storage.getArrayAsync('allEntryKeys');
    if (keys != null) {
        keys.forEach(async key => {
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

    const key = await storage.getIntAsync('nextId');
    if (key != null) {
        cleanKey = key.toString();
        storage.setInt('nextId', key + 1);
    } else {
        cleanKey = '1';
        storage.setInt('nextId', 2);
    }
    entry.id = cleanKey;
    storage.setMap(cleanKey, entry);

    storage.getArray('allEntryKeys', (err: string, result: Array<string>) => {
        if (err) return;
        if (result != null) {
            storage.setArray('allEntryKeys', [...result, cleanKey]);
        } else {
            storage.setArray('allEntryKeys', [cleanKey]);
        }
    });

    return cleanKey;
}

async function removeEntryAsync(id: string) {
    const allKeys = await storage.getArrayAsync('allEntryKeys');

    if (allKeys != null) {
        let newKeys: Array<string> = [];
        allKeys.forEach(key => {
            if (key != id) {
                newKeys.push(key);
            }
        });
        await storage.setArrayAsync('allEntryKeys', newKeys);
    }

    return await storage.removeItem(id); // Always returns null?
}
