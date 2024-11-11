import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Image, Dimensions, Text, TouchableOpacity, View, ScrollView, StatusBar, Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const logoImage = require('../../../assets/tech.png'); // Adicione a logo aqui
const languages = [
  'language-python',
  'language-java',
  'language-javascript',
  'nodejs',
  'react',
  'language-php',
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [iconAnimations, setIconAnimations] = useState([]);
  const [explodedCode, setExplodedCode] = useState([]);
  const [codeAnimation, setCodeAnimation] = useState(new Animated.Value(0)); // Animação do código

  useEffect(() => {
    const animations = languages.map((_, index) => {
      const startY = Math.random() > 0.5 ? -50 : height + 50;
      return {
        translateX: new Animated.Value(Math.random() * width),
        translateY: new Animated.Value(startY),
        opacity: new Animated.Value(0),
      };
    });

    setIconAnimations(animations);

    const animateIcons = () => {
      Animated.loop(
        Animated.stagger(500, animations.map((animation) =>
          Animated.sequence([ 
            Animated.timing(animation.opacity, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(animation.translateY, {
              toValue: Math.random() * height * 0.8,
              duration: 3000,
              useNativeDriver: true,
            }),
            Animated.timing(animation.opacity, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]))
        )
      ).start();
    };

    animateIcons();
  }, []);

  const handleIconPress = (language) => {
    const codeSnippets = {
      'language-python': 'print("Hello, World!")',
      'language-java': 'public class Main { public static void main(String[] args) { System.out.println("Hello, World!"); } }',
      'language-javascript': 'console.log("Hello, World!");',
      'nodejs': 'console.log("Hello, Node.js!");',
      'react': 'const App = () => { return <h1>Hello, React!</h1>; }',
      'language-php': '<?php echo "Hello, World!"; ?>',
    };

    setExplodedCode([codeSnippets[language]]); // Atualiza o código a ser exibido

    // Animação de explosão do código
    Animated.timing(codeAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.backgroundContainer}>
        {iconAnimations.map((animation, index) => (
          <Animated.View
            key={index}
            style={[styles.iconContainer, {
              transform: [
                { translateX: animation.translateX },
                { translateY: animation.translateY },
              ],
              opacity: animation.opacity,
            }]}>
            <TouchableOpacity onPress={() => handleIconPress(languages[index])}>
              <MaterialCommunityIcons name={languages[index]} size={50} color="#fff" />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      <Image source={logoImage} style={styles.logo} />

      <View style={styles.overlay} />

      <View style={styles.mainContent}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.horizontalMenu}>
            {explodedCode.length > 0 && (
              <Animated.View style={[styles.codeContainer, { opacity: codeAnimation }]}>
                {explodedCode.map((code, index) => (
                  <Text key={index} style={styles.codeText}>{code}</Text>
                ))}
              </Animated.View>
            )}
          </View>
        </ScrollView>

        <View style={styles.bottomSection}>
          <View style={styles.topSection}>
            <Text style={styles.welcomeText}>Bem-vindo!</Text>
            <Text style={styles.subText}>Explore mais conteúdos que você gosta.</Text>
          </View>

          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Comunidade')}>
              <MaterialCommunityIcons name="account-group" size={30} color="#00ffff" />
              <Text style={styles.actionText}>Comunidade</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('atualizações')}>
              <MaterialCommunityIcons name="newspaper" size={30} color="#00ffff" />
              <Text style={styles.actionText}>Atualizações</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('favoritos')}>
              <MaterialCommunityIcons name="heart" size={30} color="#00ffff" />
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
    backgroundColor: '#343434',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '0%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  logo: {
    position: 'absolute',
    width: 100,
    height: 100,
    top: height / 2 - 50,
    left: width / 2 - 50,
    zIndex: 1,
  },
  iconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
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
    zIndex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444',
    borderRadius: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
  },
  codeContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  codeText: {
    color: '#00ff00',
    fontFamily: 'monospace',
    fontSize: 16,
    marginBottom: 5,
  },
});
