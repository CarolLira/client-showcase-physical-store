import { useNavigation } from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import { Image, StyleSheet, Text, View } from "react-native"
import { Button } from 'react-native-elements';
import { useSelector } from 'react-redux';
import api from '../../../Services/api';
import { IGlobalStoreId } from '../../../Store/Modules/ListDetails/Types';
import { IStoreDetails } from '../../../Types';

const StoreDetails: React.FC = () => {
  const navigate = useNavigation();
  const storeId = useSelector((state: IGlobalStoreId) => state.store_id);
  const [storeData, setStoreData] = useState<IStoreDetails>(
    {} as IStoreDetails,
  );

  const handleNavigation = (screen: any) => {
    navigate.navigate(screen);
  }

  useEffect(() => {
    api
      .get(`discounts?store=${storeId}`)
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

  const parseDate = (value: Date) => {
    return Intl.DateTimeFormat('pt-BR').format(new Date(value));
  };

  return (
    <View style={styles.default}>
      <Button title="Voltar" onPress={() => {handleNavigation("Lojas Físicas")}}>Voltar</Button>
      <Text style={styles.mainTitle}>Parabéns! Seu desconto foi gerado com sucesso.</Text>
      <Text style={styles.discountLabel}>Você tem {storeData.percentage}% OFF para aproveitar em {storeData.storeDetails?.label}</Text>
      <Image
        source={{uri: storeData.storeDetails?.logo}}
        style={styles.logoStyle}
      />
      <View style={styles.couponDetails}>
        <Text style={styles.infoDetails}>Código: {storeData?.coupon_code}</Text>
        <Text style={styles.infoDetails}>
          Válido até {storeData?.expires_in && parseDate(storeData?.expires_in)}
        </Text>
      </View>

      <Button
        title='Ver Endereços'
        type='outline'
        containerStyle={styles.buttonStyle}
        onPress={() => {handleNavigation("Endereços")}} 
        titleStyle={{color: '#9540BF', fontWeight: 'bold', fontSize: 12}}
        />

      <View style={styles.boxInfo}>
        <Text style={styles.titleTextInfo}>Como usar?</Text>
        <Text>1- Leve este cupom até o estabelecimento desejado;</Text>
        <Text>2- Apresente através do celular ou impresso;</Text>
        <Text>3- Ganhe desconto.</Text>

        <Text style={styles.titleTextInfo}>Informações</Text>
        <Text>- Este cupom é válido até {storeData?.expires_in && parseDate(storeData?.expires_in)};</Text>
        <Text>- {storeData.percentage}% de desconto em {storeData?.rules};</Text>
        <Text>- Desconto aplicado somente em uma única compra;</Text>
        <Text>- Consulte lojas participantes;</Text>
        <Text>- Promoção válida apenas em lojas físicas.</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  default: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  couponDetails: {
    borderWidth: 3,
    margin: 10,
    padding: 20,
    borderStyle: 'dotted',
    borderColor: '#40BF40',
    justifyContent: 'center',
    alignItems: 'center'
  },
  discountLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 50,
    marginLeft: 50,
    marginBottom: 10,
    textAlign: 'center',
  },
  infoDetails: {
    fontSize: 16,
  },
  logoStyle: {
    height: 80,
    width: 120,
    resizeMode: 'contain',
  },
  buttonStyle: {
    borderColor: '#9540BF',
    borderRadius: 15,
    borderWidth: 1
  },
  titleTextInfo: {
    fontWeight: 'bold',
    marginTop: 10
  },
  boxInfo: {
    margin: 10,
    padding: 10
  }
});

export default StoreDetails;