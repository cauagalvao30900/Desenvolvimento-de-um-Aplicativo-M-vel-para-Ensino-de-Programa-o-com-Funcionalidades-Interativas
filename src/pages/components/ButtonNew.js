import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function ButtonNew({ size }) {
  return (
    <View style={[styles.container, { marginBottom: -15 }]}> 
      <Text style={[styles.iconText, { marginTop: 5 }]}>
        <Entypo name="controller-play" color="white" size={size} />
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#565656', // Fundo preto
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2, // Largura da borda
    borderColor: '#00ffff', // Cor da borda ciano
  },
  iconText: {
    textAlign: 'center',
    lineHeight: 20,
  },
});
