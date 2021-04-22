// https://rnmmkv.vercel.app/#/callbackapi

import MMKVStorage from 'react-native-mmkv-storage';

export const MMKVService = {
    initialize,
    getAllAsync,
    addAsync,
    removeAsync,
    edit,
};

function initialize() {
    return new MMKVStorage.Loader()
        .withInstanceID('mymkkvinstance-1')
        .setProcessingMode(MMKVStorage.MODES.MULTI_PROCESS)
        .withEncryption()
        .initialize();
}

async function getAllAsync(storage: MMKVStorage.API) {
    let data: Array<object> = [];

    let keys = await storage.getArrayAsync('allEntryKeys');
    if (keys != null) {
        keys.forEach(async key => {
            // TODO: GetMultiple doesnt work for now add fix when fixed
            let item = await storage.getMapAsync(key);
            if (item != null) data.push(item);
        });
        return data;
    }

    return [];
}

function edit(storage: MMKVStorage.API, entry: {id: string}) {
    storage.setMap(entry.id, entry);
}

async function addAsync(storage: MMKVStorage.API, entry: {id: string}) {
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

async function removeAsync(storage: MMKVStorage.API, id: string) {
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
