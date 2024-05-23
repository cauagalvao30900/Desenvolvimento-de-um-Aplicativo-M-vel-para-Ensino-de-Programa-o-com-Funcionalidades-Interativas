import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const items = [
  {
    img: 'https://ih1.redbubble.net/image.783593505.9850/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg',
    name: 'React JS',
    subtitle: 'Aprenda a construir App com projetos EXPO',
  },
  {
    img: 'https://cdn.icon-icons.com/icons2/3398/PNG/512/php_logo_icon_214645.png',
    name: 'PHP',
    subtitle: 'Desenvolva aplicações web dinâmicas',
  },
  {
    img: 'https://us.123rf.com/450wm/asnia/asnia1707/asnia170700328/82917774-cone-do-banco-de-dados-sql-logo-design-ui-ou-ux-app-inscri%C3%A7%C3%A3o-branca-com-shadowl-no-quadro-do.jpg',
    name: 'SQL',
    subtitle: 'Dominando o uso de bancos de dados',
  },
  {
    img: 'https://e7.pngegg.com/pngimages/274/211/png-clipart-html-5-logo-ornate-html5-logo-icons-logos-emojis-tech-companies.png',
    name: 'HTML',
    subtitle: 'Fundamentos do desenvolvimento web',
  },
  {
    img: 'https://www.creativefabrica.com/wp-content/uploads/2018/11/Hardware-Logo-by-Friendesign-Acongraphic-27-580x386.jpg',
    name: 'Hardware',
    subtitle: 'Conhecendo os componentes e periféricos',
  },
];

export default function Example() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const navigateToScreen = (screenName) => {
    setIsLoading(true); // Ativa a tela de loading

    // Simula um tempo de espera para a navegação
    setTimeout(() => {
      setIsLoading(false); // Desativa a tela de loading
      navigation.navigate(screenName); // Navega para a próxima tela
    }, 1000); // Tempo de espera em milissegundos
  };

  // Função para abrir a URL do Instagram
  const openInstagram = () => {
    Linking.openURL('https://www.instagram.com/');
  };

  // Função para abrir a URL do YouTube
  const openYouTube = () => {
    Linking.openURL('https://www.youtube.com/');
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Aulas Disponíveis</Text>

        {items.map(({ img, name, subtitle }, index) => {
          let destinationScreen = ''; // Nome da tela de destino

          // Definindo o nome da tela de destino com base no nome do item
          switch (name) {
            case 'React JS':
              destinationScreen = 'reactj'; // Corrigindo a tela de destino
              break;
            case 'PHP':
              destinationScreen = 'phpp';
              break;
            case 'SQL':
              destinationScreen = 'sql';
              break;
            case 'HTML':
              destinationScreen = 'htmls';
              break;
            case 'Hardware':
              destinationScreen = 'hardware';
              break;
            default:
              destinationScreen = 'hardware'; // Tela de detalhes genérica
              break;
          }

          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigateToScreen(destinationScreen)}>
              <View style={styles.cardWrapper}>
                <View style={styles.card}>
                  <Image
                    alt=""
                    resizeMode="cover"
                    source={{ uri: img }}
                    style={styles.cardImg}
                  />

                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>{name}</Text>
                    <Text style={styles.cardSubtitle}>{subtitle}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#007FFF" />
        </View>
      )}
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={openInstagram}>
          <FontAwesome name="instagram" size={30} color="#C13584" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={openYouTube}>
          <FontAwesome name="youtube" size={30} color="#FF0000" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '400',
    color: '#1d1d1d',
    marginBottom: 42,
    left: 80,
  },
  cardWrapper: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderRadius: 10,
    overflow: 'hidden', // Para garantir que a borda não vaze para fora do cartão
    backgroundColor: '#FFFFFF', // Alteração da cor do card para cinza
    position: 'relative', // Para permitir a sobreposição dos ícones
  },
  cardImg: {
    width: 70, // Largura média
    height: 80, // Altura média
    borderRadius: 35,
  },
  cardBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#173153',
    marginRight: 8,
  },
  cardSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#5f697d',
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 8, // Espaçamento horizontal entre os ícones
  },
});
