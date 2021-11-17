import React from 'react';
import { Provider } from 'react-redux';
import BottomNavigation from './Components/BottomNavigation';
import store from './Store';

const App = () => {
  return (
    <Provider store={store}>
      <BottomNavigation />
    </Provider>
  );
};

export default App;
