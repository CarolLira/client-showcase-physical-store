import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import api from "../../../Services/api";
import { IAdressDetails } from "../../../Types";
import { useSelector } from "react-redux";
import { IGlobalStoreId } from "../../../Store/Modules/ListDetails/Types";

const AddressesList: React.FC = () => {
  const navigate = useNavigation();
  const storeId = useSelector((state: IGlobalStoreId) => state.store_id);
  const [storeData, setStoreData] = useState<IAdressDetails>();

  const handleNavigation = (screen: any) => {
    navigate.navigate(screen);
  }

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
    <View style={styles.default}>
      <Button title="Voltar" onPress={() => {handleNavigation("Detalhes")}}>Voltar</Button>
      <Text style={styles.mainTitle}>Lista de Endereços</Text>
      <Text style={styles.mainTitle}>{storeData?.storeDetails.label}</Text>
      {storeData?.list.map((item, index) => (
        <View key={index} style={styles.addressWrapper}>
          <Text>Endereço: {item.street}</Text>
          <Text>{item.city} - {item.state}</Text>
          <Text>CEP: {item.zipcode}</Text>
          <Text>Contato: {item.phone}</Text>
          <Text>Horário: {item.time.open} - {item.time.close}</Text>
          <Button title="Mapa">Ver Mapa</Button>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  default: {
    alignItems: 'center',
    flex: 1
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
  addressWrapper: {
    minWidth: 280,
    maxWidth: 280,
    backgroundColor: '#fff',
    margin: 10,
    padding: 10
  }
})

export default AddressesList;