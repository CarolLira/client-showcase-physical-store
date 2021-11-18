import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PhysicalStore from '../../Screens/PhysicalStore';
import StoreMap from '../StoreMap';
import StoreDetails from '../../Screens/PhysicalStore/StoreDetails';
import AddressesList from '../../Screens/PhysicalStore/AddressesList';

const Stack = createNativeStackNavigator();

const NavigationStacks = () => {
    return (
        <Stack.Navigator initialRouteName="PhysicalStore">
            <Stack.Screen
                name="PhysicalStore"
                component={PhysicalStore}
                options={{
                    title: 'Lojas Físicas',
                }}
            />
            <Stack.Screen
                name="StoreMap"
                component={StoreMap}
                options={{
                    title: 'Mapa',
                    headerShown: true,
                }}
            />
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