/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import api from '../../../Services/api';
import { IAdressDetails } from '../../../Types';
import { useSelector } from 'react-redux';
import { IGlobalStoreId } from '../../../Store/Modules/ListDetails/Types';

const AddressesList: React.FC = () => {
  const navigate = useNavigation();
  const storeId = useSelector((state: IGlobalStoreId) => state.store_id);
  const [storeData, setStoreData] = useState<IAdressDetails>();

  const handleNavigation = (screen: any) => {
    navigate.navigate(screen);
  };

  useEffect(() => {
    api
      .get(`addresses?store=${storeId}`)
      .then(response => {
        if (response.data.length > 0) {
          api
            .get(`stores/${storeId}`)
            .then(res => {
              setStoreData({...response.data[0], storeDetails: res.data});
            })
            .catch(e => console.log(e));
        }
      })
      .catch(e => console.log(e));
  }, [storeId]);

  return (
    <ScrollView>
      <View style={styles.default}>
        <Text style={styles.mainTitle}>{storeData?.storeDetails.label}</Text>
        <Button
          title="Ver Mapa"
          onPress={() => handleNavigation('StoreMap')}
          type="outline"
          containerStyle={styles.buttonStyle}
          titleStyle={{ color: '#9540BF', fontWeight: 'bold', fontSize: 12 }}
        />
        {storeData?.list.map((item, index) => (
          <View key={index} style={styles.addressWrapper}>
            <Image style={styles.localImg} source={require('../../../Assets/Images/localizacao.png')} />
            <View style={styles.addressCard}>
              <Text>{item.street}</Text>
              <Text>{item.city} - {item.state}</Text>
              <Text>CEP: {item.zipcode}</Text>
              <Text>Contato: {item.phone}</Text>
              <Text>Horário: {item.time.open} - {item.time.close}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  default: {
    alignItems: 'center',
    flex: 1,
  },
  localImg: {
    width: 30,
    height: 30,
  },
  addressCard: {
    marginLeft: 10,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
  addressWrapper: {
    minWidth: 300,
    maxWidth: 300,
    backgroundColor: '#fff',
    margin: 5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonStyle: {
    borderColor: '#9540BF',
    borderRadius: 15,
    borderWidth: 1,
    marginTop: 10,
  },
});

export default AddressesList;
