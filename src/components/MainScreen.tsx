import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';
import { StyleSheet, View } from "react-native";
import { MyTable } from './MyTable';
import Icon from 'react-native-vector-icons/FontAwesome';

export const MainScreen = ({navigation, route}) => {
   const [lastEntryInAction, setLastEntryInAction] = useState(null);
   let entry: {id: number; name:string; username: string; email: string; pw: string} = route.params?.entry;  

   const [searchText, onChangeSearchText] = useState("");
  const [data, setData] = useState([
    {
      id: 1,
      name: 'gmail',
      username: 'username',
      email: 'm@m.com',
      pw: 'coolBestPw',
    },
    {
      id: 10,
      name: '',
      username: '',
      email: 'm@m.com',
      pw: 'coolBestPw',
    },
    {
      id: 2,
      name: 'gmail',
      username: 'username',
      email: 'm@m.com',
      pw: 'coolBestPw',
    },
    {
      id: 3,
      name: 'protonmail',
      username: 'username',
      email: 'm@m.com',
      pw: 'coolBestPw',
    },
    {
      id: 4,
      name: 'hotmail',
      username: 'username',
      email: 'm@m.com',
      pw: 'coolBestPw',
    },
    {
      id: 5,
      name: 'gmail',
      username: 'username',
      email: 'm@m.com',
      pw: 'coolBestPw',
    },
    {
      id: 6,
      name: 'gmail',
      username: 'username',
      email: 'm@m.com',
      pw: 'coolBestPw',
    },
    {
      id: 7,
      name: 'protonmails',
      username: 'usernsame',
      email: 'm@m.com',
      pw: 'coolBestPw',
    },
    {
      id: 8,
      name: 'hotmailssssssssssssss',
      username: 'username',
      email: 'm@m.com',
      pw: 'coolBestPw',
    },
    {
      id: 9,
      name: 'asd',
      username: 'username',
      email: 'm@m.com',
      pw: 'coolBestPw',
    },
  ]);
  const [visibleData, setVisibleData] = useState(data);

  function onChangeSearch(textValue: string){
    onChangeSearchText(textValue);
    textValue = textValue.toLowerCase();
    setVisibleData(data.filter(x =>
      x.name.includes(textValue) || 
      x.username.includes(textValue))
    )
  }

  function deleteEntry(rowId: number){
    setData(data.filter(x => x.id != rowId));
    let searchTextLower = searchText.toLowerCase();
    setVisibleData(data.filter(x =>
      x.id != rowId &&
      (x.name.includes(searchTextLower) || 
      x.username.includes(searchTextLower))
    ));
  }
  function addEditEntry(entry: {id: number; name:string; username: string; email: string; pw: string}){
    let newData: any;
    if(entry.id == 0){
      let newId = null;
      data.forEach(x => {
        if(newId == null || x.id > newId){
          newId = x.id;
        }
      });
      entry.id = newId + 1;
      newData = [entry, ...data];
      setData(newData);
    }
    else{
      newData = [entry, ...data.filter(x => x.id != entry.id)];
      setData(newData);
    }
    setVisibleData(newData);
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