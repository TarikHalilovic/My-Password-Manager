import React, { useState, useEffect } from 'react';
import { SearchBar } from 'react-native-elements';
import { StyleSheet, View } from "react-native";
import { MyTable } from './MyTable';
import Icon from 'react-native-vector-icons/FontAwesome';

import { MMKVService } from '../service/MMKVService';

export const MainScreen = ({navigation, route}) => {
  const [storageService, setStorageService] = useState(null);
  const [data, setData] = useState([]);
  const [visibleData, setVisibleData] = useState([]);

  useEffect(() => {
    const service = MMKVService.initialize();
    setStorageService(service);
    MMKVService.getAll(service).then((result) => {
      setData(result);
      setVisibleData(result);
    });
  }, []);

  const [lastEntryInAction, setLastEntryInAction] = useState(null);
  let entry: {id: string; name:string; username: string; email: string; pw: string} = route.params?.entry;  

  const [searchText, setSearchText] = useState("");

  function onChangeSearch(textValue: string){
    setSearchText(textValue);
    textValue = textValue.toLowerCase();
    if(textValue == ""){
      setVisibleData(data);
    }
    else{
      setVisibleData(
        data.filter(
          x => x.name.toLowerCase().includes(textValue) || 
          x.username.toLowerCase().includes(textValue)
        )
      );
    }
  }

  function deleteEntry(rowId: string){
    MMKVService.remove(storageService, rowId);

    setData(data.filter(x => x.id != rowId));
    let searchTextLower = searchText.toLowerCase();
    setVisibleData(data.filter(x =>
      x.id != rowId &&
      (x.name.includes(searchTextLower) || 
      x.username.includes(searchTextLower))
    ));
  }

  function addEditEntry(entry: {id: string; name:string; username: string; email: string; pw: string}){
    let newData: any;
    if(entry.id == "0"){
      let newId: string = null;
      MMKVService.add(storageService, entry).then(id => {
        newId = id;
      });
      entry.id = newId;

      newData = [entry, ...data];
      setData(newData);
    }
    else{
      MMKVService.edit(storageService, entry);
      newData = [entry, ...data.filter(x => x.id != entry.id)];
      setData(newData);
    }
    setVisibleData(newData);
    setSearchText("");
  }

  if(entry != undefined && (lastEntryInAction == null ||
    (entry.id != lastEntryInAction.id ||
    entry.name != lastEntryInAction.name ||
    entry.username != lastEntryInAction.username ||
    entry.email != lastEntryInAction.email ||
    entry.pw != lastEntryInAction.pw))){
      addEditEntry(entry);
      setLastEntryInAction(entry);
}

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchText}
      />
      <Icon.Button 
        name="plus"
        backgroundColor="#23C552"
        onPress={() => navigation.navigate('AddEditEntry')}>
        Add
      </Icon.Button>
      <View style={styles.wrapperAroundMyTable}>
        <MyTable
          rows={visibleData}
          deleteAction={deleteEntry}
          navigation={navigation}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  wrapperAroundMyTable:{
    flex: 1,
    marginTop: 6,
  }
});