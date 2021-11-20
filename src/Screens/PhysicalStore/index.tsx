import React from 'react';
import CardStore from '../../Components/CardStore';

import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PhysicalStore: React.FC = () => {
  return (
      <SafeAreaView style={styles.default}>
        <CardStore />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  default: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F9F1',
  },
});

export default PhysicalStore;
