import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import api from "../../Services/api";
import { IStore } from "../../Types";

const CardStore: React.FC = () => {
  const [store, setStore] = useState<IStore[]>([]);
  const [like, setLike] = useState(false);

  const setLikeStore = () => {
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
      <View style={styles.default} key={item.id}>
        <Text style={styles.labelText}>{item.label}</Text>
        <Image style={styles.imageContent} source={{uri: item.logo}}/>
        <TouchableOpacity onPress={() => setLikeStore()}>
          {item.favorite ? <Image source={require('../../Assets/Images/like.png')} /> : <Image source={require('../../Assets/Images/dislike.png')} />}
        </TouchableOpacity>
      </View>
    ))}
    </>
  )
}

// 0px 4px 4px rgba(0, 0, 0, 0.25)

const styles = StyleSheet.create({
  default: {
    height: 200,
    width: 300,
    margin: 10,
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6},
    shadowOpacity: 0.4,
    shadowRadius: 7.5,
    elevation: 12,
  },
  labelText: {
    color: '#1F1F1F',
    fontWeight: 'bold',
    fontSize: 20,
  },
  imageContent: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  }
})

export default CardStore;