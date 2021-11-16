import React from 'react';

import {View, StyleSheet, Text} from 'react-native';

const Wishlist: React.FC = () => {
  return (
    <View style={styles.default}>
      <Text>Lista de Desejos</Text>
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

export default Wishlist;