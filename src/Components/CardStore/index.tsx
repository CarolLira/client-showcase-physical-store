/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import api from '../../Services/api';
import { IList } from '../../Types';
import { IGlobalStoreId } from '../../Store/Modules/ListDetails/Types';
import { setNewStoreID } from '../../Store/Modules/ListDetails/Actions';

const CardStore: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigation();

  const [store, setStore] = useState<IList[]>([]);
  const [like, setLike] = useState(false);

  const handleStoreDetails = (value: number, screen: any) => {
    const newStore: IGlobalStoreId = {
      store_id: value,
    };
    dispatch(setNewStoreID(newStore));
    navigate.navigate(screen);
  };

  const handleLikeStore = () => {
    setLike(!like);
  };

  useEffect(() => {
    api.get('stores').then(response => {
      setStore(response.data);
    }).catch(e => console.log(e));
  }, []);

  const Item = ({ item }: { item: IList }) => (
    <Card containerStyle={styles.default} key={item.id}>
      <Card.Image style={styles.imageLogo} source={{uri: item.logo}}/>
      <Card.Title style={styles.labelText}>{item.label}</Card.Title>
      {item.category.map( (option, index) => (
        <Text key={index} style={styles.categoryText}>{option}</Text>
      ))}
      <View style={styles.boxWrapper}>
        <TouchableOpacity onPress={() => handleLikeStore()}>
          {item.favorite && !like ? <Image source={require('../../Assets/Images/like.png')} /> : <Image source={require('../../Assets/Images/dislike.png')} />}
        </TouchableOpacity>
        <View style={styles.ratingWrapper}>
          <Text>{item.rating}</Text>
          <Image style={styles.ratingStar} source={require('../../Assets/Images/estrela.png')} />
        </View>
      </View>
      <Button
        title="Ver Desconto"
        type="outline"
        containerStyle={styles.buttonStyle}
        onPress={() => handleStoreDetails(item.id, 'Detalhes')}
        titleStyle={{color: '#fff', fontWeight: 'bold', fontSize: 12}}
        />
  </Card>
  );


  const renderItem = ({ item }: { item: IList}) => (
    <Item item = {item} />
  );

  return (
    <FlatList
        data={store}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        />
  );
};

const styles = StyleSheet.create({
  default: {
    height: 260,
    width: 150,
    borderRadius: 15,
    backgroundColor: '#FFF',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 7.5,
    elevation: 10,
  },
  labelText: {
    color: '#1F1F1F',
    fontWeight: 'bold',
    fontSize: 16,
    height: 40,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  categoryText: {
    color: '#808080',
  },
  imageLogo: {
    height: 70,
    resizeMode: 'contain',
  },
  buttonStyle: {
    backgroundColor: '#9540BF',
    borderRadius: 15,
  },
  ratingWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  ratingStar: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
});

export default CardStore;
