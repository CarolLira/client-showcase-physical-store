import React from 'react';

import {View, StyleSheet, Text} from 'react-native';

const ProductsOnOffer: React.FC = () => {
  return (
    <View style={styles.default}>
      <Text>Produtos em Oferta</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default ProductsOnOffer;