import React from 'react';
import CardStore from '../../Components/CardStore';

import {View, StyleSheet, ScrollView} from 'react-native';

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
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F9F1',
  },
});

export default PhysicalStore;
