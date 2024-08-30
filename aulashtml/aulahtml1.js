import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs'; // ou outro estilo que preferir
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HTMLLessonScreen1 = ({ navigation }) => {
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
      id: '41',
      title: 'Introdução ao HTML',
      content: 'HTML (HyperText Markup Language) é a linguagem padrão para criar páginas da web.',
      code: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Título da página</title>\n  </head>\n  <body>\n    <h1>Meu primeiro título</h1>\n    <p>Meu primeiro parágrafo.</p>\n  </body>\n</html>',
    },
    {
      id: '42',
      title: 'Elementos Básicos',
      content: 'Elementos básicos incluem tags como <h1>, <p>, <a>, <img>, etc.',
      code: '<h1>Título</h1>\n<p>Parágrafo</p>\n<a href="https://www.exemplo.com">Link</a>',
    },
    {
      id: '43',
      title: 'Listas e Tabelas',
      content: 'HTML suporta diferentes tipos de listas e tabelas para organizar dados.',
      code: '<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>\n<table>\n  <tr>\n    <td>Célula 1</td>\n    <td>Célula 2</td>\n  </tr>\n</table>',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Aula 1: Introdução ao HTML</Text>
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
  },
  lessonContent: {
    marginBottom: 10,
    fontWeight: '400',
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

export default HTMLLessonScreen1;
