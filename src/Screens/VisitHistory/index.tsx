import React from 'react';

import {View, StyleSheet, Text} from 'react-native';

const VisitHistory: React.FC = () => {
  return (
    <View style={styles.default}>
      <Text>Histórico de Visitas</Text>
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

export default VisitHistory;