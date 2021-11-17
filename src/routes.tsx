import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PhysicalStore from "./Screens/PhysicalStore";
import StoreDetails from "./Screens/PhysicalStore/StoreDetails";
import AddressesList from "./Screens/PhysicalStore/AddressesList";

const Routes: React.FC = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Loja Física" component={PhysicalStore} />
        <Stack.Screen name="Detalhes" component={StoreDetails} />
        <Stack.Screen name="Lista de Endereços" component={AddressesList} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes;