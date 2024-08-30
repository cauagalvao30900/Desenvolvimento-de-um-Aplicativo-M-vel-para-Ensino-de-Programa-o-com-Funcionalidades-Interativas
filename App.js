import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Entrar from './src/pages/acesso/entrar'; // Verifique se o nome do arquivo é 'Entrar'
import SignUp from './src/pages/acesso/SignUp';
import Routes from './src/routes'; // Verifique o caminho correto para o arquivo Routes
import Esqueceu from './src/pages/acesso/Esqueceu'; // Certifique-se de que o nome do arquivo é 'Esqueceu'
import Home from './src/pages/Home/Home';

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
          name="SignUp" 
          component={SignUp} 
          options={{ headerShown: false }} // Ocultar cabeçalho
        />
        <Stack.Screen 
          name="Routes" 
          component={Routes} 
          options={{ headerShown: false }} // Ocultar cabeçalho
        />
        <Stack.Screen 
          name="Esqueceu" 
          component={Esqueceu} 
          options={{ headerShown: false }} // Ocultar cabeçalho
        />
     <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ headerShown: false }} // Ocultar cabeçalho
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
