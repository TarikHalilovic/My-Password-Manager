import React from 'react';
import {View, FlatList} from 'react-native';
import {Row} from './Row';

export const MyTable = ({navigation, rows, deleteAction}) => {
    return (
        <View style={{flex: 1}}>
            <FlatList
                data={rows}
                renderItem={({item}) => (
                    <Row
                        navigation={navigation}
                        row={item}
                        deleteAction={deleteAction}
                    />
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
};
