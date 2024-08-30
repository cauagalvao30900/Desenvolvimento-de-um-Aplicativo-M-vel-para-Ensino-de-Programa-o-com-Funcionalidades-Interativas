import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs'; // ou outro estilo que preferir
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PHPLessonScreen2 = ({ navigation }) => {
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
          <SyntaxHighlighter language="php" style={docco}>
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
      id: '18',
      title: 'Arrays',
      content: 'Os arrays em PHP podem armazenar vários valores em uma única variável.',
      code: '<?php\n$frutas = array("Maçã", "Banana", "Laranja");\necho "Eu gosto de " . $frutas[0] . ", " . $frutas[1] . " e " . $frutas[2];\n?>',
    },
    {
      id: '19',
      title: 'Loop For Each',
      content: 'O loop foreach é usado para percorrer arrays.',
      code: '<?php\n$frutas = array("Maçã", "Banana", "Laranja");\nforeach ($frutas as $fruta) {\n  echo $fruta . " ";\n}\n?>',
    },
    {
      id: '20',
      title: 'Incluir Arquivos',
      content: 'A declaração include é usada para incluir arquivos em um script PHP.',
      code: '<?php\ninclude \'header.php\';\n?>',
    },
    {
      id: '21',
      title: 'Funções de Data e Hora',
      content: 'PHP oferece uma variedade de funções para manipular datas e horas.',
      code: '<?php\necho "Hoje é " . date("d/m/Y") . "<br>";\necho "A hora atual é " . date("h:i:sa");\n?>',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Segunda Aula de PHP</Text>
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
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    flex: 1,
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
    color: 'white',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
  },
  codeBlock: {
    backgroundColor: '#1e1e1e', // Cor de fundo do bloco de código
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  codeText: {
    color: 'white', // Cor do texto do código
    fontFamily: 'Courier New',
  },
  favoriteButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});

export default PHPLessonScreen2;
