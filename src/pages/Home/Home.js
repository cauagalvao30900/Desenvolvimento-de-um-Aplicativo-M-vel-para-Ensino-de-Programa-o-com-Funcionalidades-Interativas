import React from 'react';
import { StyleSheet, SafeAreaView, Image, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function Example() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.background}
        source={{ uri: 'https://cdn.discordapp.com/attachments/1134949806679281714/1246646628618862602/logo.jpg?ex=665d25a5&is=665bd425&hm=36c35353025876ec759d972ff7970cddb69967d8264dc4ddad4b22d80c50b3bc&' }}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1d1b',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  overlay: {
    // Adicione o estilo para a sobreposição, se necessário
  },
  content: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 85, // Adicionando espaço entre o botão e a borda inferior
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 12, // Adicionando margem inferior ao texto
    textAlign: 'center',
  },
  button: {
    minWidth: '70%',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.75)',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

//GITHUB TESTE