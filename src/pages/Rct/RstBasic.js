import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReactLessonScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]); // Estado para armazenar favoritos

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
    saveFavorites(updatedFavorites); // Salva os favoritos atualizados
  };

  const goToFavoriteScreen = () => {
    navigation.navigate('favoritos');
  };

  const renderItem = ({ item }) => {
    const isFavorite = favorites.includes(item.id);

    return (
      <View style={styles.lessonContent}>
        <Text style={styles.subtitle}>{item.title}</Text>
        <Text style={styles.paragraph}>{item.content}</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>{item.code}</Text>
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
      id: '1',
      title: 'Introdução ao React',
      content: 'React é uma biblioteca JavaScript popular para construção de interfaces de usuário interativas e reativas.',
      code: 'import React from \'react\';\n\nfunction App() {\n  return (\n    <div>\n      <h1>Hello, world!</h1>\n    </div>\n  );\n}\n\nexport default App;',
    },
    {
      id: '2',
      title: 'Renderizando com ReactDOM',
      content: 'Você pode renderizar componentes React em sua aplicação usando ReactDOM.render().',
      code: 'import ReactDOM from \'react-dom\';\nimport App from \'./App\';\n\nReactDOM.render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n  document.getElementById(\'root\')\n);',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.favoritesButton} onPress={goToFavoriteScreen}>
        <Ionicons name="heart" size={24} color="red" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.title}>Aulas</Text>
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
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
    color: 'white', // Cor do título atualizada
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
    marginLeft: 70,
    marginRight: 70,
    textAlign: 'center',
    color: 'white', // Cor do subtítulo atualizada
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 10,
    backgroundColor: '#343434', // Cor de fundo atualizada
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
    alignItems: 'center',
  },
  codeText: {
    color: 'white', // Cor do texto do código atualizada
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  favoritesButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  favoriteButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});

export default ReactLessonScreen;
