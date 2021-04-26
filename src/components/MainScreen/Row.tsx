import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Row = ({navigation, row, deleteAction}) => {
    function copyToClipboard(text: string) {
        if (text != '') {
            Clipboard.setString(text);
            ToastAndroid.show('Item copied to clipboard.', ToastAndroid.SHORT);
        }
    }

    return (
        <View>
            <View style={styles.rowInnerContainer}>
                <View style={styles.leftRowContainer}>
                    <TouchableOpacity onPress={() => copyToClipboard(row.name)}>
                        <Text style={styles.white}>{row.name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => copyToClipboard(row.username)}
                    >
                        <Text style={styles.white}>{row.username}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => copyToClipboard(row.email)}
                    >
                        <Text style={styles.white}>{row.email}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => copyToClipboard(row.pw)}>
                        <Text style={styles.white}>{row.pw}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rightRowContainer}>
                    <View>
                        <Icon.Button
                            name="edit"
                            backgroundColor="blue"
                            onPress={() =>
                                navigation.navigate('AddEditEntry', {row})
                            }
                        >
                            Edit
                        </Icon.Button>
                    </View>
                    <View>
                        <Icon.Button
                            name="trash"
                            backgroundColor="red"
                            onPress={() => deleteAction(row.id)}
                        >
                            Delete
                        </Icon.Button>
                    </View>
                </View>
            </View>
            <Divider style={styles.myDivider} />
        </View>
    );
};

const styles = StyleSheet.create({
    white: {
        color: 'white',
        fontWeight: 'bold',
    },
    myDivider: {
        //backgroundColor: 'black',
        backgroundColor: '#323332',
        marginTop: 5,
        marginBottom: 2,
        height: 5,
    },
    rowInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftRowContainer: {
        marginLeft: 7,
        justifyContent: 'flex-start',
    },
    rightRowContainer: {
        marginRight: 7,
        justifyContent: 'flex-end',
    },
});
