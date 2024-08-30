import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs'; // ou outro estilo que preferir
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HTMLLessonScreen3 = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites !== null) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    }
  };

  const saveFavorites = async (updatedFavorites) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error);
    }
  };

  const handleFavoriteToggle = (itemId) => {
    const updatedFavorites = favorites.includes(itemId)
      ? favorites.filter(id => id !== itemId)
      : [...favorites, itemId];
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  const renderItem = ({ item }) => {
    const isFavorite = favorites.includes(item.id);

    return (
      <View style={styles.lessonContent}>
        <Text style={styles.subtitle}>{item.title}</Text>
        <Text style={styles.paragraph}>{item.content}</Text>
        <View style={styles.codeBlock}>
          <SyntaxHighlighter language="html" style={docco}>
            {item.code}
          </SyntaxHighlighter>
        </View>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => handleFavoriteToggle(item.id)}
        >
          <Ionicons 
            name={isFavorite ? 'heart' : 'heart-outline'} 
            size={24} 
            color={isFavorite ? 'red' : 'white'} 
          />
        </TouchableOpacity>
      </View>
    );
  };

  const data = [
    {
      id: '47',
      title: 'Elementos Semânticos',
      content: 'Elementos semânticos fornecem significado ao conteúdo da página.',
      code: '<header>\n  <h1>Meu cabeçalho</h1>\n</header>\n<nav>\n  <ul>\n    <li><a href="#">Link 1</a></li>\n    <li><a href="#">Link 2</a></li>\n  </ul>\n</nav>',
    },
    {
      id: '48',
      title: 'Tags de Áudio e Vídeo',
      content: 'As tags <audio> e <video> permitem incorporar áudio e vídeo diretamente na página.',
      code: '<audio controls>\n  <source src="caminho-do-audio.mp3" type="audio/mpeg">\n  Seu navegador não suporta o elemento de áudio.\n</audio>',
    },
    {
      id: '49',
      title: 'Formatação de Texto',
      content: 'HTML oferece várias tags para formatar texto, como <b>, <i>, <strong>, <em>, etc.',
      code: '<p><b>Texto em negrito</b> e <i>itálico</i>.</p>',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Aula 3: Elementos Semânticos, Áudio/Vídeo e Formatação de Texto</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343434', // Cor de fundo atualizada
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white', // Cor do texto atualizada
    textAlign: 'center',
    flex: 1, // Adiciona flex para centralizar o título
  },
  lessonContent: {
    marginBottom: 10,
    position: 'relative',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'white', // Cor do texto atualizada
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    color: 'white', // Cor do texto atualizada
    textAlign: 'center',
  },
  codeBlock: {
    backgroundColor: '#1e1e1e', // Cor de fundo atualizada
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  codeText: {
    fontFamily: 'Courier New',
    color: 'white', // Cor do texto do código atualizada
  },
  backButton: {
    padding: 10,
  },
  favoriteButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});

export default HTMLLessonScreen3;
