import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function ButtonNew({ size }) {
  return (
    <View style={[styles.container, { marginBottom: -15 }]}> 
      <Text style={[styles.iconText, { marginTop: 5 }]}> {/* Adicione a margem superior aqui */}
        <Entypo name="controller-play" color="white" size={size} />
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50, // Ajuste a altura para ser igual à largura
    borderRadius: 25, // Define o raio para ser metade da largura
    backgroundColor: '#00ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    textAlign: 'center', // Centraliza o texto horizontalmente
    lineHeight: 20, // Garante que o ícone permaneça centralizado verticalmente
  },
});
