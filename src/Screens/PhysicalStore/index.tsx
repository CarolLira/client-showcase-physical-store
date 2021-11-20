import React, { useEffect, useState } from 'react';
import CardStore from '../../Components/CardStore';

import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../Services/api';
import { IList } from '../../Types';
import SearchBar  from '../../Components/SearchBar';
const PhysicalStore: React.FC = () => {

  const [searchPhrase, setSearchPhrase] = useState<String>('');
  const [clicked, setClicked] = useState<Boolean>(false);
  const [data, setData] = useState<IList[]>([]);
  const [filteredItems, setFilteredItems] = useState<IList[]>([]);

  useEffect(() => {
    const searchFilter = (item: IList) => {
      if (item.label.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))) {
        return true;
      }
    };
    if (searchPhrase === '') {
      setFilteredItems(data);
    } else {
      const items = data.filter(searchFilter);
      setFilteredItems(items);
    }
  }, [searchPhrase, data]);

  useEffect(() => {
    api.get('stores').then(response => {
      setData(response.data);
      setFilteredItems(response.data);
    }).catch(e => console.log(e));
  }, []);

  return (
      <SafeAreaView style={styles.default}>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
      />
        <CardStore data={filteredItems}/>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  default: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F9F1',
  },
});

export default PhysicalStore;
