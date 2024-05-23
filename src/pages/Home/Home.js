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
        source={{
          uri: 'https://cdn.discordapp.com/attachments/826597059355607040/1239014394407551106/logo.jpg?ex=66416193&is=66401013&hm=f3a2194ae34c26f2ab82803fdab54c1f2544b2f588bd4735c5c9664c349cc0b1&',
        }}
        resizeMode="cover"
      />
      <View style={[styles.background, styles.overlay]} />
      <View style={styles.content}>
        <Text style={styles.title}>Ola aqui abaixo,{'\n'}você pode</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Perfil'); // Navegação para a tela de perfil
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Criar sua conta</Text>
        </TouchableOpacity>
      </View>
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
