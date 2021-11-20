import React from 'react';
import { StyleSheet, TextInput, View, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBar: React.FC<any> = (props: any) => {
  return (
    <View style={styles.container}>
      <View
        style={
          !props.clicked
            ? styles.searchBar__unclicked
            : styles.searchBar__clicked
        }
      >
        <Icon
          name="search"
          size={20}
          color="black"
          style={{ marginHorizontal: 10 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Buscar"
          value={props.searchPhrase}
          onChangeText={props.setSearchPhrase}
          onFocus={() => {
            props.setClicked(true);
          }}
        />
        {props.clicked && (
          <Icon name="close" size={20} color="black" style={{ marginHorizontal: 10 }} onPress={() => {
              props.setSearchPhrase('');
              Keyboard.dismiss();
              props.setClicked(false);
          }}/>
        )}
      </View>
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '15%',

  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: 'row',
    width: '95%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    fontSize: 20,
    marginHorizontal: 10,
    width: '90%',
  },
});
