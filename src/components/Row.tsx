import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Row = ({navigation, row, deleteAction}) => {
    return (
        <View>
        <View style={styles.rowInnerContainer}>
            <View style={styles.leftRowContainer}>
                <Text style={styles.white}>{row.name}</Text>
                <Text style={styles.white}>{row.username}</Text>
                <Text style={styles.white}>{row.email}</Text>
                <Text style={styles.white}>{row.pw}</Text>
            </View>
            <View style={styles.rightRowContainer}>
                <View>
                    <Icon.Button 
                        name="edit"
                        backgroundColor="blue"
                        onPress={() => navigation.navigate('AddEditEntry', {row})}>
                        Edit
                    </Icon.Button>
                </View>
                <View>
                    <Icon.Button 
                        name="trash"
                        backgroundColor="red"
                        onPress={() => deleteAction(row.id)}>
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
    myDivider:{
        backgroundColor: 'black',
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