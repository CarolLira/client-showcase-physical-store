import React from 'react';

import { Image } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ProductsOnOffer from '../../Screens/ProductsOnOffer';
import OnlineStore from '../../Screens/OnlineStore';
import VisitHistory from '../../Screens/VisitHistory';
import Wishlist from '../../Screens/Wishlist';
import Account from '../../Screens/Account';
import PhysicalStoreStackNavigation from '../PhysicalStoreStackNavigation';

const Tabs = createBottomTabNavigator();

const NavigationTabs = () => {
  return (
    <Tabs.Navigator initialRouteName="Lojas Físicas">
      <Tabs.Screen
        name="ProductsOnOffer"
        component={ProductsOnOffer}
        options={{
          title: "Produtos em Oferta",
          tabBarIcon: ({focused}) => {
            const image = focused ? require('../../Assets/Images/produtos-oferta-focused.png') : require('../../Assets/Images/produtos-oferta.png');
            return (
              <Image source={image} />
            )
          }
        }}
      />
      <Tabs.Screen
        name="OnlineStore"
        component={OnlineStore}
        options={{
          title: 'Lojas Online',
          tabBarIcon: ({focused}) => {
            const image = focused ? require('../../Assets/Images/lojas-online-focused.png') : require('../../Assets/Images/lojas-online.png');
            return (
              <Image source={image} />
            )
          }
        }}
      />
      <Tabs.Screen
        name="PhysicalStoreStackNavigation"
        component={PhysicalStoreStackNavigation}
        options={{
          title: 'Lojas Físicas',
          headerShown: false,
          tabBarIcon: ({focused}) => {
            const image = focused ? require('../../Assets/Images/lojas-fisicas-focused.png') : require('../../Assets/Images/lojas-fisicas.png');
            return (
              <Image source={image} />
            )
          }
        }}
      />
      <Tabs.Screen
        name="VisitHistory"
        component={VisitHistory}
        options={{
          title: 'Histórico de Visitas',
          tabBarIcon: ({focused}) => {
            const image = focused ? require('../../Assets/Images/historico-focused.png') : require('../../Assets/Images/historico.png');
            return (
              <Image source={image} />
            )
          }
        }}
      />
      <Tabs.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          title: 'Lista de Desejos',
          tabBarIcon: ({focused}) => {
            const image = focused ? require('../../Assets/Images/favoritos-focused.png') : require('../../Assets/Images/favoritos.png');
            return (
              <Image source={image} />
            )
          }
        }}
      />
      <Tabs.Screen
        name="Account"
        component={Account}
        options={{
          title: 'Conta',
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
