import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const items = [
  {
    icon: 'react',
    name: 'React JS',
    subtitle: 'Aprenda a construir App com projetos EXPO',
  },
  {
    icon: 'php',
    name: 'PHP',
    subtitle: 'Desenvolva aplicações web dinâmicas',
  },
  {
    icon: 'database',
    name: 'SQL',
    subtitle: 'Dominando o uso de bancos de dados',
  },
  {
    icon: 'html5',
    name: 'HTML',
    subtitle: 'Fundamentos do desenvolvimento web',
  },
];

export default function Example() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const navigateToScreen = (screenName) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate(screenName);
    }, 1000);
  };

  const openInstagram = () => {
    Linking.openURL('https://www.instagram.com/');
  };

  const openYouTube = () => {
    Linking.openURL('https://www.youtube.com/');
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#545454', flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Aulas Disponíveis</Text>

        {items.map(({ icon, name, subtitle }, index) => {
          let destinationScreen = '';

          switch (name) {
            case 'React JS':
              destinationScreen = 'reactj';
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
            default:
              destinationScreen = 'hardware';
              break;
          }

          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigateToScreen(destinationScreen)}>
              <View style={styles.cardWrapper}>
                <View style={styles.card}>
                  <View style={styles.iconWrapper}>
                    <FontAwesome name={icon} size={40} color="#ffffff" />
                  </View>

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
        </TouchableOpacity>
        <TouchableOpacity onPress={openYouTube}>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    paddingTop: 150, // Adicionado para mover o conteúdo para baixo
  },
  title: {
    fontSize: 22,
    fontWeight: '400',
    color: '#ffffff',
    marginBottom: 42,
    textAlign: 'center',
  },
  cardWrapper: {
    borderColor: '#00ffff',
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#363636', // Cor do card interna
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  iconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#00ffff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    marginRight: 16,
  },
  cardBody: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
  },
  cardSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#d1d1d1',
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
    marginHorizontal: 8,
  },
});
