import React from 'react';

import { Image } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import PhysicalStore from '../../Screens/PhysicalStore';
import ProductsOnOffer from '../../Screens/ProductsOnOffer';
import OnlineStore from '../../Screens/OnlineStore';
import VisitHistory from '../../Screens/VisitHistory';
import Wishlist from '../../Screens/Wishlist';
import Account from '../../Screens/Account';

const Tabs = createBottomTabNavigator();

const NavigationTabs = () => {
  return (
    <Tabs.Navigator initialRouteName="Lojas Físicas">
      <Tabs.Screen
        name="Produtos em Oferta"
        component={ProductsOnOffer}
        options={{
          tabBarIcon: ({focused}) => {
            const image = focused ? require('../../Assets/Images/produtos-oferta-focused.png') : require('../../Assets/Images/produtos-oferta.png');
            return (
              <Image source={image} />
            )
          }
        }}
      />
      <Tabs.Screen
        name="Lojas Online"
        component={OnlineStore}
        options={{
          tabBarIcon: ({focused}) => {
            const image = focused ? require('../../Assets/Images/lojas-online-focused.png') : require('../../Assets/Images/lojas-online.png');
            return (
              <Image source={image} />
            )
          }
        }}
      />
      <Tabs.Screen
        name="Lojas Físicas"
        component={PhysicalStore}
        options={{
          tabBarIcon: ({focused}) => {
            const image = focused ? require('../../Assets/Images/lojas-fisicas-focused.png') : require('../../Assets/Images/lojas-fisicas.png');
            return (
              <Image source={image} />
            )
          }
        }}
      />
      <Tabs.Screen
        name="Histórico de Visitas"
        component={VisitHistory}
        options={{
          tabBarIcon: ({focused}) => {
            const image = focused ? require('../../Assets/Images/historico-focused.png') : require('../../Assets/Images/historico.png');
            return (
              <Image source={image} />
            )
          }
        }}
      />
      <Tabs.Screen
        name="Lista de Desejos"
        component={Wishlist}
        options={{
          tabBarIcon: ({focused}) => {
            const image = focused ? require('../../Assets/Images/favoritos-focused.png') : require('../../Assets/Images/favoritos.png');
            return (
              <Image source={image} />
            )
          }
        }}
      />
      <Tabs.Screen
        name="Conta"
        component={Account}
        options={{
          tabBarIcon: ({focused}) => {
            const image = focused ? require('../../Assets/Images/conta-focused.png') : require('../../Assets/Images/conta.png');
            return (
              <Image source={image} />
            )
          }
        }}
      />
    </Tabs.Navigator>
  );
};

const BottomNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <NavigationTabs />
    </NavigationContainer>
  );
};

export default BottomNavigation;
