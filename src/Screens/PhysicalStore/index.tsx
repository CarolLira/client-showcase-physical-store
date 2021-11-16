import React from 'react';

import {View, StyleSheet, ScrollView} from 'react-native';
import CardStore from '../../Components/CardStore';

const PhysicalStore: React.FC = () => {
  return (
    <ScrollView>
      <View style={styles.default}>
        <CardStore />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  default: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F9F1',
  },
});

export default PhysicalStore;