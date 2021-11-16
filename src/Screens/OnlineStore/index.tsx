import React from 'react';

import {View, StyleSheet, Text} from 'react-native';

const OnlineStore: React.FC = () => {
  return (
    <View style={styles.default}>
      <Text>Lojas Online</Text>
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

export default OnlineStore;