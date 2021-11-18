import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PhysicalStore from '../../Screens/PhysicalStore';
import StoreMap from '../StoreMap';
import StoreDetails from '../../Screens/PhysicalStore/StoreDetails';
import AddressesList from '../../Screens/PhysicalStore/AddressesList';

const Stack = createNativeStackNavigator();

const NavigationStacks = () => {
    return (
        <Stack.Navigator initialRouteName="PhysicalStore">
            <Stack.Screen name="PhysicalStore" component={PhysicalStore} />
            <Stack.Screen name="StoreMap" component={StoreMap} />
            <Stack.Screen
                name="Detalhes"
                component={StoreDetails}
            />
            <Stack.Screen
                name="Endereços"
                component={AddressesList}
            />
        </Stack.Navigator>
    );
}

const PhysicalStoreStackNavigation: React.FC = () => {
    return (
        <NavigationStacks />
    );
}

export default PhysicalStoreStackNavigation;