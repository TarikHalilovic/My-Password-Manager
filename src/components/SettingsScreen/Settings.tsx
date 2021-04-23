import React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Settings = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => {
                    navigation.navigate('DataProtection');
                }}
                style={({pressed}) => [
                    {
                        backgroundColor: pressed ? '#667069' : 'black',
                    },
                    styles.wrapperCustom,
                ]}
            >
                <Text style={styles.menuText}>
                    <Icon name="lock" size={19} />
                    <> </>
                    <> </>
                    <> </>
                    <> </>
                    Data protection
                </Text>
            </Pressable>
            <Pressable
                onPress={() => {
                    navigation.navigate('Backups');
                }}
                style={({pressed}) => [
                    {
                        backgroundColor: pressed ? '#667069' : 'black',
                    },
                    styles.wrapperCustomBackups,
                ]}
            >
                <Text style={styles.menuText}>
                    <Icon name="database" size={17} />
                    <> </>
                    <> </>
                    <> </>
                    <> </>
                    Backups
                </Text>
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
    menuText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    wrapperCustom: {
        borderRadius: 8,
        padding: 14,
    },
    wrapperCustomBackups: {
        borderRadius: 8,
        padding: 11,
    },
});
