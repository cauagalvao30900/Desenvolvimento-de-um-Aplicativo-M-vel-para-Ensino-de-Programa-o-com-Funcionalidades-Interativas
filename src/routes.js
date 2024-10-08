import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator, Image, StatusBar, Platform } from 'react-native';
import Home from './pages/Home/Home';
import New from './pages/New/New';
import Aulas from './pages/Aulas/Aulas';
import Rct from './pages/Rct/Rct';
import RstBasic from './pages/Rct/RstBasic'; 
import ButtonNew from './pages/components/ButtonNew';
import { Entypo, Feather } from '@expo/vector-icons';
import reactj from './pages/New/reactj';
import Code from  './Code/Code';
import Telaperfil from './pages/Perfil/Telaperfil';
import SignUp from './pages/acesso/SignUp';
import phpp from './pages/New/phpp';
import sql from './pages/New/sql';
import html from './pages/New/html';
import Rstinter from './pages/Rct/Rstinter';
import Rstavanced from './pages/Rct/Rstavanced';
import aula2 from '../Aulasreact/aula2';
import aula3 from '../Aulasreact/aula3';
import aula4 from '../Aulasreact/aula4';
import aula5 from '../Aulasreact/aula5';
import shop from '../Shop/Shop';
import Shop from '../Shop/Shop';
import Contatar from './pages/Perfil/Contatar';
import sobrenos from './pages/Perfil/Equipe';
import Equipe from './pages/Perfil/Equipe';
import privacidade from './pages/Perfil/privacidade';
import relatarerro from './pages/Perfil/relatarerro';
import phpbasic from '../php/phpbasic';
import aula1php from '../Aulasphp/aula1php';
import aula2php from '../Aulasphp/aula2php';
import aula3php from '../Aulasphp/aula3php';
import aula4php from '../Aulasphp/aula4php';
import aula5php from '../Aulasphp/aula5php';
import bancobasico from '../banco/bancobasico';
import aulassql1 from '../aulassql/aulasql1';
import aulassql2 from '../aulassql/aulassql2';
import aulassql3 from '../aulassql/aulassql3';
import aulassql4 from '../aulassql/aulassql4';
import aulassql5 from '../aulassql/aulassql5';
import htmlbasico from '../html/htmlbasico';
import aulahtml1 from '../aulashtml/aulahtml1';
import aulahtml2 from '../aulashtml/aulahtml2';
import aulahtml3 from '../aulashtml/aulahtml3';
import aulahtml4 from '../aulashtml/aulahtml4';
import aulahtml5 from '../aulashtml/aulahtml5';
import exhtml from '../src/pages/exreact/exhtml';
import exphp from '../src/pages/exreact/exphp';
import exreact from '../src/pages/exreact/exrct';
import exsql from '../src/pages/exreact/exsql';
import entrar from '../src/pages/acesso/entrar';
import atualizações from '../src/pages/Home/atualizações';
import favoritos from '../src/pages/Home/favoritos';
import cursos from '../src/pages/Home/cursos';
import Comunidade from '../Comunidade/Comunidade';
import notificacao from '../Comunidade/notificacao';
import Post from '../Comunidade/Post';
import PostDetail from '../Comunidade/Postdetail';
import RewardsScreen from '../src/pages/Perfil/RewardsScreen';
import amigo from '../src/pages/Perfil/amigo';
import modal from '../src/pages/Perfil/modal';
import Direct from '../Comunidade/Direct';




const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#00ffff',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#363636',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarIconStyle: {
          transform: [{ scale: 0.95 }],
          transition: 'transform 0.2s',
        },
      }}
      tabBarOptions={{
        activeTintColor: '#00ffff',
        inactiveTintColor: 'white',
        style: {
          backgroundColor: '#363636',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Entypo name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Aulas"
        component={Aulas}
        options={{
          tabBarLabel: 'Documentos',
          tabBarIcon: ({ size, color }) => (
            <Feather name="file-text" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Video Aulas"
        component={New}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ size, color }) => (
            <ButtonNew size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Code"
        component={Code}
        options={{
          tabBarLabel: 'Exercícios',
          tabBarIcon: ({ size, color }) => (
            <Feather name="edit" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Telaperfil}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Routes() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: Platform.OS === 'ios' ? 70 : StatusBar.currentHeight }}>
      <Image
        source={{ uri: 'https://drive.google.com/uc?export=view&id=1u-rOBdhuA-ZOCKh_GIC_e-dnf3mGpBK2' }}
        style={{ width: 200, height: 500 }}
      />
    </View>
    );
  }

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle="light-content" />
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="Rct"
          component={Rct}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RstBasic"
          component={RstBasic}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Rstinter"
          component={Rstinter}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Rstavanced"
          component={Rstavanced}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="reactj"
          component={reactj}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="cursos"
          component={cursos}
          options={{ headerShown: false }}
        />


        <Stack.Screen
          name="phpp"
          component={phpp}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="sql"
          component={sql}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="htmls"
          component={html}
          options={{ headerShown: false }}
        />
  
        <Stack.Screen
          name="Aula2"
          component={aula2}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="aula3"
          component={aula3}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="aula4"
          component={aula4}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="aula5"
          component={aula5}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Shop"
          component={Shop}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Contatar"
          component={Contatar}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Equipe"
          component={Equipe}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="privacidade"
          component={privacidade}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="relatarerro"
          component={relatarerro}
          options={{ headerShown: false }}
        />

<Stack.Screen
          name="phpbasic"
          component={phpbasic}
          options={{ headerShown: false }}
        />

<Stack.Screen
          name="aula1php"
          component={aula1php}
          options={{ headerShown: false }}
        />

<Stack.Screen
          name="aula2php"
          component={aula2php}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="aula3php"
          component={aula3php}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="aula4php"
          component={aula4php}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="aula5php"
          component={aula5php}
          options={{ headerShown: false }}
        />


<Stack.Screen
          name="bancobasico"
          component={bancobasico}
          options={{ headerShown: false }}
        />




<Stack.Screen
          name="sql1"
          component={aulassql1}
          options={{ headerShown: false }}
        />

<Stack.Screen
          name="sql2"
          component={aulassql2}
          options={{ headerShown: false }}
        />
        
<Stack.Screen
          name="sql3"
          component={aulassql3}
          options={{ headerShown: false }}
        />

<Stack.Screen
          name="sql4"
          component={aulassql4}
          options={{ headerShown: false }}
        />

<Stack.Screen
          name="sql5"
          component={aulassql5}
          options={{ headerShown: false }}
        />

<Stack.Screen
          name="basico5"
          component={htmlbasico}
          options={{ headerShown: false }}
        />
<Stack.Screen
          name="aulahtml1"
          component={aulahtml1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="aulahtml2"
          component={aulahtml2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="aulahtml3"
          component={aulahtml4}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="aulahtml5"
          component={aulahtml5}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="aulahtml4"
          component={aulahtml4}
          options={{ headerShown: false }}
        />

         <Stack.Screen
          name="exreact"
          component={exreact}
          options={{ headerShown: false }}
        />
      

        <Stack.Screen
          name="exhtml"
          component={exhtml}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="favoritos"
          component={favoritos}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="exsql"
          component={exsql}
          options={{ headerShown: false }}
        />

<Stack.Screen
          name="exphp"
          component={exphp}
          options={{ headerShown: false }}
        />

<Stack.Screen
          name="entrar"
          component={entrar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="atualizações"
          component={atualizações}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="Telaperfil"
          component={Telaperfil}
          options={{
            headerTitle: 'Perfil',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
            },
            headerStyle: {
              backgroundColor: '#D3D3D3',
            },
          }}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />


<Stack.Screen
          name="Comunidade"
          component={Comunidade}
          options={{ headerShown: false }}
        />

<Stack.Screen
          name="Direct"
          component={Direct}
          options={{ headerShown: false }}
        />



<Stack.Screen
          name="notificacao"
          component={notificacao}
          options={{ headerShown: false }}
        />

<Stack.Screen
          name="Post"
          component={Post}
          options={{ headerShown: false }}
        />

<Stack.Screen
          name="PostDetail"
          component={PostDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RewardsScreen"
          component={RewardsScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="amigo"
          component={amigo}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="modal"
          component={modal}
          options={{ headerShown: false }}
        />


      </Stack.Navigator>
      {isLoading && (
        <ActivityIndicator
          style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          size="large"
          color="#00ffff"
          animating={true}
        />
      )}
    </>
  );
}
