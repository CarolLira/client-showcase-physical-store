import React from 'react';
import CardStore from '../../Components/CardStore';

import {View, StyleSheet, ScrollView} from 'react-native';

const PhysicalStore: React.FC = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.default}>
        <CardStore nav={navigation}/>
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