import React from 'react';
import { StyleSheet } from 'react-native';
import BottomNavigation from './Components/BottomNavigation';

const App = () => {
  return (
    <>
      <BottomNavigation />
    </>
  );
};

const styles = StyleSheet.create({
  default: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default App;
