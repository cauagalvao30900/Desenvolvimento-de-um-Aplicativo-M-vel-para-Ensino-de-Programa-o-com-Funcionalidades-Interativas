import React from 'react';
import { StyleSheet, SafeAreaView, Image, Dimensions, Text, TouchableOpacity, View, ScrollView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const backgroundImage = require('../../../assets/tech.png');

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.backgroundContainer}>
        <Image
          style={styles.background}
          source={backgroundImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.overlay} />

      <View style={styles.mainContent}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Menu de Scroll Horizontal */}
          <ScrollView horizontal={true} style={styles.horizontalMenu} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Rct')}>
              <Text style={styles.menuText}>React</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('exhtml')}>
              <Text style={styles.menuText}>HTML</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Video Aulas')}>
              <Text style={styles.menuText}>Vídeos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('privacidade')}>
              <Text style={styles.menuText}>Termos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Aulas5')}>
              <Text style={styles.menuText}>Aulas5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Aulas6')}>
              <Text style={styles.menuText}>Aulas6</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('privacidade')}>
              <Text style={styles.menuText}>Termos</Text>
            </TouchableOpacity>
          </ScrollView>
        </ScrollView>

        <View style={styles.bottomSection}>
          <View style={styles.topSection}>
            <Text style={styles.welcomeText}>Continue de onde parou</Text>
            <Text style={styles.subText}>Explore mais conteúdos que você gosta.</Text>
          </View>

          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Comunidade')}
            >
              <Icon name="people" size={30} color="#00ffff" />
              <Text style={styles.actionText}>Comunidade</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('atualizações')}
            >
              <Icon name="newspaper" size={30} color="#00ffff" />
              <Text style={styles.actionText}>Últimas Atualizações</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('favoritos')}
            >
              <Icon name="heart" size={30} color="#00ffff" />
              <Text style={styles.actionText}>Favoritos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343434', // Cor de fundo principal
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center', // Centraliza a logo verticalmente
    alignItems: 'center', // Centraliza a logo horizontalmente
  },
  background: {
    width: 200, // Ajuste conforme o tamanho da sua logo
    height: 200, // Ajuste conforme o tamanho da sua logo
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  horizontalMenu: {
    marginBottom: 50,
    position: 'absolute',
    paddingVertical: 240,
    flexDirection: 'row',
    width: '400%',
    bottom: -270,
    marginTop: 0,
    overflow: 'hidden',
  },
  menuItem: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#333',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#00ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    fontSize: 14,
    color: '#fff',
  },
  bottomSection: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#262626',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    width: '30%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#333',
    borderColor: '#00ffff',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  actionText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
});
