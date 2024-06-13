import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Entrar from '../tcc24/src/pages/acesso/entrar';
import Singup from '../tcc24/src/pages/Perfil/Singup';
import Routes from './src/routes';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Entrar">
        <Stack.Screen 
          name="Entrar" 
          component={Entrar} 
          options={{ headerShown: false }} // Ocultar cabeçalho
        />
        <Stack.Screen 
          name="Singup" 
          component={Singup} 
          options={{ headerShown: false }} // Ocultar cabeçalho
        />
        <Stack.Screen 
          name="routes" 
          component={Routes} 
          options={{ headerShown: false }} // Ocultar cabeçalho
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
