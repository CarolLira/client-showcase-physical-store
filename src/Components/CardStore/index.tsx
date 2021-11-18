import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import api from "../../Services/api";
import { IList } from "../../Types";
import { IGlobalStoreId } from "../../Store/Modules/ListDetails/Types";
import { setNewStoreID } from "../../Store/Modules/ListDetails/Actions";

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
  }

  const handleLikeStore = () => {
    setLike(!like);
  }

  useEffect(() => {
    api.get('stores').then(response => {
      setStore(response.data);
    }).catch(e => console.log(e));
  }, [])

  return (
    <>
    {store.map(item => (
      <Card containerStyle={styles.default} key={item.id}>
        <Card.Title style={styles.labelText}>{item.label}</Card.Title>
        {item.category.map ( (option, index) => (
          <Text key={index} style={styles.categoryText}>{option}</Text>
        ))}
        <Card.Image style={styles.imageLogo} source={{uri: item.logo}}/>
        <View style={styles.boxWrapper}>
          <TouchableOpacity onPress={() => handleLikeStore()}>
            {item.favorite ? <Image source={require('../../Assets/Images/like.png')} /> : <Image source={require('../../Assets/Images/dislike.png')} />}
          </TouchableOpacity>
          <View style={styles.ratingWrapper}>
            <Text>{item.rating}</Text>
            <Image style={styles.ratingStar} source={require('../../Assets/Images/estrela.png')} />
          </View>
        </View> 
        <Button
          title='Ver Desconto'
          type='outline'
          containerStyle={styles.buttonStyle}
          onPress={() => handleStoreDetails(item.id, 'Detalhes')} 
          titleStyle={{color: '#fff', fontWeight: 'bold', fontSize: 12}}
          />
          <Button
            title="Ver no mapa"
            onPress={() => nav.navigate('StoreMap')}
          />
      </Card>
    ))}
    </>
  )
}

const styles = StyleSheet.create({
  default: {
    height: 250,
    width: 180,
    borderRadius: 15,
    backgroundColor: '#FFF',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 7.5,
    elevation: 12,
  },
  labelText: {
    color: '#1F1F1F',
    fontWeight: 'bold',
    fontSize: 16,
  },
  boxWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  categoryText: {
    color: '#808080',
  },
  imageLogo: {
    width: 70,
    height: 70,
    resizeMode: 'contain'
  },
  buttonStyle: {
    backgroundColor: '#9540BF',
    borderRadius: 15,
  },
  ratingWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  ratingStar: {
    width: 20,
    height: 20,
    marginLeft: 5
  }
})

export default CardStore;